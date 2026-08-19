import React from 'react';

export default function FeeCard({ charges }) {
  return (
    <div className="alert alert-warning" role="note">
      <strong>Charges / Fees</strong>
      <p className="mb-0 mt-1">{charges}</p>
    </div>
  );
}
