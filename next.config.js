/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    remotePatterns:[{
      protocol: 'https',
      hostname: 'firebasestorage.googleapis.com'
    },{
      protocol: 'https',
      hostname: 'storage.googleapis.com'
    }
  ]
  }
}

module.exports = nextConfig
