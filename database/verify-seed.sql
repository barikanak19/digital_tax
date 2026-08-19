-- ============================================================
-- Digital Tax Filing Support for Small Businesses
-- Seed Verification SQL
-- ============================================================
-- This file verifies that the database seeding is complete
-- ============================================================

USE digital_tax_support;

-- ============================================================
-- Overall Counts
-- ============================================================
SELECT '=== OVERALL COUNTS ===' AS section;

SELECT 'Total Services' AS metric, COUNT(*) AS count FROM services WHERE is_active = 1;
SELECT 'Total Service Documents' AS metric, COUNT(*) AS count FROM service_documents;
SELECT 'Total Service Steps' AS metric, COUNT(*) AS count FROM service_steps;
SELECT 'Total Service FAQs' AS metric, COUNT(*) AS count FROM service_faqs;
SELECT 'Total Tax Calendar Entries' AS metric, COUNT(*) AS count FROM tax_calendar;

-- ============================================================
-- Service List with IDs
-- ============================================================
SELECT '=== ALL SERVICES ===' AS section;
SELECT id, name, slug, display_order 
FROM services 
WHERE is_active = 1 
ORDER BY display_order ASC, name ASC;

-- ============================================================
-- Service Documents Count per Service
-- ============================================================
SELECT '=== DOCUMENTS PER SERVICE ===' AS section;
SELECT 
    s.id,
    s.name,
    s.slug,
    COUNT(sd.id) AS document_count
FROM services s
LEFT JOIN service_documents sd ON s.id = sd.service_id
WHERE s.is_active = 1
GROUP BY s.id, s.name, s.slug
ORDER BY s.display_order ASC, s.name ASC;

-- ============================================================
-- Service Steps Count per Service
-- ============================================================
SELECT '=== STEPS PER SERVICE ===' AS section;
SELECT 
    s.id,
    s.name,
    s.slug,
    COUNT(ss.id) AS step_count
FROM services s
LEFT JOIN service_steps ss ON s.id = ss.service_id
WHERE s.is_active = 1
GROUP BY s.id, s.name, s.slug
ORDER BY s.display_order ASC, s.name ASC;

-- ============================================================
-- Service FAQs Count per Service
-- ============================================================
SELECT '=== FAQs PER SERVICE ===' AS section;
SELECT 
    s.id,
    s.name,
    s.slug,
    COUNT(sf.id) AS faq_count
FROM services s
LEFT JOIN service_faqs sf ON s.id = sf.service_id
WHERE s.is_active = 1
GROUP BY s.id, s.name, s.slug
ORDER BY s.display_order ASC, s.name ASC;

-- ============================================================
-- Services with Missing Data
-- ============================================================
SELECT '=== SERVICES WITH MISSING DATA ===' AS section;

-- Services with no documents
SELECT 'Services with NO documents' AS issue, s.id, s.name, s.slug
FROM services s
LEFT JOIN service_documents sd ON s.id = sd.service_id
WHERE s.is_active = 1 AND sd.id IS NULL;

-- Services with less than 8 steps
SELECT 'Services with LESS than 8 steps' AS issue, s.id, s.name, s.slug, COUNT(ss.id) AS step_count
FROM services s
LEFT JOIN service_steps ss ON s.id = ss.service_id
WHERE s.is_active = 1
GROUP BY s.id, s.name, s.slug
HAVING COUNT(ss.id) < 8;

-- Services with no FAQs
SELECT 'Services with NO FAQs' AS issue, s.id, s.name, s.slug
FROM services s
LEFT JOIN service_faqs sf ON s.id = sf.service_id
WHERE s.is_active = 1 AND sf.id IS NULL;

-- ============================================================
-- Step Number Consistency Check
-- ============================================================
SELECT '=== STEP NUMBER CONSISTENCY ===' AS section;
SELECT 
    s.id,
    s.name,
    s.slug,
    GROUP_CONCAT(ss.step_number ORDER BY ss.step_number) AS step_numbers
FROM services s
JOIN service_steps ss ON s.id = ss.service_id
WHERE s.is_active = 1
GROUP BY s.id, s.name, s.slug
ORDER BY s.display_order ASC, s.name ASC;

-- ============================================================
-- Expected Service Count Verification
-- ============================================================
SELECT '=== EXPECTED VS ACTUAL SERVICE COUNT ===' AS section;
SELECT 
    COUNT(*) AS actual_services,
    20 AS expected_services,
    CASE 
        WHEN COUNT(*) = 20 THEN '✓ PASS' 
        ELSE '✗ FAIL' 
    END AS status
FROM services 
WHERE is_active = 1;

-- ============================================================
-- General Platform FAQs (service_id NULL)
-- ============================================================
SELECT '=== GENERAL PLATFORM FAQs ===' AS section;
SELECT id, category, question, LEFT(answer, 100) AS answer_preview
FROM service_faqs
WHERE service_id IS NULL;

-- ============================================================
-- Tax Calendar Entries
-- ============================================================
SELECT '=== TAX CALENDAR ENTRIES ===' AS section;
SELECT id, title, due_date, status
FROM tax_calendar
ORDER BY due_date ASC;

-- ============================================================
-- Summary Verification
-- ============================================================
SELECT '=== VERIFICATION SUMMARY ===' AS section;

SELECT 
    (SELECT COUNT(*) FROM services WHERE is_active = 1) AS total_services,
    (SELECT COUNT(*) FROM service_documents) AS total_documents,
    (SELECT COUNT(*) FROM service_steps) AS total_steps,
    (SELECT COUNT(*) FROM service_faqs) AS total_faqs,
    (SELECT COUNT(*) FROM tax_calendar) AS total_calendar_entries;

-- Expected: 20 services, each with documents, 8 steps, and at least 1 FAQ
SELECT 'VERIFICATION COMPLETE' AS message;
