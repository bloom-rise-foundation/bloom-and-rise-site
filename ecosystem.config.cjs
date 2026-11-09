module.exports = {
  apps: [
    {
      name: "bloom",
      script: "npm",
      args: "start -- -p 3001",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
    },
    {
      name: "bloom-webhook",
      script: "scripts/webhook.js",
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        WEBHOOK_PORT: 9000,
        WEBHOOK_SECRET: "",
      },
    },
  ],
};
