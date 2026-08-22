import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { fetchServices } from '../services/serviceService';
import SearchBar from '../components/SearchBar';
import ServiceCard from '../components/ServiceCard';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [services, setServices] = useState([]);
  const [status, setStatus] = useState('loading');

  const QUICK_ACCESS = [
    { labelKey: 'dashboard.q.incomeTax', to: '/services/income-tax-filing' },
    { labelKey: 'dashboard.q.gst',       to: '/services/gst-registration' },
    { labelKey: 'dashboard.q.taxDocs',   to: '/services/tax-document-management' },
    { labelKey: 'dashboard.q.calendar',  to: '/tax-calendar' },
    { labelKey: 'dashboard.q.faqs',      to: '/faqs' },
    { labelKey: 'dashboard.q.safety',    to: '/safety' },
  ];

  const loadServices = () => {
    setStatus('loading');
    fetchServices(search)
      .then((res) => { setServices(res.data.services); setStatus('success'); })
      .catch(() => setStatus('error'));
  };

  useEffect(() => {
    const timeout = setTimeout(loadServices, 250);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className="container section">
      <h1>{t('dashboard.welcome')} {user?.name}</h1>
      <p className="text-muted">{t('dashboard.subtitle')}</p>

      <div style={{ maxWidth: 480 }} className="mt-4">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      <div className="grid grid-4 mt-5">
        {QUICK_ACCESS.map((q) => (
          <Link key={q.labelKey} to={q.to} className="card text-center" style={{ textDecoration: 'none' }}>
            <span style={{ fontWeight: 600, color: 'var(--color-navy-900)' }}>{t(q.labelKey)}</span>
          </Link>
        ))}
      </div>

      <h2 className="mt-6">
        {search ? `${t('dashboard.results')} "${search}"` : t('dashboard.allServices')}
      </h2>

      {status === 'loading' && <LoadingState label={t('dashboard.loading')} />}
      {status === 'error'   && <ErrorState onRetry={loadServices} />}
      {status === 'success' && (
        services.length
          ? <div className="grid grid-3 mt-4">{services.map((s) => <ServiceCard key={s.id} service={s} />)}</div>
          : <div className="alert alert-info mt-4">{t('dashboard.noResults')}</div>
      )}
    </div>
  );
}
