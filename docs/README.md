# InvoSmart AI Documentation

## Overview
InvoSmart AI is an intelligent invoice processing system that uses OCR and machine learning to automate invoice data extraction and analysis. The system consists of three main components:
1. Frontend (Next.js + TypeScript)
2. Backend (FastAPI)
3. ML Module (Python)

## Project Structure
```
invosmart-ai/
├── frontend/           # Next.js frontend application
├── backend/           # FastAPI backend server
├── ml/               # Machine learning module
├── docs/            # Documentation
└── scripts/         # Utility scripts
```

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- PostgreSQL
- Tesseract OCR

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/invosmart-ai.git
cd invosmart-ai
```

2. Set up the backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. Set up the ML module:
```bash
cd ../ml
pip install -r requirements.txt
python -m spacy download en_core_web_sm
```

4. Set up the frontend:
```bash
cd ../frontend
npm install
```

### Configuration

1. Backend Environment Variables (.env):
```env
DATABASE_URL=postgresql://user:password@localhost/invosmart
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

2. Frontend Environment Variables (.env.local):
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Running the Application

1. Start the backend server:
```bash
cd backend
uvicorn main:app --reload
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

## Features

### Frontend
- Modern, responsive UI with dark mode
- Real-time invoice processing status
- Interactive analytics dashboard
- User authentication and authorization
- File upload with drag-and-drop support
- Comprehensive settings management

### Backend
- RESTful API with FastAPI
- JWT authentication
- PostgreSQL database with SQLAlchemy ORM
- Async request handling
- File upload handling
- Comprehensive API documentation with Swagger UI

### ML Module
- OCR using Tesseract
- Named Entity Recognition with spaCy
- Invoice classification using transformers
- Field extraction using regex patterns
- Result validation and confidence scoring

## API Documentation

### Authentication
- POST /token - Get access token
- POST /users - Create new user
- GET /users/me - Get current user

### Invoices
- POST /invoices/upload - Upload invoice
- GET /invoices - List invoices
- GET /invoices/{id} - Get invoice details
- DELETE /invoices/{id} - Delete invoice

### Analytics
- GET /analytics - Get invoice analytics
- GET /analytics/trends - Get processing trends

## Security

- JWT token-based authentication
- Password hashing with bcrypt
- CORS configuration
- Rate limiting
- Input validation
- XSS protection
- CSRF protection

## Error Handling

The application implements comprehensive error handling:
- Frontend error boundary
- API error responses
- Validation errors
- Network errors
- File processing errors

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
