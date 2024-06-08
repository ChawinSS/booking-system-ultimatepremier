import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'images.unsplash.com', 'plus.unsplash.com'],
  },
};

export default nextConfig;
