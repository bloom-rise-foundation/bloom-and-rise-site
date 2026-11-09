# Bloom & Rise Foundation site
`npm install && npm run dev`

- Copy, nav, footer, socials, steps, roles, status: `src/config/site.ts`
- Team members: `src/data/team.ts` (photos in `public/team/`)
- Colours, fonts, radii: tokens at top of `src/app/globals.css`
- Motion helpers (Reveal, SplitWords, useMouseParallax, Cycle): `src/components/motion.tsx`
- Add a page: new folder in `src/app/`, use `PageHero` + `Section`, add to `nav`/`footer`.

## Production & Auto-Deployment

### Why `npm run build` alone does not run the site
Next.js is a server-rendered / hybrid application. `npm run build` compiles production assets into `.next/`, but it **does not** start the web server. The site must be served with `npm run start` or a process manager like **PM2**.

### 1. Manual Deployment
Run the automated deployment script on your server:
```bash
npm run deploy
# or
bash scripts/deploy.sh
```

### 2. Auto-Deploy when code is pushed to `main`
Choose one of these methods:

- **Option A (GitHub Actions):** Push code to `main`. The workflow in `.github/workflows/deploy.yml` will automatically SSH into your server and run `scripts/deploy.sh`. Add your `SERVER_HOST`, `SERVER_USER`, `SERVER_SSH_KEY`, and `SERVER_PROJECT_PATH` to GitHub Repository Secrets.
- **Option B (Server Webhook):** Run the webhook server via PM2:
  ```bash
  pm2 start scripts/webhook.js --name "bloom-webhook"
  ```
  Add a webhook in your GitHub repo pointing to `http://<your-server-ip>:9000/webhook`. Every time code is pushed to `main`, the script runs automatically.

### 3. Auto-Build on `git pull origin main` (Git Hook)
If you prefer simply typing `git pull origin main` on the server:
Run this **once** on the server to enable the Git post-merge hook:
```bash
npm run setup:hooks
# or
git config core.hooksPath scripts/hooks
```
From then on, whenever you run `git pull` on the server, Git will **automatically** run `npm install`, `npm run build`, and restart PM2 for you without typing any other commands.

### 4. Auto-Deploy via Server Cron Job
If you want the server to periodically check for changes on `main` and auto-deploy whenever changes are detected:

1. Open crontab on the server:
   ```bash
   crontab -e
   ```
2. Add a line to check every 2 minutes (adjust path to your project folder):
   ```cron
   */2 * * * * bash /var/www/bloom/scripts/cron-deploy.sh >> /var/www/bloom/deploy.log 2>&1
   ```
The script will silently check GitHub. If new commits are detected on `main`, it automatically runs `scripts/deploy.sh` (pulls, builds, and reloads PM2). If nothing changed, it takes less than 0.1s and does nothing.

