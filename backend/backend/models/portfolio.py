from pydantic import BaseModel
from typing import Optional

class ContactMessage(BaseModel):
    name: str
    email: str
    subject: str
    message: str
