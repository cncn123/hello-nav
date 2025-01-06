module.exports = {
  apps: [{
    name: "hello-nav",
    script: "pnpm",
    args: "dev",
    watch: false,
    env: {
      NODE_ENV: "development",
    }
  }]
}
