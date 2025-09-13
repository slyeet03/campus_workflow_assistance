# CampusFlow Deployment Guide

This guide will help you deploy your CampusFlow application to production.

## Backend Deployment on Render

### Step 1: Prepare Your Backend

1. **Environment Variables**: Create a `.env` file in the `backend/` directory:
   ```
   GOOGLE_API_KEY=your_actual_gemini_api_key_here
   PORT=5001
   FLASK_ENV=production
   ```

2. **Files Ready for Deployment**:
   - `backend/app.py` - Updated to use environment variables
   - `backend/requirements.txt` - Includes all dependencies
   - `backend/Procfile` - Tells Render how to run the app

### Step 2: Deploy to Render

1. **Create Render Account**:
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Connect Your Repository**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your repository

3. **Configure the Service**:
   - **Name**: `campusflow-backend` (or your preferred name)
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Root Directory**: `backend`

4. **Set Environment Variables**:
   - In the Render dashboard, go to your service
   - Click on "Environment" tab
   - Add these variables:
     - `GOOGLE_API_KEY`: Your actual Gemini API key
     - `FLASK_ENV`: `production`
     - `PORT`: `5001` (Render will override this)

5. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your service URL (e.g., `https://campusflow-backend.onrender.com`)

### Step 3: Update Frontend Configuration

1. **Update config.js**:
   ```javascript
   const CONFIG = {
       API_BASE_URL: 'https://your-actual-render-url.onrender.com'
   };
   ```

## Frontend Deployment Options

### Option 1: Netlify (Recommended)

1. **Prepare for Netlify**:
   - Your frontend files are already ready
   - No build process needed (static files)

2. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up and connect GitHub
   - Click "New site from Git"
   - Select your repository
   - **Build settings**:
     - Build command: Leave empty (no build needed)
     - Publish directory: `/` (root directory)
   - Click "Deploy site"

3. **Custom Domain** (Optional):
   - In Netlify dashboard, go to "Domain settings"
   - Add your custom domain

### Option 2: Vercel

1. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up and connect GitHub
   - Click "New Project"
   - Select your repository
   - **Framework Preset**: Other
   - **Root Directory**: `/` (root directory)
   - Click "Deploy"

### Option 3: GitHub Pages

1. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll to "Pages" section
   - Source: "Deploy from a branch"
   - Branch: `main`
   - Folder: `/` (root)
   - Click "Save"

## Testing Your Deployment

1. **Test Backend**:
   - Visit: `https://your-backend-url.onrender.com/test`
   - Should return: `{"message": "Backend is working!", "status": "success"}`

2. **Test Frontend**:
   - Visit your frontend URL
   - Try uploading a PPT file
   - Check if it connects to your backend

## Troubleshooting

### Common Issues:

1. **CORS Errors**:
   - Backend already has CORS configured
   - If issues persist, check that your frontend URL is allowed

2. **Environment Variables**:
   - Make sure `GOOGLE_API_KEY` is set correctly in Render
   - Check Render logs for any environment variable issues

3. **File Upload Issues**:
   - Render has file system limitations
   - Files are stored temporarily in memory
   - For production, consider using cloud storage (AWS S3, etc.)

4. **API Timeout**:
   - Render free tier has request timeouts
   - Consider upgrading to paid plan for production use

## Production Considerations

1. **Database**: Currently using in-memory storage
   - For production, add a database (PostgreSQL, MongoDB, etc.)

2. **File Storage**: Currently using local file system
   - For production, use cloud storage (AWS S3, Google Cloud Storage, etc.)

3. **Security**:
   - Add authentication middleware
   - Implement rate limiting
   - Add input validation

4. **Monitoring**:
   - Add logging service (Sentry, LogRocket, etc.)
   - Monitor API performance

## URLs After Deployment

- **Backend**: `https://your-backend-name.onrender.com`
- **Frontend**: `https://your-frontend-name.netlify.app` (or your chosen platform)

## Next Steps

1. Deploy backend to Render
2. Update frontend config with backend URL
3. Deploy frontend to your chosen platform
4. Test the complete application
5. Set up monitoring and logging
6. Consider adding a database for production use

## Support

If you encounter any issues:
1. Check Render logs for backend issues
2. Check browser console for frontend issues
3. Verify environment variables are set correctly
4. Test API endpoints individually
