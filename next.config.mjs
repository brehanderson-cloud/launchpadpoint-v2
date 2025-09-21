/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Simple Monaco Editor blocking
    config.resolve.alias = {
      ...config.resolve.alias,
      'monaco-editor': false,
      '@monaco-editor/react': false,
    }
    
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'monaco-editor': false,
        fs: false,
        path: false,
        crypto: false,
      }
    }
    
    return config
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://vercel.com;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https: blob:;
              font-src 'self' data:;
              connect-src 'self' https://api.groq.com https://api.x.ai https://vercel.live https://vercel.com;
              media-src 'self';
              object-src 'none';
              base-uri 'self';
              form-action 'self';
              frame-ancestors 'none';
            `.replace(/\s+/g, ' ').trim()
          }
        ]
      }
    ]
  }
}

export default nextConfig
