import { Context } from 'hono';
import resumePdfBuffer from '../assets/resume.pdf';
import resumeHtmlSource from '../assets/resume.html';

// 注入到简历页顶部的返回工具栏
const TOOLBAR = `<nav class="toolbar" aria-label="简历工具栏">
<a href="/" title="返回首页">🏠 首页</a>
<button type="button" title="打印或导出 PDF" onclick="window.print()">⎙ 打印</button>
<a href="/resume.pdf" title="下载 PDF" download>📥 下载 PDF</a>
</nav>`;

// 补充样式：工具栏链接样式 + 移动端响应式（源 HTML 不含这两项）
const INJECT_CSS = `.toolbar a{height:34px;padding:0 13px;border:1px solid #c8d9d7;border-radius:8px;background:#fff;color:var(--navy);font:700 13px/1 "Segoe UI","Microsoft YaHei",sans-serif;cursor:pointer;display:inline-flex;align-items:center;gap:5px;text-decoration:none}.toolbar a:hover{background:#f0f6f6}@media screen and (max-width:840px){.page{width:calc(100vw - 16px);height:auto;margin:8px auto;padding:9mm 7mm}.header{grid-template-columns:1fr;gap:4mm}.avatar-shell{width:18mm;height:18mm}.intro{grid-template-columns:1fr}.grid{grid-template-columns:1fr}.side{padding-left:0;border-left:none;margin-top:5mm}.project-matrix{grid-template-columns:1fr}.matrix-item:last-child:nth-child(odd){grid-column:auto}}`;

// 将源 HTML 适配为 worker 运行环境：
// 1. 头像路径 ../images/pika.jpg -> /images/pika.jpg
// 2. 在 <body> 后注入返回工具栏
// 3. 在 </style> 前注入补充样式（工具栏链接 + 移动端适配）
const resumeHtml = (resumeHtmlSource as string)
  .replace('src="../images/pika.jpg"', 'src="/images/pika.jpg"')
  .replace('<body>', `<body>\n\n${TOOLBAR}\n`)
  .replace('</style>', `${INJECT_CSS}</style>`);

export const resumeHTML = resumeHtml;

// PDF download — serve the bundled PDF binary directly
export const resumePDF = (c: Context) =>
  c.body(resumePdfBuffer as ArrayBuffer, 200, {
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'inline; filename="Pikachu-Ren-Resume.pdf"',
    'Cache-Control': 'public, max-age=86400',
  });
