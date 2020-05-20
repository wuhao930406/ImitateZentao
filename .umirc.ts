import { defineConfig } from 'umi';
import initialRouter from './config/router.config';
let { NODE_ENV, APP_TYPE, TEST, npm_config_argv } = process.env;
let allOk = JSON.parse(npm_config_argv).original,
  allStr = allOk[allOk.length - 1];
let IpAndPort = '';

if (allStr.indexOf('9000') != -1) {
  IpAndPort = 'http://172.21.3.124:8081/';
}

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dva: {
    skipModelValidate: true,
    immer: true,
  },
  antd: {
    dark: false,
    compact: false,
  },
  title: '南高项目管理云平台',
  theme: {
    'primary-color': '#1DA57A',
    'font-size-base': '16px',
  },
  routes: initialRouter,
  proxy: {
    '/zentao/': {
      target: IpAndPort,
      changeOrigin: true,
      pathRewrite: { '^/zentao': '' },
    },
  },
});
