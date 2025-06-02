"use client";
import React from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import styles from './languageSwitcher.module.scss';

export default function LanguageSwitcher() {
  const { currentLanguage, changeLanguage } = useLanguage();

  return (
    <div className={styles.languageSwitcher}>
      <button
        className={`${styles.languageButton} ${currentLanguage === 'en' ? styles.active : ''}`}
        onClick={() => changeLanguage('en')}
        data-cursor-hover
      >
        <span>EN</span>
      </button>
      <button
        className={`${styles.languageButton} ${currentLanguage === 'es' ? styles.active : ''}`}
        onClick={() => changeLanguage('es')}
        data-cursor-hover
        >
        <span>ES</span>
      </button>
    </div>
  );
} 