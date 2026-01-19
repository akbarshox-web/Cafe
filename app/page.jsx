"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Loader from "@/components/loader"
import Hero from "@/components/hero"
import MenuSection from "@/components/menu-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function Home() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      setIsAuthenticated(true)
    } else {
      router.push("/login")
    }
    setCheckingAuth(false)
  }, [router])

  // Auth tekshirilayotganda loader ko'rsatish
  if (checkingAuth || !isAuthenticated) {
    return <Loader />
  }

  return (
    <>
      <Loader />
      <Hero />
      <MenuSection />
      <ContactSection />
      <Footer />
    </>
  )
}
