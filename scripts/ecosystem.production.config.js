module.exports = {
  deploy: {
    production: {
      user: "ubuntu",
      host: "ssh.sol-e.co",
      key: "deploy.key",
      ref: "origin/master",
      repo: "git@github.com:epluscharging/sol-e.co.git",
      path: "/home/ubuntu/sol-e.co/",
      "post-deploy":
        "yarn && pm2 startOrRestart /home/ubuntu/sol-e.co/current/scripts/ecosystem.production.config.js --force --update-env",
    },
  },
  apps: [
    {
      name: "prod:sol-e.co",
      namespace: "prod",
      cwd: "/home/ubuntu/sol-e.co/current",
      script: "yarn-start",
      args: "start",
      time: true,
      interpreter: "bash",
    },
  ],
};
