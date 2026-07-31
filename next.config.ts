import type { NextConfig } from "next";

const isGitHubPagesBuild = process.env.GITHUB_PAGES_BUILD === "1";

const nextConfig: NextConfig = isGitHubPagesBuild
  ? {
      // GitHub Pages can serve only static files. `next build` writes the
      // complete deployable site to `out/`. The normal vinext build does not
      // receive this option and remains Sites/Cloudflare-compatible.
      output: "export",
      trailingSlash: true,
    }
  : {};

export default nextConfig;
