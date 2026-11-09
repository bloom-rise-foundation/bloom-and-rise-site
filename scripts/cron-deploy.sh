#!/usr/bin/env bash
set -e

# Change directory to the root of the project
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT"

# Cron runs with a restricted PATH, so ensure node, npm, and pm2 are in PATH
export PATH="$PATH:/usr/local/bin:/usr/bin:/bin:$HOME/.local/bin:$HOME/.npm-global/bin"
if [ -d "$HOME/.nvm" ]; then
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
fi

# Fetch remote changes silently
git fetch origin main --quiet

LOCAL_COMMIT=$(git rev-parse HEAD)
REMOTE_COMMIT=$(git rev-parse origin/main)

# Only deploy if there are new changes on origin/main
if [ "$LOCAL_COMMIT" != "$REMOTE_COMMIT" ]; then
  echo "=========================================="
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] 🚀 New commit detected on main ($LOCAL_COMMIT -> $REMOTE_COMMIT)!"
  echo "Starting automatic build and deployment..."
  echo "=========================================="
  bash "$SCRIPT_DIR/deploy.sh"
fi
