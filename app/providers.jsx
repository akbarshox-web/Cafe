"use client"

import { I18nProvider } from "@/lib/i18n-context"

export function Providers({ children }) {
  return <I18nProvider>{children}</I18nProvider>
}
