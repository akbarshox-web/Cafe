"use client"

import { useState } from "react"
import { useI18n } from "@/lib/i18n-context"

export default function MenuSection() {
  const [activeMenu, setActiveMenu] = useState("liquid")
  const { t } = useI18n()

  const liquidFoods = [
    {
      name: t("qaynatma"),
      description: t("qaynatma_desc"),
      image: "/kafe/qaynatma sho'va.webp",
    },
    {
      name: t("chuchvara"),
      description: t("chuchvara_desc"),
      image: "/kafe/chuchvara.jpg",
    },
    {
      name: t("mastava"),
      description: t("mastava_desc"),
      image: "/kafe/mastava.jpg",
    },
    {
      name: t("lagmon_soup"),
      description: t("lagmon_soup_desc"),
      image: "/kafe/lag'mon sho'rva.jpeg",
    },
    {
      name: t("qazi_soup"),
      description: t("qazi_soup_desc"),
      image: "/kafe/qazi.webp",
    },
  ]

  const solidFoods = [
    {
      name: t("norin"),
      description: t("norin_desc"),
      image: "/kafe/norin.jpg",
    },
    {
      name: t("jiz"),
      description: t("jiz_desc"),
      image: "/kafe/jiz.jpg",
    },
    {
      name: t("xamirsoldi"),
      description: t("xamirsoldi_desc"),
      image: "/kafe/xamirsoldi.jpg",
    },
    {
      name: t("lagmon_fried"),
      description: t("lagmon_fried_desc"),
      image: "/kafe/lag'mon qovurma.jpg",
    },
  ]

  const kabobTypes = ["Qima", "Jaz", "Jigar", "Tovuq", "Non qima"]

  const drinks = {
    choylar: ["Choy (ko'k)", "Choy (qora)", "Limon choy"],
    gazli: [
      "Coca Cola",
      "Fanta",
      "Pepsi",
      "Sprayt",
      "Gorilla",
      "Flesh",
      "Moxito",
      "Hydrolife (Gazli)",
      "Bonaqua (Gazli)",
    ],
    gazsiz: ["Hydrolife (Gazsiz)", "Bonaqua (Gazsiz)", "Meva (Sok)", "Bliss (Sok)"],
  }

  return (
    <section className="menu-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t("menu")}</h2>
          <div className="title-line"></div>
        </div>

        <div className="menu-nav">
          <button
            className={`menu-btn ${activeMenu === "liquid" ? "active" : ""}`}
            onClick={() => setActiveMenu("liquid")}
          >
            {t("liquid_foods")}
          </button>
          <button
            className={`menu-btn ${activeMenu === "solid" ? "active" : ""}`}
            onClick={() => setActiveMenu("solid")}
          >
            {t("solid_foods")}
          </button>
          <button
            className={`menu-btn ${activeMenu === "drinks" ? "active" : ""}`}
            onClick={() => setActiveMenu("drinks")}
          >
            {t("drinks")}
          </button>
        </div>

        {activeMenu === "liquid" && (
          <div className="menu-content active">
            <div className="food-grid">
              {liquidFoods.map((food, index) => (
                <div key={index} className="food-card">
                  <div className="food-image">
                    <img src={food.image || "/placeholder.svg"} alt={food.name} />
                    <div className="overlay"></div>
                  </div>
                  <div className="food-info">
                    <h3>{food.name}</h3>
                    <p>{food.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeMenu === "solid" && (
          <div className="menu-content active">
            <div className="food-grid">
              {solidFoods.map((food, index) => (
                <div key={index} className="food-card">
                  <div className="food-image">
                    <img src={food.image || "/placeholder.svg"} alt={food.name} />
                    <div className="overlay"></div>
                  </div>
                  <div className="food-info">
                    <h3>{food.name}</h3>
                    <p>{food.description}</p>
                  </div>
                </div>
              ))}
              <div className="food-card kabob-special">
                <div className="food-image">
                  <img src="/kafe/kabob.webp" alt="Kabob" />
                  <div className="overlay"></div>
                </div>
                <div className="food-info">
                  <h3>{t("kabob")}</h3>
                  <div className="kabob-types">
                    {kabobTypes.map((type, index) => (
                      <span key={index} className="kabob-type">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeMenu === "drinks" && (
          <div className="menu-content active">
            <div className="drinks-grid">
              <div className="drink-category">
                <h3 className="category-title">
                  <span className="dot green-dot"></span>
                  {t("teas")}
                </h3>
                <ul className="drink-list">
                  {drinks.choylar.map((drink, index) => (
                    <li key={index}>{drink}</li>
                  ))}
                </ul>
              </div>

              <div className="drink-category">
                <h3 className="category-title">
                  <span className="dot blue-dot"></span>
                  {t("carbonated")}
                </h3>
                <ul className="drink-list">
                  {drinks.gazli.map((drink, index) => (
                    <li key={index}>{drink}</li>
                  ))}
                </ul>
              </div>

              <div className="drink-category">
                <h3 className="category-title">
                  <span className="dot purple-dot"></span>
                  {t("non_carbonated")}
                </h3>
                <ul className="drink-list">
                  {drinks.gazsiz.map((drink, index) => (
                    <li key={index}>{drink}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
