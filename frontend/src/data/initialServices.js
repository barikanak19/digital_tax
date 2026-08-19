/**
 * initialServices.js
 * ------------------------------------------------------------
 * NOTE: This project follows the "don't put service content directly
 * into UI components" rule. The single source of truth for all 20
 * tax services is the MySQL database, seeded from:
 *
 *   database/generate-seed.js  -->  database/seed.sql
 *
 * The frontend always fetches service content via the REST API
 * (see src/services/serviceService.js), never from a hardcoded
 * frontend data file. This keeps frontend and backend properly
 * decoupled and lets admins edit content through the Admin Panel
 * without redeploying the frontend.
 *
 * This file is kept as a placeholder/export point in case a future
 * feature needs a lightweight local fallback list (e.g. for offline
 * demos). It intentionally does not duplicate full service content.
 */

export const SERVICE_CATEGORIES = [
  'Income Tax',
  'GST',
  'TDS',
  'Payments',
  'Documents',
  'FAQs',
  'Safety',
];

export default SERVICE_CATEGORIES;
