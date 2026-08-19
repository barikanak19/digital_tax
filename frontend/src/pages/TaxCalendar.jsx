import React, { useEffect, useState } from 'react';
import { fetchTaxCalendar } from '../services/serviceService';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

const STATUS_LABEL = { upcoming: 'Upcoming', due_soon: 'Due Soon', past: 'Past' };
const STATUS_BADGE = { upcoming: 'badge-new', due_soon: 'badge-progress', past: 'badge-resolved' };

export default function TaxCalendar() {
  const [entries, setEntries] = useState([]);
  const [status, setStatus] = useState('loading');

  const load = () => {
    setStatus('loading');
    fetchTaxCalendar()
      .then((res) => { setEntries(res.data.entries); setStatus('success'); })
      .catch(() => setStatus('error'));
  };

  useEffect(load, []);

  return (
    <div className="container section">
      <h1>Tax Calendar & Due Dates</h1>
      <p className="text-muted">
        Track important tax-related due dates. Always verify the current due date on the official
        government portal before your deadline, as dates may change.
      </p>

      {status === 'loading' && <LoadingState label="Loading tax calendar..." />}
      {status === 'error' && <ErrorState onRetry={load} />}
      {status === 'success' && (
        entries.length ? (
          <div className="card mt-4" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--color-border)' }}>
                  <th style={{ padding: '10px 8px' }}>Tax Service</th>
                  <th style={{ padding: '10px 8px' }}>Due Date</th>
                  <th style={{ padding: '10px 8px' }}>Description</th>
                  <th style={{ padding: '10px 8px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e) => (
                  <tr key={e.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '10px 8px', fontWeight: 600 }}>{e.title}</td>
                    <td style={{ padding: '10px 8px', whiteSpace: 'nowrap' }}>{new Date(e.due_date).toLocaleDateString()}</td>
                    <td style={{ padding: '10px 8px', color: 'var(--color-text-secondary)' }}>{e.description}</td>
                    <td style={{ padding: '10px 8px' }}>
                      <span className={`badge ${STATUS_BADGE[e.status] || 'badge-new'}`}>{STATUS_LABEL[e.status] || e.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="alert alert-info mt-4">No tax calendar entries available yet.</div>
        )
      )}
    </div>
  );
}
