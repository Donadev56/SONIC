module.exports = {
  apps: [
    {
      name: "sonic",
      script: "npx",
      args: "next start",
      env: {
        PORT: 4001,
      },
    },
  ],
};
