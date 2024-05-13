// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   webpack(config, options) {
//     config.module.rules.push({
//       test: /\.(png|jpe?g|gif|woff|woff2|eot|ttf|svg)$/i,
//       use: [
//         {
//           loader: 'file-loader',
//           options: {
//             publicPath: '/_next',
//             name: 'static/fonts/[name].[hash].[ext]',
//           },
//         },
//       ],
//     });

//     return config;
//   },
// };

// export default nextConfig;
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   webpack(config, options) {
//     config.module.rules.push({
//       test: /\.(png|jpe?g|gif|woff|woff2|eot|ttf|svg)$/i,
//       use: [
//         {
//           loader: 'file-loader',
//           options: {
//             publicPath: '/_next',
//             name: 'static/fonts/[name].[hash].[ext]',
//           },
//         },
//       ],
//     });

//     return config;
//   },
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['www.hpix.co.kr', 'simage.conranshop.kr', 'hpix.co.kr'],
  },
  compiler: {
    styledComponents: true,
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
    scrollRestoration: false,
  },
  // async headers() { // CORS
  //   return [
  //     {
  //       source: '/:path*',
  //       headers: [
  //         { key: "Access-Control-Allow-Credentials", value: "true" },
  //         { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
  //         { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
  //         { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
  //       ]
  //     }
  //   ]
  // },
  // async rewrites () {
  //   return [
  //     {
  //       source: "/:path*",
  //       destination: "https://www.fashionbiz.co.kr/api/graphql/:path*",
  //     },
  //   ];
  // },

  // redirects: () => {
  //   return [
  //     {
  //       // source: '/article/view.asp\\/\\?/g/:id',
  //       // source: '/article/view.asp\\/\\?idx/g\\=/:id',
  //       source: '/article/view.asp/:id',
  //       destination: '/:id',
  //       has: [
  //         { type: 'query', key: 'idx' }
  //       ],
  //       permanent: true,
  //     },
  //     { // Naver 해결
  //       source: '/TN/:id',
  //       destination: '/:id',
  //       permanent: true,
  //       has: [
  //         { type: 'query', key: 'idx' }
  //       ],
  //     },
  //   ]
  // },
  webpack: (config) => {
    // 기존 URL 파일로더 규칙
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

    // 기존 파일로더에 새로 추가한 `@svgr/webpack` 규칙을 추가합니다
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        // 후에 설명할 리소스 쿼리입니다.
        resourceQuery: { not: /components/ },
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: /components/,
        use: ['@svgr/webpack'],
      }
    );
    return config;
  },
};

export default nextConfig;

// http://localhost:3000/TN/?cate=2&recom=2&idx=207107
// http://localhost:3000/article/view.asp?idx=207210
