import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The areas overview page was removed; the town pages are linked from the footer.
  async redirects() {
    return [{ source: "/areas", destination: "/", permanent: true }];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
