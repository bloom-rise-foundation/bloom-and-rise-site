#!/usr/bin/env bash
set -e

# Change directory to the root of the project
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT"

echo "=========================================="
echo "🚀 [$(date '+%Y-%m-%d %H:%M:%S')] Deploying Bloom & Rise"
echo "=========================================="

# 1. Pull latest code from main branch
echo "📥 1. Pulling latest code from origin/main..."
git fetch origin main
git checkout main
git reset --hard origin/main

# 2. Install dependencies
echo "📦 2. Installing dependencies..."
npm install

# 3. Clean old build & build Next.js application
echo "🧹 3. Cleaning old build cache..."
rm -rf .next

echo "🏗️  4. Building Next.js production bundle..."
npm run build

# 4. Restart or Start application process
echo "🔄 5. Restarting application server..."
if command -v pm2 >/dev/null 2>&1; then
    echo "♻️ Restarting PM2 process 'bloom'..."
    pm2 delete bloom-and-rise 2>/dev/null || true
    pm2 delete bloom 2>/dev/null || true
    # Free port 3001 if anything is hanging
    fuser -k 3001/tcp 2>/dev/null || true
    pm2 start ecosystem.config.cjs --only bloom
    pm2 save
    echo "✅ PM2 process started successfully!"
else
    echo "⚠️ PM2 is not installed globally."
    echo "To keep the site running in the background, install PM2: npm install -g pm2"
    echo "Or start the site manually with: PORT=3001 npm run start"
fi

# Reload Nginx if possible to clear proxy cache
if command -v nginx >/dev/null 2>&1; then
    nginx -s reload 2>/dev/null || systemctl reload nginx 2>/dev/null || true
fi

echo "=========================================="
echo "🎉 Deployment finished successfully!"
echo "Site is running and served on port 3001."
echo "=========================================="
