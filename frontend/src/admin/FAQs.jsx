import React, { useEffect, useState } from 'react';
import { fetchServicesAdmin, createFaqAdmin, updateFaqAdmin, deleteFaqAdmin } from '../services/adminService';
import { fetchAllFaqs } from '../services/serviceService';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

const EMPTY = { service_id: '', category: '', question: '', answer: '' };

export default function FAQs() {
  const [services, setServices] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [status, setStatus] = useState('loading');
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = () => {
    setStatus('loading');
    Promise.all([fetchServicesAdmin(), fetchAllFaqs()])
      .then(([svcRes, faqRes]) => {
        setServices(svcRes.data.services);
        setFaqs(faqRes.data.faqs);
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
      if (editingId) await updateFaqAdmin(editingId, payload);
      else await createFaqAdmin(payload);
      resetForm();
      load();
    } catch (err) {
      setError(err.message || 'Unable to save FAQ.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (faq) => {
    setForm({ service_id: faq.service_id || '', category: faq.category || '', question: faq.question, answer: faq.answer });
    setEditingId(faq.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this FAQ?')) return;
    await deleteFaqAdmin(id);
    load();
  };

  if (status === 'loading') return <LoadingState label="Loading FAQs..." />;
  if (status === 'error') return <ErrorState onRetry={load} />;

  return (
    <div>
      <h1>Manage FAQs</h1>
      <div className="grid grid-2 mt-4" style={{ alignItems: 'flex-start' }}>
        <div className="card">
          <h3>{editingId ? 'Edit FAQ' : 'Add FAQ'}</h3>
          {error && <div className="alert alert-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Service (optional — leave blank for general FAQ)</label>
              <select className="form-select" value={form.service_id} onChange={(e) => setForm((f) => ({ ...f, service_id: e.target.value }))}>
                <option value="">General (no specific service)</option>
                {services.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <input className="form-input" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} placeholder="e.g. GST, Income Tax, Safety" />
            </div>
            <div className="form-group">
              <label className="form-label">Question</label>
              <input className="form-input" value={form.question} onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label className="form-label">Answer</label>
              <textarea className="form-textarea" value={form.answer} onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))} required />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-primary" type="submit" disabled={saving}>{saving ? 'Saving...' : editingId ? 'Update FAQ' : 'Add FAQ'}</button>
              {editingId && <button type="button" className="btn btn-outline" onClick={resetForm}>Cancel</button>}
            </div>
          </form>
        </div>

        <div>
          {faqs.map((f) => (
            <div key={f.id} className="card mt-2">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{f.question}</strong>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                  <button className="btn btn-outline btn-sm" onClick={() => handleEdit(f)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(f.id)}>Delete</button>
                </div>
              </div>
              <p className="mb-0 mt-2">{f.answer}</p>
              <span className="text-muted" style={{ fontSize: '0.8rem' }}>{f.category} {f.service_name ? `• ${f.service_name}` : ''}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
