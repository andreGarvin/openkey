module.exports = {
  distDir: "build",
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/k",
        destination: "/",
        permanent: false,
      }
    ];
  },
};
