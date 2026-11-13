/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep production builds from overwriting a running development preview.
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
};

export default nextConfig;
