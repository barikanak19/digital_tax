import React from 'react';
import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <div className="container section">
      <h1>Contact for More Information</h1>
      <p className="text-muted">Have a question we haven't covered? Reach out and we'll follow up.</p>
      <div style={{ maxWidth: 560 }} className="mt-4">
        <ContactForm />
      </div>
    </div>
  );
}
