from fastapi import APIRouter, HTTPException
from models.portfolio import ContactMessage

router = APIRouter(prefix="/api", tags=["contact"])

@router.post("/contact")
def send_message(msg: ContactMessage):
    # Placeholder: integrate SMTP or email service here
    print(f"[Contact] From: {msg.email} | Subject: {msg.subject}")
    return {"status": "success", "message": "Message received. I'll get back to you soon!"}
