const dev = {
  assetsPublicPath: '/',
  assetsSubDirectory: 'static',
  port: 5000, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
  errorOverlay: true,
  hot: true,
  poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
  proxyTable: {},
  useEslint: false,
  showEslintErrorsInOverlay: false,
  before: function(app) {},
  after: function(app) {},
};

const build = {
  assetsPublicPath: '/', // output.publicPath
  assetsSubDirectory: 'static', // 资源目录
  assetsRoot: 'dist', // 打包目录
  productionSourceMap: false, // sourcemap css + js
  bundleAnalyzerReport: false, // webpack-bundle-analyzer 是否启用
};

module.exports = {
  entry: 'test/index.jsx',
  srcPath: ['test', 'src'],
  appHtml: 'test/index.html',
  cssModules: false,
  resolveExtensions: ['.js', '.jsx', '.scss'],
  resolveAlias: {
    '@': 'src',
  },
  dev,
  build,
};
