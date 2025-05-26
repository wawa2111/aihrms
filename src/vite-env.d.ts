/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_FEATURE_AI_ASSISTANT: string
  readonly VITE_FEATURE_QR_ATTENDANCE: string
  readonly VITE_FEATURE_AI_LEAVE_MANAGEMENT: string
  readonly VITE_FEATURE_ANALYTICS: string
  readonly VITE_MALAYSIAN_HR_ASSISTANT_ENABLED: string
  readonly VITE_DEBUG: string
  readonly VITE_MAX_FILE_SIZE: string
  readonly VITE_UPLOAD_DIR: string
  readonly VITE_SERVER_PORT: string
  readonly VITE_CLIENT_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}