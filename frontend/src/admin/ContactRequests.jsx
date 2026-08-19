import React, { useEffect, useState } from 'react';
import { fetchContactRequestsAdmin, updateContactRequestStatusAdmin } from '../services/adminService';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

const STATUS_OPTIONS = ['new', 'in_progress', 'resolved'];
const BADGE = { new: 'badge-new', in_progress: 'badge-progress', resolved: 'badge-resolved' };

export default function ContactRequests() {
  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState('loading');

  const load = () => {
    setStatus('loading');
    fetchContactRequestsAdmin().then((res) => { setRequests(res.data.requests); setStatus('success'); }).catch(() => setStatus('error'));
  };
  useEffect(load, []);

  const handleStatusChange = async (id, newStatus) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
    try {
      await updateContactRequestStatusAdmin(id, newStatus);
    } catch (err) {
      alert('Unable to update status. Please try again.');
      load();
    }
  };

  if (status === 'loading') return <LoadingState label="Loading contact requests..." />;
  if (status === 'error') return <ErrorState onRetry={load} />;

  return (
    <div>
      <h1>Contact Requests</h1>
      <div className="card mt-4" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 720 }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--color-border)' }}>
              <th style={{ padding: '10px 8px' }}>User</th>
              <th style={{ padding: '10px 8px' }}>Mobile</th>
              <th style={{ padding: '10px 8px' }}>Email</th>
              <th style={{ padding: '10px 8px' }}>Description</th>
              <th style={{ padding: '10px 8px' }}>Date</th>
              <th style={{ padding: '10px 8px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '10px 8px' }}>{r.user_name || 'Guest'}</td>
                <td style={{ padding: '10px 8px' }}>{r.mobile_number || '—'}</td>
                <td style={{ padding: '10px 8px' }}>{r.email || '—'}</td>
                <td style={{ padding: '10px 8px', maxWidth: 260 }}>{r.description}</td>
                <td style={{ padding: '10px 8px', whiteSpace: 'nowrap' }}>{new Date(r.created_at).toLocaleDateString()}</td>
                <td style={{ padding: '10px 8px' }}>
                  <select
                    className="form-select"
                    value={r.status}
                    onChange={(e) => handleStatusChange(r.id, e.target.value)}
                    style={{ padding: '4px 8px', fontSize: '0.85rem' }}
                  >
                    {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
