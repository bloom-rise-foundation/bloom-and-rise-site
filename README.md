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
Choose one of the two methods:

- **Option A (GitHub Actions):** Push code to `main`. The workflow in `.github/workflows/deploy.yml` will automatically SSH into your server and run `scripts/deploy.sh`. Add your `SERVER_HOST`, `SERVER_USER`, `SERVER_SSH_KEY`, and `SERVER_PROJECT_PATH` to GitHub Repository Secrets.
- **Option B (Server Webhook):** Run the webhook server via PM2:
  ```bash
  pm2 start scripts/webhook.js --name "bloom-webhook"
  ```
  Add a webhook in your GitHub repo pointing to `http://<your-server-ip>:9000/webhook`. Every time code is pushed to `main`, the script runs automatically.

