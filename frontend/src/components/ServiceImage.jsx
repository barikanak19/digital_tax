import React, { useState } from 'react';

/**
 * Renders a predefined service image with a clean fallback placeholder
 * if the file has not been uploaded yet. Images are looked up from
 * src/assets/services/<folder>/<filename>.png via Vite's import.meta.glob
 * so that dropping in a correctly-named file makes it appear automatically.
 */
const imageModules = import.meta.glob('../assets/services/**/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
});

function resolveImage(path) {
  if (!path) return null;
  // path stored in DB looks like: services/income-tax/income_tax_intro.png
  const match = Object.keys(imageModules).find((key) => key.endsWith(path.replace('services/', '')));
  return match ? imageModules[match] : null;
}

export default function ServiceImage({ path, alt, caption }) {
  const [failed, setFailed] = useState(false);
  const resolved = resolveImage(path);

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
