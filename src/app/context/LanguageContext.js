"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import enTranslations from '../locales/en.json';
import esTranslations from '../locales/es.json';

const availableTranslations = {
  en: enTranslations,
  es: esTranslations,
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentTranslations, setCurrentTranslations] = useState(enTranslations);

  useEffect(() => {
    // Load saved language preference from localStorage
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && availableTranslations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
      setCurrentTranslations(availableTranslations[savedLanguage]);
    }
  }, []);

  const changeLanguage = (language) => {
    if (availableTranslations[language]) {
      setCurrentLanguage(language);
      setCurrentTranslations(availableTranslations[language]);
      localStorage.setItem('language', language);
    }
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = currentTranslations;
    
    for (const k of keys) {
      if (value[k] === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
      value = value[k];
    }
    
    return value;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 