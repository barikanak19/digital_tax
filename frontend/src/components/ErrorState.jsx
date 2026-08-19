import React from 'react';

export default function ErrorState({ message = 'Something went wrong. Please try again.', onRetry }) {
  return (
    <div className="alert alert-error" role="alert">
      <strong>Unable to load this content.</strong>
      <p className="mb-0 mt-1">{message}</p>
      {onRetry && (
        <button className="btn btn-outline btn-sm mt-2" onClick={onRetry} type="button">
          Try again
        </button>
      )}
    </div>
  );
}
