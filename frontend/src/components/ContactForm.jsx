import React, { useState } from 'react';
import { submitContactRequest } from '../services/contactService';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_REGEX = /^(\+?\d{1,3}[- ]?)?\d{10}$/;

export default function ContactForm() {
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [serverMessage, setServerMessage] = useState('');

  const validate = () => {
    const errs = {};
    const hasEmail = email.trim().length > 0;
    const hasMobile = mobile.trim().length > 0;

    if (!hasEmail && !hasMobile) {
      errs.contact = 'Please provide either a mobile number or an email address.';
    }
    if (hasEmail && !EMAIL_REGEX.test(email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (hasMobile && !MOBILE_REGEX.test(mobile.trim())) {
      errs.mobile = 'Please enter a valid mobile number.';
    }
    if (!description.trim()) {
      errs.description = 'Please describe what you need help with.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    try {
      await submitContactRequest({
        mobile_number: mobile.trim() || undefined,
        email: email.trim() || undefined,
        description: description.trim(),
      });
      setStatus('success');
      setServerMessage('Your request has been submitted. We will get back to you soon.');
      setMobile('');
      setEmail('');
      setDescription('');
    } catch (err) {
      setStatus('error');
      setServerMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit} noValidate>
      <h3>Contact Me for More Information</h3>
      <p className="text-muted">Provide either your mobile number or email — you don't need both.</p>

      {status === 'success' && <div className="alert alert-success">{serverMessage}</div>}
      {status === 'error' && <div className="alert alert-error">{serverMessage}</div>}
      {errors.contact && <div className="alert alert-error">{errors.contact}</div>}

      <div className="grid grid-2">
        <div className="form-group">
          <label className="form-label" htmlFor="contact-mobile">Mobile Number (optional)</label>
          <input
            id="contact-mobile"
            type="tel"
            className="form-input"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="e.g. 9876543210"
          />
          {errors.mobile && <div className="form-error">{errors.mobile}</div>}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="contact-email">Email (optional)</label>
          <input
            id="contact-email"
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
          {errors.email && <div className="form-error">{errors.email}</div>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="contact-desc">Description</label>
        <textarea
          id="contact-desc"
          className="form-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What would you like more information about?"
        />
        {errors.description && <div className="form-error">{errors.description}</div>}
      </div>

      <button className="btn btn-primary" type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending...' : 'Send Request'}
      </button>
    </form>
  );
}
