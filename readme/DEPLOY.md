# 🚀 部署步骤

## 快速开始

```bash
# 1. 进入 worker 目录
cd worker

# 2. 安装依赖
npm install

# 3. 本地测试
npm run dev
# 访问 http://localhost:8787

# 4. 部署到 Cloudflare
npm run deploy
```

## 部署清单

### ✅ 已完成
- [x] 创建 Hono Worker 项目
- [x] 实现主页（俏皮可爱 + 科技风格）
- [x] 实现简历页面
- [x] PDF/密钥下载功能
- [x] GitHub Profile README
- [x] 贡献图动画配置
- [x] 响应式设计
- [x] 完整项目文档

### 📝 部署前检查

1. **更新个人信息**
   - [ ] `README.md` - 更新 GitHub 用户名、联系方式
   - [ ] `worker/src/pages/home.ts` - 更新主页内容
   - [ ] `worker/src/pages/resume.ts` - 确认简历内容

2. **准备资源文件**
   - [ ] `mykeys/gpg.key` - 添加你的 GPG 公钥
   - [ ] `mykeys/ssh.key` - 添加你的 SSH 公钥
   - [ ] `resume/resume.pdf` - 确保 PDF 文件存在
   - [ ] `images/pika.jpg` - 准备 Logo/头像

3. **配置 Cloudflare**
   - [ ] 注册 Cloudflare 账号
   - [ ] 安装 Wrangler CLI: `npm install -g wrangler`
   - [ ] 登录: `wrangler login`
   - [ ] 部署: `npm run deploy`

4. **配置 GitHub**
   - [ ] 创建 `PIKACHUIM/PIKACHUIM` 仓库（用户名需相同）
   - [ ] 推送 `README.md` 到该仓库
   - [ ] 启用 GitHub Actions（贡献图动画）
   - [ ] 设置 Actions 权限为 "Read and write"

### 🔧 自定义配置

#### 修改 Worker 名称
编辑 `worker/wrangler.toml`:
```toml
name = "你的项目名"
```

#### 绑定自定义域名
1. Cloudflare Dashboard → Workers → 你的 Worker
2. Triggers → Custom Domains
3. 添加域名（如 `pikachu.ren`）

#### 启用分析
在 `wrangler.toml` 添加:
```toml
[observability]
enabled = true
```

## 📊 预览效果

### 主页特色
- ⚡ 浮动的皮卡丘 Logo
- 🎨 深色赛博朋克配色
- ✨ 发光悬停效果
- 📱 移动端友好

### GitHub Profile
- 📈 实时统计卡片
- 🐍 动态贡献图动画
- 🏆 成就展示
- 💼 项目展示

## 🎉 完成后的访问路径

- 🌐 **主页**: `https://你的域名.workers.dev`
- 📄 **简历**: `https://你的域名.workers.dev/resume`
- 📥 **PDF**: `https://你的域名.workers.dev/resume.pdf`
- 🔑 **GPG**: `https://你的域名.workers.dev/gpg.key`
- 🔑 **SSH**: `https://你的域名.workers.dev/ssh.key`
- 👤 **GitHub**: `https://github.com/你的用户名`

## 💡 提示

1. **首次部署**需要在浏览器中授权 Cloudflare
2. Worker 名称必须全局唯一
3. 免费版 Cloudflare Workers 限制：
   - 每天 100,000 次请求
   - 无流量费用
   - 全球 CDN 加速

4. GitHub Actions 需要设置正确的权限才能生成贡献图

## 🐛 常见问题

**Q: 部署失败？**
A: 检查 Wrangler 是否已登录：`wrangler whoami`

**Q: PDF 下载 404？**
A: 确保 `resume/resume.pdf` 文件存在

**Q: GitHub README 不显示？**
A: 仓库名必须与用户名完全一致

**Q: 贡献图动画不生成？**
A: 检查 Actions 权限设置和 GITHUB_TOKEN

## 📞 需要帮助？

- 📖 查看 [GUIDE.md](./GUIDE.md) 详细指南
- 💬 提交 Issue
- 📧 联系作者

---

祝部署顺利！🚀
