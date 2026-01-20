/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Otimizações para reduzir uso de memória no build
  swcMinify: true,

  // Otimiza build traces
  experimental: {
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@swc/core-linux-x64-gnu',
        'node_modules/@swc/core-linux-x64-musl',
        'node_modules/@esbuild/linux-x64',
      ],
    },
  },

  // Reduz tamanho do bundle em produção
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
};

export default nextConfig;
