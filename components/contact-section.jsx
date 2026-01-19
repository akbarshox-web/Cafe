"use client"

import { useI18n } from "@/lib/i18n-context"

export default function ContactSection() {
  const { t } = useI18n()

  return (
    <section className="contact-section">
      <div className="container">
        <div className="contact-content">
          <div className="contact-info">
            <h2>{t("contact_us")}</h2>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <div className="contact-details">
                <h4>{t("phone")}</h4>
                <a href="tel:+998909303134">+998 90 930 31 34</a>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <div className="contact-details">
                <h4>{t("address")}</h4>
                <p>{t("address_text")}</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-clock"></i>
              <div className="contact-details">
                <h4>{t("work_hours")}</h4>
                <p>{t("work_hours_text")}</p>
              </div>
            </div>
          </div>

          <div className="map-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2119.2624366877326!2d69.59535658087333!3d41.30691263173079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae552834d479c1%3A0x9b45b73921c5996d!2sShashlyk!5e0!3m2!1sen!2s!4v1729694288184!5m2!1sen!2s"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
