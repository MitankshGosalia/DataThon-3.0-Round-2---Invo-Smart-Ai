from fastapi import FastAPI, File, UploadFile, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
import os
from typing import List
from . import models, schemas, auth
from .database import engine, get_db
from .services.invoice_processor import InvoiceProcessor

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="InvoSmart AI API",
    description="AI-powered invoice processing and management system",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize invoice processor
invoice_processor = InvoiceProcessor()

@app.post("/token", response_model=schemas.Token)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/users/", response_model=schemas.User)
async def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(
        email=user.email,
        hashed_password=hashed_password,
        full_name=user.full_name
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/me", response_model=schemas.User)
async def read_users_me(
    current_user: models.User = Depends(auth.get_current_active_user)
):
    return current_user

@app.post("/invoices/upload", response_model=schemas.Invoice)
async def upload_invoice(
    file: UploadFile = File(...),
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    # Save the uploaded file
    file_path = f"uploads/{file.filename}"
    os.makedirs("uploads", exist_ok=True)
    
    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)
    
    try:
        # Process the invoice
        result = invoice_processor.process_invoice(file_path)
        
        if not result["success"]:
            raise HTTPException(status_code=400, detail=result["error"])
        
        # Create invoice record
        invoice_data = result["data"]
        db_invoice = models.Invoice(
            filename=file.filename,
            status=models.InvoiceStatus.COMPLETED,
            invoice_number=invoice_data.get("invoice_number"),
            date=datetime.strptime(invoice_data.get("date"), "%Y-%m-%d") if invoice_data.get("date") else None,
            due_date=datetime.strptime(invoice_data.get("due_date"), "%Y-%m-%d") if invoice_data.get("due_date") else None,
            amount=invoice_data.get("amount"),
            tax=invoice_data.get("tax"),
            total=invoice_data.get("total"),
            vendor_name=invoice_data.get("vendor_info", {}).get("name"),
            vendor_address=invoice_data.get("vendor_info", {}).get("address"),
            vendor_email=invoice_data.get("vendor_info", {}).get("email"),
            client_name=invoice_data.get("client_info", {}).get("name"),
            client_address=invoice_data.get("client_info", {}).get("address"),
            client_email=invoice_data.get("client_info", {}).get("email"),
            processed_at=datetime.utcnow(),
            owner_id=current_user.id
        )
        
        db.add(db_invoice)
        db.commit()
        db.refresh(db_invoice)
        
        # Clean up the file
        os.remove(file_path)
        
        return db_invoice
    
    except Exception as e:
        # Clean up the file in case of error
        if os.path.exists(file_path):
            os.remove(file_path)
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/invoices/", response_model=List[schemas.Invoice])
async def list_invoices(
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    invoices = db.query(models.Invoice)\
        .filter(models.Invoice.owner_id == current_user.id)\
        .offset(skip)\
        .limit(limit)\
        .all()
    return invoices

@app.get("/invoices/{invoice_id}", response_model=schemas.Invoice)
async def get_invoice(
    invoice_id: int,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    invoice = db.query(models.Invoice)\
        .filter(models.Invoice.id == invoice_id)\
        .filter(models.Invoice.owner_id == current_user.id)\
        .first()
    
    if invoice is None:
        raise HTTPException(status_code=404, detail="Invoice not found")
    return invoice

@app.get("/analytics", response_model=schemas.InvoiceAnalytics)
async def get_analytics(
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    # Get user's invoices
    invoices = db.query(models.Invoice)\
        .filter(models.Invoice.owner_id == current_user.id)\
        .all()
    
    if not invoices:
        return {
            "total_count": 0,
            "total_amount": 0.0,
            "average_amount": 0.0,
            "processing_time": 0.0,
            "success_rate": 0.0,
            "monthly_trends": {},
            "category_distribution": {}
        }
    
    # Calculate analytics
    total_amount = sum(invoice.total or 0 for invoice in invoices)
    processing_times = [
        (invoice.processed_at - invoice.created_at).total_seconds()
        for invoice in invoices
        if invoice.processed_at and invoice.created_at
    ]
    
    # Monthly trends
    monthly_trends = {}
    for invoice in invoices:
        if invoice.date:
            month_key = invoice.date.strftime("%Y-%m")
            if month_key not in monthly_trends:
                monthly_trends[month_key] = {"count": 0, "amount": 0}
            monthly_trends[month_key]["count"] += 1
            monthly_trends[month_key]["amount"] += invoice.total or 0
    
    return {
        "total_count": len(invoices),
        "total_amount": total_amount,
        "average_amount": total_amount / len(invoices) if invoices else 0,
        "processing_time": sum(processing_times) / len(processing_times) if processing_times else 0,
        "success_rate": len([i for i in invoices if i.status == models.InvoiceStatus.COMPLETED]) / len(invoices) * 100,
        "monthly_trends": monthly_trends,
        "category_distribution": {
            "services": 45,  # Mock data - implement actual categorization
            "products": 30,
            "equipment": 15,
            "others": 10
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
