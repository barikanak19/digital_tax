import React, { useState } from 'react';
import { getServiceImage } from '../data/serviceImageMap';

/**
 * Renders a service image resolved via the centralized image map.
 *
 * Props:
 *   slug  – service slug, e.g. "income-tax"
 *   role  – image role: "intro" | "step" | "complete"
 *   path  – (legacy) DB path like "services/income-tax/income_tax_intro.png"
 *   alt   – alt text
 *   caption – optional figcaption
 *
 * Resolution order:
 *   1. slug + role (preferred – uses centralized map with real filenames)
 *   2. path (legacy fallback – matches against glob keys)
 */

// Keep the glob for legacy/fallback resolution
const imageModules = import.meta.glob('../assets/services/**/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
});

function resolveLegacy(path) {
  if (!path) return null;
  // path stored in DB looks like: services/income-tax/income_tax_intro.png
  const match = Object.keys(imageModules).find((key) => key.endsWith(path.replace('services/', '')));
  return match ? imageModules[match] : null;
}

export default function ServiceImage({ slug, role, path, alt, caption }) {
  const [failed, setFailed] = useState(false);

  // Prefer slug+role resolution; fall back to legacy path matching
  const resolved = (slug && role ? getServiceImage(slug, role) : null) || resolveLegacy(path);

  if (!resolved || failed) {
    return (
      <div className="image-placeholder" role="img" aria-label={alt || 'Service guide image not yet available'}>
        <span>Image coming soon{caption ? ` — ${caption}` : ''}</span>
      </div>
    );
  }

  return (
    <figure style={{ margin: 0 }}>
      <img
        src={resolved}
        alt={alt || 'Tax service guide illustration'}
        className="tax-illustration"
        onError={() => setFailed(true)}
        style={{ borderRadius: 'var(--radius-md)' }}
      />
      {caption && <figcaption className="text-muted mt-2" style={{ fontSize: '0.85rem' }}>{caption}</figcaption>}
    </figure>
  );
}
