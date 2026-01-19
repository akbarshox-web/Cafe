"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function AdminPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://1018e4241f998afd.mokky.dev/users")
        const data = await response.json()
        setUsers(data)
      } catch (err) {
        setError("Ma'lumotlarni yuklashda xatolik!")
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) {
    return (
      <div className="admin-container">
        <h1 className="admin-title">Yuklanmoqda...</h1>
      </div>
    )
  }

  return (
    <div className="admin-container">
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Link href="/" className="back-link">
          Bosh sahifaga qaytish
        </Link>
      </div>

      <h1 className="admin-title">Admin Panel - Foydalanuvchilar</h1>

      {error && (
        <div className="error-message" style={{ maxWidth: "500px", margin: "0 auto 20px" }}>
          {error}
        </div>
      )}

      {users.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>Hozircha foydalanuvchilar yo'q</p>
      ) : (
        <div className="users-grid">
          {users.map((user, index) => (
            <div key={user.id || index} className="user-card">
              <h3>Foydalanuvchi #{index + 1}</h3>
              <div className="user-info">
                <p>
                  <strong>ID:</strong> {user.id}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Telefon:</strong> {user.phone}
                </p>
                <p>
                  <strong>IP manzil:</strong> {user.ip_address || "Noma'lum"}
                </p>
                <p>
                  <strong>Mamlakat:</strong> {user.country || "Noma'lum"}
                </p>
                <p>
                  <strong>Shahar:</strong> {user.city || "Noma'lum"}
                </p>
                <p>
                  <strong>Til:</strong> {user.language || "Noma'lum"}
                </p>
                <p>
                  <strong>Timezone:</strong> {user.timezone || "Noma'lum"}
                </p>
                <p>
                  <strong>Brauzer:</strong> <span className="user-agent-text">{user.user_agent || "Noma'lum"}</span>
                </p>
                <p>
                  <strong>Noto'g'ri urinishlar:</strong>{" "}
                  <span className={user.failed_login_attempts > 3 ? "warning-text" : ""}>
                    {user.failed_login_attempts || 0}
                  </span>
                </p>
                <p>
                  <strong>Oxirgi login:</strong>{" "}
                  {user.last_login ? new Date(user.last_login).toLocaleString("uz-UZ") : "Hali kirmagan"}
                </p>
                <p>
                  <strong>Ro'yxatdan o'tgan:</strong>{" "}
                  {user.created_at ? new Date(user.created_at).toLocaleString("uz-UZ") : "Noma'lum"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <p style={{ textAlign: "center", marginTop: "30px", color: "#666" }}>
        Jami foydalanuvchilar: <strong>{users.length}</strong>
      </p>
    </div>
  )
}
