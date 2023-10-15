module.exports = {
  deploy: {
    staging: {
      user: "ubuntu",
      host: "staging.sol-e.co",
      key: "deploy.key",
      ref: "origin/staging",
      repo: "git@github.com:epluscharging/sol-e.co.git",
      path: "/home/ubuntu/sol-e.co/",
      "post-deploy":
        "yarn && pm2 startOrRestart /home/ubuntu/sol-e.co/current/scripts/ecosystem.staging.config.js --force --update-env",
    },
  },
  apps: [
    {
      name: "staging:sol-e.co",
      namespace: "staging",
      cwd: "/home/ubuntu/sol-e.co/current",
      script: "yarn-start",
      args: "start:staging",
      time: true,
      interpreter: "bash",
    },
  ],
};
