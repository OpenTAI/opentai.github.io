import type { NextConfig } from "next";

const [repositoryOwner, repositoryName] = (process.env.GITHUB_REPOSITORY ?? "").split("/");
const isOrganizationSite =
  Boolean(repositoryOwner && repositoryName) &&
  repositoryName === `${repositoryOwner}.github.io`;
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.GITHUB_ACTIONS === "true" && repositoryName && !isOrganizationSite
    ? `/${repositoryName}`
    : "");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  devIndicators: false,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
