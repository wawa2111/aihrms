/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_FEATURE_AI_ASSISTANT: string
  readonly VITE_FEATURE_QR_ATTENDANCE: string
  readonly VITE_FEATURE_AI_LEAVE_MANAGEMENT: string
  readonly VITE_FEATURE_ANALYTICS: string
  readonly VITE_MALAYSIAN_HR_ASSISTANT_ENABLED: string
  readonly VITE_DEBUG: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}