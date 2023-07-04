/** @satisfies {import('@webcontainer/api').FileSystemTree} */

// export const files = {
//     'index.js': {
//       file: {
//         contents: `
// import express from 'express';
// const app = express();
// const port = 3111;

// app.get('/', (req, res) => {
//     res.send('Welcome to a WebContainers app! 🥳');
// });

// app.listen(port, () => {
//     console.log(\`App is live at http://localhost:\${port}\`);
// });`,
//       },
//     },
//     'package.json': {
//       file: {
//         contents: `
//           {
//             "name": "example-app",
//             "type": "module",
//             "dependencies": {
//               "express": "latest",
//               "nodemon": "latest"
//             },
//             "scripts": {
//               "start": "nodemon index.js"
//             }
//           }`,
//       },
//     },
//   };

export const NEXTJS_TEMPLATE = {
  files: {
    '/app/layout.jsx': {
      code: `'use client'
  export default function Layout({ children }) {
  return <div>{children}</div>
  }`,
    },
    '/app/page.jsx': {
      code: `'use client'
  export default function Home() {
  return (
    <div>
      <h1>Hello Nextjs</h1>
    </div>
  );
  }
  `,
    },
    '/next.config.js': {
      code: `/** @type {import('next').NextConfig} */
  const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  }
  
  module.exports = nextConfig
  `,
    },
    '/package.json': {
      code: JSON.stringify({
        name: 'my-app',
        version: '0.1.0',
        private: true,
        scripts: {
          dev: 'next dev',
          build: 'next build',
          start: 'next start',
          lint: 'next lint',
        },
        dependencies: {
          next: '13.4.6', // @todo: update to the latest version
          react: '18.2.0',
          'react-dom': '18.2.0',
          '@next/swc-wasm-nodejs': '12.1.6',
        },
      }),
    },
  },
  main: '/app/page.jsx',
  environment: 'node',
};

export const files = {
  app: {
    directory: {
      'page.jsx': {
        file: {
          contents: `export default function Home() {
    return (
        <div>
            <h1>Helloaa Nextjs</h1>
        </div>
    );
}
          `,
        },
      },
      'layout.jsx': {
        file: {
          contents: `
export default function Layout({ children }) {
  return <html>
  <head />
  <body>{children}</body>
</html>
}`,
        },
      },
    },
  },
  'next.config.js': {
    file: {
      contents: `/** @type {import('next').NextConfig} */
      const nextConfig = {
      reactStrictMode: true,
      swcMinify: true,
      }
      
      module.exports = nextConfig
      `,
    },
  },
  'package.json': {
    file: {
      contents: JSON.stringify({
        name: 'my-app1',
        version: '0.1.0',
        private: true,
        scripts: {
          dev: 'next dev',
          build: 'next build',
          start: 'next start',
          lint: 'next lint',
        },
        dependencies: {
          next: '13.4.6', // @todo: update to the latest version
          react: '18.2.0',
          'react-dom': '18.2.0',
          '@next/swc-wasm-nodejs': '12.1.6',
        },
      }),
    },
  },
};
