import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Safety() {
  const { t } = useLanguage();

  const TOPICS = [
    { titleKey: 'safety.t1.title', descKey: 'safety.t1.desc' },
    { titleKey: 'safety.t2.title', descKey: 'safety.t2.desc' },
    { titleKey: 'safety.t3.title', descKey: 'safety.t3.desc' },
    { titleKey: 'safety.t4.title', descKey: 'safety.t4.desc' },
    { titleKey: 'safety.t5.title', descKey: 'safety.t5.desc' },
    { titleKey: 'safety.t6.title', descKey: 'safety.t6.desc' },
    { titleKey: 'safety.t7.title', descKey: 'safety.t7.desc' },
    { titleKey: 'safety.t8.title', descKey: 'safety.t8.desc' },
  ];

  return (
    <div className="container section">
      <h1>{t('safety.title')}</h1>
      <p className="text-muted">{t('safety.subtitle')}</p>

      <div className="grid grid-2 mt-5">
        {TOPICS.map((topic) => (
          <div key={topic.titleKey} className="card">
            <h3>{t(topic.titleKey)}</h3>
            <p className="mb-0">{t(topic.descKey)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
