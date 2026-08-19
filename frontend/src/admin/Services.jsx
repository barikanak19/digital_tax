import React, { useEffect, useState } from 'react';
import { fetchServicesAdmin, createServiceAdmin, updateServiceAdmin, deleteServiceAdmin } from '../services/adminService';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import ServiceFormModal from './ServiceFormModal';

export default function Services() {
  const [services, setServices] = useState([]);
  const [status, setStatus] = useState('loading');
  const [editing, setEditing] = useState(null); // null = closed, {} = new, {...} = edit
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const load = () => {
    setStatus('loading');
    fetchServicesAdmin().then((res) => { setServices(res.data.services); setStatus('success'); }).catch(() => setStatus('error'));
  };
  useEffect(load, []);

  const handleSave = async (form) => {
    setSaving(true);
    setFormError('');
    try {
      if (editing?.id) {
        await updateServiceAdmin(editing.id, form);
      } else {
        await createServiceAdmin(form);
      }
      setEditing(null);
      load();
    } catch (err) {
      setFormError(err.message || 'Unable to save service.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service? This cannot be undone.')) return;
    try {
      await deleteServiceAdmin(id);
      load();
    } catch (err) {
      alert(err.message || 'Unable to delete service.');
    }
  };

  if (status === 'loading') return <LoadingState label="Loading services..." />;
  if (status === 'error') return <ErrorState onRetry={load} />;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Manage Services</h1>
        <button className="btn btn-primary" onClick={() => setEditing({})}>+ Add Service</button>
      </div>

      <div className="card mt-4" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640 }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--color-border)' }}>
              <th style={{ padding: '10px 8px' }}>Name</th>
              <th style={{ padding: '10px 8px' }}>Slug</th>
              <th style={{ padding: '10px 8px' }}>Order</th>
              <th style={{ padding: '10px 8px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '10px 8px', fontWeight: 600 }}>{s.name}</td>
                <td style={{ padding: '10px 8px', color: 'var(--color-text-muted)' }}>{s.slug}</td>
                <td style={{ padding: '10px 8px' }}>{s.display_order}</td>
                <td style={{ padding: '10px 8px', display: 'flex', gap: 8 }}>
                  <button className="btn btn-outline btn-sm" onClick={() => setEditing(s)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(s.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing !== null && (
        <ServiceFormModal
          initial={editing.id ? editing : null}
          onSave={handleSave}
          onClose={() => { setEditing(null); setFormError(''); }}
          saving={saving}
          error={formError}
        />
      )}
    </div>
  );
}
