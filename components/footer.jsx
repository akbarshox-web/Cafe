"use client"

import { useI18n } from "@/lib/i18n-context"

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer className="footer">
      <div className="container">
        <p>
          &copy; 2025 MARXAMAT {t("cafe_name")}. {t("rights")}
        </p>
      </div>
    </footer>
  )
}
