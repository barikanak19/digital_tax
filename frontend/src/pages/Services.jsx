import React, { useEffect, useState } from 'react';
import { fetchServices } from '../services/serviceService';
import { useLanguage } from '../context/LanguageContext';
import SearchBar from '../components/SearchBar';
import ServiceCard from '../components/ServiceCard';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

export default function Services() {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [services, setServices] = useState([]);
  const [status, setStatus] = useState('loading');

  const load = () => {
    setStatus('loading');
    fetchServices(search)
      .then((res) => { setServices(res.data.services); setStatus('success'); })
      .catch(() => setStatus('error'));
  };

  useEffect(() => {
    const timeout = setTimeout(load, 250);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className="container section">
      <h1>{t('services.title')}</h1>
      <p className="text-muted">{t('services.subtitle')}</p>

      <div style={{ maxWidth: 480 }} className="mt-3 mb-5">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {status === 'loading' && <LoadingState label={t('services.loading')} />}
      {status === 'error'   && <ErrorState onRetry={load} />}
      {status === 'success' && (
        services.length
          ? <div className="grid grid-3">{services.map((s) => <ServiceCard key={s.id} service={s} />)}</div>
          : <div className="alert alert-info">{t('services.noResults')}</div>
      )}
    </div>
  );
}
