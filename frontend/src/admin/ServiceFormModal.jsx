import React, { useState, useEffect } from 'react';

const EMPTY = {
  name: '', slug: '', short_description: '', introduction: '', purpose: '', eligibility: '',
  charges: '', official_portal_name: '', official_portal_url: '', important_information: '',
  final_information: '', intro_image: '', middle_image: '', final_image: '', display_order: 0,
};

const FIELDS = [
  ['name', 'Name', 'input'], ['slug', 'Slug (auto if blank)', 'input'],
  ['short_description', 'Short Description', 'textarea'],
  ['introduction', 'Introduction', 'textarea'], ['purpose', 'Purpose', 'textarea'],
  ['eligibility', 'Eligibility', 'textarea'], ['charges', 'Charges', 'textarea'],
  ['official_portal_name', 'Official Portal Name', 'input'],
  ['official_portal_url', 'Official Portal URL', 'input'],
  ['important_information', 'Important Information', 'textarea'],
  ['final_information', 'Final Information', 'textarea'],
  ['intro_image', 'Intro Image Path', 'input'], ['middle_image', 'Middle Image Path', 'input'],
  ['final_image', 'Final Image Path', 'input'],
];

export default function ServiceFormModal({ initial, onSave, onClose, saving, error }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    setForm(initial ? { ...EMPTY, ...initial } : EMPTY);
  }, [initial]);

  const handleChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div style={overlayStyle}>
      <div className="card" style={{ maxWidth: 640, width: '100%', maxHeight: '85vh', overflowY: 'auto' }}>
        <h2>{initial ? 'Edit Service' : 'Add Service'}</h2>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          {FIELDS.map(([key, label, type]) => (
            <div className="form-group" key={key}>
              <label className="form-label">{label}</label>
              {type === 'textarea' ? (
                <textarea className="form-textarea" value={form[key] || ''} onChange={handleChange(key)} />
              ) : (
                <input className="form-input" value={form[key] || ''} onChange={handleChange(key)} />
              )}
            </div>
          ))}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Service'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: 'fixed', inset: 0, background: 'rgba(15,36,56,0.55)', display: 'flex',
  alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 16,
};
