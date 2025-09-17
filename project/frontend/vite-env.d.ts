/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_NODE_ENV?: string
  // เพิ่ม environment variables อื่นๆ ที่คุณจะใช้
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}