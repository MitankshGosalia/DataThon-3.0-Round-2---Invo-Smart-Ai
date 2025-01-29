import pytesseract
from PIL import Image
import cv2
import numpy as np
from pdf2image import convert_from_path
import re
from datetime import datetime
import openai
from typing import Dict, Any, Union
import os
from dotenv import load_dotenv

load_dotenv()

# Configure OpenAI
openai.api_key = os.getenv("OPENAI_API_KEY")

class InvoiceProcessor:
    def __init__(self):
        self.date_patterns = [
            r'\d{2}/\d{2}/\d{4}',
            r'\d{2}-\d{2}-\d{4}',
            r'\d{4}/\d{2}/\d{2}',
            r'\d{4}-\d{2}-\d{2}',
        ]
        self.amount_pattern = r'\$\s*\d+(?:,\d{3})*(?:\.\d{2})?'
        self.email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'

    def preprocess_image(self, image: np.ndarray) -> np.ndarray:
        """Preprocess the image for better OCR results"""
        # Convert to grayscale
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        # Apply thresholding
        _, binary = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        
        # Denoise
        denoised = cv2.fastNlMeansDenoising(binary)
        
        return denoised

    def extract_text_from_image(self, image_path: str) -> str:
        """Extract text from image using OCR"""
        # Read image
        image = cv2.imread(image_path)
        
        # Preprocess
        processed_image = self.preprocess_image(image)
        
        # Perform OCR
        text = pytesseract.image_to_string(processed_image)
        
        return text

    def extract_text_from_pdf(self, pdf_path: str) -> str:
        """Extract text from PDF by converting to images first"""
        # Convert PDF to images
        images = convert_from_path(pdf_path)
        
        # Extract text from each image
        text = ""
        for image in images:
            # Convert PIL image to numpy array
            image_np = np.array(image)
            
            # Preprocess and extract text
            processed_image = self.preprocess_image(image_np)
            text += pytesseract.image_to_string(processed_image)
            text += "\n"
        
        return text

    def extract_information_with_ai(self, text: str) -> Dict[str, Any]:
        """Use OpenAI's GPT to extract structured information from invoice text"""
        prompt = f"""
        Extract the following information from this invoice text. Return a JSON object:
        - Invoice number
        - Date
        - Due date
        - Amount
        - Tax amount
        - Total amount
        - Vendor information (name, address, email)
        - Client information (name, address, email)

        Invoice text:
        {text}
        """

        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are an AI trained to extract information from invoices."},
                    {"role": "user", "content": prompt}
                ]
            )
            
            # Parse the response
            extracted_info = eval(response.choices[0].message.content)
            return extracted_info
        
        except Exception as e:
            print(f"Error in AI extraction: {str(e)}")
            return self.extract_information_with_regex(text)

    def extract_information_with_regex(self, text: str) -> Dict[str, Any]:
        """Fallback method to extract information using regex patterns"""
        # Find dates
        dates = []
        for pattern in self.date_patterns:
            dates.extend(re.findall(pattern, text))
        
        # Find amounts
        amounts = re.findall(self.amount_pattern, text)
        
        # Find emails
        emails = re.findall(self.email_pattern, text)
        
        return {
            "invoice_number": None,  # Need more sophisticated pattern matching
            "date": dates[0] if dates else None,
            "due_date": dates[1] if len(dates) > 1 else None,
            "amount": self.parse_amount(amounts[0]) if amounts else None,
            "tax": self.parse_amount(amounts[1]) if len(amounts) > 1 else None,
            "total": self.parse_amount(amounts[-1]) if amounts else None,
            "vendor_info": {
                "email": emails[0] if emails else None
            },
            "client_info": {
                "email": emails[1] if len(emails) > 1 else None
            }
        }

    def parse_amount(self, amount_str: str) -> float:
        """Convert amount string to float"""
        try:
            return float(amount_str.replace('$', '').replace(',', ''))
        except:
            return 0.0

    def process_invoice(self, file_path: str) -> Dict[str, Any]:
        """Main method to process an invoice"""
        try:
            # Extract text based on file type
            if file_path.lower().endswith('.pdf'):
                text = self.extract_text_from_pdf(file_path)
            else:
                text = self.extract_text_from_image(file_path)

            # Try AI extraction first, fallback to regex
            extracted_info = self.extract_information_with_ai(text)
            
            return {
                "success": True,
                "data": extracted_info,
                "error": None
            }
        
        except Exception as e:
            return {
                "success": False,
                "data": None,
                "error": str(e)
            }
