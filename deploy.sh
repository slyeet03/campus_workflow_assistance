#!/bin/bash

# CampusFlow Deployment Script
echo "🚀 CampusFlow Deployment Helper"
echo "================================"

# Check if we're in the right directory
if [ ! -f "backend/app.py" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "📋 Pre-deployment checklist:"
echo "1. ✅ Backend code updated for production"
echo "2. ✅ Environment variables configured"
echo "3. ✅ Frontend config updated"
echo "4. ✅ Dependencies listed in requirements.txt"

echo ""
echo "🔧 Backend deployment steps:"
echo "1. Go to https://render.com"
echo "2. Create new Web Service"
echo "3. Connect your GitHub repository"
echo "4. Set these environment variables:"
echo "   - GOOGLE_API_KEY: your_actual_api_key"
echo "   - FLASK_ENV: production"
echo "5. Root directory: backend"
echo "6. Build command: pip install -r requirements.txt"
echo "7. Start command: gunicorn app:app"

echo ""
echo "🌐 Frontend deployment options:"
echo "Option 1 - Netlify:"
echo "1. Go to https://netlify.com"
echo "2. Connect GitHub repository"
echo "3. Deploy from root directory"
echo "4. No build command needed"

echo ""
echo "Option 2 - Vercel:"
echo "1. Go to https://vercel.com"
echo "2. Connect GitHub repository"
echo "3. Deploy from root directory"
echo "4. Framework: Other"

echo ""
echo "📝 After deployment:"
echo "1. Update config.js with your backend URL"
echo "2. Test the application"
echo "3. Check logs for any issues"

echo ""
echo "✅ Ready for deployment!"
echo "📖 See DEPLOYMENT_GUIDE.md for detailed instructions"
