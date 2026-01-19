"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useI18n } from "@/lib/i18n-context"

export default function Hero() {
  const router = useRouter()
  const { lang, changeLang, t } = useI18n()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem("user")
    setIsLoggedIn(!!user)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  return (
    <section className="hero">
      <div className="nav-links">
        <div className="lang-switcher">
          <button className={`lang-btn ${lang === "uz" ? "active" : ""}`} onClick={() => changeLang("uz")}>
            UZ
          </button>
          <button className={`lang-btn ${lang === "ru" ? "active" : ""}`} onClick={() => changeLang("ru")}>
            RU
          </button>
          <button className={`lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => changeLang("en")}>
            EN
          </button>
        </div>
        <button onClick={handleLogout} className="nav-link logout-btn">
          {t("logout")}
        </button>
      </div>

      <div className="hero-background"></div>
      <div className="hero-content">
        <h1 className="hero-title">{t("welcome")}</h1>
        <p className="hero-subtitle">{t("cafe_name")}</p>
        <div className="rating">
          <span className="star">★</span>
          <span className="star">★</span>
          <span className="star">★</span>
          <span className="star">★</span>
          <span className="star">★</span>
          <span className="rating-text">{t("best_food")}</span>
        </div>
      </div>

      <div className="floating-circle circle-1"></div>
      <div className="floating-circle circle-2"></div>
      <div className="floating-circle circle-3"></div>
    </section>
  )
}
