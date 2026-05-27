/** @type {import('next').NextConfig} */
const isGitHubActions = process.env.GITHUB_ACTIONS === "true"
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1]
const isUserOrOrgSite = repositoryName?.toLowerCase().endsWith(".github.io")
const basePath = isGitHubActions && repositoryName && !isUserOrOrgSite ? `/${repositoryName}` : ""

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: "export",
  basePath,
  assetPrefix: basePath,
}

export default nextConfig