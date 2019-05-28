module.exports = {
  // 从后向前执行
  presets: [
    [
      require.resolve('@babel/preset-env'),
      {
        modules: false,
        targets: {
          browsers: [
            'last 3 versions',
            'ie >= 9',
            'ie_mob >= 10',
            'ff >= 30',
            'chrome >= 34',
            'safari >= 6',
            'opera >= 12.1',
            'ios >= 6',
            'android >= 4.4',
            'bb >= 10',
            'and_uc 9.9',
          ],
        },
      },
    ],
    require.resolve('@babel/preset-react'),
    require.resolve('@babel/preset-typescript'),
  ],
  // 从前往后执行
  plugins: [
    require.resolve('react-hot-loader/babel'),
    [
      require.resolve('babel-plugin-import'),
      {
        libraryName: 'antd',
        libraryDirectory: 'lib', // default is lib
        style: true,
      },
      'antd',
    ],
    [
      require.resolve('babel-plugin-import'),
      {
        libraryName: 'lodash',
        libraryDirectory: '', // default is lib
        camel2DashComponentName: false,
      },
      'lodash',
    ],
    require.resolve('@babel/plugin-syntax-dynamic-import'),
    require.resolve('@babel/plugin-proposal-class-properties'),
    require.resolve('@babel/plugin-proposal-export-default-from'),
  ],
};
