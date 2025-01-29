from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from enum import Enum

class InvoiceStatus(str, Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    ERROR = "error"

class UserBase(BaseModel):
    email: EmailStr
    full_name: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

class InvoiceBase(BaseModel):
    invoice_number: Optional[str] = None
    date: Optional[datetime] = None
    due_date: Optional[datetime] = None
    amount: Optional[float] = None
    tax: Optional[float] = None
    total: Optional[float] = None
    vendor_name: Optional[str] = None
    vendor_address: Optional[str] = None
    vendor_email: Optional[EmailStr] = None
    client_name: Optional[str] = None
    client_address: Optional[str] = None
    client_email: Optional[EmailStr] = None

class InvoiceCreate(InvoiceBase):
    pass

class Invoice(InvoiceBase):
    id: int
    filename: str
    status: InvoiceStatus
    created_at: datetime
    processed_at: Optional[datetime] = None
    owner_id: int

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class InvoiceAnalytics(BaseModel):
    total_count: int
    total_amount: float
    average_amount: float
    processing_time: float
    success_rate: float
    monthly_trends: dict
    category_distribution: dict
