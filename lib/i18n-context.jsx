"use client"

import { createContext, useContext, useState, useEffect } from "react"

const translations = {
  uz: {
    // Hero
    welcome: '"MARXAMAT"',
    cafe_name: "Qo'zi Kabob Kafesi",
    best_food: "Eng mazali taomlar",
    logout: "Chiqish",

    // Menu
    menu: "Menyu",
    liquid_foods: "Suyuq Ovqatlar",
    solid_foods: "Quyuq Ovqatlar",
    drinks: "Ichimliklar",
    teas: "Choylar",
    carbonated: "Gazli Ichimliklar",
    non_carbonated: "Gazsiz Ichimliklar",

    // Food descriptions
    qaynatma: "Qaynatma sho'rva",
    qaynatma_desc: "An'anaviy o'zbek sho'rvasi",
    chuchvara: "Chuchvara",
    chuchvara_desc: "Mazali go'shtli chuchvara",
    mastava: "Mastava",
    mastava_desc: "Guruch va go'shtli sho'rva",
    lagmon_soup: "Lag'mon (sho'rva)",
    lagmon_soup_desc: "Xamir va sabzavotli sho'rva",
    qazi_soup: "Qazi sho'rva",
    qazi_soup_desc: "Maxsus qazili sho'rva",
    norin: "Norin",
    norin_desc: "An'anaviy o'zbek taomi",
    jiz: "Jiz",
    jiz_desc: "Maxsus tayyorlangan jiz",
    xamirsoldi: "Xamirsoldi (Shilpildoq)",
    xamirsoldi_desc: "Xamir va go'shtli taom",
    lagmon_fried: "Lag'mon (Qovurma)",
    lagmon_fried_desc: "Qovurilgan lag'mon",
    kabob: "Kabob",

    // Contact
    contact_us: "Biz bilan bog'lanish",
    phone: "Telefon",
    address: "Manzil",
    address_text: "8x4 Vt+3r, Qoraqalpoq, Toshkent viloyati",
    work_hours: "Ish vaqti",
    work_hours_text: "Har kuni: 08:00 - 23:00",

    // Footer
    rights: "Barcha huquqlar himoyalangan.",

    // Auth
    login: "Kirish",
    register: "Ro'yxatdan o'tish",
    email: "Email",
    password: "Parol",
    confirm_password: "Parolni tasdiqlang",
    phone_number: "Telefon raqami",
    loading: "Yuklanmoqda...",
    no_account: "Hisobingiz yo'qmi?",
    have_account: "Hisobingiz bormi?",
    fill_all: "Barcha maydonlarni to'ldiring!",
    phone_error: "Telefon raqami 9 ta raqamdan iborat bo'lishi kerak!",
    password_mismatch: "Parollar mos kelmaydi!",
    password_short: "Parol kamida 6 ta belgidan iborat bo'lishi kerak!",
    register_error: "Ro'yxatdan o'tishda xatolik yuz berdi!",
    server_error: "Server bilan bog'lanishda xatolik!",
    wrong_password: "Parol noto'g'ri!",
    wrong_attempts: "marta noto'g'ri urinish",
    user_not_found: "Bunday foydalanuvchi topilmadi!",
  },
  ru: {
    // Hero
    welcome: '"ДОБРО ПОЖАЛОВАТЬ"',
    cafe_name: "Кафе Кози Кабоб",
    best_food: "Самые вкусные блюда",
    logout: "Выход",

    // Menu
    menu: "Меню",
    liquid_foods: "Жидкие блюда",
    solid_foods: "Вторые блюда",
    drinks: "Напитки",
    teas: "Чаи",
    carbonated: "Газированные напитки",
    non_carbonated: "Негазированные напитки",

    // Food descriptions
    qaynatma: "Кайнатма шурпа",
    qaynatma_desc: "Традиционный узбекский суп",
    chuchvara: "Чучвара",
    chuchvara_desc: "Вкусные пельмени с мясом",
    mastava: "Мастава",
    mastava_desc: "Суп с рисом и мясом",
    lagmon_soup: "Лагман (суп)",
    lagmon_soup_desc: "Суп с лапшой и овощами",
    qazi_soup: "Казы шурпа",
    qazi_soup_desc: "Особый суп с казы",
    norin: "Норин",
    norin_desc: "Традиционное узбекское блюдо",
    jiz: "Жиз",
    jiz_desc: "Специально приготовленный жиз",
    xamirsoldi: "Хамирсолди (Шилпилдок)",
    xamirsoldi_desc: "Блюдо из теста с мясом",
    lagmon_fried: "Лагман (жареный)",
    lagmon_fried_desc: "Жареный лагман",
    kabob: "Кабоб",

    // Contact
    contact_us: "Связаться с нами",
    phone: "Телефон",
    address: "Адрес",
    address_text: "8x4 Vt+3r, Каракалпак, Ташкентская область",
    work_hours: "Часы работы",
    work_hours_text: "Ежедневно: 08:00 - 23:00",

    // Footer
    rights: "Все права защищены.",

    // Auth
    login: "Вход",
    register: "Регистрация",
    email: "Эл. почта",
    password: "Пароль",
    confirm_password: "Подтвердите пароль",
    phone_number: "Номер телефона",
    loading: "Загрузка...",
    no_account: "Нет аккаунта?",
    have_account: "Уже есть аккаунт?",
    fill_all: "Заполните все поля!",
    phone_error: "Номер телефона должен состоять из 9 цифр!",
    password_mismatch: "Пароли не совпадают!",
    password_short: "Пароль должен содержать минимум 6 символов!",
    register_error: "Ошибка при регистрации!",
    server_error: "Ошибка связи с сервером!",
    wrong_password: "Неверный пароль!",
    wrong_attempts: "неверных попыток",
    user_not_found: "Пользователь не найден!",
  },
  en: {
    // Hero
    welcome: '"WELCOME"',
    cafe_name: "Qozi Kabob Cafe",
    best_food: "The most delicious dishes",
    logout: "Logout",

    // Menu
    menu: "Menu",
    liquid_foods: "Soups",
    solid_foods: "Main Dishes",
    drinks: "Drinks",
    teas: "Teas",
    carbonated: "Carbonated Drinks",
    non_carbonated: "Non-carbonated Drinks",

    // Food descriptions
    qaynatma: "Qaynatma Soup",
    qaynatma_desc: "Traditional Uzbek soup",
    chuchvara: "Chuchvara",
    chuchvara_desc: "Delicious meat dumplings",
    mastava: "Mastava",
    mastava_desc: "Rice and meat soup",
    lagmon_soup: "Lagman (soup)",
    lagmon_soup_desc: "Noodle and vegetable soup",
    qazi_soup: "Qazi Soup",
    qazi_soup_desc: "Special qazi soup",
    norin: "Norin",
    norin_desc: "Traditional Uzbek dish",
    jiz: "Jiz",
    jiz_desc: "Specially prepared jiz",
    xamirsoldi: "Xamirsoldi (Shilpildoq)",
    xamirsoldi_desc: "Dough and meat dish",
    lagmon_fried: "Lagman (Fried)",
    lagmon_fried_desc: "Fried lagman",
    kabob: "Kabob",

    // Contact
    contact_us: "Contact Us",
    phone: "Phone",
    address: "Address",
    address_text: "8x4 Vt+3r, Qoraqalpoq, Tashkent region",
    work_hours: "Working Hours",
    work_hours_text: "Daily: 08:00 - 23:00",

    // Footer
    rights: "All rights reserved.",

    // Auth
    login: "Login",
    register: "Register",
    email: "Email",
    password: "Password",
    confirm_password: "Confirm Password",
    phone_number: "Phone Number",
    loading: "Loading...",
    no_account: "Don't have an account?",
    have_account: "Already have an account?",
    fill_all: "Please fill all fields!",
    phone_error: "Phone number must be 9 digits!",
    password_mismatch: "Passwords do not match!",
    password_short: "Password must be at least 6 characters!",
    register_error: "Registration error!",
    server_error: "Server connection error!",
    wrong_password: "Wrong password!",
    wrong_attempts: "failed attempts",
    user_not_found: "User not found!",
  },
}

const I18nContext = createContext()

export function I18nProvider({ children }) {
  const [lang, setLang] = useState("uz")

  useEffect(() => {
    const savedLang = localStorage.getItem("lang")
    if (savedLang && (savedLang === "uz" || savedLang === "ru" || savedLang === "en")) {
      setLang(savedLang)
    }
  }, [])

  const changeLang = (newLang) => {
    setLang(newLang)
    localStorage.setItem("lang", newLang)
  }

  const t = (key) => {
    return translations[lang][key] || key
  }

  return <I18nContext.Provider value={{ lang, changeLang, t }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider")
  }
  return context
}
