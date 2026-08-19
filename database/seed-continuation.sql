-- ============================================================
-- Digital Tax Filing Support for Small Businesses
-- Seed Continuation SQL
-- ============================================================
-- This file safely completes the seeding process for services 10-20
-- without duplicating existing services 1-9
-- ============================================================

USE digital_tax_support;

-- ============================================================
-- Service 10: Income & Expense Record Keeping
-- ============================================================
INSERT INTO services (name, slug, short_description, introduction, purpose, eligibility, charges, official_portal_name, official_portal_url, important_information, final_information, intro_image, middle_image, final_image, display_order) 
SELECT 'Income & Expense Record Keeping', 'income-and-expense-record-keeping', 'Understand how to maintain proper income and expense records.', 'Income & Expense Record Keeping involves systematically tracking all business income and expenses to support accurate tax filing and financial management.', 'Proper record keeping ensures you can substantiate all deductions, file accurate returns, and respond to any queries from tax authorities.', 'Applicable to every business, regardless of size or category. Good record keeping is a fundamental compliance requirement.', 'Fees may vary depending on the applicable service/process, filing category, and business circumstances. Please verify the current applicable amount on the official portal before proceeding.', 'Income Tax Department Portal', 'https://www.incometax.gov.in/', 'Record transactions regularly rather than in bulk. Use consistent categories and retain supporting documents for each entry. Official portal link to be verified/confirmed before deployment.', 'Well-maintained records simplify tax filing, support business decisions, and provide evidence in case of audits or inquiries.', 'services/income-expense/income_expense_intro.png', 'services/income-expense/income_expense_middle.png', 'services/income-expense/income_expense_final.png', 10
WHERE NOT EXISTS (SELECT 1 FROM services WHERE slug = 'income-and-expense-record-keeping');

SET @svc_id = (SELECT id FROM services WHERE slug = 'income-and-expense-record-keeping');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Business registration documents', 1
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Business registration documents');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Invoices and receipts', 2
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Invoices and receipts');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Bank statements', 3
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Bank statements');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Expense receipts', 4
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Expense receipts');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Asset purchase records', 5
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Asset purchase records');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Loan/interest records (if applicable)', 6
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Loan/interest records (if applicable)');

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 1, 'Choose a record-keeping method', 'Decide between manual registers, spreadsheets, or accounting software.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 1);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 2, 'Record transactions regularly', 'Log income and expenses as they occur rather than in bulk later.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 2);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 3, 'Categorize expenses', 'Group expenses under consistent categories for easier analysis.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 3);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 4, 'Reconcile with bank statements', 'Match recorded transactions against actual bank activity periodically.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 4);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 5, 'Back up records', 'Maintain secure digital or physical backups of financial records.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 5);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 6, 'Review monthly summaries', 'Check periodic summaries to track business performance.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 6);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 7, 'Prepare for filing season', 'Compile annual summaries ahead of tax filing deadlines.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 7);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 8, 'Retain records long-term', 'Keep records for the legally prescribed retention period.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 8);

INSERT INTO service_faqs (service_id, category, question, answer) 
SELECT @svc_id, 'Documents', 'How long should I keep financial records?', 'Retention periods vary by document type and applicable law. Check current requirements or consult a professional.'
WHERE NOT EXISTS (SELECT 1 FROM service_faqs WHERE service_id = @svc_id AND question = 'How long should I keep financial records?');

-- ============================================================
-- Service 11: Tax Document Management
-- ============================================================
INSERT INTO services (name, slug, short_description, introduction, purpose, eligibility, charges, official_portal_name, official_portal_url, important_information, final_information, intro_image, middle_image, final_image, display_order) 
SELECT 'Tax Document Management', 'tax-document-management', 'Understand how to organize and manage tax-related documents.', 'Tax Document Management involves systematically organizing, storing, and retrieving documents required for tax compliance, filings, and potential audits.', 'Proper document management reduces stress during filing season and ensures you can respond quickly to any tax notice or verification request.', 'Applicable to any business that files taxes, maintains GST records, or is otherwise subject to tax compliance requirements.', 'Fees may vary depending on the applicable service/process, filing category, and business circumstances. Please verify the current applicable amount on the official portal before proceeding.', 'Income Tax Department Portal', 'https://www.incometax.gov.in/', 'Organize documents by financial year and category. Keep both digital and physical copies where feasible, and ensure backups are secure. Official portal link to be verified/confirmed before deployment.', 'A well-organized document system allows quick access during filing, audits, or when responding to official queries.', 'services/tax-document-management/tax_document_management_intro.png', 'services/tax-document-management/tax_document_management_middle.png', 'services/tax-document-management/tax_document_management_final.png', 11
WHERE NOT EXISTS (SELECT 1 FROM services WHERE slug = 'tax-document-management');

SET @svc_id = (SELECT id FROM services WHERE slug = 'tax-document-management');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'PAN/TAN/GSTIN copies', 1
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'PAN/TAN/GSTIN copies');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Filed return copies', 2
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Filed return copies');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Payment challans', 3
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Payment challans');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Invoices and bills', 4
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Invoices and bills');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Bank statements', 5
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Bank statements');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Prior year assessment records', 6
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Prior year assessment records');

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 1, 'Create a folder structure', 'Set up folders by financial year and document category.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 1);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 2, 'Digitize physical documents', 'Scan paper documents for secure digital storage.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 2);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 3, 'Label files clearly', 'Use consistent, descriptive file names for easy retrieval.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 3);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 4, 'Store securely', 'Use password-protected or access-controlled storage where possible.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 4);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 5, 'Maintain backups', 'Keep at least one additional backup copy in a separate location.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 5);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 6, 'Review periodically', 'Check your document set quarterly to ensure completeness.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 6);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 7, 'Prepare for filing', 'Compile the relevant documents before each filing deadline.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 7);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 8, 'Retain per requirement', 'Keep documents for the legally prescribed retention period.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 8);

INSERT INTO service_faqs (service_id, category, question, answer) 
SELECT @svc_id, 'Documents', 'Should I keep digital copies or originals?', 'Both are useful. Digital copies aid quick access; originals may still be required for certain verifications.'
WHERE NOT EXISTS (SELECT 1 FROM service_faqs WHERE service_id = @svc_id AND question = 'Should I keep digital copies or originals?');

-- ============================================================
-- Service 12: Tax Calendar & Due Dates
-- ============================================================
INSERT INTO services (name, slug, short_description, introduction, purpose, eligibility, charges, official_portal_name, official_portal_url, important_information, final_information, intro_image, middle_image, final_image, display_order) 
SELECT 'Tax Calendar & Due Dates', 'tax-calendar-and-due-dates', 'Understand how to track important tax-related due dates.', 'The Tax Calendar helps businesses track important filing and payment due dates across income tax, GST, and TDS obligations.', 'Tracking due dates helps avoid late fees, interest, and compliance issues that arise from missed deadlines.', 'Relevant to any business that has ongoing tax filing or payment obligations of any applicable category.', 'Fees may vary depending on the applicable service/process, filing category, and business circumstances. Please verify the current applicable amount on the official portal before proceeding.', 'Income Tax Department / GST Portal', 'https://www.incometax.gov.in/', 'Due dates can change based on official notifications. Always confirm the current due date on the relevant official portal before the deadline. Official portal link to be verified/confirmed before deployment.', 'Maintaining a personal or business tax calendar, cross-checked against official announcements, helps ensure consistent compliance.', 'services/tax-calendar/tax_calendar_intro.png', 'services/tax-calendar/tax_calendar_middle.png', 'services/tax-calendar/tax_calendar_final.png', 12
WHERE NOT EXISTS (SELECT 1 FROM services WHERE slug = 'tax-calendar-and-due-dates');

SET @svc_id = (SELECT id FROM services WHERE slug = 'tax-calendar-and-due-dates');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'List of applicable tax obligations', 1
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'List of applicable tax obligations');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Registration details (PAN/TAN/GSTIN)', 2
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Registration details (PAN/TAN/GSTIN)');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Previous compliance history', 3
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Previous compliance history');

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 1, 'List applicable obligations', 'Identify every tax filing or payment relevant to your business.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 1);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 2, 'Check official due dates', 'Refer to the official portal for the current schedule.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 2);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 3, 'Set reminders', 'Use calendar reminders ahead of each due date.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 3);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 4, 'Prepare documents in advance', 'Gather required information before the deadline approaches.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 4);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 5, 'Monitor for notifications', 'Watch for official updates that may shift due dates.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 5);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 6, 'Complete filing/payment on time', 'Submit filings or payments within the applicable window.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 6);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 7, 'Record completion', 'Note completed obligations to track your compliance history.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 7);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 8, 'Review calendar periodically', 'Update your tracking system as your business obligations change.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 8);

INSERT INTO service_faqs (service_id, category, question, answer) 
SELECT @svc_id, 'Calendar', 'What if I miss a due date?', 'Late filing or payment may attract interest or penalties. Check current provisions on the official portal and take corrective action promptly.'
WHERE NOT EXISTS (SELECT 1 FROM service_faqs WHERE service_id = @svc_id AND question = 'What if I miss a due date?');

-- ============================================================
-- Service 13: Tax Refund Status
-- ============================================================
INSERT INTO services (name, slug, short_description, introduction, purpose, eligibility, charges, official_portal_name, official_portal_url, important_information, final_information, intro_image, middle_image, final_image, display_order) 
SELECT 'Tax Refund Status', 'tax-refund-status', 'Understand how to check the status of tax refunds.', 'Tax Refund Status checking allows taxpayers to track the processing status of refunds that may be due after filing returns or making excess payments.', 'Tracking refund status helps you know when to expect funds and identify any issues that may delay processing.', 'Relevant to any taxpayer who has filed a return showing a refund due or made excess tax payments.', 'Fees may vary depending on the applicable service/process, filing category, and business circumstances. Please verify the current applicable amount on the official portal before proceeding.', 'Income Tax e-Filing Portal', 'https://www.incometax.gov.in/', 'Ensure your bank account details are correctly validated in the portal to avoid refund processing delays. Official portal link to be verified/confirmed before deployment.', 'Once processed, refunds are credited to the validated bank account. Keep the credit confirmation for your records.', 'services/tax-refund/tax_refund_intro.png', 'services/tax-refund/tax_refund_middle.png', 'services/tax-refund/tax_refund_final.png', 13
WHERE NOT EXISTS (SELECT 1 FROM services WHERE slug = 'tax-refund-status');

SET @svc_id = (SELECT id FROM services WHERE slug = 'tax-refund-status');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Filed return acknowledgment', 1
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Filed return acknowledgment');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Bank account details (validated)', 2
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Bank account details (validated)');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Assessment year reference', 3
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Assessment year reference');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Payment challan (if applicable)', 4
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Payment challan (if applicable)');

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 1, 'Log in to the official portal', 'Access your account using your PAN-linked credentials.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 1);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 2, 'Navigate to refund status', 'Find the refund tracking section within the portal.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 2);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 3, 'Enter relevant details', 'Provide the assessment year and any requested reference numbers.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 3);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 4, 'Check current status', 'Review the displayed processing stage of your refund.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 4);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 5, 'Verify bank details if prompted', 'Ensure your bank account is validated if the portal flags an issue.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 5);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 6, 'Note any discrepancies', 'Record any mismatches for follow-up with official support.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 6);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 7, 'Wait for credit confirmation', 'Refunds are typically credited after processing is complete.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 7);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 8, 'Retain confirmation', 'Save the refund credit confirmation for your financial records.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 8);

INSERT INTO service_faqs (service_id, category, question, answer) 
SELECT @svc_id, 'Income Tax', 'Why is my refund delayed?', 'Delays can occur due to bank validation issues, return scrutiny, or processing backlogs. Check official status updates for details.'
WHERE NOT EXISTS (SELECT 1 FROM service_faqs WHERE service_id = @svc_id AND question = 'Why is my refund delayed?');

-- ============================================================
-- Service 14: Tax Notice & Compliance Guidance
-- ============================================================
INSERT INTO services (name, slug, short_description, introduction, purpose, eligibility, charges, official_portal_name, official_portal_url, important_information, final_information, intro_image, middle_image, final_image, display_order) 
SELECT 'Tax Notice & Compliance Guidance', 'tax-notice-and-compliance-guidance', 'Understand general guidance on responding to tax notices.', 'A Tax Notice is official communication from the tax authority regarding discrepancies, clarifications, or compliance requirements related to your filings.', 'Understanding how to respond to a notice helps ensure timely compliance and reduces the risk of further escalation.', 'Relevant to any taxpayer who has received an official notice or communication from the tax department.', 'Fees may vary depending on the applicable service/process, filing category, and business circumstances. Please verify the current applicable amount on the official portal before proceeding.', 'Income Tax e-Filing Portal', 'https://www.incometax.gov.in/', 'Always verify that a notice is genuine by checking it through the official portal. Do not respond to suspicious emails or calls claiming to be tax authorities requesting sensitive information. Official portal link to be verified/confirmed before deployment.', 'Responding within the specified timeline through official channels helps resolve most notices smoothly. Keep a copy of your response and any related correspondence.', 'services/tax-notice/tax_notice_intro.png', 'services/tax-notice/tax_notice_middle.png', 'services/tax-notice/tax_notice_final.png', 14
WHERE NOT EXISTS (SELECT 1 FROM services WHERE slug = 'tax-notice-and-compliance-guidance');

SET @svc_id = (SELECT id FROM services WHERE slug = 'tax-notice-and-compliance-guidance');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Copy of the notice', 1
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Copy of the notice');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Related filed return', 2
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Related filed return');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Supporting documents relevant to the notice', 3
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Supporting documents relevant to the notice');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Prior correspondence (if any)', 4
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Prior correspondence (if any)');

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 1, 'Verify the notice', 'Confirm authenticity by logging into the official portal directly, not through links in emails.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 1);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 2, 'Read the notice carefully', 'Understand exactly what clarification or action is being requested.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 2);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 3, 'Gather relevant documents', 'Compile records that support your position or clarify the discrepancy.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 3);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 4, 'Draft your response', 'Prepare a clear, factual response addressing each point raised.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 4);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 5, 'Submit through official channels', 'Respond using the designated portal section, not external communication.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 5);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 6, 'Track acknowledgment', 'Confirm your response has been recorded successfully.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 6);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 7, 'Follow up if needed', 'Monitor for further communication or requests for clarification.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 7);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 8, 'Retain records', 'Keep copies of the notice and your response for future reference.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 8);

INSERT INTO service_faqs (service_id, category, question, answer) 
SELECT @svc_id, 'Income Tax', 'How do I know if a notice is genuine?', 'Always verify directly through the official portal rather than trusting links, calls, or messages claiming urgency.'
WHERE NOT EXISTS (SELECT 1 FROM service_faqs WHERE service_id = @svc_id AND question = 'How do I know if a notice is genuine?');

-- ============================================================
-- Service 15: PAN Services
-- ============================================================
INSERT INTO services (name, slug, short_description, introduction, purpose, eligibility, charges, official_portal_name, official_portal_url, important_information, final_information, intro_image, middle_image, final_image, display_order) 
SELECT 'PAN Services', 'pan-services', 'Understand the general process for PAN-related services.', 'PAN (Permanent Account Number) Services cover processes such as applying for a new PAN, updating details, or reprinting a PAN card.', 'A valid PAN is required for most financial and tax-related transactions, including filing returns and opening business bank accounts.', 'Applicable to businesses and individuals who need to apply for, update, or reissue a PAN.', 'Fees may vary depending on the applicable service/process, filing category, and business circumstances. Please verify the current applicable amount on the official portal before proceeding.', 'Protean (NSDL) / UTIITSL PAN Services Portal', 'https://www.protean-tinpan.com/', 'Ensure the name and details entered match your official identity documents exactly, as mismatches can delay processing. Official portal link to be verified/confirmed before deployment.', 'Once processed, the PAN card is issued physically and/or digitally, depending on the option selected during application.', 'services/pan-services/pan_services_intro.png', 'services/pan-services/pan_services_middle.png', 'services/pan-services/pan_services_final.png', 15
WHERE NOT EXISTS (SELECT 1 FROM services WHERE slug = 'pan-services');

SET @svc_id = (SELECT id FROM services WHERE slug = 'pan-services');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Identity proof', 1
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Identity proof');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Address proof', 2
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Address proof');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Date of birth proof', 3
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Date of birth proof');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Business registration proof (for entities)', 4
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Business registration proof (for entities)');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Photograph (for individual applicants)', 5
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Photograph (for individual applicants)');

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 1, 'Open the official PAN services portal', 'Navigate to the appropriate application section.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 1);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 2, 'Choose the applicable service', 'Select new application, correction, or reprint as needed.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 2);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 3, 'Fill in the application form', 'Enter details exactly as per your supporting documents.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 3);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 4, 'Upload required documents', 'Attach scanned proofs in the specified format.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 4);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 5, 'Make the applicable payment', 'Pay the prescribed fee through the available payment methods.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 5);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 6, 'Complete verification', 'Verify using the applicable method (e-KYC, DSC, or physical submission).'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 6);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 7, 'Track application status', 'Monitor processing through the portal tracking system.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 7);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 8, 'Receive PAN card', 'Download digital copy or await physical delivery as per your selection.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 8);

INSERT INTO service_faqs (service_id, category, question, answer) 
SELECT @svc_id, 'PAN', 'Can I apply for PAN without Aadhaar?', 'In some cases, alternate identity proofs may be accepted. Check current requirements on the official portal.'
WHERE NOT EXISTS (SELECT 1 FROM service_faqs WHERE service_id = @svc_id AND question = 'Can I apply for PAN without Aadhaar?');

-- ============================================================
-- Service 16: TAN Services
-- ============================================================
INSERT INTO services (name, slug, short_description, introduction, purpose, eligibility, charges, official_portal_name, official_portal_url, important_information, final_information, intro_image, middle_image, final_image, display_order) 
SELECT 'TAN Services', 'tan-services', 'Understand the general process for TAN-related services.', 'TAN (Tax Deduction Account Number) Services cover processes such as applying for a new TAN, updating details, or changing TAN allotment.', 'A valid TAN is required for businesses that deduct TDS and is essential for filing TDS returns and related compliance.', 'Applicable to businesses required to deduct tax at source (TDS) or those needing to update existing TAN details.', 'Fees may vary depending on the applicable service/process, filing category, and business circumstances. Please verify the current applicable amount on the official portal before proceeding.', 'Protean (NSDL) TAN Services Portal', 'https://www.protean-tinpan.com/', 'Ensure business address and contact details are accurate, as communication is often sent to the registered address. Official portal link to be verified/confirmed before deployment.', 'Once processed, the TAN allotment or updated details are provided through the portal and via physical communication as applicable.', 'services/tan-services/tan_services_intro.png', 'services/tan-services/tan_services_middle.png', 'services/tan-services/tan_services_final.png', 16
WHERE NOT EXISTS (SELECT 1 FROM services WHERE slug = 'tan-services');

SET @svc_id = (SELECT id FROM services WHERE slug = 'tan-services');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Business incorporation proof', 1
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Business incorporation proof');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Business address proof', 2
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Business address proof');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Authorized signatory details', 3
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Authorized signatory details');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Existing TAN (for change applications)', 4
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Existing TAN (for change applications)');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Photograph of authorized signatory', 5
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Photograph of authorized signatory');

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 1, 'Open the TAN services portal', 'Navigate to the applicable TAN application section.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 1);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 2, 'Select the service type', 'Choose new TAN application, change request, or other required service.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 2);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 3, 'Fill in business details', 'Enter accurate business information as per official records.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 3);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 4, 'Enter responsible person details', 'Provide details of the person responsible for TDS compliance.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 4);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 5, 'Upload supporting documents', 'Attach required proofs in the specified format.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 5);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 6, 'Make payment and submit', 'Pay the applicable fee and submit the application.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 6);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 7, 'Track processing status', 'Monitor application progress through the portal.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 7);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 8, 'Receive TAN allotment', 'Obtain the new or updated TAN details upon approval.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 8);

INSERT INTO service_faqs (service_id, category, question, answer) 
SELECT @svc_id, 'TAN', 'Can a business have multiple TANs?', 'Generally, one TAN per business location is the norm, but specific rules may apply. Check official guidance for your situation.'
WHERE NOT EXISTS (SELECT 1 FROM service_faqs WHERE service_id = @svc_id AND question = 'Can a business have multiple TANs?');

-- ============================================================
-- Service 17: Business Tax Registration
-- ============================================================
INSERT INTO services (name, slug, short_description, introduction, purpose, eligibility, charges, official_portal_name, official_portal_url, important_information, final_information, intro_image, middle_image, final_image, display_order) 
SELECT 'Business Tax Registration', 'business-tax-registration', 'Understand the general process for registering a business for tax purposes.', 'Business Tax Registration encompasses obtaining the necessary tax registrations and identifiers such as PAN, GSTIN, and other applicable registrations based on business structure and activities.', 'Proper tax registration is the foundation of compliance, enabling a business to operate legally, file returns, and claim benefits.', 'Applicable to new businesses starting operations, or existing businesses that need additional registrations as they expand or change structure.', 'Fees may vary depending on the applicable service/process, filing category, and business circumstances. Please verify the current applicable amount on the official portal before proceeding.', 'Income Tax / GST Portal', 'https://www.incometax.gov.in/', 'Determine which registrations apply to your business type before starting. Some registrations are mandatory based on turnover or activity thresholds. Official portal link to be verified/confirmed before deployment.', 'Upon successful registration, you will receive registration numbers and certificates. Display these as required on invoices, business premises, and official communications.', 'services/business-tax-registration/business_tax_registration_intro.png', 'services/business-tax-registration/business_tax_registration_middle.png', 'services/business-tax-registration/business_tax_registration_final.png', 17
WHERE NOT EXISTS (SELECT 1 FROM services WHERE slug = 'business-tax-registration');

SET @svc_id = (SELECT id FROM services WHERE slug = 'business-tax-registration');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Business incorporation documents', 1
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Business incorporation documents');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Proof of business address', 2
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Proof of business address');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Identity proofs of promoters/directors', 3
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Identity proofs of promoters/directors');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Bank account details', 4
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Bank account details');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Photographs', 5
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Photographs');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Digital signature (if applicable)', 6
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Digital signature (if applicable)');

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 1, 'Determine required registrations', 'Identify which tax registrations apply based on your business structure and activities.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 1);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 2, 'Gather required documents', 'Collect all necessary proofs and information for each registration.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 2);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 3, 'Apply for PAN (if not already)', 'Obtain a PAN for the business entity if not already available.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 3);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 4, 'Apply for GSTIN (if applicable)', 'Register for GST if your turnover exceeds the threshold or you engage in applicable supplies.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 4);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 5, 'Apply for TAN (if TDS applicable)', 'Obtain TAN if your business is required to deduct TDS.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 5);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 6, 'Complete any state-specific registrations', 'Some states may require additional local tax registrations.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 6);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 7, 'Verify all registrations', 'Confirm that all applicable registrations are active and details are accurate.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 7);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 8, 'Display registration numbers', 'Use your registration numbers on invoices, business premises, and communications as required.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 8);

INSERT INTO service_faqs (service_id, category, question, answer) 
SELECT @svc_id, 'Registration', 'Can I operate without business tax registration?', 'Operating without required tax registrations can lead to penalties and legal issues. Ensure you obtain all applicable registrations before starting operations.'
WHERE NOT EXISTS (SELECT 1 FROM service_faqs WHERE service_id = @svc_id AND question = 'Can I operate without business tax registration?');

-- ============================================================
-- Service 18: Tax Compliance Checklist
-- ============================================================
INSERT INTO services (name, slug, short_description, introduction, purpose, eligibility, charges, official_portal_name, official_portal_url, important_information, final_information, intro_image, middle_image, final_image, display_order) 
SELECT 'Tax Compliance Checklist', 'tax-compliance-checklist', 'Understand key compliance requirements for small businesses.', 'A Tax Compliance Checklist helps businesses systematically track and fulfill their ongoing tax obligations across income tax, GST, TDS, and other applicable areas.', 'Using a compliance checklist reduces the risk of missed deadlines, penalties, and notices by ensuring all obligations are met on time.', 'Relevant to every business, regardless of size or industry. Compliance requirements evolve as businesses grow and regulations change.', 'Fees may vary depending on the applicable service/process, filing category, and business circumstances. Please verify the current applicable amount on the official portal before proceeding.', 'Income Tax / GST Portal', 'https://www.incometax.gov.in/', 'Review this checklist periodically and update it as your business expands or regulations change. Official portal link to be verified/confirmed before deployment.', 'A comprehensive compliance approach helps build a clean compliance history and reduces stress during filing seasons and audits.', 'services/tax-compliance/tax_compliance_intro.png', 'services/tax-compliance/tax_compliance_middle.png', 'services/tax-compliance/tax_compliance_final.png', 18
WHERE NOT EXISTS (SELECT 1 FROM services WHERE slug = 'tax-compliance-checklist');

SET @svc_id = (SELECT id FROM services WHERE slug = 'tax-compliance-checklist');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'List of all applicable registrations', 1
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'List of all applicable registrations');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Previous filing acknowledgments', 2
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Previous filing acknowledgments');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Tax payment records', 3
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Tax payment records');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Compliance calendar', 4
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Compliance calendar');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'Current year financial records', 5
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'Current year financial records');

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 1, 'List all registrations', 'Document every tax registration your business holds (PAN, GSTIN, TAN, etc.).'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 1);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 2, 'Identify filing frequencies', 'Note the filing frequency for each obligation (monthly, quarterly, annually).'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 2);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 3, 'Track all due dates', 'Maintain a calendar of all filing and payment due dates.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 3);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 4, 'Maintain records', 'Keep all supporting documents organized and accessible.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 4);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 5, 'File on time', 'Submit all returns and payments before the applicable deadlines.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 5);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 6, 'Verify acknowledgments', 'Confirm that each filing generates a valid acknowledgment.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 6);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 7, 'Review periodically', 'Check your compliance status quarterly and address any gaps.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 7);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 8, 'Update for changes', 'Revise your checklist when business activities or regulations change.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 8);

INSERT INTO service_faqs (service_id, category, question, answer) 
SELECT @svc_id, 'Compliance', 'What if I discover a past compliance gap?', 'Address past gaps promptly through the official portal. Late filing or payment may attract interest, but resolving the issue proactively is better than waiting.'
WHERE NOT EXISTS (SELECT 1 FROM service_faqs WHERE service_id = @svc_id AND question = 'What if I discover a past compliance gap?');

-- ============================================================
-- Service 19: Tax FAQs & Help
-- ============================================================
INSERT INTO services (name, slug, short_description, introduction, purpose, eligibility, charges, official_portal_name, official_portal_url, important_information, final_information, intro_image, middle_image, final_image, display_order) 
SELECT 'Tax FAQs & Help', 'tax-faqs-and-help', 'Browse frequently asked questions about digital tax processes.', 'The Tax FAQs section provides answers to common questions about digital tax filing, registrations, payments, and compliance.', 'Using FAQs helps quickly resolve common doubts without needing to navigate through detailed guides for every question.', 'Relevant to any user of this platform who has general questions about tax processes or platform usage.', 'Fees may vary depending on the applicable service/process, filing category, and business circumstances. Please verify the current applicable amount on the official portal before proceeding.', 'Income Tax Department Portal', 'https://www.incometax.gov.in/', 'For specific issues not covered here, use the Contact form to reach out for personalized assistance. Official portal link to be verified/confirmed before deployment.', 'Regularly updated FAQs reflect common user queries and evolving regulatory requirements.', 'services/tax-faq/tax_faq_intro.png', 'services/tax-faq/tax_faq_middle.png', 'services/tax-faq/tax_faq_final.png', 19
WHERE NOT EXISTS (SELECT 1 FROM services WHERE slug = 'tax-faqs-and-help');

SET @svc_id = (SELECT id FROM services WHERE slug = 'tax-faqs-and-help');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'No specific documents required to browse this section', 1
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'No specific documents required to browse this section');

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 1, 'Browse by category', 'Use categories such as Income Tax, GST, TDS, or Payments to find relevant questions.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 1);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 2, 'Search for keywords', 'Use the search function to quickly locate a specific topic.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 2);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 3, 'Read the full answer', 'Expand the FAQ to read the complete explanation.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 3);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 4, 'Check related services', 'Visit the related service guide for more in-depth information.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 4);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 5, 'Verify on official portal', 'Cross-check important details on the relevant official government portal.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 5);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 6, 'Use the contact form', 'Reach out through the Contact page if your question remains unanswered.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 6);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 7, 'Provide feedback', 'Let us know if an FAQ was unclear so it can be improved.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 7);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 8, 'Return as needed', 'Revisit this section whenever new questions arise.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 8);

INSERT INTO service_faqs (service_id, category, question, answer) 
SELECT @svc_id, 'FAQs', 'Is this platform an official government service?', 'No. This platform provides general guidance only. All actual filing and payment should be done through the official government portal.'
WHERE NOT EXISTS (SELECT 1 FROM service_faqs WHERE service_id = @svc_id AND question = 'Is this platform an official government service?');

-- ============================================================
-- Service 20: Tax Safety & Fraud Awareness
-- ============================================================
INSERT INTO services (name, slug, short_description, introduction, purpose, eligibility, charges, official_portal_name, official_portal_url, important_information, final_information, intro_image, middle_image, final_image, display_order) 
SELECT 'Tax Safety & Fraud Awareness', 'tax-safety-and-fraud-awareness', 'Understand common digital safety precautions related to tax processes.', 'Tax Safety & Fraud Awareness covers precautions to protect yourself from fraudulent websites, phishing attempts, and scams related to tax filing and payments.', 'Awareness of common fraud tactics helps protect your financial information and prevents unauthorized transactions.', 'Relevant to every user who interacts with digital tax or financial services.', 'Fees may vary depending on the applicable service/process, filing category, and business circumstances. Please verify the current applicable amount on the official portal before proceeding.', 'Income Tax Department Portal', 'https://www.incometax.gov.in/', 'Never share your OTP, passwords, or PINs with anyone, including anyone claiming to represent a tax department or this platform. Always verify official portal URLs directly. Official portal link to be verified/confirmed before deployment.', 'When in doubt about the authenticity of a message, call, or website, do not proceed. Verify independently using official contact information.', 'services/tax-safety/tax_safety_intro.png', 'services/tax-safety/tax_safety_middle.png', 'services/tax-safety/tax_safety_final.png', 20
WHERE NOT EXISTS (SELECT 1 FROM services WHERE slug = 'tax-safety-and-fraud-awareness');

SET @svc_id = (SELECT id FROM services WHERE slug = 'tax-safety-and-fraud-awareness');

INSERT INTO service_documents (service_id, document_name, display_order) 
SELECT @svc_id, 'No specific documents required for this section', 1
WHERE NOT EXISTS (SELECT 1 FROM service_documents WHERE service_id = @svc_id AND document_name = 'No specific documents required for this section');

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 1, 'Verify the official URL', 'Always type or bookmark the official portal address directly rather than clicking links from messages.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 1);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 2, 'Check for secure connection indicators', 'Look for standard browser security indicators before entering information.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 2);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 3, 'Never share OTPs or PINs', 'No legitimate authority will ask you to share an OTP or PIN over call or message.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 3);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 4, 'Be cautious with unsolicited messages', 'Treat unexpected emails, SMS, or calls about refunds or dues with caution.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 4);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 5, 'Avoid suspicious attachments/links', 'Do not open attachments or links from unverified sources.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 5);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 6, 'Use secure networks', 'Avoid conducting tax transactions over public or unsecured Wi-Fi.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 6);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 7, 'Report suspicious activity', 'Report phishing attempts through official channels.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 7);

INSERT INTO service_steps (service_id, step_number, step_title, step_description) 
SELECT @svc_id, 8, 'Stay informed', 'Periodically review official advisories about known scam patterns.'
WHERE NOT EXISTS (SELECT 1 FROM service_steps WHERE service_id = @svc_id AND step_number = 8);

INSERT INTO service_faqs (service_id, category, question, answer) 
SELECT @svc_id, 'Safety', 'Will this platform ever ask for my OTP or password?', 'No. This platform never asks for OTPs, government portal passwords, bank passwords, UPI PINs, or card PINs.'
WHERE NOT EXISTS (SELECT 1 FROM service_faqs WHERE service_id = @svc_id AND question = 'Will this platform ever ask for my OTP or password?');

-- ============================================================
-- General platform FAQs (service_id NULL) - only if not already present
-- ============================================================
INSERT INTO service_faqs (service_id, category, question, answer) 
SELECT NULL, 'Safety', 'Does this platform store my OTP or passwords?', 'No. This platform never collects OTPs, government portal passwords, bank passwords, UPI PINs, or card PINs.'
WHERE NOT EXISTS (SELECT 1 FROM service_faqs WHERE service_id IS NULL AND question = 'Does this platform store my OTP or passwords?');

INSERT INTO service_faqs (service_id, category, question, answer) 
SELECT NULL, 'Income Tax', 'Is this platform an official government portal?', 'No. This platform is an awareness and guidance tool. All actual filing and payment must be completed on the relevant official government portal.'
WHERE NOT EXISTS (SELECT 1 FROM service_faqs WHERE service_id IS NULL AND question = 'Is this platform an official government portal?');

INSERT INTO service_faqs (service_id, category, question, answer) 
SELECT NULL, 'Documents', 'Where can I see all documents required for a service?', 'Each service detail page includes a Documents/Information Required checklist specific to that service.'
WHERE NOT EXISTS (SELECT 1 FROM service_faqs WHERE service_id IS NULL AND question = 'Where can I see all documents required for a service?');

-- ============================================================
-- Sample tax calendar entries - only if not already present
-- ============================================================
INSERT INTO tax_calendar (title, due_date, description, status) 
SELECT 'Quarterly TDS Return Filing (Sample)', DATE_ADD(CURDATE(), INTERVAL 20 DAY), 'Sample placeholder date for quarterly TDS return filing. Verify exact due date on the official portal.', 'upcoming'
WHERE NOT EXISTS (SELECT 1 FROM tax_calendar WHERE title = 'Quarterly TDS Return Filing (Sample)');

INSERT INTO tax_calendar (title, due_date, description, status) 
SELECT 'GST Monthly Return Filing (Sample)', DATE_ADD(CURDATE(), INTERVAL 10 DAY), 'Sample placeholder date for monthly GST return filing. Verify exact due date on the official portal.', 'upcoming'
WHERE NOT EXISTS (SELECT 1 FROM tax_calendar WHERE title = 'GST Monthly Return Filing (Sample)');

INSERT INTO tax_calendar (title, due_date, description, status) 
SELECT 'Advance Tax Instalment (Sample)', DATE_ADD(CURDATE(), INTERVAL 45 DAY), 'Sample placeholder date for an advance tax instalment. Verify exact due date on the official portal.', 'upcoming'
WHERE NOT EXISTS (SELECT 1 FROM tax_calendar WHERE title = 'Advance Tax Instalment (Sample)');

INSERT INTO tax_calendar (title, due_date, description, status) 
SELECT 'Annual Income Tax Return Filing (Sample)', DATE_ADD(CURDATE(), INTERVAL 90 DAY), 'Sample placeholder date for annual income tax return filing. Verify exact due date on the official portal.', 'upcoming'
WHERE NOT EXISTS (SELECT 1 FROM tax_calendar WHERE title = 'Annual Income Tax Return Filing (Sample)');

-- ============================================================
-- Completion message
-- ============================================================
SELECT 'Seed continuation completed successfully. Services 10-20 added with all related data.' AS message;
