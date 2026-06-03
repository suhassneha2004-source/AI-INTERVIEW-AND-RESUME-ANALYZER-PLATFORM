# 🚀 Deployment Guide - Render

This guide will help you deploy the AI-Interview-Platform to Render for public access.

## Prerequisites

1. **Render Account** - Create free account at [render.com](https://render.com)
2. **GitHub Account** - Push your code to GitHub
3. **Groq API Key** - Keep your API key from `.env`

## Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - AI Interview Platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/AI-Interview-Platform.git
git push -u origin main
```

## Step 2: Deploy Backend on Render

1. Go to [render.com](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Select **"GitHub"** and connect your GitHub account
4. Search for **"AI-Interview-Platform"** and select it
5. Fill in these details:
   - **Name**: `ai-interview-backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port 8000`
   - **Root Directory**: `backend`
6. Add Environment Variable:
   - **Key**: `GROQ_API_KEY`
   - **Value**: `[Your Groq API Key]`
7. Click **"Create Web Service"**
8. Wait for deployment (2-3 minutes)
9. Copy your backend URL: `https://ai-interview-backend.onrender.com`

## Step 3: Deploy Frontend on Render

1. Click **"New +"** → **"Static Site"**
2. Connect GitHub and select your repository again
3. Fill in these details:
   - **Name**: `ai-interview-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
4. Add Environment Variables (Build time):
   - **Key**: `VITE_API_URL`
   - **Value**: `https://ai-interview-backend.onrender.com` (from Step 2)
5. Click **"Create Static Site"**
6. Wait for deployment (2-3 minutes)
7. Your frontend URL will be: `https://ai-interview-frontend.onrender.com`

## Step 4: Update Frontend API URL

Update the API URL in your frontend code:

**File**: `frontend/src/pages/Home.jsx`

```javascript
const response = await fetch(
  `${import.meta.env.VITE_API_URL}/upload-resume`,
  {
    method: "POST",
    body: formData,
  }
);
```

**File**: `frontend/src/services/api.js` (once implemented)

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(`${API_URL}/upload-resume`, {
    method: 'POST',
    body: formData,
  });
  
  return response.json();
};
```

## Step 5: Access Your Website

- **Frontend**: `https://ai-interview-frontend.onrender.com`
- **Backend API**: `https://ai-interview-backend.onrender.com`

Share the frontend URL with others!

## Important Notes

### Free Tier Limitations (Render)
- ⏱️ Spins down after 15 minutes of inactivity
- 💾 0.5GB RAM, limited bandwidth
- ✅ Perfect for demos and low-traffic projects

### Environment Variables
- Never commit `.env` file
- Always use `.env.example`
- Add sensitive keys in Render dashboard

### CORS Configuration
Your backend already has CORS enabled for all origins, which allows the frontend to communicate.

## Troubleshooting

### Backend deployment fails
- Check Python version compatibility
- Verify all imports in `requirements.txt`
- Check logs in Render dashboard

### Frontend can't connect to backend
- Verify `VITE_API_URL` environment variable
- Check backend is running (Render dashboard)
- Check browser console for CORS errors

### API Key not working
- Verify key is correct in `.env`
- Check Groq account has valid credits
- Regenerate key if needed

## Custom Domain (Optional)

To use your own domain:

1. In Render dashboard, go to Settings
2. Click "Custom Domains"
3. Add your domain
4. Update DNS records at your domain provider

## Next Steps

1. ✅ Test the deployed application
2. ✅ Share the frontend URL with others
3. ✅ Monitor logs in Render dashboard
4. ✅ Set up CI/CD for automatic deployments
5. ✅ Consider upgrading to paid plan for production

---

**Status**: Ready for public deployment! 🎉
