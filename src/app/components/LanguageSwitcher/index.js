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
        <span lang='en'>EN</span>
      </button>
      <button
        className={`${styles.languageButton} ${currentLanguage === 'it' ? styles.active : ''}`}
        onClick={() => changeLanguage('it')}
        data-cursor-hover
      >
        <span lang='it'>IT</span>
      </button>
      <button
        className={`${styles.languageButton} ${currentLanguage === 'he' ? styles.active : ''}`}
        onClick={() => changeLanguage('he')}
        data-cursor-hover
      >
        <span lang='he'>HE</span>
      </button>
    </div>
  );
} 