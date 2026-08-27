# 🌟 使用指南

## 1️⃣ GitHub 个人主页

将根目录的 `README.md` 上传到你的 GitHub 个人主页仓库（仓库名必须与用户名相同，如 `PIKACHUIM/PIKACHUIM`）。

### 设置步骤：

1. 创建与用户名同名的仓库：`https://github.com/PIKACHUIM/PIKACHUIM`
2. 将 `README.md` 推送到该仓库
3. GitHub 会自动在你的个人主页显示此 README

### 生成贡献图蛇动画：

已包含 GitHub Actions 配置（`.github/workflows/snake.yml`），会自动生成贡献图动画。需要：

1. 在仓库 Settings → Actions → General 中启用 Actions
2. 在 Settings → Actions → General → Workflow permissions 选择 "Read and write permissions"
3. 每天自动运行生成蛇动画

## 2️⃣ Cloudflare Worker 网站

### 安装依赖：

```bash
cd worker
npm install
```

### 本地开发：

```bash
npm run dev
```

访问 `http://localhost:8787` 查看效果：
- `/` - 主页（俏皮可爱的个人介绍）
- `/resume` - 在线简历
- `/resume.pdf` - 下载 PDF
- `/gpg.key` - 下载 GPG 公钥
- `/ssh.key` - 下载 SSH 公钥

### 部署到 Cloudflare：

```bash
npm run deploy
```

首次部署需要登录 Cloudflare 账号。

### 绑定自定义域名：

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 Workers & Pages → 你的 Worker → Settings → Triggers
3. 添加自定义域名（如 `pikachu.ren`）

## 3️⃣ 自定义内容

### 更新个人信息：

1. **主页** - 编辑 `worker/src/pages/home.ts`
2. **简历** - 替换 `resume/resume.html` 和 `resume/resume.pdf`
3. **密钥** - 替换 `mykeys/gpg.key` 和 `mykeys/ssh.key`

### 更新 GitHub README：

编辑根目录 `README.md`，修改：
- 个人简介
- 项目列表
- 联系方式
- GitHub 用户名（所有 `PIKACHUIM` 替换为你的用户名）

## 4️⃣ 目录结构

```
AboutPikachu/
├── README.md                    # GitHub 个人主页
├── .github/workflows/
│   └── snake.yml               # 贡献图动画
├── images/
│   └── pika.jpg                # 头像/Logo
├── mykeys/
│   ├── gpg.key                 # GPG 公钥
│   └── ssh.key                 # SSH 公钥
├── resume/
│   ├── resume.html             # 简历 HTML
│   ├── resume.md               # 简历 Markdown
│   └── resume.pdf              # 简历 PDF
└── worker/                      # Cloudflare Worker 项目
    ├── src/
    │   ├── index.ts            # 入口
    │   └── pages/
    │       ├── home.ts         # 主页
    │       ├── resume.ts       # 简历
    │       └── keys.ts         # 密钥下载
    ├── package.json
    ├── wrangler.toml           # Cloudflare 配置
    └── tsconfig.json
```

## 5️⃣ 设计特色

### 主页风格：
- ⚡ **俏皮可爱**：皮卡丘 Logo 浮动动画、emoji 装饰
- 🎨 **简约大气**：深色背景、大标题、清晰布局
- 🔮 **科技高级**：赛博朋克配色、发光效果、流畅动画

### 配色方案：
- 背景层级：`#05070C` → `#0A0D12` → `#0F131C` → `#161D2B` → `#1E2636`
- 主色调：青蓝色 `#38BDF8`（科技感）
- 辅助色：暖橙色 `#E9A568`（温暖感）

### 交互体验：
- 悬停卡片上浮 + 发光
- 按钮点击反馈
- 流畅的页面过渡
- 响应式设计（移动端友好）

## 6️⃣ 常见问题

### Q: 如何更换主题色？
A: 编辑 `worker/src/pages/home.ts`，修改 CSS 变量：
```css
:root {
  --accent: #38BDF8;  /* 主色调 */
  --accent-warm: #E9A568;  /* 辅助色 */
}
```

### Q: 如何添加新页面？
A: 
1. 在 `worker/src/pages/` 创建新文件
2. 在 `worker/src/index.ts` 添加路由
3. 重新部署

### Q: PDF 下载不工作？
A: 确保 `resume/resume.pdf` 文件存在，Worker 使用 Bun.file 读取文件。

### Q: 密钥文件显示 404？
A: 检查 `mykeys/` 目录下的密钥文件是否存在，或在 `worker/src/pages/keys.ts` 中更新备用内容。

## 7️⃣ 进阶优化

### 添加 Analytics：
在 `wrangler.toml` 添加：
```toml
[env.production]
route = "pikachu.ren/*"
```

### 启用缓存：
在路由处理器中添加：
```typescript
return c.html(homepage(), 200, {
  'Cache-Control': 'public, max-age=3600'
});
```

### 添加 SEO：
在 HTML `<head>` 中添加：
```html
<meta name="description" content="Pikachu Ren 的个人网站">
<meta property="og:title" content="Pikachu Ren">
<meta property="og:image" content="/logo.png">
```

## 🎉 完成

现在你拥有：
✅ 精美的 GitHub 个人主页（带动态贡献图）  
✅ 现代化的个人网站（Cloudflare Workers）  
✅ 在线简历 + PDF 下载  
✅ 公钥文件托管  

祝你的个人品牌建设顺利！🚀
