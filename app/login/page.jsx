"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useI18n } from "@/lib/i18n-context"

export default function LoginPage() {
  const router = useRouter()
  const { lang, changeLang, t } = useI18n()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      router.push("/")
    }
  }, [router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!formData.email || !formData.password) {
      setError(t("fill_all"))
      return
    }

    setLoading(true)

    try {
      const response = await fetch("https://1018e4241f998afd.mokky.dev/users")
      const users = await response.json()

      const user = users.find((u) => {
        return u.email && u.email.toLowerCase().trim() === formData.email.toLowerCase().trim()
      })

      if (user) {
        const savedPasswords = JSON.parse(localStorage.getItem("user_passwords") || "{}")
        const savedPassword = savedPasswords[formData.email.toLowerCase().trim()]

        if (savedPassword && savedPassword === formData.password) {
          const updatedUser = {
            ...user,
            last_login: new Date().toISOString(),
            failed_login_attempts: 0,
          }

          await fetch(`https://1018e4241f998afd.mokky.dev/users/${user.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              last_login: updatedUser.last_login,
              failed_login_attempts: 0,
            }),
          })

          localStorage.setItem("user", JSON.stringify(updatedUser))
          router.push("/")
        } else {
          const newFailedAttempts = (user.failed_login_attempts || 0) + 1

          await fetch(`https://1018e4241f998afd.mokky.dev/users/${user.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              failed_login_attempts: newFailedAttempts,
            }),
          })

          setError(`${t("wrong_password")} (${newFailedAttempts} ${t("wrong_attempts")})`)
        }
      } else {
        setError(t("user_not_found"))
      }
    } catch (err) {
      setError(t("server_error"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-lang-switcher">
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

        <h1 className="auth-title">{t("login")}</h1>

        {error && <div className="error-message">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t("email")}</label>
            <input
              type="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>{t("password")}</label>
            <input
              type="password"
              placeholder="******"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? t("loading") : t("login")}
          </button>
        </form>

        <p className="auth-link">
          {t("no_account")} <Link href="/register">{t("register")}</Link>
        </p>
      </div>
    </div>
  )
}
