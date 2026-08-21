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
  'advance-tax': {
    intro:    resolve('advance-tax/advance-tax_intro.png'),
    step:     resolve('advance-tax/advance-tax_step_01.png'),
    complete: resolve('advance-tax/advance-tax_complete.png'),
  },
  'business-tax-registration': {
    intro:    resolve('business-tax-registration/business-tax-registration_intro.png'),
    step:     resolve('business-tax-registration/business-tax-registration_step_01.png'),
    complete: resolve('business-tax-registration/business-tax-registration_complete.png'),
  },
  'gst-invoice': {
    intro:    resolve('gst-invoice/gst-invoice_intro.png'),
    step:     resolve('gst-invoice/gst-invoice_step_01.png'),
    complete: resolve('gst-invoice/gst-invoice_complete.png'),
  },
  'gst-registration': {
    intro:    resolve('gst-registration/gst-registration_intro.png'),
    step:     resolve('gst-registration/gst-registration_step_01.png'),
    complete: resolve('gst-registration/gst-registration_complete.png'),
  },
  'gst-return-filing': {
    intro:    resolve('gst-return-filing/gst-return-filing_intro.png'),
    step:     resolve('gst-return-filing/gst-return-filing_step_01.png'),
    complete: resolve('gst-return-filing/gst-return-filing_complete.png'),
  },
  'income-expense': {
    intro:    resolve('income-expense/income-expense_intro.png'),
    step:     resolve('income-expense/income-expense_step_01.png'),
    complete: resolve('income-expense/income-expense_complete.png'),
  },
  'income-tax': {
    intro:    resolve('income-tax/income-tax_intro.png'),
    step:     resolve('income-tax/income-tax_step_01.png'),
    complete: resolve('income-tax/income-tax_complete.png'),
  },
  'pan-services': {
    intro:    resolve('pan-services/pan-services_intro.png'),
    step:     resolve('pan-services/pan-services_step_01.png'),
    complete: resolve('pan-services/pan-services_complete.png'),
  },
  'tan-services': {
    intro:    resolve('tan-services/tan-services_intro.png'),
    step:     resolve('tan-services/tan-services_step_01.png'),
    complete: resolve('tan-services/tan-services_complete.png'),
  },
  'tax-calendar': {
    intro:    resolve('tax-calendar/tax-calendar_intro.png'),
    step:     resolve('tax-calendar/tax-calendar_step_01.png'),
    complete: resolve('tax-calendar/tax-calendar_complete.png'),
  },
  'tax-compliance': {
    intro:    resolve('tax-compliance/tax-compliance_intro.png'),
    step:     resolve('tax-compliance/tax-compliance_step_01.png'),
    complete: resolve('tax-compliance/tax-compliance_complete.png'),
  },
  'tax-deduction': {
    intro:    resolve('tax-deduction/tax-deducation1.png'),
    step:     resolve('tax-deduction/tax-deducation2.png'),
    complete: resolve('tax-deduction/tax-deducation3.png'),
  },
  'tax-document-management': {
    intro:    resolve('tax-document-management/tax-document1.png'),
    step:     resolve('tax-document-management/tax-document2.png'),
    complete: resolve('tax-document-management/tax-document3.png'),
  },
  'tax-faq': {
    intro:    resolve('tax-faq/tax-faq1.png'),
    step:     resolve('tax-faq/tax-faq2.png'),
    complete: resolve('tax-faq/tax-faq3.png'),
  },
  'tax-notice': {
    intro:    resolve('tax-notice/tax-notice1.png'),
    step:     resolve('tax-notice/tax-notice2.png'),
    complete: resolve('tax-notice/tax-notice3.png'),
  },
  'tax-payment-challan': {
    intro:    resolve('tax-payment-challan/tax-payment1.png'),
    step:     resolve('tax-payment-challan/tax-payment2.png'),
    complete: resolve('tax-payment-challan/tax-payment3.png'),
  },
  'tax-refund': {
    intro:    resolve('tax-refund/tax-refund1.png'),
    step:     resolve('tax-refund/tax-refund2.png'),
    complete: resolve('tax-refund/tax-refund3.png'),
  },
  'tax-safety': {
    intro:    resolve('tax-safety/tax-safety1.png'),
    step:     resolve('tax-safety/tax-safety2.png'),
    complete: resolve('tax-safety/tax-safety3.png'),
  },
  'tds-filing': {
    intro:    resolve('tds-filing/tds-filling1.png'),
    step:     resolve('tds-filing/tds-filling2.png'),
    complete: resolve('tds-filing/tds-filling3.png'),
  },
  'tds-payment': {
    intro:    resolve('tds-payment/tds-payment1.png'),
    step:     resolve('tds-payment/tds-payment2.png'),
    complete: resolve('tds-payment/tsd-payment3.png'),
  },
};

/**
 * Look up the resolved image URL for a given service slug and role.
 *
 * @param {string} slug   – e.g. "income-tax", "gst-registration"
 * @param {'intro'|'step'|'complete'} role
 * @returns {string|null}  Vite-resolved asset URL, or null
 */
export function getServiceImage(slug, role) {
  const entry = SERVICE_IMAGE_MAP[slug];
  return entry ? entry[role] || null : null;
}

/**
 * Return the full { intro, step, complete } object for a slug,
 * or null if the slug is unknown.
 */
export function getServiceImages(slug) {
  return SERVICE_IMAGE_MAP[slug] || null;
}

export default SERVICE_IMAGE_MAP;
