# InvoSmart AI 🤖

> Transforming Invoices into Insights – Automate, Organize, Innovate!

InvoSmart AI is an advanced AI-powered invoice management system that revolutionizes how businesses handle their invoices. Using cutting-edge AI technology, it automates data extraction, processing, and organization of invoice data.

## 🚀 Key Features

- AI-powered invoice data extraction
- Real-time processing and validation
- Multi-language support
- Email, SMS, and WhatsApp integration
- Interactive dashboard with analytics
- Voice command integration
- Dark mode support

## 🛠️ Tech Stack

### Frontend
- Next.js
- React.js
- Tailwind CSS
- TypeScript

### Backend
- FastAPI (Python)
- Node.js (Authentication)

### Database
- PostgreSQL
- Firebase Realtime Database

### AI/ML
- Tesseract OCR
- OpenAI GPT
- Custom ML Models

### Cloud & Hosting
- AWS/GCP
- Vercel

### APIs
- Twilio (SMS/WhatsApp)
- SMTP (Email)

## 🏗️ Project Structure

```
invosmart-ai/
├── frontend/              # Next.js frontend application
├── backend/              # FastAPI backend services
├── ml/                   # ML models and AI services
├── docs/                 # Documentation
└── scripts/              # Utility scripts
```

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd backend
   pip install -r requirements.txt
   ```
3. Set up environment variables
4. Run the development servers:
   ```bash
   # Frontend
   npm run dev

   # Backend
   uvicorn main:app --reload
   ```

## 📝 License

MIT License - see the [LICENSE](LICENSE) file for details

# InvoSmart AI

An intelligent invoice processing system that uses OCR and machine learning to automate invoice data extraction and analysis.

## Features

- 📄 Automated invoice data extraction
- 📊 Interactive analytics dashboard
- 🔍 Smart search and filtering
- 📱 Responsive design
- 🌙 Dark mode support
- 🔒 Secure authentication
- 📈 Real-time processing status
- 🤖 ML-powered entity recognition

## Quick Start

1. Install dependencies:

```bash
# Backend
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt

# ML Module
cd ../ml
pip install -r requirements.txt
python -m spacy download en_core_web_sm

# Frontend
cd ../frontend
npm install
```

2. Set up environment variables:

Create `.env` in backend directory:
```env
DATABASE_URL=postgresql://user:password@localhost/invosmart
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

Create `.env.local` in frontend directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

3. Run the application:

```bash
# Using the provided script
cd scripts
.\run.ps1
```

Or manually:

```bash
# Terminal 1 - Backend
cd backend
.\venv\Scripts\activate
uvicorn main:app --reload

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## Development

- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs

## Documentation

See the [documentation](./docs/README.md) for detailed information about:
- Architecture
- API endpoints
- ML module
- Security
- Contributing guidelines

## Tech Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion
- Axios

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL
- JWT Authentication
- Pydantic

### ML Module
- PyTesseract
- spaCy
- Transformers
- OpenCV
- NumPy

## License

MIT License - see LICENSE for details
