import React, { createContext, useContext, useState, useCallback } from 'react';
import en from '../i18n/en.js';
import hi from '../i18n/hi.js';
import mr from '../i18n/mr.js';

const DICTIONARIES = { en, hi, mr };
const VALID_LOCALES = ['en', 'hi', 'mr'];
const STORAGE_KEY = 'dts_language';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return VALID_LOCALES.includes(saved) ? saved : 'en';
  });

  const setLocale = useCallback((lang) => {
    if (!VALID_LOCALES.includes(lang)) return;
    localStorage.setItem(STORAGE_KEY, lang);
    setLocaleState(lang);
  }, []);

  /** t(key) — returns translated string, falls back to English, then the key itself */
  const t = useCallback(
    (key) => {
      const dict = DICTIONARIES[locale];
      return dict[key] ?? DICTIONARIES.en[key] ?? key;
    },
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
