module.exports = {
  deploy: {
    staging: {
      user: "ubuntu",
      host: "staging.halo-e.co",
      key: "deploy.key",
      ref: "origin/staging",
      repo: "git@github.com:epluscharging/halo-e.co.git",
      path: "/home/ubuntu/halo-e.co/",
      "post-deploy":
        "yarn && pm2 startOrRestart /home/ubuntu/halo-e.co/current/scripts/ecosystem.staging.config.js --force --update-env",
    },
  },
  apps: [
    {
      name: "staging:halo-e.co",
      namespace: "staging",
      cwd: "/home/ubuntu/halo-e.co/current",
      script: "yarn-start",
      args: "start:staging",
      time: true,
      interpreter: "bash",
    },
  ],
};
