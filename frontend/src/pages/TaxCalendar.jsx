import React, { useEffect, useState } from 'react';
import { fetchTaxCalendar } from '../services/serviceService';
import { useLanguage } from '../context/LanguageContext';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

export default function TaxCalendar() {
  const { t } = useLanguage();
  const [entries, setEntries] = useState([]);
  const [status, setStatus] = useState('loading');

  const STATUS_BADGE = { upcoming: 'badge-new', due_soon: 'badge-progress', past: 'badge-resolved' };

  const load = () => {
    setStatus('loading');
    fetchTaxCalendar()
      .then((res) => { setEntries(res.data.entries); setStatus('success'); })
      .catch(() => setStatus('error'));
  };

  useEffect(load, []);

  return (
    <div className="container section">
      <h1>{t('calendar.title')}</h1>
      <p className="text-muted">{t('calendar.subtitle')}</p>

      {status === 'loading' && <LoadingState label={t('calendar.loading')} />}
      {status === 'error'   && <ErrorState onRetry={load} />}
      {status === 'success' && (
        entries.length ? (
          <div className="card mt-4" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--color-border)' }}>
                  <th style={{ padding: '10px 8px' }}>{t('calendar.col.service')}</th>
                  <th style={{ padding: '10px 8px' }}>{t('calendar.col.dueDate')}</th>
                  <th style={{ padding: '10px 8px' }}>{t('calendar.col.desc')}</th>
                  <th style={{ padding: '10px 8px' }}>{t('calendar.col.status')}</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e) => (
                  <tr key={e.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '10px 8px', fontWeight: 600 }}>{e.title}</td>
                    <td style={{ padding: '10px 8px', whiteSpace: 'nowrap' }}>{new Date(e.due_date).toLocaleDateString()}</td>
                    <td style={{ padding: '10px 8px', color: 'var(--color-text-secondary)' }}>{e.description}</td>
                    <td style={{ padding: '10px 8px' }}>
                      <span className={`badge ${STATUS_BADGE[e.status] || 'badge-new'}`}>
                        {t(`calendar.status.${e.status}`) || e.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="alert alert-info mt-4">{t('calendar.noData')}</div>
        )
      )}
    </div>
  );
}
