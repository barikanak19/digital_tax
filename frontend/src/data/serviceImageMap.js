/**
 * serviceImageMap.js
 * ------------------------------------------------------------
 * Centralized mapping from service slug → actual image filenames.
 *
 * The filenames here are the EXACT filenames that exist on disk
 * inside frontend/src/assets/services/<folder>/. They must NOT
 * be renamed, moved, or invented – the filesystem is the source
 * of truth.
 *
 * Image roles:
 *   card     → Service listing card thumbnail
 *   intro    → Introduction / overview illustration
 *   step     → Middle process / step illustration
 *   complete → Final / completion illustration
 * ------------------------------------------------------------
 */

// Eager-import every image under assets/services/ so Vite
// resolves them at build-time (works in both dev and production).
const imageModules = import.meta.glob(
  '../assets/services/**/*.{png,jpg,jpeg,webp}',
  { eager: true, import: 'default' }
);

/**
 * Helper: given a relative tail (e.g. "advance-tax/advance-tax_intro.png"),
 * find the matching Vite module key and return the resolved URL.
 */
function resolve(relativeTail) {
  const key = Object.keys(imageModules).find((k) => k.endsWith(relativeTail));
  return key ? imageModules[key] : null;
}

/*
 * Build the map. Each entry key is the service slug used in the
 * frontend route (/services/:serviceId).
 *
 * The filenames below were captured by scanning the actual filesystem:
 *   frontend/src/assets/services/<folder>/*.png
 */
const SERVICE_IMAGE_MAP = {
  // ── Services that have a dedicated _complete.png card image ──────────────
  'advance-tax': {
    card:     resolve('advance-tax/advance-tax_complete.png'),
    intro:    resolve('advance-tax/advance-tax_intro.png'),
    step:     resolve('advance-tax/advance-tax_step_01.png'),
    complete: resolve('advance-tax/advance-tax_complete.png'),
  },
  'business-tax-registration': {
    card:     resolve('business-tax-registration/business-tax-registration_complete.png'),
    intro:    resolve('business-tax-registration/business-tax-registration_intro.png'),
    step:     resolve('business-tax-registration/business-tax-registration_step_01.png'),
    complete: resolve('business-tax-registration/business-tax-registration_complete.png'),
  },
  'gst-invoice': {
    card:     resolve('gst-invoice/gst-invoice_complete.png'),
    intro:    resolve('gst-invoice/gst-invoice_intro.png'),
    step:     resolve('gst-invoice/gst-invoice_step_01.png'),
    complete: resolve('gst-invoice/gst-invoice_complete.png'),
  },
  'gst-registration': {
    card:     resolve('gst-registration/gst-registration_complete.png'),
    intro:    resolve('gst-registration/gst-registration_intro.png'),
    step:     resolve('gst-registration/gst-registration_step_01.png'),
    complete: resolve('gst-registration/gst-registration_complete.png'),
  },
  'gst-return-filing': {
    card:     resolve('gst-return-filing/gst-return-filing_complete.png'),
    intro:    resolve('gst-return-filing/gst-return-filing_intro.png'),
    step:     resolve('gst-return-filing/gst-return-filing_step_01.png'),
    complete: resolve('gst-return-filing/gst-return-filing_complete.png'),
  },
  'income-expense': {
    card:     resolve('income-expense/income-expense_complete.png'),
    intro:    resolve('income-expense/income-expense_intro.png'),
    step:     resolve('income-expense/income-expense_step_01.png'),
    complete: resolve('income-expense/income-expense_complete.png'),
  },
  'income-tax': {
    card:     resolve('income-tax/income-tax_complete.png'),
    intro:    resolve('income-tax/income-tax_intro.png'),
    step:     resolve('income-tax/income-tax_step_01.png'),
    complete: resolve('income-tax/income-tax_complete.png'),
  },
  'pan-services': {
    card:     resolve('pan-services/pan-services_complete.png'),
    intro:    resolve('pan-services/pan-services_intro.png'),
    step:     resolve('pan-services/pan-services_step_01.png'),
    complete: resolve('pan-services/pan-services_complete.png'),
  },
  'tan-services': {
    card:     resolve('tan-services/tan-services_complete.png'),
    intro:    resolve('tan-services/tan-services_intro.png'),
    step:     resolve('tan-services/tan-services_step_01.png'),
    complete: resolve('tan-services/tan-services_complete.png'),
  },
  'tax-calendar': {
    card:     resolve('tax-calendar/tax-calendar_complete.png'),
    intro:    resolve('tax-calendar/tax-calendar_intro.png'),
    step:     resolve('tax-calendar/tax-calendar_step_01.png'),
    complete: resolve('tax-calendar/tax-calendar_complete.png'),
  },
  'tax-compliance': {
    card:     resolve('tax-compliance/tax-compliance_complete.png'),
    intro:    resolve('tax-compliance/tax-compliance_intro.png'),
    step:     resolve('tax-compliance/tax-compliance_step_01.png'),
    complete: resolve('tax-compliance/tax-compliance_complete.png'),
  },

  // ── Services whose only unique card image is the spaced-name PNG ──────────
  'tax-deduction': {
    card:     resolve('tax-deduction/Tax Deduction.png'),
    intro:    resolve('tax-deduction/tax-deducation1.png'),
    step:     resolve('tax-deduction/tax-deducation2.png'),
    complete: resolve('tax-deduction/tax-deducation3.png'),
  },
  'tax-document-management': {
    card:     resolve('tax-document-management/Tax Document Management.png'),
    intro:    resolve('tax-document-management/tax-document1.png'),
    step:     resolve('tax-document-management/tax-document2.png'),
    complete: resolve('tax-document-management/tax-document3.png'),
  },
  'tax-faq': {
    card:     resolve('tax-faq/Tax FAQ.png'),
    intro:    resolve('tax-faq/tax-faq1.png'),
    step:     resolve('tax-faq/tax-faq2.png'),
    complete: resolve('tax-faq/tax-faq3.png'),
  },
  'tax-notice': {
    card:     resolve('tax-notice/Tax Notice.png'),
    intro:    resolve('tax-notice/tax-notice1.png'),
    step:     resolve('tax-notice/tax-notice2.png'),
    complete: resolve('tax-notice/tax-notice3.png'),
  },
  'tax-payment-challan': {
    card:     resolve('tax-payment-challan/Tax Payment & Challan.png'),
    intro:    resolve('tax-payment-challan/tax-payment1.png'),
    step:     resolve('tax-payment-challan/tax-payment2.png'),
    complete: resolve('tax-payment-challan/tax-payment3.png'),
  },
  'tax-refund': {
    card:     resolve('tax-refund/Tax Refund.png'),
    intro:    resolve('tax-refund/tax-refund1.png'),
    step:     resolve('tax-refund/tax-refund2.png'),
    complete: resolve('tax-refund/tax-refund3.png'),
  },
  'tax-safety': {
    card:     resolve('tax-safety/Tax Safety.png'),
    intro:    resolve('tax-safety/tax-safety1.png'),
    step:     resolve('tax-safety/tax-safety2.png'),
    complete: resolve('tax-safety/tax-safety3.png'),
  },
  'tds-filing': {
    card:     resolve('tds-filing/TDS Filing.png'),
    intro:    resolve('tds-filing/tds-filling1.png'),
    step:     resolve('tds-filing/tds-filling2.png'),
    complete: resolve('tds-filing/tds-filling3.png'),
  },
  'tds-payment': {
    card:     resolve('tds-payment/TDS Payment.png'),
    intro:    resolve('tds-payment/tds-payment1.png'),
    step:     resolve('tds-payment/tds-payment2.png'),
    complete: resolve('tds-payment/tsd-payment3.png'),
  },
};

/**
 * Look up the resolved image URL for a given service slug and role.
 *
 * @param {string} slug   – e.g. "income-tax", "gst-registration"
 * @param {'card'|'intro'|'step'|'complete'} role
 * @returns {string|null}  Vite-resolved asset URL, or null
 */
export function getServiceImage(slug, role) {
  const entry = SERVICE_IMAGE_MAP[slug];
  return entry ? entry[role] || null : null;
}

/**
 * Return the full { card, intro, step, complete } object for a slug,
 * or null if the slug is unknown.
 */
export function getServiceImages(slug) {
  return SERVICE_IMAGE_MAP[slug] || null;
}

// Known image-folder slugs (keys of SERVICE_IMAGE_MAP).
const IMAGE_FOLDER_SLUGS = Object.keys(SERVICE_IMAGE_MAP);

// Explicit overrides for DB slugs that can't be resolved via prefix matching.
const SLUG_OVERRIDES = {
  'income-and-expense-record-keeping': 'income-expense',
  'tax-payment-and-challan':           'tax-payment-challan',
};

/**
 * Map any DB/API service slug to the image-folder slug used as a key in
 * SERVICE_IMAGE_MAP.  Resolution order:
 *   1. Explicit override (handles slugs that don't share a prefix with the image key)
 *   2. Exact match
 *   3. Best prefix match (DB slug starts with image-folder slug)
 *   4. Original slug as-is (falls through to null gracefully)
 *
 * @param {string} dbSlug  – the raw slug returned by the API, e.g. "income-tax-filing"
 * @returns {string}       – resolved image-folder slug, e.g. "income-tax"
 */
export function resolveImageSlug(dbSlug) {
  return (
    SLUG_OVERRIDES[dbSlug] ||
    IMAGE_FOLDER_SLUGS.find((s) => s === dbSlug) ||
    IMAGE_FOLDER_SLUGS.find((s) => dbSlug.startsWith(s)) ||
    dbSlug
  );
}

export default SERVICE_IMAGE_MAP;
