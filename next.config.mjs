/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
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
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; connect-src 'self' https://api.groq.com https://api.x.ai;"
          }
        ]
      }
    ]
  }
}

export default nextConfig
