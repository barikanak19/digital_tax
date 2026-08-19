import React from 'react';

const TOPICS = [
  { title: 'Avoid Fake Tax Websites', desc: 'Only use official government portals for filing, registration, or payment. Bookmark the correct URL rather than searching each time.' },
  { title: 'Verify Official URLs', desc: 'Check the web address carefully before entering any information. Fraudulent sites often use URLs that look similar to official ones.' },
  { title: 'Never Share OTP', desc: 'No legitimate authority will ever ask you to share an OTP over call, SMS, or email.' },
  { title: 'Never Share Passwords', desc: 'Keep your portal passwords, bank passwords, and PINs confidential at all times.' },
  { title: 'Avoid Suspicious Links', desc: 'Do not click links in unsolicited emails or messages claiming to be from tax authorities.' },
  { title: 'Protect Financial Information', desc: 'Never share your card details, UPI PIN, or bank account credentials with anyone.' },
  { title: 'Verify Payment Details', desc: 'Double-check payee details and amounts before confirming any tax-related payment.' },
  { title: 'Use Secure Internet Connections', desc: 'Avoid conducting tax transactions over public or unsecured Wi-Fi networks.' },
];

export default function Safety() {
  return (
    <div className="container section">
      <h1>Tax & Digital Safety</h1>
      <p className="text-muted">
        This platform never asks for your OTP, government portal passwords, bank passwords, UPI PINs,
        or card PINs. Stay alert to these common safety practices.
      </p>

      <div className="grid grid-2 mt-5">
        {TOPICS.map((t) => (
          <div key={t.title} className="card">
            <h3>{t.title}</h3>
            <p className="mb-0">{t.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
