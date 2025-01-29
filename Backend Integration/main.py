from fastapi import FastAPI, File, UploadFile, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
import uvicorn
import os
from dotenv import load_load_dotenv

# Load environment variables
load_dotenv()

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

@app.get("/")
async def root():
    return {
        "message": "Welcome to InvoSmart AI API",
        "status": "active",
        "version": "1.0.0"
    }

@app.post("/api/invoice/upload")
async def upload_invoice(file: UploadFile = File(...)):
    """
    Upload and process an invoice file
    """
    try:
        # TODO: Implement invoice processing logic
        return {
            "filename": file.filename,
            "status": "processing",
            "message": "Invoice uploaded successfully"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/invoice/{invoice_id}")
async def get_invoice(invoice_id: str):
    """
    Retrieve processed invoice data
    """
    # TODO: Implement invoice retrieval logic
    return {
        "invoice_id": invoice_id,
        "status": "processed"
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
