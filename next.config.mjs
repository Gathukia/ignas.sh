/** @type {import('next').NextConfig} */
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

const nextConfig = {
    webpack: (config, { isServer }) => {
      if (isServer) {
        import('./lib/mdxParse.mjs')
          .then((module) => {
            if (typeof module.generateStaticData === 'function') {
              module.generateStaticData();
            } else {
              console.error('generateStaticData function not found in mdxParse.js');
            }
          })
          .catch((err) => console.error('Error loading mdxParse:', err));
      }
      return config;
    },
  };

  if (process.env.NODE_ENV === 'development') {
    await setupDevPlatform();
  }
  
  export default nextConfig;
  
  
  
