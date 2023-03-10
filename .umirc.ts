import { defineConfig } from "umi";

export default defineConfig({
  title: "OpenTAI",
  routes: [
    { path: "/", component: "index" },
  ],
  npmClient: 'yarn',
  lessLoader: {
    modifyVars: {
      // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
      'hack': `true; @import "~@/common.less";`
    }
  },
  metas: [
    {
      name: 'viewport',
      content: 'width=device-width,initial-scale=1',
    }
  ],
  links: [{ rel: 'icon', href: '/favicon.ico' }],
  plugins: [
    '@umijs/plugins/dist/locale'
  ],
  locale: {
    default: 'zh-CN',
    baseNavigator: true,
  },
});
