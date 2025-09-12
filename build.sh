#!/bin/bash

# CampusFlow Build Script
echo "🚀 Building CampusFlow for production..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build Tailwind CSS
echo "🎨 Building Tailwind CSS..."
npx tailwindcss -i ./src/input.css -o ./dist/output.css --minify

echo "✅ Build complete!"
echo "📁 Production files ready in dist/output.css"
echo "🌐 Open login.html to start the application"
