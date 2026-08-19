import React, { useEffect, useState } from 'react';
import { fetchAllFaqs } from '../services/serviceService';
import FAQAccordion from '../components/FAQAccordion';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

const CATEGORIES = ['All', 'Income Tax', 'GST', 'TDS', 'Payments', 'Documents', 'Safety'];

export default function FAQs() {
  const [faqs, setFaqs] = useState([]);
  const [status, setStatus] = useState('loading');
  const [activeCategory, setActiveCategory] = useState('All');

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
      <h1>Tax FAQs & Help</h1>
      <p className="text-muted">Common questions from small business owners about digital tax processes.</p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }} className="mt-3 mb-5">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`btn btn-sm ${activeCategory === c ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveCategory(c)}
            type="button"
          >
            {c}
          </button>
        ))}
      </div>

      {status === 'loading' && <LoadingState label="Loading FAQs..." />}
      {status === 'error' && <ErrorState onRetry={load} />}
      {status === 'success' && <FAQAccordion faqs={filtered} />}
    </div>
  );
}
