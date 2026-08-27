# ⚡ AboutPikachu - 个人介绍网站项目

> 一个俏皮可爱、简约大气、科技高级的个人品牌展示项目

[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)
[![Hono](https://img.shields.io/badge/Hono-Framework-FF6600?style=flat-square)](https://hono.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

## 📦 项目包含

### 1. GitHub 个人主页 README
- 🌟 精美的个人介绍（支持作为 GitHub Profile README）
- 📊 GitHub 统计卡片（Stars、语言分布、连续提交）
- 🐍 动态贡献图蛇形动画
- 🎯 技术栈展示
- 🚀 项目展示

### 2. Cloudflare Worker 个人网站
- 🏠 **主页** - 俏皮可爱的个人介绍（带皮卡丘 Logo）
- 📄 **简历页** (`/resume`) - 在线查看简历
- 📥 **PDF 下载** (`/resume.pdf`) - 下载 PDF 简历
- 🔑 **密钥下载** (`/gpg.key`, `/ssh.key`) - 公钥文件下载

## 🎨 设计风格

- **俏皮可爱**: 皮卡丘 Logo 浮动动画、emoji 装饰、友好的交互
- **简约大气**: 清晰的信息层级、大标题、充足的留白
- **科技高级**: 深色赛博朋克配色、发光效果、流畅动画

### 配色方案
```css
背景层级: #05070C → #0A0D12 → #0F131C → #161D2B → #1E2636
主色调: #38BDF8 (青蓝色)
辅助色: #E9A568 (暖橙色)
```

## 🚀 快速开始

### 安装依赖
```bash
cd worker
npm install
```

### 本地开发
```bash
npm run dev
```

访问 `http://localhost:8787`

### 部署到 Cloudflare
```bash
npm run deploy
```

## 📁 项目结构

```
AboutPikachu/
├── README.md                    # GitHub 个人主页
├── GUIDE.md                     # 详细使用指南
├── .github/workflows/
│   └── snake.yml               # 贡献图动画生成
├── images/
│   └── pika.jpg                # Logo/头像
├── mykeys/
│   ├── gpg.key                 # GPG 公钥
│   └── ssh.key                 # SSH 公钥
├── resume/
│   ├── resume.html             # 简历 HTML
│   ├── resume.md               # 简历 Markdown
│   └── resume.pdf              # 简历 PDF
└── worker/                      # Cloudflare Worker 项目
    ├── src/
    │   ├── index.ts            # 路由入口
    │   └── pages/
    │       ├── home.ts         # 主页
    │       ├── resume.ts       # 简历页
    │       └── keys.ts         # 密钥下载
    ├── package.json
    ├── wrangler.toml
    └── tsconfig.json
```

## 🛠️ 技术栈

- **框架**: Hono (轻量级 Web 框架)
- **运行时**: Cloudflare Workers (Edge Computing)
- **语言**: TypeScript
- **样式**: 原生 CSS (深色主题)
- **构建**: Wrangler (Cloudflare CLI)

## 📝 自定义

1. **更新个人信息**
   - 编辑 `README.md` 中的个人信息
   - 修改 `worker/src/pages/home.ts` 中的内容

2. **替换简历**
   - 更新 `resume/resume.html`
   - 更新 `resume/resume.pdf`

3. **更换密钥**
   - 替换 `mykeys/gpg.key`
   - 替换 `mykeys/ssh.key`

4. **更换 Logo**
   - 替换 `images/pika.jpg`

详细说明请查看 [GUIDE.md](./GUIDE.md)

## 🌟 特色功能

### GitHub README 增强
- GitHub Stats 统计卡片
- Top Languages 语言分布
- GitHub Streak 连续提交记录
- 动态贡献图蛇形动画
- 技术栈徽章展示

### 主页交互
- Logo 浮动动画
- 卡片悬停发光效果
- 流畅的页面过渡
- 响应式设计（移动端友好）

### 性能优化
- Edge Computing（全球低延迟）
- 静态资源缓存
- 轻量级框架（Hono）
- 极简 CSS（无框架依赖）

## 📊 功能展示

### 主页截图
```
⚡ Pikachu.Ren
──────────────────
👋 你好，我是
Pikachu Ren
任浩龙
Backend Developer @ Tencent
──────────────────
[📄 查看简历] [💻 GitHub]
```

### 路由结构
- `/` - 主页
- `/resume` - 在线简历
- `/resume.pdf` - PDF 下载
- `/gpg.key` - GPG 公钥
- `/ssh.key` - SSH 公钥

## 🎯 适用场景

- ✅ GitHub 个人主页展示
- ✅ 个人品牌建设
- ✅ 求职简历展示
- ✅ 开源项目推广
- ✅ 技术博客入口
- ✅ 公钥文件托管

## 📄 License

MIT License

---

**Made with ⚡ and ☕ by Pikachu Ren**

[GitHub](https://github.com/PIKACHUIM) | [Blog](https://coding.pika.net.cn/) | [Website](https://pikachu.ren)
