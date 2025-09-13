#!/bin/bash

# Build script for Vercel deployment
echo "🔨 Building for Vercel deployment..."

# Create public directory if it doesn't exist
mkdir -p public

# Copy all frontend files to public directory
echo "📁 Copying frontend files to public directory..."
cp *.html *.js public/ 2>/dev/null || true
cp -r dist public/ 2>/dev/null || true

# Copy any other static assets
cp -r src public/ 2>/dev/null || true

echo "✅ Build complete! Public directory ready for Vercel."
echo "📂 Files in public directory:"
ls -la public/
