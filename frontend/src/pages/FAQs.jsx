import React, { useEffect, useState } from 'react';
import { fetchAllFaqs } from '../services/serviceService';
import { useLanguage } from '../context/LanguageContext';
import FAQAccordion from '../components/FAQAccordion';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

export default function FAQs() {
  const { t } = useLanguage();
  const [faqs, setFaqs] = useState([]);
  const [status, setStatus] = useState('loading');
  const [activeCategory, setActiveCategory] = useState('All');

  // DB category values stay as-is; we map them to translated labels for display
  const CATEGORIES = [
    { value: 'All',         labelKey: 'faqs.cat.all' },
    { value: 'Income Tax',  labelKey: 'faqs.cat.incomeTax' },
    { value: 'GST',         labelKey: 'faqs.cat.gst' },
    { value: 'TDS',         labelKey: 'faqs.cat.tds' },
    { value: 'Payments',    labelKey: 'faqs.cat.payments' },
    { value: 'Documents',   labelKey: 'faqs.cat.documents' },
    { value: 'Safety',      labelKey: 'faqs.cat.safety' },
  ];

  const load = () => {
    setStatus('loading');
    fetchAllFaqs()
      .then((res) => { setFaqs(res.data.faqs); setStatus('success'); })
      .catch(() => setStatus('error'));
  };

  useEffect(load, []);

  const filtered = activeCategory === 'All' ? faqs : faqs.filter((f) => f.category === activeCategory);

  return (
    <div className="container section">
      <h1>{t('faqs.title')}</h1>
      <p className="text-muted">{t('faqs.subtitle')}</p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }} className="mt-3 mb-5">
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            className={`btn btn-sm ${activeCategory === c.value ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveCategory(c.value)}
            type="button"
          >
            {t(c.labelKey)}
          </button>
        ))}
      </div>

      {status === 'loading' && <LoadingState label={t('faqs.loading')} />}
      {status === 'error'   && <ErrorState onRetry={load} />}
      {status === 'success' && <FAQAccordion faqs={filtered} />}
    </div>
  );
}
