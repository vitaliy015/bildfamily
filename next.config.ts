import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The service and cost pages were folded into /services as blocks. These URLs
  // were live and listed in sitemap.xml, so they redirect to the right anchor
  // rather than 404 for anyone — or anything — that already has them.
  async redirects() {
    return [
      { source: "/bathroom-renovation-cost-calgary", destination: "/services#prices", permanent: true },
      { source: "/services/full-bathroom-remodel", destination: "/services#full-bathroom-remodel", permanent: true },
      { source: "/services/ensuite-renovation", destination: "/services#ensuite-renovation", permanent: true },
      { source: "/services/tile-and-shower", destination: "/services#tile-and-shower", permanent: true },
    ];
  },
};

export default nextConfig;
