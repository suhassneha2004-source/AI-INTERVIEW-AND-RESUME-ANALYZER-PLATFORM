# 🎯 AI Interview Platform

An intelligent resume analyzer that uses AI to provide personalized interview preparation.

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- Groq API Key (get free at [console.groq.com](https://console.groq.com))

### Local Development

#### Backend Setup
```bash
cd backend
python -m venv venv
.\venv\Scripts\Activate  # Windows
# OR
source venv/bin/activate  # Mac/Linux

pip install -r requirements.txt
uvicorn app.main:app --reload
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Backend runs on: `http://localhost:8000`
Frontend runs on: `http://localhost:5173`

## 📋 Features

- ✅ **Resume Upload** - Upload PDF resumes for analysis
- ✅ **AI Analysis** - Get ATS scores, skills, strengths, weaknesses
- ✅ **Interview Questions** - 50+ technical & HR questions with answers
- ✅ **Difficulty Levels** - Beginner, Intermediate, Advanced
- ✅ **Responsive UI** - Works on all devices

## 🌐 Deployment

### Deploy to Render (Free)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed step-by-step instructions.

**TL;DR:**
1. Push to GitHub
2. Connect GitHub to Render
3. Deploy backend + frontend
4. Share your public URL!

### Quick Links
- Frontend: `https://your-frontend.onrender.com`
- Backend: `https://your-backend.onrender.com`

## 📁 Project Structure

```
AI-Interview-Platform/
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI server
│   │   ├── resume.py        # Resume analysis & AI
│   │   └── interview.py      # Interview logic
│   ├── requirements.txt
│   ├── .env                 # API keys (don't commit)
│   └── Dockerfile          # For deployment
├── frontend/
│   ├── src/
│   │   ├── pages/          # Home, Results
│   │   ├── components/     # Reusable UI components
│   │   ├── services/       # API client
│   │   └── assets/
│   ├── package.json
│   └── vite.config.js
└── DEPLOYMENT.md           # Deployment guide
```

## 🛠️ Tech Stack

### Frontend
- React 19 + Vite
- Tailwind CSS
- React Router
- React Circular Progressbar

### Backend
- FastAPI
- Groq AI (llama-3.1-8b-instant)
- PyMuPDF (PDF extraction)

## 🔑 Environment Variables

### Backend (.env)
```
GROQ_API_KEY=your_key_here
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:8000
```

## 📝 API Endpoints

### `POST /upload-resume`
Upload a PDF resume for analysis.

**Request:**
```json
{
  "file": "resume.pdf"
}
```

**Response:**
```json
{
  "success": true,
  "analysis": {
    "overview": {...},
    "technical_questions": [...],
    "hr_questions": [...]
  }
}
```

## 🐛 Troubleshooting

**Frontend can't connect to backend?**
- Check `VITE_API_URL` environment variable
- Ensure backend is running
- Check CORS is enabled

**Groq API key not working?**
- Verify key in `.env`
- Check Groq account has credits
- Regenerate key if needed

**PDF upload fails?**
- Ensure file is PDF format
- Check file size (should be < 10MB)
- Verify PDF is not corrupted

## 📚 Learn More

- [FastAPI Docs](https://fastapi.tiangolo.com)
- [React Docs](https://react.dev)
- [Groq API Docs](https://console.groq.com/docs)
- [Render Docs](https://render.com/docs)

## 📄 License

MIT License - feel free to use this project!

## 🤝 Contributing

Pull requests welcome! Feel free to improve the project.

---

**Ready to deploy?** Check out [DEPLOYMENT.md](./DEPLOYMENT.md) 🚀
