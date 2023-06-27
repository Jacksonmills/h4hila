/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */

await import('./src/env.mjs');
import withPWA from 'next-pwa';

/** @type {import("next").NextConfig} */

const config = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
})({
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
  images: {
    domains: [
      'i.redd.it',
      'preview.redd.it',
      'images.clerk.dev',
      'cdn.discordapp.com',
    ],
  },
});

export default config;
