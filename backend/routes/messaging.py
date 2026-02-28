import json
import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime
from db import get_db
from config import GEMINI_URL

router = APIRouter(prefix="/message", tags=["Messaging"])

class MessageRequest(BaseModel):
    guest_message: str
    property_id: int = 1

@router.post("")
async def handle_message(req: MessageRequest):
    db = get_db()
    prop = db.execute("SELECT * FROM properties WHERE id=?", (req.property_id,)).fetchone()
    db.close()

    if not prop:
        raise HTTPException(status_code=404, detail="Property not found")

    prop = dict(prop)

    system_prompt = f"""You are an AI assistant for a short-term rental property manager using SuiteOp.
You help draft professional, warm, and concise responses to guest messages.

Property context:
- Name: {prop['name']}
- Check-in: {prop['checkin_time']} | Check-out: {prop['checkout_time']}
- WiFi: {prop['wifi_name']} / {prop['wifi_password']}
- Address: {prop['address']}
- House Rules: {prop['rules']}
- Max Guests: {prop['max_guests']}

Respond ONLY with valid JSON and nothing else. No markdown, no backticks. Use this exact schema:
{{
  "draft_reply": "string - warm, professional response to the guest",
  "sentiment": "happy | neutral | frustrated | urgent",
  "is_issue": true or false,
  "severity": "none | low | medium | high",
  "staff_action": "string describing what staff should do, or null",
  "category": "checkin | checkout | amenities | complaint | pricing | other"
}}"""

    payload = {
        "system_instruction": {"parts": [{"text": system_prompt}]},
        "contents": [{"role": "user", "parts": [{"text": req.guest_message}]}],
        "generationConfig": {"temperature": 0.7}
    }

    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.post(GEMINI_URL, json=payload)
        if resp.status_code != 200:
            raise HTTPException(status_code=502, detail=f"Gemini API error: {resp.text}")

    raw = resp.json()["candidates"][0]["content"]["parts"][0]["text"]
    raw = raw.strip().replace("```json", "").replace("```", "").strip()

    try:
        ai = json.loads(raw)
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Failed to parse AI response")

    db = get_db()
    db.execute("""
        INSERT INTO conversations
            (property_id, guest_message, draft_reply, sentiment, is_issue, severity, staff_action, category, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (req.property_id, req.guest_message, ai["draft_reply"], ai["sentiment"],
          1 if ai["is_issue"] else 0, ai["severity"], ai.get("staff_action"),
          ai["category"], datetime.utcnow().isoformat()))
    db.commit()
    db.close()

    return ai
