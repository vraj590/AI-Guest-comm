from fastapi import APIRouter
from db import get_db

router = APIRouter(prefix="/conversations", tags=["Conversations"])

@router.get("/{property_id}")
def get_conversations(property_id: int = 1, limit: int = 50):
    db = get_db()
    rows = db.execute("""
        SELECT * FROM conversations WHERE property_id=?
        ORDER BY created_at DESC LIMIT ?
    """, (property_id, limit)).fetchall()
    db.close()
    return [dict(r) for r in rows]

@router.delete("/{property_id}")
def clear_conversations(property_id: int):
    db = get_db()
    db.execute("DELETE FROM conversations WHERE property_id=?", (property_id,))
    db.commit()
    db.close()
    return {"status": "cleared"}
