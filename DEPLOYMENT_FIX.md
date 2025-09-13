# Deployment Fix Guide

## Problem
Your Vercel deployment is failing because Vercel is designed for static sites and serverless functions, not long-running Flask servers. The error "Port scan timeout reached, failed to detect open port 5001" occurs because Vercel can't run your Flask app.

## Solution: Separate Frontend and Backend

### Step 1: Deploy Backend to Render.com

1. **Push your changes to GitHub:**
   ```bash
   git add .
   git commit -m "Fix deployment configuration"
   git push origin main
   ```

2. **Deploy to Render.com:**
   - Go to [render.com](https://render.com)
   - Sign up/login with GitHub
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your repository
   - Configure:
     - **Name**: `campus-workflow-backend`
     - **Environment**: `Python 3`
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `python app.py`
     - **Environment Variables**:
       - `FLASK_ENV`: `production`
       - `GOOGLE_API_KEY`: (your actual API key)

3. **Get your backend URL:**
   - After deployment, Render will give you a URL like: `https://campus-workflow-backend.onrender.com`

### Step 2: Update Frontend to Use Backend URL

1. **Update your frontend JavaScript files** to use the Render backend URL instead of localhost:

   In `public/index.js`, `public/login.js`, `public/quiz.js`, `public/timetable.js`, `public/logs.js`:
   
   Replace:
   ```javascript
   const API_BASE = 'http://localhost:5001';
   ```
   
   With:
   ```javascript
   const API_BASE = 'https://campus-workflow-backend.onrender.com';
   ```

2. **Deploy frontend to Vercel:**
   - Your current Vercel configuration should now work
   - The frontend will be served from Vercel
   - API calls will go to your Render backend

### Step 3: Test the Setup

1. **Test backend directly:**
   - Visit: `https://campus-workflow-backend.onrender.com/test`
   - Should return: `{"message": "Backend is working!", "status": "success"}`

2. **Test frontend:**
   - Your Vercel deployment should now work
   - Frontend will load from Vercel
   - Backend calls will go to Render

## Alternative: Railway Deployment

If you prefer Railway over Render:

1. **Create `railway.toml` in backend directory:**
   ```toml
   [build]
   builder = "nixpacks"

   [deploy]
   startCommand = "python app.py"
   healthcheckPath = "/test"
   ```

2. **Deploy to Railway:**
   - Go to [railway.app](https://railway.app)
   - Connect GitHub repository
   - Deploy the backend directory

## Files Created/Modified

- ✅ `backend/render.yaml` - Render deployment config
- ✅ `vercel.json` - Updated Vercel config
- ✅ `api/test.py` - Simple Vercel API test function
- ✅ `DEPLOYMENT_FIX.md` - This guide

## Next Steps

1. Deploy backend to Render.com
2. Update frontend API URLs
3. Redeploy frontend to Vercel
4. Test the complete setup

Your deployment should now work! 🚀
