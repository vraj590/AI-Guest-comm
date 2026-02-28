from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime
from db import get_db

router = APIRouter(prefix="/property", tags=["Property"])

class PropertyUpdate(BaseModel):
    name: str
    checkin_time: str
    checkout_time: str
    wifi_name: str
    wifi_password: str
    address: str
    rules: str
    max_guests: int

@router.get("/{property_id}")
def get_property(property_id: int = 1):
    db = get_db()
    row = db.execute("SELECT * FROM properties WHERE id=?", (property_id,)).fetchone()
    db.close()
    if not row:
        raise HTTPException(status_code=404, detail="Property not found")
    return dict(row)

@router.put("/{property_id}")
def update_property(property_id: int, data: PropertyUpdate):
    db = get_db()
    db.execute("""
        UPDATE properties SET
            name=?, checkin_time=?, checkout_time=?, wifi_name=?, wifi_password=?,
            address=?, rules=?, max_guests=?, updated_at=?
        WHERE id=?
    """, (data.name, data.checkin_time, data.checkout_time, data.wifi_name,
          data.wifi_password, data.address, data.rules, data.max_guests,
          datetime.utcnow().isoformat(), property_id))
    db.commit()
    db.close()
    return {"status": "updated"}
