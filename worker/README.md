# ⚡ Pikachu Ren - Personal Portfolio Worker

基于 Hono + Cloudflare Workers 构建的个人介绍网站。

## 🚀 功能特性

- **主页** (`/`) - 俏皮可爱、简约大气的个人介绍页面
- **简历** (`/resume`) - 在线查看简历
- **PDF 下载** (`/resume.pdf`) - 下载 PDF 格式简历
- **密钥下载** (`/gpg.key`, `/ssh.key`) - 下载公钥文件

## 🛠️ 技术栈

- **框架**: Hono (轻量级 Web 框架)
- **运行时**: Cloudflare Workers
- **语言**: TypeScript
- **样式**: 原生 CSS (深色主题 + 赛博风格)

## 📦 安装依赖

```bash
npm install
```

## 🔧 本地开发

```bash
npm run dev
```

访问 `http://localhost:8787` 查看效果。

## 🚀 部署

```bash
npm run deploy
```

部署到 Cloudflare Workers。

## 📁 项目结构

```
worker/
├── src/
│   ├── index.ts           # 主入口
│   └── pages/
│       ├── home.ts        # 主页
│       ├── resume.ts      # 简历页
│       └── keys.ts        # 密钥下载
├── wrangler.toml          # Cloudflare 配置
├── package.json
└── tsconfig.json
```

## 🎨 设计风格

- **配色**: 深色科技风 (#05070C 到 #1E2636 的渐变背景)
- **主色**: 青蓝色 (#38BDF8) + 暖橙色 (#E9A568)
- **圆角**: 极致圆润 (999px pills)
- **动画**: 流畅的悬停效果和渐变动画

## 📝 自定义

1. 修改 `src/pages/home.ts` 更新主页内容
2. 修改 `src/pages/resume.ts` 更新简历内容
3. 替换 `../mykeys/` 目录下的密钥文件
4. 替换 `../resume/resume.pdf` 更新 PDF 简历

## 📄 License

MIT License - 任浩龙 (Pikachu Ren)
