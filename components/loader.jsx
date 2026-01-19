"use client"

import { useState, useEffect } from "react"

export default function Loader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (!loading) return null

  return (
    <div id="loader" style={{ opacity: loading ? 1 : 0 }}>
      <div className="eclipse"></div>
    </div>
  )
}
