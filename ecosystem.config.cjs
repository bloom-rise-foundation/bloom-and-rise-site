module.exports = {
  apps: [
    {
      name: "bloom",
      script: "node_modules/next/dist/bin/next",
      interpreter: "node",
      args: "start -p 3000",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
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
