/** @type {import('next').NextConfig} */
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
  
  export default nextConfig;
  
  
  
