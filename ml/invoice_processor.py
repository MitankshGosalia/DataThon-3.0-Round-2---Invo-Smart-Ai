import pytesseract
from PIL import Image
import numpy as np
import re
from transformers import pipeline
import spacy
import cv2

class InvoiceProcessor:
    def __init__(self):
        # Load NER model for entity extraction
        self.nlp = spacy.load("en_core_web_sm")
        
        # Load zero-shot classifier for invoice type classification
        self.classifier = pipeline("zero-shot-classification")
        
        # Common invoice fields regex patterns
        self.patterns = {
            'invoice_number': r'(?i)invoice\s*#?\s*([A-Z0-9-]+)',
            'date': r'(?i)date\s*:\s*(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})',
            'amount': r'(?i)total\s*:?\s*[$€£]?\s*(\d+[.,]\d{2})',
            'tax': r'(?i)tax\s*:?\s*[$€£]?\s*(\d+[.,]\d{2})',
        }

    def preprocess_image(self, image_path):
        """Preprocess the image for better OCR results."""
        # Read image
        img = cv2.imread(image_path)
        
        # Convert to grayscale
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Apply thresholding
        thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
        
        # Noise removal
        denoised = cv2.medianBlur(thresh, 3)
        
        return denoised

    def extract_text(self, image_path):
        """Extract text from image using OCR."""
        # Preprocess image
        processed_image = self.preprocess_image(image_path)
        
        # Perform OCR
        text = pytesseract.image_to_string(processed_image)
        
        return text

    def extract_entities(self, text):
        """Extract named entities from text."""
        doc = self.nlp(text)
        entities = {
            'organizations': [],
            'dates': [],
            'money': [],
            'persons': []
        }
        
        for ent in doc.ents:
            if ent.label_ == 'ORG':
                entities['organizations'].append(ent.text)
            elif ent.label_ == 'DATE':
                entities['dates'].append(ent.text)
            elif ent.label_ == 'MONEY':
                entities['money'].append(ent.text)
            elif ent.label_ == 'PERSON':
                entities['persons'].append(ent.text)
        
        return entities

    def extract_fields(self, text):
        """Extract specific fields using regex patterns."""
        fields = {}
        
        for field, pattern in self.patterns.items():
            match = re.search(pattern, text)
            if match:
                fields[field] = match.group(1)
            else:
                fields[field] = None
        
        return fields

    def classify_invoice_type(self, text):
        """Classify invoice type using zero-shot classification."""
        candidate_labels = ['purchase order', 'sales invoice', 'receipt', 'credit note']
        
        result = self.classifier(text, candidate_labels)
        
        return {
            'type': result['labels'][0],
            'confidence': result['scores'][0]
        }

    def process_invoice(self, image_path):
        """Process invoice image and extract all relevant information."""
        # Extract text from image
        text = self.extract_text(image_path)
        
        # Extract fields using regex
        fields = self.extract_fields(text)
        
        # Extract named entities
        entities = self.extract_entities(text)
        
        # Classify invoice type
        invoice_type = self.classify_invoice_type(text)
        
        # Combine all extracted information
        result = {
            'invoice_number': fields.get('invoice_number'),
            'date': fields.get('date'),
            'total_amount': fields.get('amount'),
            'tax_amount': fields.get('tax'),
            'vendor': entities['organizations'][0] if entities['organizations'] else None,
            'invoice_type': invoice_type['type'],
            'confidence': invoice_type['confidence'],
            'entities': entities
        }
        
        return result

    def validate_results(self, results):
        """Validate extracted results."""
        required_fields = ['invoice_number', 'date', 'total_amount']
        missing_fields = []
        
        for field in required_fields:
            if not results.get(field):
                missing_fields.append(field)
        
        return {
            'is_valid': len(missing_fields) == 0,
            'missing_fields': missing_fields,
            'confidence_score': results['confidence']
        }
