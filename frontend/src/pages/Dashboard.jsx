import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchServices } from '../services/serviceService';
import SearchBar from '../components/SearchBar';
import ServiceCard from '../components/ServiceCard';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

const QUICK_ACCESS = [
  { label: 'Income Tax', to: '/services/income-tax-filing' },
  { label: 'GST', to: '/services/gst-registration' },
  { label: 'Tax Documents', to: '/services/tax-document-management' },
  { label: 'Tax Calendar', to: '/tax-calendar' },
  { label: 'FAQs', to: '/faqs' },
  { label: 'Safety Guide', to: '/safety' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [services, setServices] = useState([]);
  const [status, setStatus] = useState('loading');

  const loadServices = () => {
    setStatus('loading');
    fetchServices(search)
      .then((res) => {
        setServices(res.data.services);
        setStatus('success');
      })
      .catch(() => setStatus('error'));
  };

  useEffect(() => {
    const timeout = setTimeout(loadServices, 250);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className="container section">
      <h1>Welcome, {user?.name}</h1>
      <p className="text-muted">Search for a tax service or jump straight to a common task below.</p>

      <div style={{ maxWidth: 480 }} className="mt-4">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      <div className="grid grid-4 mt-5">
        {QUICK_ACCESS.map((q) => (
          <Link key={q.label} to={q.to} className="card text-center" style={{ textDecoration: 'none' }}>
            <span style={{ fontWeight: 600, color: 'var(--color-navy-900)' }}>{q.label}</span>
          </Link>
        ))}
      </div>

      <h2 className="mt-6">{search ? `Results for "${search}"` : 'All Tax Services'}</h2>

      {status === 'loading' && <LoadingState label="Loading services..." />}
      {status === 'error' && <ErrorState onRetry={loadServices} />}
      {status === 'success' && (
        services.length ? (
          <div className="grid grid-3 mt-4">
            {services.map((s) => <ServiceCard key={s.id} service={s} />)}
          </div>
        ) : (
          <div className="alert alert-info mt-4">No services matched your search. Try a different keyword.</div>
        )
      )}
    </div>
  );
}
