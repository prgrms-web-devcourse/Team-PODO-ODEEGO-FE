/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // 추가
    styledComponents: true, // 추가
  },
};

module.exports = nextConfig;
