import { translations, projects, blogPosts } from '../i18n';

// ====== 服务端渲染 helper（默认中文，保证无 JS 也能显示内容） ======
const esc = (s: unknown) =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c as string] as string
  );

const SKILL_ICONS: Record<string, string> = {
  langs: '⌨️', frontend: '🎨', backend: '⚙️', storage: '🗄️', infra: '🐳', extra: '🧪',
};
const SKILL_ORDER = ['langs', 'frontend', 'backend', 'storage', 'infra', 'extra'];

function experienceHTML(items: ReadonlyArray<any>) {
  return items.map((item) => `
      <div class="t-item">
        <div class="t-head">
          <span class="t-role">${esc(item.role)}</span>
          <span class="t-company">· ${esc(item.company)}</span>
          <span class="t-period">${esc(item.period)}</span>
        </div>
        <div class="t-location">📍 ${esc(item.location)}</div>
        <ul class="t-list">
          ${item.highlights.map((h: string) => `<li>${esc(h)}</li>`).join('')}
        </ul>
      </div>`).join('');
}

function educationHTML(items: ReadonlyArray<any>) {
  return items.map((item) => `
      <div class="edu-card">
        <div class="t-head">
          <span class="t-role">${esc(item.school)}</span>
          <span class="t-company">· ${esc(item.degree)}</span>
          <span class="t-period">${esc(item.period)}</span>
        </div>
        <div class="edu-meta">📍 ${esc(item.location)} · ${esc(item.details)}</div>
        <div class="awards">
          ${item.awards.map((a: string) => `<span class="award-tag">🏆 ${esc(a)}</span>`).join('')}
        </div>
      </div>`).join('');
}

function projectsHTML(list: ReadonlyArray<any>) {
  return list.map((p) => `
      <a class="project-card ${p.featured ? 'featured' : ''}" href="${esc(p.url)}" target="_blank" rel="noopener">
        ${p.featured ? `<span class="featured-ribbon">⭐ 重点推荐</span>` : ''}
        <div class="project-head">
          <span class="project-name">${esc(p.name)}</span>
          <span class="project-stars">⭐ ${esc(p.stars)}</span>
        </div>
        <div class="project-desc">${esc(p.desc)}</div>
        <div class="project-meta">
          ${p.tags.map((t: string) => `<span class="tag">${esc(t)}</span>`).join('')}
        </div>
        <div class="project-foot">
          <span class="project-org">@${esc(p.org)}</span>
          <span>${esc(p.updatedAt)} →</span>
        </div>
      </a>`).join('');
}

function skillsHTML(skills: any) {
  return SKILL_ORDER.map((k) => {
    const s = skills[k];
    return `
      <div class="skill-card">
        <div class="skill-icon">${SKILL_ICONS[k]}</div>
        <div class="skill-name">${esc(s.title)}</div>
        <div class="skill-desc">${esc(s.desc)}</div>
      </div>`;
  }).join('');
}

function blogHTML(posts: ReadonlyArray<{ title: string; url: string; date: string }>) {
  return posts.map((p) => `
      <a class="blog-item" href="${esc(p.url)}" target="_blank" rel="noopener">
        <span class="blog-title">${esc(p.title)}</span>
        <span class="blog-date">${esc(p.date)}</span>
      </a>`).join('');
}

// 默认（中文）SSR 内容
const SSR = {
  experience: experienceHTML(translations.zh.experience.items),
  education: educationHTML(translations.zh.education.items),
  projects: projectsHTML(projects.zh),
  skills: skillsHTML(translations.zh.skills),
  blog: blogHTML(blogPosts.zh),
};

// 注入到页面供前端语言切换使用
const translationsJSON = JSON.stringify(translations).replace(/</g, '\\u003c');
const projectsJSON = JSON.stringify(projects).replace(/</g, '\\u003c');
const blogPostsJSON = JSON.stringify(blogPosts).replace(/</g, '\\u003c');

export const homepage = () => `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="任浩龙 (Pikachu Ren) - Backend & Client Engineer @ Tencent, OpenList 开源项目创始人">
<meta name="theme-color" content="#FFCC33">
<title>Pikachu Ren · 任浩龙</title>
<style>
/* ====== THEME: LIGHT (default) ====== */
:root,
:root[data-theme='light'] {
  --bg: #FAF7F0;
  --bg-elev: #FFFFFF;
  --bg-soft: #F2EEE3;
  --border: #E6DFD0;
  --border-strong: #D4C9B0;
  --text: #1F2328;
  --text-soft: #4A4A4A;
  --text-muted: #6F6F6F;
  --accent: #FFCC33;
  --accent-strong: #E6A800;
  --accent-soft: #FFF3CC;
  --accent-contrast: #1F2328;
  --highlight: #FFF4C2;
  --link: #B7791F;
  --shadow: 0 4px 14px rgba(31, 35, 40, 0.08);
  --shadow-lg: 0 14px 40px rgba(31, 35, 40, 0.10);
}

/* ====== THEME: DARK ====== */
:root[data-theme='dark'] {
  --bg: #0E1014;
  --bg-elev: #161A20;
  --bg-soft: #1F252D;
  --border: #2A313B;
  --border-strong: #3A4250;
  --text: #E7E5DD;
  --text-soft: #BFBBAE;
  --text-muted: #8E8A7E;
  --accent: #FFCC33;
  --accent-strong: #FFD955;
  --accent-soft: #3F3416;
  --accent-contrast: #1F2328;
  --highlight: #3F3416;
  --link: #FFD955;
  --shadow: 0 4px 14px rgba(0, 0, 0, 0.45);
  --shadow-lg: 0 14px 40px rgba(0, 0, 0, 0.55);
}

/* 浏览器默认主题跟随（未手动设置时） */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --bg: #0E1014;
    --bg-elev: #161A20;
    --bg-soft: #1F252D;
    --border: #2A313B;
    --border-strong: #3A4250;
    --text: #E7E5DD;
    --text-soft: #BFBBAE;
    --text-muted: #8E8A7E;
    --accent: #FFCC33;
    --accent-strong: #FFD955;
    --accent-soft: #3F3416;
    --accent-contrast: #1F2328;
    --highlight: #3F3416;
    --link: #FFD955;
    --shadow: 0 4px 14px rgba(0, 0, 0, 0.45);
    --shadow-lg: 0 14px 40px rgba(0, 0, 0, 0.55);
  }
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.7;
  font-size: 16px;
  transition: background 0.3s ease, color 0.3s ease;
  -webkit-font-smoothing: antialiased;
}
a { color: var(--link); text-decoration: none; }
a:hover { color: var(--accent-strong); }
img { max-width: 100%; display: block; }
.container { max-width: 980px; margin: 0 auto; padding: 0 24px; }

/* ====== NAV ====== */
.nav {
  position: sticky; top: 0; z-index: 50;
  background: color-mix(in srgb, var(--bg) 88%, transparent);
  backdrop-filter: saturate(180%) blur(16px);
  -webkit-backdrop-filter: saturate(180%) blur(16px);
  border-bottom: 1px solid var(--border);
}
.nav-inner { display: flex; align-items: center; justify-content: space-between; height: 64px; }
.brand { display: flex; align-items: center; gap: 10px; font-weight: 700; font-size: 18px; color: var(--text); text-decoration: none; }
.brand:hover { color: var(--accent-strong); text-decoration: none; }
.brand-mark {
  width: 32px; height: 32px; border-radius: 50%;
  background: var(--accent); display: inline-flex; align-items: center; justify-content: center;
  font-size: 18px; box-shadow: 0 4px 14px color-mix(in srgb, var(--accent) 40%, transparent);
  animation: bounce 3s ease-in-out infinite;
}
@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
.nav-links { display: flex; align-items: center; gap: 6px; list-style: none; }
.nav-links a { padding: 8px 12px; border-radius: 8px; color: var(--text-soft); font-size: 14px; font-weight: 500; text-decoration: none; transition: all 0.2s; }
.nav-links a:hover { background: var(--bg-soft); color: var(--text); text-decoration: none; }
.nav-controls { display: flex; align-items: center; gap: 6px; }
.icon-btn {
  min-width: 38px; height: 38px; padding: 0 10px;
  display: inline-flex; align-items: center; justify-content: center;
  background: transparent; border: 1px solid var(--border); border-radius: 10px;
  color: var(--text-soft); cursor: pointer; transition: all 0.2s;
  font-weight: 600; font-size: 13px;
}
.icon-btn:hover { background: var(--bg-soft); color: var(--text); border-color: var(--border-strong); }
.icon-btn svg { width: 18px; height: 18px; }

/* ====== HERO（头像居中） ====== */
.hero { padding: 72px 0 64px; position: relative; overflow: hidden; }
.hero::before {
  content: ''; position: absolute; top: -140px; left: 50%; transform: translateX(-50%);
  width: 520px; height: 520px; border-radius: 50%;
  background: radial-gradient(circle, var(--accent-soft) 0%, transparent 70%);
  opacity: 0.8; z-index: 0;
}
.hero-inner {
  position: relative; z-index: 1;
  display: flex; flex-direction: column; align-items: center; text-align: center;
}
.hero-avatar {
  width: 148px; height: 148px; border-radius: 50%;
  background: var(--bg-elev); border: 4px solid var(--accent);
  overflow: hidden; box-shadow: var(--shadow-lg); margin-bottom: 24px;
}
.hero-avatar img { width: 100%; height: 100%; object-fit: cover; }
.hero-text { display: flex; flex-direction: column; align-items: center; }
.hero-text .greeting { color: var(--text-muted); font-size: 16px; margin-bottom: 8px; }
.hero-text h1 { font-size: clamp(36px, 6vw, 54px); line-height: 1.1; letter-spacing: -0.02em; margin-bottom: 6px; color: var(--text); }
.hero-text .en-name {
  font-family: "JetBrains Mono", "SF Mono", "Cascadia Code", Menlo, Consolas, monospace;
  color: var(--accent-strong); font-size: 18px; font-weight: 600; margin-bottom: 16px;
}
.hero-tagline { font-size: 17px; color: var(--text-soft); margin-bottom: 14px; font-weight: 500; }
.hero-bio { font-size: 15px; color: var(--text-muted); max-width: 620px; line-height: 1.7; margin-bottom: 20px; }
.hero-badges { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 26px; justify-content: center; }
.badge {
  display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px;
  background: var(--bg-soft); border: 1px solid var(--border); border-radius: 999px;
  font-size: 13px; color: var(--text-soft); font-weight: 500;
}
.hero-ctas { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; }
.btn {
  display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px;
  border-radius: 999px; font-size: 15px; font-weight: 600; text-decoration: none;
  transition: all 0.2s; border: 1px solid transparent; cursor: pointer;
}
.btn-primary { background: var(--accent); color: var(--accent-contrast); box-shadow: 0 4px 14px color-mix(in srgb, var(--accent) 30%, transparent); }
.btn-primary:hover { background: var(--accent-strong); color: var(--accent-contrast); text-decoration: none; transform: translateY(-1px); }
.btn-ghost { background: transparent; color: var(--text); border-color: var(--border-strong); }
.btn-ghost:hover { background: var(--bg-soft); text-decoration: none; border-color: var(--accent); color: var(--text); }

/* ====== SECTION ====== */
.section { padding: 56px 0; border-top: 1px solid var(--border); }
.section-head { margin-bottom: 32px; }
.section-eyebrow {
  display: inline-block; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--accent-strong); font-weight: 700; margin-bottom: 8px;
}
.section-title { font-size: clamp(26px, 4vw, 34px); font-weight: 800; letter-spacing: -0.02em; margin-bottom: 8px; color: var(--text); }
.section-subtitle { color: var(--text-muted); font-size: 15px; }

/* ====== ABOUT ====== */
.about-prose p { margin-bottom: 16px; color: var(--text-soft); font-size: 16px; max-width: 760px; }
.about-prose strong { color: var(--text); font-weight: 600; }

/* ====== TIMELINE ====== */
.timeline { position: relative; padding-left: 24px; }
.timeline::before { content: ''; position: absolute; left: 6px; top: 8px; bottom: 8px; width: 2px; background: var(--border-strong); }
.t-item { position: relative; padding-bottom: 28px; }
.t-item:last-child { padding-bottom: 0; }
.t-item::before { content: ''; position: absolute; left: -22px; top: 8px; width: 12px; height: 12px; border-radius: 50%; background: var(--bg); border: 3px solid var(--accent); }
.t-head { display: flex; flex-wrap: wrap; gap: 8px 16px; align-items: baseline; margin-bottom: 6px; }
.t-role { font-size: 18px; font-weight: 700; color: var(--text); }
.t-company { color: var(--text-soft); font-weight: 500; }
.t-period { margin-left: auto; font-family: "JetBrains Mono", monospace; font-size: 13px; color: var(--text-muted); padding: 2px 8px; background: var(--bg-soft); border-radius: 6px; }
.t-location { font-size: 13px; color: var(--text-muted); margin-bottom: 12px; }
.t-list { list-style: none; }
.t-list li { position: relative; padding-left: 18px; margin-bottom: 8px; color: var(--text-soft); font-size: 15px; }
.t-list li::before { content: '▸'; position: absolute; left: 0; color: var(--accent-strong); font-weight: 700; }

/* ====== EDUCATION ====== */
.edu-card { background: var(--bg-elev); border: 1px solid var(--border); border-radius: 14px; padding: 24px; }
.edu-card .t-role { font-size: 20px; }
.edu-meta { color: var(--text-muted); font-size: 14px; margin-bottom: 14px; }
.awards { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
.award-tag { padding: 4px 12px; background: var(--highlight); color: var(--accent-strong); font-size: 12px; font-weight: 600; border-radius: 999px; }

/* ====== PROJECTS ====== */
.project-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 18px; }
.project-card {
  background: var(--bg-elev); border: 1px solid var(--border); border-radius: 14px;
  padding: 20px; display: flex; flex-direction: column; gap: 10px;
  transition: all 0.2s; position: relative; overflow: hidden; text-decoration: none; color: inherit;
}
.project-card:hover { border-color: var(--accent); transform: translateY(-3px); box-shadow: var(--shadow-lg); color: inherit; }
.project-card.featured { border-color: var(--accent); background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 8%, var(--bg-elev)), var(--bg-elev)); }
.featured-ribbon {
  position: absolute; top: 12px; right: 12px; background: var(--accent); color: var(--accent-contrast);
  font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 999px; letter-spacing: 0.04em;
}
.project-head { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; padding-right: 70px; }
.project-name { font-size: 18px; font-weight: 700; color: var(--text); }
.project-stars { font-size: 13px; color: var(--accent-strong); font-weight: 600; font-family: "JetBrains Mono", monospace; }
.project-desc { color: var(--text-soft); font-size: 14px; flex: 1; }
.project-meta { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
.tag { padding: 3px 9px; background: var(--bg-soft); color: var(--text-soft); font-size: 12px; font-weight: 500; border-radius: 6px; font-family: "JetBrains Mono", monospace; }
.project-foot { display: flex; align-items: center; justify-content: space-between; margin-top: 8px; padding-top: 12px; border-top: 1px dashed var(--border); font-size: 12px; color: var(--text-muted); }
.project-org { font-weight: 600; color: var(--text-soft); }

/* ====== SKILLS ====== */
.skill-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 14px; }
.skill-card { background: var(--bg-elev); border: 1px solid var(--border); border-radius: 14px; padding: 18px; transition: all 0.2s; }
.skill-card:hover { border-color: var(--border-strong); background: var(--bg-soft); }
.skill-icon { font-size: 22px; margin-bottom: 8px; }
.skill-name { font-size: 13px; font-weight: 700; color: var(--text); margin-bottom: 4px; letter-spacing: 0.06em; text-transform: uppercase; }
.skill-desc { font-size: 14px; color: var(--text-muted); line-height: 1.55; }

/* ====== BLOG ====== */
.blog-list { display: flex; flex-direction: column; }
.blog-item {
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
  padding: 14px 4px; border-bottom: 1px solid var(--border);
  text-decoration: none; color: var(--text); transition: all 0.2s;
}
.blog-item:last-child { border-bottom: none; }
.blog-item:hover { color: var(--link); padding-left: 10px; }
.blog-title { font-size: 15px; font-weight: 600; flex: 1; }
.blog-date { font-size: 13px; color: var(--text-muted); font-family: "JetBrains Mono", monospace; white-space: nowrap; }

/* ====== CONTACT ====== */
.contact-grid { max-width: 760px; }
.contact-card { background: var(--bg-elev); border: 1px solid var(--border); border-radius: 14px; padding: 24px; }
.contact-list { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 0 28px; }
.contact-list li { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid var(--border); }
.contact-list li:last-child { border-bottom: none; }
.contact-icon { width: 36px; height: 36px; display: inline-flex; align-items: center; justify-content: center; background: var(--bg-soft); border-radius: 10px; font-size: 18px; flex-shrink: 0; }
.contact-label { font-size: 12px; color: var(--text-muted); margin-bottom: 2px; }
.contact-value { font-size: 15px; color: var(--text); font-weight: 500; word-break: break-all; }
.contact-value a { color: var(--text); }
.contact-value a:hover { color: var(--link); }

/* ====== DROPDOWN (公钥) ====== */
.dropdown { position: relative; }
.dropdown-menu {
  position: absolute; right: 0; top: calc(100% + 8px); min-width: 240px;
  background: var(--bg-elev); border: 1px solid var(--border); border-radius: 12px;
  box-shadow: var(--shadow-lg); padding: 6px; z-index: 60;
  opacity: 0; visibility: hidden; transform: translateY(-6px);
  transition: all 0.18s ease;
}
.dropdown:hover .dropdown-menu, .dropdown:focus-within .dropdown-menu {
  opacity: 1; visibility: visible; transform: translateY(0);
}
.dropdown-menu a {
  display: flex; align-items: center; gap: 12px; padding: 10px 12px;
  border-radius: 8px; text-decoration: none; color: var(--text); transition: background 0.15s;
}
.dropdown-menu a:hover { background: var(--bg-soft); text-decoration: none; }
.dm-icon { width: 34px; height: 34px; display: inline-flex; align-items: center; justify-content: center; background: var(--bg-soft); border-radius: 8px; font-size: 16px; flex-shrink: 0; }
.dm-body { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.dm-body b { font-size: 14px; font-weight: 600; }
.dm-body small { font-size: 11px; color: var(--text-muted); font-family: "JetBrains Mono", monospace; }
.key-download svg { width: 14px; height: 14px; }

/* ====== FOOTER ====== */
footer { padding: 40px 0; border-top: 1px solid var(--border); color: var(--text-muted); font-size: 14px; }
.foot-inner { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; }

/* ====== RESPONSIVE ====== */
@media (max-width: 720px) {
  .hero { padding: 48px 0 40px; }
  .hero-avatar { width: 110px; height: 110px; }
  .nav-links { display: none; }
  .section { padding: 44px 0; }
  .contact-grid { grid-template-columns: 1fr; }
  .timeline { padding-left: 18px; }
  .t-period { margin-left: 0; }
  .project-grid { grid-template-columns: 1fr; }
  .skill-grid { grid-template-columns: 1fr; }
}
</style>
</head>
<body>

<nav class="nav">
  <div class="container nav-inner">
    <a href="#top" class="brand">
      <span class="brand-mark">⚡</span>
      <span>Pikachu Ren</span>
    </a>
    <ul class="nav-links">
      <li><a href="#top" data-i18n="nav.about">关于</a></li>
      <li><a href="#experience" data-i18n="nav.experience">经历</a></li>
      <li><a href="#projects" data-i18n="nav.projects">项目</a></li>
      <li><a href="#blog" data-i18n="nav.blog">博客</a></li>
      <li><a href="#skills" data-i18n="nav.skills">技能</a></li>
      <li><a href="#contact" data-i18n="nav.contact">联系</a></li>
      <li><a href="/resume" data-i18n="nav.resume">简历</a></li>
    </ul>
    <div class="nav-controls">
      <div class="dropdown">
        <button class="icon-btn" id="keys-btn" title="公开密钥" aria-label="Keys" aria-haspopup="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
        </button>
        <div class="dropdown-menu">
          <a href="/gpg.key"><span class="dm-icon">🔐</span><span class="dm-body"><b>GPG 公钥</b><small>ED25519 · 2025-2050</small></span></a>
          <a href="/ssh.key"><span class="dm-icon">🔑</span><span class="dm-body"><b>SSH 公钥</b><small>ED25519 · 2020-2030</small></span></a>
          <a href="/rootca.crt"><span class="dm-icon">📜</span><span class="dm-body"><b>Root 证书</b><small>RSA4096 · 2000-2100</small></span></a>
          <a href="/testca.crt"><span class="dm-icon">🧪</span><span class="dm-body"><b>Test 证书</b><small>RSA4096 · 2000-3000</small></span></a>
        </div>
      </div>
      <button class="icon-btn" id="lang-btn" title="Switch language" aria-label="Switch language">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
      </button>
      <button class="icon-btn" id="theme-btn" title="Toggle theme" aria-label="Toggle theme">
        <svg id="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
        <svg id="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      </button>
    </div>
  </div>
</nav>

<main id="top">

  <section class="hero">
    <div class="container">
      <div class="hero-inner">
        <div class="hero-avatar">
          <img src="/images/pika.jpg" alt="Pikachu Ren avatar" loading="eager">
        </div>
        <div class="hero-text">
          <p class="greeting" data-i18n="hero.greeting">👋 你好，我是</p>
          <h1 data-i18n="hero.name">任浩龙</h1>
          <p class="en-name" data-i18n="hero.enName">Pikachu Ren</p>
          <p class="hero-tagline" data-i18n="hero.tagline">后端开发 · 客户端开发 · 网络开发 · AI 应用开发</p>
          <p class="hero-bio" data-i18n="hero.bio">外号皮卡丘，5 年客户端/后端开发经验…</p>
          <div class="hero-badges">
            <span class="badge">🎮 <span data-i18n="hero.badges.0">Tencent · 后端开发</span></span>
            <span class="badge">⭐ <span data-i18n="hero.badges.1">OpenList · 创始人</span></span>
            <span class="badge">🌟 <span data-i18n="hero.badges.2">GitHub · 25K+ Stars</span></span>
          </div>
          <div class="hero-ctas">
            <a class="btn btn-primary" href="/resume" data-i18n="hero.cta_resume">查看简历</a>
            <a class="btn btn-ghost" href="https://github.com/PIKACHUIM" target="_blank" rel="noopener">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"/></svg>
              <span data-i18n="hero.cta_github">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="experience" class="section">
    <div class="container">
      <div class="section-head">
        <span class="section-eyebrow">Experience</span>
        <h2 class="section-title" data-i18n="experience.title">工作经历</h2>
        <p class="section-subtitle" data-i18n="experience.subtitle">一路走来的几个脚印</p>
      </div>
      <div class="timeline" id="experience-list">${SSR.experience}</div>
    </div>
  </section>

  <section id="education" class="section">
    <div class="container">
      <div class="section-head">
        <span class="section-eyebrow">Education</span>
        <h2 class="section-title" data-i18n="education.title">教育背景</h2>
        <p class="section-subtitle" data-i18n="education.subtitle">学习是一辈子的事</p>
      </div>
      <div id="education-list">${SSR.education}</div>
    </div>
  </section>

  <section id="projects" class="section">
    <div class="container">
      <div class="section-head">
        <span class="section-eyebrow">Projects</span>
        <h2 class="section-title" data-i18n="projects.title">精选项目</h2>
        <p class="section-subtitle">
          <span data-i18n="projects.subtitle">Stars 多 + 最近更新频繁</span>
          · <span data-i18n="projects.from">来自 PIKACHUIM 与 OpenListTeam 组织</span>
        </p>
      </div>
      <div class="project-grid" id="project-grid">${SSR.projects}</div>
      <p style="margin-top:18px; font-size:14px; color:var(--text-muted);">
        <a href="https://github.com/PIKACHUIM?tab=repositories&sort=stars" target="_blank" rel="noopener" data-i18n="projects.github">在 GitHub 上查看全部 →</a>
      </p>
    </div>
  </section>

  <section id="blog" class="section">
    <div class="container">
      <div class="section-head">
        <span class="section-eyebrow">Blog</span>
        <h2 class="section-title" data-i18n="blog.title">博客文章</h2>
        <p class="section-subtitle" data-i18n="blog.subtitle">来自皮卡的代码站</p>
      </div>
      <div class="blog-list" id="blog-list">${SSR.blog}</div>
      <p style="margin-top:18px; font-size:14px; color:var(--text-muted);">
        <a href="https://coding.pika.net.cn/" target="_blank" rel="noopener" data-i18n="blog.more">查看全部文章 →</a>
      </p>
    </div>
  </section>

  <section id="skills" class="section">
    <div class="container">
      <div class="section-head">
        <span class="section-eyebrow">Skills</span>
        <h2 class="section-title" data-i18n="skills.title">技术栈</h2>
        <p class="section-subtitle" data-i18n="skills.subtitle">会用 / 在用 / 想学</p>
      </div>
      <div class="skill-grid" id="skill-grid">${SSR.skills}</div>
    </div>
  </section>

  <section id="contact" class="section">
    <div class="container">
      <div class="section-head">
        <span class="section-eyebrow">Contact</span>
        <h2 class="section-title" data-i18n="contact.title">联系</h2>
        <p class="section-subtitle" data-i18n="contact.subtitle">欢迎技术交流与合作</p>
      </div>
      <div class="contact-grid">
        <div class="contact-card">
          <ul class="contact-list">
            <li>
              <span class="contact-icon">📧</span>
              <div>
                <div class="contact-label" data-i18n="contact.email">邮箱</div>
                <div class="contact-value"><a href="mailto:pikachuim@foxmail.com">pikachuim@foxmail.com</a></div>
              </div>
            </li>
            <li>
              <span class="contact-icon">💻</span>
              <div>
                <div class="contact-label" data-i18n="contact.github">GitHub</div>
                <div class="contact-value"><a href="https://github.com/PIKACHUIM" target="_blank" rel="noopener">github.com/PIKACHUIM</a></div>
              </div>
            </li>
            <li>
              <span class="contact-icon">📝</span>
              <div>
                <div class="contact-label" data-i18n="contact.blog">博客</div>
                <div class="contact-value"><a href="https://coding.pika.net.cn" target="_blank" rel="noopener">coding.pika.net.cn</a></div>
              </div>
            </li>
            <li>
              <span class="contact-icon">🐧</span>
              <div>
                <div class="contact-label">QQ</div>
                <div class="contact-value">894662978</div>
              </div>
            </li>
            <li>
              <span class="contact-icon">✈️</span>
              <div>
                <div class="contact-label">Telegram</div>
                <div class="contact-value"><a href="https://t.me/pikakapi" target="_blank" rel="noopener">@pikakapi</a></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

</main>

<footer>
  <div class="container foot-inner">
    <div>© 2024–2026 Pikachu Ren · <span data-i18n="footer.rights">版权所有</span></div>
    <div><span data-i18n="footer.made">用 ⚡ 和 ☕ 制作</span></div>
  </div>
</footer>

<script id="i18n-data" type="application/json">${translationsJSON}</script>
<script id="projects-data" type="application/json">${projectsJSON}</script>
<script id="blog-data" type="application/json">${blogPostsJSON}</script>

<script>
(function () {
  var $ = function (sel) { return document.querySelector(sel); };
  var $$ = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };

  var i18n = JSON.parse($('#i18n-data').textContent);
  var projectsData = JSON.parse($('#projects-data').textContent);
  var blogData = JSON.parse($('#blog-data').textContent);

  var STORAGE_KEYS = { theme: 'pikachu-theme', lang: 'pikachu-lang' };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function getPath(obj, path) {
    return path.split('.').reduce(function (o, k) { return o == null ? undefined : o[k]; }, obj);
  }

  function detectLang() {
    var saved = localStorage.getItem(STORAGE_KEYS.lang);
    if (saved === 'zh' || saved === 'en') return saved;
    return (navigator.language || 'zh-CN').toLowerCase().indexOf('zh') === 0 ? 'zh' : 'en';
  }

  function detectTheme() {
    var saved = localStorage.getItem(STORAGE_KEYS.theme);
    if (saved === 'light' || saved === 'dark') return saved;
    return 'auto';
  }

  function applyTheme(theme) {
    var root = document.documentElement;
    if (theme === 'auto') { root.removeAttribute('data-theme'); }
    else { root.setAttribute('data-theme', theme); }
    var isDark = theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    $('#icon-sun').style.display = isDark ? '' : 'none';
    $('#icon-moon').style.display = isDark ? 'none' : '';
  }

  function renderExperience(lang) {
    var data = i18n[lang].experience.items;
    $('#experience-list').innerHTML = data.map(function (item) {
      return '<div class="t-item">'
        + '<div class="t-head"><span class="t-role">' + esc(item.role) + '</span>'
        + '<span class="t-company">· ' + esc(item.company) + '</span>'
        + '<span class="t-period">' + esc(item.period) + '</span></div>'
        + '<div class="t-location">📍 ' + esc(item.location) + '</div>'
        + '<ul class="t-list">' + item.highlights.map(function (h) { return '<li>' + esc(h) + '</li>'; }).join('') + '</ul>'
        + '</div>';
    }).join('');
  }

  function renderEducation(lang) {
    var data = i18n[lang].education.items;
    $('#education-list').innerHTML = data.map(function (item) {
      return '<div class="edu-card">'
        + '<div class="t-head"><span class="t-role">' + esc(item.school) + '</span>'
        + '<span class="t-company">· ' + esc(item.degree) + '</span>'
        + '<span class="t-period">' + esc(item.period) + '</span></div>'
        + '<div class="edu-meta">📍 ' + esc(item.location) + ' · ' + esc(item.details) + '</div>'
        + '<div class="awards">' + item.awards.map(function (a) { return '<span class="award-tag">🏆 ' + esc(a) + '</span>'; }).join('') + '</div>'
        + '</div>';
    }).join('');
  }

  function renderProjects(lang) {
    var data = projectsData[lang];
    var featuredLabel = i18n[lang].projects.featured;
    $('#project-grid').innerHTML = data.map(function (p) {
      var ribbon = p.featured ? '<span class="featured-ribbon">⭐ ' + esc(featuredLabel) + '</span>' : '';
      return '<a class="project-card ' + (p.featured ? 'featured' : '') + '" href="' + esc(p.url) + '" target="_blank" rel="noopener">'
        + ribbon
        + '<div class="project-head"><span class="project-name">' + esc(p.name) + '</span>'
        + '<span class="project-stars">⭐ ' + esc(p.stars) + '</span></div>'
        + '<div class="project-desc">' + esc(p.desc) + '</div>'
        + '<div class="project-meta">' + p.tags.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') + '</div>'
        + '<div class="project-foot"><span class="project-org">@' + esc(p.org) + '</span><span>' + esc(p.updatedAt) + ' →</span></div>'
        + '</a>';
    }).join('');
  }

  var SKILL_ICONS = { langs: '⌨️', frontend: '🎨', backend: '⚙️', storage: '🗄️', infra: '🐳', extra: '🧪' };
  var SKILL_ORDER = ['langs', 'frontend', 'backend', 'storage', 'infra', 'extra'];

  function renderSkills(lang) {
    var data = i18n[lang].skills;
    $('#skill-grid').innerHTML = SKILL_ORDER.map(function (k) {
      var s = data[k];
      return '<div class="skill-card"><div class="skill-icon">' + SKILL_ICONS[k] + '</div>'
        + '<div class="skill-name">' + esc(s.title) + '</div>'
        + '<div class="skill-desc">' + esc(s.desc) + '</div></div>';
    }).join('');
  }

  function renderBlog(lang) {
    var data = blogData[lang];
    $('#blog-list').innerHTML = data.map(function (p) {
      return '<a class="blog-item" href="' + esc(p.url) + '" target="_blank" rel="noopener">'
        + '<span class="blog-title">' + esc(p.title) + '</span>'
        + '<span class="blog-date">' + esc(p.date) + '</span>'
        + '</a>';
    }).join('');
  }

  function applyLang(lang) {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    $$('[data-i18n]').forEach(function (el) {
      var val = getPath(i18n[lang], el.getAttribute('data-i18n'));
      if (val != null) el.textContent = val;
    });
    renderExperience(lang);
    renderEducation(lang);
    renderProjects(lang);
    renderBlog(lang);
    renderSkills(lang);
  }

  var currentLang = detectLang();
  var currentTheme = detectTheme();

  $('#lang-btn').addEventListener('click', function () {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    localStorage.setItem(STORAGE_KEYS.lang, currentLang);
    applyLang(currentLang);
  });

  $('#theme-btn').addEventListener('click', function () {
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var effective = currentTheme === 'auto' ? (prefersDark ? 'dark' : 'light') : currentTheme;
    currentTheme = effective === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEYS.theme, currentTheme);
    applyTheme(currentTheme);
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
    if (currentTheme === 'auto') applyTheme('auto');
  });

  applyTheme(currentTheme);
  applyLang(currentLang);
})();
</script>

</body>
</html>`;