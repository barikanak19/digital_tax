import React from 'react';

const DEFAULT_TIPS = [
  'Never share your OTP with anyone.',
  'Never share your passwords or PINs.',
  'Always verify you are on the official government portal.',
  'Avoid clicking suspicious links in emails or messages.',
  'Protect your financial information at all times.',
];

export default function SafetyTips({ tips = DEFAULT_TIPS }) {
  return (
    <div className="card" style={{ background: 'var(--color-amber-100)', border: 'none' }}>
      <h3>Safety Tips</h3>
      <ul style={{ margin: 0, paddingLeft: 20, display: 'grid', gap: 8 }}>
        {tips.map((tip, i) => (
          <li key={i}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}
