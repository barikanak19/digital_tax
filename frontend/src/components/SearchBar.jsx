import React from 'react';

export default function SearchBar({ value, onChange, placeholder = 'Search tax services...' }) {
  return (
    <div className="form-group mb-0">
      <input
        type="search"
        className="form-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />
    </div>
  );
}
