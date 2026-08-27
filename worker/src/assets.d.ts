// 资源文件类型声明（配合 wrangler.toml 的 rules）
declare module '*.html' { const content: string; export default content; }
declare module '*.asc' { const content: string; export default content; }
declare module '*.pub' { const content: string; export default content; }
declare module '*.crt' { const content: string; export default content; }
declare module '*.key' { const content: string; export default content; }
declare module '*.pem' { const content: string; export default content; }
declare module '*.pdf' { const content: ArrayBuffer; export default content; }
declare module '*.jpg' { const content: ArrayBuffer; export default content; }
declare module '*.jpeg' { const content: ArrayBuffer; export default content; }
declare module '*.png' { const content: ArrayBuffer; export default content; }
declare module '*.webp' { const content: ArrayBuffer; export default content; }
declare module '*.svg' { const content: ArrayBuffer; export default content; }
declare module '*.ico' { const content: ArrayBuffer; export default content; }
