const basePath = process.env.NEXT_PUBLIC_BASE_PATH
  ? process.env.NEXT_PUBLIC_BASE_PATH.startsWith("/")
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : `/${process.env.NEXT_PUBLIC_BASE_PATH}`
  : "";

module.exports = {
  basePath: basePath,
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.tina.io",
        port: "",
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  transpilePackages: ["antd", "@ant-design", "rc-util", "rc-pagination", "rc-picker", "rc-notification", "rc-tooltip", "rc-tree", "rc-table"],
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
    ];
  }
};
