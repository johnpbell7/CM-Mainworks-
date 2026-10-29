import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The areas overview page was removed; the town pages are linked from the footer.
  async redirects() {
    return [
      { source: "/areas", destination: "/", permanent: true },
      // Renovations lists every trade, so the separate services list went (John, 29 Oct)
      { source: "/services", destination: "/renovations", permanent: true },
      // Building work became its own Extensions page in the renovation rework
      { source: "/services/building", destination: "/services/extensions", permanent: true },
      // The villages around Lichfield are covered on the Lichfield page
      { source: "/areas/fradley", destination: "/areas/lichfield", permanent: true },
      { source: "/areas/shenstone", destination: "/areas/lichfield", permanent: true },
      { source: "/areas/whittington", destination: "/areas/lichfield", permanent: true },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
