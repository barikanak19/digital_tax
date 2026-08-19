import React, { useEffect, useState } from 'react';
import { fetchServicesAdmin, addStepAdmin, updateStepAdmin, deleteStepAdmin } from '../services/adminService';
import { fetchServiceDetails } from '../services/serviceService';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

const EMPTY_STEP = { step_number: '', step_title: '', step_description: '', step_image: '' };

export default function Guides() {
  const [services, setServices] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [steps, setSteps] = useState([]);
  const [status, setStatus] = useState('loading');
  const [form, setForm] = useState(EMPTY_STEP);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchServicesAdmin().then((res) => {
      setServices(res.data.services);
      if (res.data.services.length) setSelectedId(String(res.data.services[0].id));
      setStatus('success');
    }).catch(() => setStatus('error'));
  }, []);

  const loadSteps = (id) => {
    if (!id) return;
    fetchServiceDetails(id).then((res) => setSteps(res.data.steps)).catch(() => setSteps([]));
  };

  useEffect(() => { loadSteps(selectedId); }, [selectedId]);

  const resetForm = () => { setForm(EMPTY_STEP); setEditingId(null); setError(''); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = { ...form, step_number: Number(form.step_number) };
      if (editingId) {
        await updateStepAdmin(editingId, payload);
      } else {
        await addStepAdmin(selectedId, payload);
      }
      resetForm();
      loadSteps(selectedId);
    } catch (err) {
      setError(err.message || 'Unable to save step.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (step) => {
    setForm({ step_number: step.step_number, step_title: step.step_title, step_description: step.step_description, step_image: step.step_image || '' });
    setEditingId(step.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this step?')) return;
    await deleteStepAdmin(id);
    loadSteps(selectedId);
  };

  if (status === 'loading') return <LoadingState label="Loading services..." />;
  if (status === 'error') return <ErrorState />;

  return (
    <div>
      <h1>Manage Service Guides (Steps)</h1>

      <div className="form-group mt-4" style={{ maxWidth: 360 }}>
        <label className="form-label">Select Service</label>
        <select className="form-select" value={selectedId} onChange={(e) => { setSelectedId(e.target.value); resetForm(); }}>
          {services.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </div>

      <div className="grid grid-2 mt-4" style={{ alignItems: 'flex-start' }}>
        <div className="card">
          <h3>{editingId ? 'Edit Step' : 'Add Step'}</h3>
          {error && <div className="alert alert-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Step Number</label>
              <input type="number" className="form-input" value={form.step_number}
                onChange={(e) => setForm((f) => ({ ...f, step_number: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label className="form-label">Step Title</label>
              <input className="form-input" value={form.step_title}
                onChange={(e) => setForm((f) => ({ ...f, step_title: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label className="form-label">Step Description</label>
              <textarea className="form-textarea" value={form.step_description}
                onChange={(e) => setForm((f) => ({ ...f, step_description: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label className="form-label">Step Image Path (optional)</label>
              <input className="form-input" value={form.step_image}
                onChange={(e) => setForm((f) => ({ ...f, step_image: e.target.value }))} />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-primary" type="submit" disabled={saving}>{saving ? 'Saving...' : editingId ? 'Update Step' : 'Add Step'}</button>
              {editingId && <button type="button" className="btn btn-outline" onClick={resetForm}>Cancel</button>}
            </div>
          </form>
        </div>

        <div>
          {steps.map((step) => (
            <div key={step.id} className="card mt-2">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>Step {step.step_number}: {step.step_title}</strong>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-outline btn-sm" onClick={() => handleEdit(step)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(step.id)}>Delete</button>
                </div>
              </div>
              <p className="mb-0 mt-2">{step.step_description}</p>
            </div>
          ))}
          {!steps.length && <p className="text-muted">No steps yet for this service.</p>}
        </div>
      </div>
    </div>
  );
}
