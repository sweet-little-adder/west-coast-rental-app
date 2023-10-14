module.exports = {
  deploy: {
    production: {
      user: "ubuntu",
      host: "ssh.halo-e.co",
      key: "deploy.key",
      ref: "origin/master",
      repo: "git@github.com:epluscharging/halo-e.co.git",
      path: "/home/ubuntu/halo-e.co/",
      "post-deploy":
        "yarn && pm2 startOrRestart /home/ubuntu/halo-e.co/current/scripts/ecosystem.production.config.js --force --update-env",
    },
  },
  apps: [
    {
      name: "prod:halo-e.co",
      namespace: "prod",
      cwd: "/home/ubuntu/halo-e.co/current",
      script: "yarn-start",
      args: "start",
      time: true,
      interpreter: "bash",
    },
  ],
};
