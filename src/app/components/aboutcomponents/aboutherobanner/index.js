"use client";
import React from 'react'
import styles from "./aboutherobanner.module.scss"
import { useLanguage } from "@/app/context/LanguageContext";

export default function Aboutherobanner() {
    const { t } = useLanguage();
  return (
    <div className={styles.aboutherobannermain}>
      <div className="container">
        <div className={styles.aboutherobanner}>
            <div className={styles.aboutherobannertitle}>
                <h1>
                    <p>360°</p>
                    <p>APPROCH</p>
                </h1>
            </div>
            <div className={styles.scrolldown} data-cursor-hover onClick={() => window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
              })}>
              <p>{t('heroBanner.scrollDown')}</p>
            </div>
        </div>
      </div>
    </div>
  )
}
