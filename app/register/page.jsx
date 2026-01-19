"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useI18n } from "@/lib/i18n-context"

export default function RegisterPage() {
  const router = useRouter()
  const { lang, changeLang, t } = useI18n()
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [deviceInfo, setDeviceInfo] = useState({
    ip_address: "",
    country: "",
    city: "",
    user_agent: "",
    language: "",
    timezone: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      router.push("/")
    }
  }, [router])

  useEffect(() => {
    const getDeviceInfo = async () => {
      const userAgent = navigator.userAgent
      const language = navigator.language || navigator.languages[0] || "Noma'lum"
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Noma'lum"

      try {
        const response = await fetch("https://ipapi.co/json/")
        const data = await response.json()
        setDeviceInfo({
          ip_address: data.ip || "Noma'lum",
          country: data.country_name || "Noma'lum",
          city: data.city || "Noma'lum",
          user_agent: userAgent,
          language: language,
          timezone: timezone,
        })
      } catch (err) {
        try {
          const ipResponse = await fetch("https://api.ipify.org?format=json")
          const ipData = await ipResponse.json()
          setDeviceInfo({
            ip_address: ipData.ip || "Noma'lum",
            country: "Noma'lum",
            city: "Noma'lum",
            user_agent: userAgent,
            language: language,
            timezone: timezone,
          })
        } catch (e) {
          setDeviceInfo({
            ip_address: "Noma'lum",
            country: "Noma'lum",
            city: "Noma'lum",
            user_agent: userAgent,
            language: language,
            timezone: timezone,
          })
        }
      }
    }
    getDeviceInfo()
  }, [])

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 9) {
      setFormData({ ...formData, phone: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      setError(t("fill_all"))
      return
    }

    if (formData.phone.length !== 9) {
      setError(t("phone_error"))
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError(t("password_mismatch"))
      return
    }

    if (formData.password.length < 6) {
      setError(t("password_short"))
      return
    }

    setLoading(true)

    try {
      const userData = {
        email: formData.email,
        phone: "+998" + formData.phone,
        password: formData.password,
        ip_address: deviceInfo.ip_address,
        country: deviceInfo.country,
        city: deviceInfo.city,
        user_agent: deviceInfo.user_agent,
        language: deviceInfo.language,
        timezone: deviceInfo.timezone,
        failed_login_attempts: 0,
        last_login: new Date().toISOString(),
        created_at: new Date().toISOString(),
      }

      const response = await fetch("https://1018e4241f998afd.mokky.dev/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      if (response.ok) {
        const newUser = await response.json()
        const userWithPassword = { ...newUser, password: formData.password }
        localStorage.setItem("user", JSON.stringify(userWithPassword))

        // Save passwords separately for login verification
        const savedPasswords = JSON.parse(localStorage.getItem("user_passwords") || "{}")
        savedPasswords[formData.email.toLowerCase().trim()] = formData.password
        localStorage.setItem("user_passwords", JSON.stringify(savedPasswords))

        router.push("/")
      } else {
        setError(t("register_error"))
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

        <h1 className="auth-title">{t("register")}</h1>

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
            <label>{t("phone_number")}</label>
            <div className="phone-input-wrapper">
              <span className="phone-prefix">+998</span>
              <input
                type="text"
                placeholder="901234567"
                value={formData.phone}
                onChange={handlePhoneChange}
                maxLength={9}
              />
            </div>
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

          <div className="form-group">
            <label>{t("confirm_password")}</label>
            <input
              type="password"
              placeholder="******"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? t("loading") : t("register")}
          </button>
        </form>

        <p className="auth-link">
          {t("have_account")} <Link href="/login">{t("login")}</Link>
        </p>
      </div>
    </div>
  )
}
