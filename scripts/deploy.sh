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

# 3. Build Next.js application
echo "🏗️  3. Building Next.js production bundle..."
npm run build

# 4. Restart or Start application process
echo "🔄 4. Restarting application server..."
if command -v pm2 >/dev/null 2>&1; then
    if pm2 list | grep -q "bloom"; then
        echo "♻️ Reloading PM2 process 'bloom'..."
        pm2 reload bloom --update-env || pm2 restart bloom --update-env
    else
        echo "▶️ Starting new PM2 process with ecosystem.config.cjs..."
        pm2 start ecosystem.config.cjs
    fi
    pm2 save
    echo "✅ PM2 process restarted successfully!"
else
    echo "⚠️ PM2 is not installed globally."
    echo "To keep the site running in the background, install PM2: npm install -g pm2"
    echo "Or start the site manually with: npm run start"
fi

echo "=========================================="
echo "🎉 Deployment finished successfully!"
echo "Site is running and served on port 3000."
echo "=========================================="

