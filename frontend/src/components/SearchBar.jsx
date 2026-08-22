import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function SearchBar({ value, onChange, placeholder }) {
  const { t } = useLanguage();
  const ph = placeholder ?? t('common.search');
  return (
    <div className="form-group mb-0">
      <input
        type="search"
        className="form-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={ph}
        aria-label={ph}
      />
    </div>
  );
}
