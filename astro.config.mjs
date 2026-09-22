import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://bohzhang.com',
  // 双语：/en/ 与 /zh/ 两套路由，默认英文（根路径重定向到 /en/）
  build: { format: 'directory' },
  compressHTML: true,
});
