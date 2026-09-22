# bohzhang-site

个人网站 —— https://bohzhang.com

## 技术栈

- **Astro 5** —— 默认零 JS，页面静态输出；只有需要交互的地方才带脚本
- **无框架依赖** —— 首屏动效用原生 Canvas 手写，不引第三方动画库
- **双语** —— `/en/` 与 `/zh/` 两套路由，默认英文，右上角一键切换且**停在同一页**

## 开发

```bash
npm install      # 首次
npm run dev      # http://localhost:4321
npm run build    # 产出 dist/
```

## 目录

```
src/
  i18n/ui.ts          双语文案字典 + 路径工具
  layouts/Base.astro  页面骨架（含导航与语言切换）
  components/         Hero（Canvas 动效）等
  pages/en/  pages/zh/  两套语言路由
  pages/index.astro   根路径 → /en/
```

## 部署

计划托管到 Cloudflare Pages（域名已在 Cloudflare Registrar）。
