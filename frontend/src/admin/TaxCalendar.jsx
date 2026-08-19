import React, { useEffect, useState } from 'react';
import { fetchServicesAdmin, createCalendarEntryAdmin, updateCalendarEntryAdmin, deleteCalendarEntryAdmin } from '../services/adminService';
import { fetchTaxCalendar } from '../services/serviceService';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

const EMPTY = { service_id: '', title: '', due_date: '', description: '', status: 'upcoming' };

export default function TaxCalendar() {
  const [services, setServices] = useState([]);
  const [entries, setEntries] = useState([]);
  const [status, setStatus] = useState('loading');
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = () => {
    setStatus('loading');
    Promise.all([fetchServicesAdmin(), fetchTaxCalendar()])
      .then(([svcRes, calRes]) => {
        setServices(svcRes.data.services);
        setEntries(calRes.data.entries);
        setStatus('success');
      })
      .catch(() => setStatus('error'));
  };
  useEffect(load, []);

  const resetForm = () => { setForm(EMPTY); setEditingId(null); setError(''); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = { ...form, service_id: form.service_id || null };
      if (editingId) await updateCalendarEntryAdmin(editingId, payload);
      else await createCalendarEntryAdmin(payload);
      resetForm();
      load();
    } catch (err) {
      setError(err.message || 'Unable to save entry.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (entry) => {
    setForm({
      service_id: entry.service_id || '', title: entry.title,
      due_date: entry.due_date?.slice(0, 10) || '', description: entry.description || '', status: entry.status,
    });
    setEditingId(entry.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this calendar entry?')) return;
    await deleteCalendarEntryAdmin(id);
    load();
  };

  if (status === 'loading') return <LoadingState label="Loading tax calendar..." />;
  if (status === 'error') return <ErrorState onRetry={load} />;

  return (
    <div>
      <h1>Manage Tax Calendar</h1>
      <div className="grid grid-2 mt-4" style={{ alignItems: 'flex-start' }}>
        <div className="card">
          <h3>{editingId ? 'Edit Entry' : 'Add Entry'}</h3>
          {error && <div className="alert alert-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Related Service (optional)</label>
              <select className="form-select" value={form.service_id} onChange={(e) => setForm((f) => ({ ...f, service_id: e.target.value }))}>
                <option value="">General</option>
                {services.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Title</label>
              <input className="form-input" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label className="form-label">Due Date</label>
              <input type="date" className="form-input" value={form.due_date} onChange={(e) => setForm((f) => ({ ...f, due_date: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-textarea" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-select" value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}>
                <option value="upcoming">Upcoming</option>
                <option value="due_soon">Due Soon</option>
                <option value="past">Past</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-primary" type="submit" disabled={saving}>{saving ? 'Saving...' : editingId ? 'Update Entry' : 'Add Entry'}</button>
              {editingId && <button type="button" className="btn btn-outline" onClick={resetForm}>Cancel</button>}
            </div>
          </form>
        </div>

        <div>
          {entries.map((e) => (
            <div key={e.id} className="card mt-2">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{e.title}</strong>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-outline btn-sm" onClick={() => handleEdit(e)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(e.id)}>Delete</button>
                </div>
              </div>
              <p className="mb-0 mt-2 text-muted">{new Date(e.due_date).toLocaleDateString()} • {e.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
