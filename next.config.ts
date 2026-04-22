import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
	turbopack: {
      root: '.', // This forces Turbopack to stay within the current folder
    },
};

export default withNextIntl(nextConfig);
