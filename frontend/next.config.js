const path = require('path');
const webpack = require('webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@fairtest/sui-integration',
    '@fairtest/ens-integration',
    '@fairtest/yellow-integration',
    '@fairtest/identity',
    '@fairtest/core',
  ],
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/'),
    };
    config.resolve.alias = {
      ...config.resolve.alias,
      '@mysten/sui': path.join(path.resolve(__dirname, '..'), 'packages/sui-integration/node_modules/@mysten/sui'),
      'node:crypto': require.resolve('crypto-browserify'),
    };
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:crypto$/, require.resolve('crypto-browserify'))
    );
    config.externals = config.externals || [];
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ['@mysten/sui'],
  },
};

module.exports = nextConfig;
