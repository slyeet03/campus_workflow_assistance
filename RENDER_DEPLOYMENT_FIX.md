# Render Deployment Fix

## Problem
Your Render deployment is failing with "Port scan timeout reached, failed to detect open port 5001" because Render can't properly detect the port your Flask app is running on.

## Solution

### Step 1: Update Your Code
I've made the following changes to fix the deployment:

1. **Updated `render.yaml`** - Now uses gunicorn with proper port binding
2. **Added health check endpoint** - `/health` for Render to verify the app is running
3. **Added file size limit** - Prevents upload issues

### Step 2: Redeploy to Render

1. **Commit and push your changes:**
   ```bash
   git add .
   git commit -m "Fix Render deployment configuration"
   git push origin main
   ```

2. **In Render Dashboard:**
   - Go to your service
   - Click "Manual Deploy" → "Deploy latest commit"
   - Or if you want to start fresh, delete the current service and create a new one

### Step 3: Configure Environment Variables

Make sure these are set in your Render service:

1. **Go to your service in Render dashboard**
2. **Click on "Environment" tab**
3. **Add these variables:**
   - `FLASK_ENV` = `production`
   - `GOOGLE_API_KEY` = `your_actual_api_key_here`

### Step 4: Test the Deployment

Once deployed, test these endpoints:

1. **Health check:** `https://your-app-name.onrender.com/health`
2. **Test endpoint:** `https://your-app-name.onrender.com/test`

Both should return JSON responses.

### Step 5: Update Frontend

Update your frontend JavaScript files to use the new Render URL:

In `public/index.js`, `public/login.js`, `public/quiz.js`, `public/timetable.js`, `public/logs.js`:

Replace:
```javascript
const API_BASE = 'http://localhost:5001';
```

With:
```javascript
const API_BASE = 'https://your-app-name.onrender.com';
```

## What I Fixed

1. **Port binding issue** - Now using gunicorn with `$PORT` environment variable
2. **Health check** - Added `/health` endpoint for Render monitoring
3. **File upload limits** - Added proper file size configuration
4. **Deployment config** - Updated `render.yaml` to use gunicorn instead of python

## Troubleshooting

If it still fails:

1. **Check Render logs** - Look for any error messages
2. **Verify environment variables** - Make sure `GOOGLE_API_KEY` is set
3. **Test locally with gunicorn:**
   ```bash
   cd backend
   gunicorn --bind 0.0.0.0:5001 app:app
   ```

The deployment should now work! 🚀
