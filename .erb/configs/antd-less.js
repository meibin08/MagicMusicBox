/*
 * @authors :Bin Mei
 * @date    :2018-03-29
 * @description：css 编译 浏览器兼容
 */
import path from 'path';
import webpackPaths from './webpack.paths';

const customTheme = path.resolve(
  webpackPaths.srcPath,
  'style/antd-custom-theme.less'
);
const antdLess = {
  test: /\.less$/,
  // exclude: /node_modules/,
  use: [
    'style-loader',
    'css-loader',
    {
      loader: 'less-loader',
      options: {
        lessOptions: {
          modifyVars: {
            hack: `true;@import "${customTheme}";`,
          },
          javascriptEnabled: true,
        },
      },
    },
  ],
};
export default antdLess;
