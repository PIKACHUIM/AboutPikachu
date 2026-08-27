import { Context } from 'hono';
// 直接引用 mykeys/ 目录下的密钥文件（经 wrangler "Text" 规则以字符串导入）
import gpgKeySource from '../assets/gpgkey.asc';
import sshKeySource from '../assets/sshkey.pub';
import rootCaSource from '../assets/rootca.crt';
import testCaSource from '../assets/testca.crt';

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

interface KeyMeta {
  title: string;
  icon: string;
  subtitle: string;
  filename: string;
  content: string;
}

// 密钥展示页：以文本形式在网页显示，支持一键复制 / 下载
const keyPage = ({ title, icon, subtitle, filename, content }: KeyMeta) => `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${icon} ${title} · Pikachu Ren</title>
<style>
:root{--bg:#faf7f0;--elev:#fff;--text:#1f2328;--muted:#6f6f6f;--accent:#ffcc33;--accent-strong:#e6a800;--border:#e6dfd0;--code-bg:#f4f0e6}
@media (prefers-color-scheme: dark){:root{--bg:#0e1014;--elev:#161a20;--text:#e7e5dd;--muted:#8e8a7e;--accent:#ffcc33;--accent-strong:#ffd955;--border:#2a313b;--code-bg:#1a1f27}}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;background:var(--bg);color:var(--text);line-height:1.6;-webkit-font-smoothing:antialiased}
.topbar{padding:16px 24px;border-bottom:1px solid var(--border)}
.topbar a{color:var(--muted);text-decoration:none;font-size:14px}
.topbar a:hover{color:var(--accent-strong)}
.wrap{max-width:820px;margin:0 auto;padding:40px 24px}
h1{font-size:26px;margin-bottom:8px}
.sub{color:var(--muted);font-size:14px;margin-bottom:20px}
.actions{display:flex;gap:10px;margin-bottom:16px}
.btn{padding:9px 18px;border-radius:10px;border:1px solid var(--border);background:var(--elev);color:var(--text);font-size:14px;font-weight:600;cursor:pointer;transition:all .15s}
.btn:hover{border-color:var(--accent)}
.btn.primary{background:var(--accent);color:#1f2328;border-color:var(--accent)}
.btn.primary:hover{background:var(--accent-strong)}
pre{background:var(--code-bg);border:1px solid var(--border);border-radius:12px;padding:20px;overflow-x:auto;font-family:"JetBrains Mono",Consolas,"Cascadia Code",monospace;font-size:13px;line-height:1.6;white-space:pre-wrap;word-break:break-all}
</style>
</head>
<body>
<nav class="topbar"><a href="/">← 返回首页</a></nav>
<main class="wrap">
  <h1>${icon} ${title}</h1>
  <p class="sub">${escapeHtml(subtitle)}</p>
  <div class="actions">
    <button class="btn primary" id="copy-btn" onclick="copyKey()">📋 复制</button>
    <button class="btn" onclick="downloadKey()">⬇️ 下载</button>
  </div>
  <pre id="key">${escapeHtml(content)}</pre>
</main>
<script>
var KEY_CONTENT = ${JSON.stringify(content)};
var FILENAME = ${JSON.stringify(filename)};
function copyKey() {
  var btn = document.getElementById('copy-btn');
  function done() {
    btn.textContent = '✅ 已复制';
    setTimeout(function () { btn.textContent = '📋 复制'; }, 1600);
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(KEY_CONTENT).then(done, fallback);
  } else {
    fallback();
  }
  function fallback() {
    var ta = document.createElement('textarea');
    ta.value = KEY_CONTENT;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    done();
  }
}
function downloadKey() {
  var blob = new Blob([KEY_CONTENT], { type: 'text/plain;charset=utf-8' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = FILENAME;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
}
</script>
</body>
</html>`;

const serve = (meta: KeyMeta) => (c: Context) =>
  c.html(keyPage(meta), 200, { 'Cache-Control': 'public, max-age=3600' });

export const gpgKey = serve({
  title: 'GPG 公钥',
  icon: '🔐',
  subtitle: 'Ed25519 · pikachu@protonmail.com',
  filename: 'pikachu-gpg.asc',
  content: gpgKeySource,
});

export const sshKey = serve({
  title: 'SSH 公钥',
  icon: '🔑',
  subtitle: 'RSA 2048 + ED25519 · pikachu@pikachu.ren',
  filename: 'pikachu-ssh.pub',
  content: sshKeySource,
});

export const rootCa = serve({
  title: 'Root CA 证书',
  icon: '📜',
  subtitle: 'Pikachu Root CA · RSA · PEM',
  filename: 'pikachu-rootca.crt',
  content: rootCaSource,
});

export const testCa = serve({
  title: 'Test CA 证书',
  icon: '🧪',
  subtitle: 'Pikachu Test CA · testca.pika.net.cn',
  filename: 'pikachu-testca.crt',
  content: testCaSource,
});
