const http = require("http");
const crypto = require("crypto");
const { exec } = require("child_process");
const path = require("path");

const PORT = process.env.WEBHOOK_PORT || 9000;
const SECRET = process.env.WEBHOOK_SECRET || "";
const SCRIPT_PATH = path.join(__dirname, "deploy.sh");

let isDeploying = false;

function verifySignature(payload, signature) {
  if (!SECRET) return true; // Secret verification skipped if not configured
  if (!signature) return false;
  const hmac = crypto.createHmac("sha256", SECRET);
  const digest = `sha256=${hmac.update(payload).digest("hex")}`;
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
}

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/webhook") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const signature = req.headers["x-hub-signature-256"];

      if (!verifySignature(body, signature)) {
        res.writeHead(401, { "Content-Type": "text/plain" });
        return res.end("Invalid webhook signature.");
      }

      let payload;
      try {
        payload = JSON.parse(body);
      } catch (err) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        return res.end("Invalid JSON payload.");
      }

      // Check if the push event is on the main branch
      if (payload.ref === "refs/heads/main") {
        if (isDeploying) {
          res.writeHead(429, { "Content-Type": "text/plain" });
          return res.end("Deployment already in progress.");
        }

        isDeploying = true;
        console.log(`[${new Date().toISOString()}] Push event detected on 'main'. Running deploy script...`);

        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Deployment triggered successfully.");

        exec(`bash "${SCRIPT_PATH}"`, (error, stdout, stderr) => {
          isDeploying = false;
          if (error) {
            console.error(`[${new Date().toISOString()}] Deployment failed:`, error);
            console.error(stderr);
            return;
          }
          console.log(`[${new Date().toISOString()}] Deployment finished:\n`, stdout);
        });
      } else {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(`Ignored push on ref: ${payload.ref}`);
      }
    });
  } else if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Webhook listener is active.");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Webhook server listening on http://0.0.0.0:${PORT}/webhook`);
  console.log(`Target deploy script: ${SCRIPT_PATH}`);
});

