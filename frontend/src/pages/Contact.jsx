import React from 'react';
import ContactForm from '../components/ContactForm';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  return (
    <div className="container section">
      <h1>{t('contact.title')}</h1>
      <p className="text-muted">{t('contact.subtitle')}</p>
      <div style={{ maxWidth: 560 }} className="mt-4">
        <ContactForm />
      </div>
    </div>
  );
}
