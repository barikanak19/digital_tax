/**
 * generate-seed.js
 * ------------------------------------------------------------
 * Generates database/seed.sql from a single structured JS data
 * source. Run with: node generate-seed.js
 *
 * This keeps all 20 services consistent and avoids hand-typing
 * duplicated SQL. Edit the SERVICES array below to change content,
 * then re-run this script to regenerate seed.sql.
 * ------------------------------------------------------------
 */
const fs = require('fs');
const path = require('path');

const PORTAL_PLACEHOLDER_NOTE =
  'Official portal link to be verified/confirmed before deployment.';

const GENERIC_CHARGES =
  'Fees may vary depending on the applicable service/process, filing category, and business circumstances. ' +
  'Please verify the current applicable amount on the official portal before proceeding.';

const GENERIC_SAFETY_NOTE =
  'Always confirm you are on the correct official government portal before entering any information. ' +
  'This platform never asks for your OTP, passwords, or PINs.';

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function esc(str) {
  if (str === null || str === undefined) return 'NULL';
  return "'" + String(str).replace(/\\/g, '\\\\').replace(/'/g, "''") + "'";
}

/**
 * Each service:
 *  name, folder (asset folder name), category,
 *  short_description, introduction, purpose, eligibility,
 *  documents: [string,...],
 *  official_portal_name, official_portal_url,
 *  important_information, final_information,
 *  steps: [{title, description}, ...]  (auto step_number assigned)
 *  faqs: [{q, a}, ...]
 */
const SERVICES = [
  {
    name: 'Income Tax Filing',
    folder: 'income-tax',
    category: 'Income Tax',
    short_description: 'Understand how small businesses generally file annual income tax returns online.',
    introduction: 'Income Tax Filing refers to the process of formally reporting a business\'s income, expenses, and applicable deductions to the tax authority for a financial year. It establishes a documented record of earnings and tax liability.',
    purpose: 'Filing an income tax return helps a business stay compliant with tax law, claim eligible deductions, carry forward losses where applicable, and maintain financial credibility for loans or tenders.',
    eligibility: 'Businesses and individuals whose income exceeds the applicable exemption threshold, or who are otherwise required by law to file, generally need to file an income tax return. Specific applicability depends on business structure and turnover.',
    official_portal_name: 'Income Tax Department e-Filing Portal',
    official_portal_url: 'https://www.incometax.gov.in/',
    important_information: 'Keep all income and expense records ready before starting. Cross-check pre-filled data on the portal against your own books. Common mistakes include mismatched income figures, missing deduction proofs, and late filing.',
    final_information: 'After submission, an acknowledgement (ITR-V or equivalent) is generated. Retain this for your records and complete e-verification within the allowed window to complete the filing process.',
    documents: ['PAN card', 'Bank account statements', 'Income and expense records', 'Proof of investments/deductions', 'Previous year tax return (if available)', 'GST returns (if applicable)'],
    steps: [
      { title: 'Open the official portal', description: 'Visit the Income Tax Department e-filing portal using the official URL only.' },
      { title: 'Login or Register', description: 'Log in using your PAN-linked credentials, or register if you are a first-time user.' },
      { title: 'Select the relevant filing option', description: 'Choose the appropriate income tax return form based on your business category.' },
      { title: 'Enter required information', description: 'Fill in income, expense, and deduction details accurately based on your records.' },
      { title: 'Upload applicable documents', description: 'Attach supporting statements where the portal allows or requests them.' },
      { title: 'Review information', description: 'Carefully review all entered figures before proceeding to submission.' },
      { title: 'Submit and verify', description: 'Submit the return and complete e-verification through the available method.' },
      { title: 'Save acknowledgement', description: 'Download and store the acknowledgement/reference number safely.' },
    ],
    faqs: [
      { q: 'Do I need to file if my business made a loss?', a: 'In many cases, filing is still recommended to carry forward losses, but applicability depends on your specific situation. Confirm with a tax professional or the official portal guidance.' },
      { q: 'What happens if I file late?', a: 'Late filing may attract fees or interest as prescribed by tax law. Check current provisions on the official portal.' },
    ],
  },
  {
    name: 'GST Registration',
    folder: 'gst-registration',
    category: 'GST',
    short_description: 'Learn the general process for registering a business under GST.',
    introduction: 'GST Registration is the process by which a business obtains a unique GST Identification Number (GSTIN), enabling it to legally collect and remit Goods and Services Tax.',
    purpose: 'Registration allows a business to issue valid GST invoices, claim input tax credit, and operate legally where GST registration is applicable.',
    eligibility: 'Businesses exceeding the prescribed turnover threshold, or engaged in specific categories of supply, are generally required to register. Thresholds and categories vary, so verify applicability for your business type.',
    official_portal_name: 'GST Portal',
    official_portal_url: 'https://www.gst.gov.in/',
    important_information: 'Ensure business address proof and bank details are accurate, as mismatches are a common reason for delays. Keep scanned copies of documents ready in the required format.',
    final_information: 'Once approved, a GSTIN certificate is issued. Display your GSTIN on invoices and at your place of business as required by law.',
    documents: ['PAN card of business/proprietor', 'Business address proof', 'Bank account details', 'Identity proof of proprietor/partners/directors', 'Business registration proof (if applicable)', 'Digital signature (for certain entity types)'],
    steps: [
      { title: 'Open the official GST portal', description: 'Navigate to the official GST registration section.' },
      { title: 'Generate a Temporary Reference Number (TRN)', description: 'Start a new registration application using basic details like PAN and mobile number.' },
      { title: 'Complete the application form', description: 'Fill in business details, promoter/partner information, and place of business.' },
      { title: 'Upload required documents', description: 'Upload scanned copies of the required proofs in the specified format and size.' },
      { title: 'Verify using OTP/DSC', description: 'Complete identity verification through the method applicable to your entity type.' },
      { title: 'Review application', description: 'Recheck all sections before final submission.' },
      { title: 'Submit application', description: 'Submit and note the Application Reference Number (ARN).' },
      { title: 'Track and save certificate', description: 'Track status using the ARN and download the GST certificate once approved.' },
    ],
    faqs: [
      { q: 'Is GST registration mandatory for every business?', a: 'No. It depends on turnover and the nature of supply. Verify applicability for your specific business on the official portal.' },
      { q: 'How long does registration usually take?', a: 'Processing times vary. Refer to the official portal for current estimated timelines.' },
    ],
  },
  {
    name: 'GST Return Filing',
    folder: 'gst-return-filing',
    category: 'GST',
    short_description: 'Understand the general process of filing periodic GST returns.',
    introduction: 'GST Return Filing is the periodic process of reporting sales, purchases, and tax collected/paid to the GST authorities, based on your registration category.',
    purpose: 'Regular return filing keeps your GST registration compliant, supports input tax credit claims, and avoids penalties for non-filing.',
    eligibility: 'Any business registered under GST is generally required to file returns as per the frequency applicable to their registration type.',
    official_portal_name: 'GST Portal',
    official_portal_url: 'https://www.gst.gov.in/',
    important_information: 'Reconcile your sales and purchase records with auto-populated data before filing. Common mistakes include mismatched invoice details and missed filing deadlines.',
    final_information: 'Once filed, an Acknowledgement Reference Number (ARN) is generated. Retain this along with the filed return copy for your records.',
    documents: ['GSTIN and login credentials', 'Sales invoices', 'Purchase invoices', 'Input tax credit records', 'Previous return filing summary'],
    steps: [
      { title: 'Log in to the GST portal', description: 'Access your account using your GSTIN-linked credentials.' },
      { title: 'Select the applicable return', description: 'Choose the return form applicable to your registration category and period.' },
      { title: 'Enter sales and purchase details', description: 'Fill in outward and inward supply details accurately.' },
      { title: 'Reconcile auto-populated data', description: 'Cross-check system-generated data against your books of accounts.' },
      { title: 'Compute tax liability', description: 'Review the computed tax payable or input credit available.' },
      { title: 'Make payment if applicable', description: 'Pay any outstanding tax liability through the portal.' },
      { title: 'Submit and file the return', description: 'Submit using the applicable verification method (DSC/EVC).' },
      { title: 'Save acknowledgement', description: 'Download and store the filed return and ARN.' },
    ],
    faqs: [
      { q: 'What if I miss a filing deadline?', a: 'Late fees and interest may apply as per current GST law. Check the official portal for applicable rates.' },
      { q: 'Can I revise a filed return?', a: 'Correction mechanisms vary by return type. Refer to official GST guidance for your specific case.' },
    ],
  },
  {
    name: 'GST Invoice & E-Invoicing',
    folder: 'gst-invoice',
    category: 'GST',
    short_description: 'Understand GST-compliant invoicing and e-invoicing requirements.',
    introduction: 'GST Invoicing involves issuing invoices that meet prescribed format requirements, while e-Invoicing is a system where certain businesses must generate invoices through a government-notified portal for authentication.',
    purpose: 'Proper invoicing ensures your transactions are legally valid, supports accurate return filing, and enables customers to claim input tax credit.',
    eligibility: 'Standard GST invoicing rules apply to all registered businesses. E-invoicing applicability depends on turnover thresholds notified by the authorities from time to time.',
    official_portal_name: 'GST e-Invoice Portal',
    official_portal_url: 'https://einvoice1.gst.gov.in/',
    important_information: 'Ensure invoice fields such as GSTIN, HSN/SAC codes, and tax breakup are accurate. For e-invoicing, generate the Invoice Reference Number (IRN) before sharing the invoice with the customer.',
    final_information: 'A valid e-invoice includes a QR code and IRN issued by the government system. Retain these records for compliance and audit purposes.',
    documents: ['GSTIN details', 'Product/service HSN or SAC codes', 'Customer details', 'Invoice numbering series', 'Applicable tax rate information'],
    steps: [
      { title: 'Check applicability', description: 'Confirm whether e-invoicing applies to your business based on current turnover thresholds.' },
      { title: 'Prepare invoice data', description: 'Compile invoice details in the required schema/format.' },
      { title: 'Upload to the e-invoice portal', description: 'Submit invoice data through the notified portal or integrated software.' },
      { title: 'Generate IRN and QR code', description: 'Receive the system-generated Invoice Reference Number and QR code.' },
      { title: 'Share invoice with customer', description: 'Issue the finalized invoice including the IRN and QR code.' },
      { title: 'Record in books', description: 'Ensure the invoice is reflected correctly in your accounting records.' },
      { title: 'Reconcile with GST returns', description: 'Cross-check invoice data against your periodic GST filings.' },
      { title: 'Retain records', description: 'Store invoice and IRN records for the prescribed retention period.' },
    ],
    faqs: [
      { q: 'Is e-invoicing mandatory for all businesses?', a: 'No, it depends on turnover thresholds set by the authorities. Check current applicability on the official portal.' },
      { q: 'What is an IRN?', a: 'An Invoice Reference Number is a unique identifier generated by the government system for each valid e-invoice.' },
    ],
  },
  {
    name: 'TDS Filing',
    folder: 'tds-filing',
    category: 'TDS',
    short_description: 'Understand the process of filing Tax Deducted at Source (TDS) returns.',
    introduction: 'TDS Filing is the process of reporting tax deducted at source on specified payments, such as salaries or contractor payments, to the tax authorities on a periodic basis.',
    purpose: 'Filing TDS returns ensures deducted tax is properly credited to the payee\'s account and keeps the deductor compliant with withholding tax obligations.',
    eligibility: 'Businesses that are required to deduct tax at source on applicable payments generally need to file periodic TDS returns.',
    official_portal_name: 'TRACES / Income Tax e-Filing Portal',
    official_portal_url: 'https://www.tdscpc.gov.in/',
    important_information: 'Ensure deductee PAN details are accurate, as incorrect PAN entries are a common cause of return rejection or credit mismatches.',
    final_information: 'After filing, a provisional receipt is generated. TDS certificates (such as Form 16/16A equivalents) should be issued to deductees as applicable.',
    documents: ['TAN details', 'Deductee PAN details', 'Payment and deduction records', 'Challan details for tax deposited', 'Previous return filing acknowledgment'],
    steps: [
      { title: 'Gather deduction records', description: 'Compile all payments and corresponding tax deducted for the period.' },
      { title: 'Prepare the return file', description: 'Use the prescribed file format/utility to prepare your TDS return.' },
      { title: 'Validate the file', description: 'Run the file validation utility to check for errors.' },
      { title: 'Upload to the portal', description: 'Submit the validated file through the official filing system.' },
      { title: 'Verify using DSC/EVC', description: 'Complete verification through the applicable method.' },
      { title: 'Review acknowledgment', description: 'Check the provisional receipt for correctness.' },
      { title: 'Issue certificates', description: 'Generate and issue TDS certificates to deductees as required.' },
      { title: 'Retain records', description: 'Store filing records and challans for future reference.' },
    ],
    faqs: [
      { q: 'What happens if TDS is deducted but not deposited on time?', a: 'Interest and penalties may apply as per applicable law. Verify current provisions on the official portal.' },
    ],
  },
  {
    name: 'TDS Payment',
    folder: 'tds-payment',
    category: 'Payments',
    short_description: 'Understand how deducted TDS amounts are generally deposited with the government.',
    introduction: 'TDS Payment refers to depositing the tax amount deducted at source with the government within the prescribed timeline, using an authorized payment channel.',
    purpose: 'Timely deposit of deducted tax avoids interest and penalty, and ensures deductees receive proper credit for the tax withheld on their behalf.',
    eligibility: 'Any business or individual who has deducted TDS on applicable payments is generally required to deposit the deducted amount.',
    official_portal_name: 'e-Pay Tax (Income Tax Portal)',
    official_portal_url: 'https://www.incometax.gov.in/',
    important_information: 'Select the correct assessment year, payment code, and TAN before making payment. Errors in these fields are a common source of mismatched credit.',
    final_information: 'A challan with a unique identification number is generated after successful payment. Retain this for reconciliation with your TDS return.',
    documents: ['TAN', 'Details of amount deducted', 'Applicable assessment year', 'Bank account for payment', 'Nature of payment/section code'],
    steps: [
      { title: 'Open the official tax payment portal', description: 'Navigate to the e-Pay Tax section of the official portal.' },
      { title: 'Select TDS payment category', description: 'Choose the applicable challan type for TDS payment.' },
      { title: 'Enter TAN and details', description: 'Provide TAN, assessment year, and section/nature of payment.' },
      { title: 'Enter amount to be paid', description: 'Fill in the correct tax, interest, and fee breakup if applicable.' },
      { title: 'Choose payment method', description: 'Select net banking, debit card, or another available option.' },
      { title: 'Complete payment', description: 'Authorize the payment through your bank\'s secure process.' },
      { title: 'Download challan', description: 'Save the generated challan with the Challan Identification Number (CIN).' },
      { title: 'Update records', description: 'Record the challan details for use in your TDS return.' },
    ],
    faqs: [
      { q: 'What if I select the wrong assessment year?', a: 'Correction mechanisms exist but vary by process. Refer to official guidance to correct challan details.' },
    ],
  },
  {
    name: 'Advance Tax Payment',
    folder: 'advance-tax',
    category: 'Payments',
    short_description: 'Understand the general concept of paying advance tax in instalments.',
    introduction: 'Advance Tax is income tax paid in advance in instalments during the financial year, rather than as a lump sum at the end of the year, where applicable.',
    purpose: 'Paying advance tax on time helps avoid interest charges that may apply for deferred or short payment of tax liability.',
    eligibility: 'Businesses and individuals whose estimated tax liability exceeds the prescribed threshold for the year are generally required to pay advance tax.',
    official_portal_name: 'e-Pay Tax (Income Tax Portal)',
    official_portal_url: 'https://www.incometax.gov.in/',
    important_information: 'Estimate your income for the year as accurately as possible. Significant underestimation may lead to interest liability. Review your estimate each instalment period.',
    final_information: 'A challan is generated for each instalment paid. Retain all challans, as they will be needed when filing your annual income tax return.',
    documents: ['PAN', 'Estimated income and expense projections', 'Previous year tax details (for reference)', 'Bank account for payment'],
    steps: [
      { title: 'Estimate annual income', description: 'Project your income and tax liability for the financial year.' },
      { title: 'Open the official tax payment portal', description: 'Navigate to the e-Pay Tax section.' },
      { title: 'Select advance tax category', description: 'Choose the applicable challan type for advance tax.' },
      { title: 'Enter PAN and assessment year', description: 'Provide accurate identification and period details.' },
      { title: 'Enter instalment amount', description: 'Fill in the amount due for the current instalment period.' },
      { title: 'Choose payment method', description: 'Select an available secure payment option.' },
      { title: 'Complete payment', description: 'Authorize payment through your bank.' },
      { title: 'Save challan', description: 'Download and retain the challan for your records.' },
    ],
    faqs: [
      { q: 'What if my estimated income changes during the year?', a: 'You can generally adjust subsequent instalments based on revised estimates. Refer to official guidance for details.' },
    ],
  },
  {
    name: 'Tax Payment & Challan',
    folder: 'tax-payment-challan',
    category: 'Payments',
    short_description: 'Understand the general process for making tax payments and generating challans.',
    introduction: 'Tax Payment & Challan covers the general process of depositing various types of tax dues through the official portal and obtaining proof of payment.',
    purpose: 'A valid challan serves as legal proof of tax payment and is required when filing returns or responding to tax notices.',
    eligibility: 'Any taxpayer with an outstanding tax liability, of any applicable category, may need to make a payment through this process.',
    official_portal_name: 'e-Pay Tax (Income Tax Portal)',
    official_portal_url: 'https://www.incometax.gov.in/',
    important_information: 'Double-check the payment category and assessment year before submitting payment, as these determine how the payment is credited.',
    final_information: 'Save the generated challan receipt immediately after payment. It may not always be easy to retrieve later, so keep a personal copy.',
    documents: ['PAN/TAN as applicable', 'Assessment year', 'Payment category/type', 'Bank account details'],
    steps: [
      { title: 'Open the payment portal', description: 'Navigate to the official tax payment section.' },
      { title: 'Select payment type', description: 'Choose the correct category of tax being paid.' },
      { title: 'Enter identification details', description: 'Provide PAN/TAN and relevant assessment year.' },
      { title: 'Enter payment amount', description: 'Fill in the correct breakup of tax, interest, and penalty if applicable.' },
      { title: 'Select payment method', description: 'Choose from the available secure payment options.' },
      { title: 'Authorize payment', description: 'Complete the transaction through your bank\'s verification process.' },
      { title: 'Download challan', description: 'Save the challan with its unique reference number.' },
      { title: 'Retain for records', description: 'Store the challan safely for use in filings or future reference.' },
    ],
    faqs: [
      { q: 'What should I do if payment is deducted but no challan is generated?', a: 'Wait for confirmation, check your bank statement, and contact official support channels if the issue persists.' },
    ],
  },
  {
    name: 'Tax Deduction & Exemptions',
    folder: 'tax-deduction',
    category: 'Income Tax',
    short_description: 'Understand the general concept of deductions and exemptions available to businesses.',
    introduction: 'Tax Deductions and Exemptions are provisions that allow eligible expenses, investments, or categories of income to reduce overall taxable income, subject to conditions.',
    purpose: 'Understanding applicable deductions helps a business plan finances and legally reduce tax liability within the framework of the law.',
    eligibility: 'Eligibility for specific deductions or exemptions depends on business type, nature of expense, and category of income. Verify applicability carefully.',
    official_portal_name: 'Income Tax Department Portal',
    official_portal_url: 'https://www.incometax.gov.in/',
    important_information: 'Maintain proper documentary evidence for every deduction claimed. Claims without supporting proof are a common reason for scrutiny.',
    final_information: 'Deductions and exemptions are reflected in your income tax computation at the time of filing. Retain supporting documents even after filing.',
    documents: ['Investment proofs', 'Expense receipts', 'Business asset records', 'Loan/interest certificates (if applicable)', 'Insurance/other eligible payment proofs'],
    steps: [
      { title: 'Identify applicable provisions', description: 'Review which deductions or exemptions may apply to your business category.' },
      { title: 'Collect supporting documents', description: 'Gather receipts, certificates, and proofs for each claim.' },
      { title: 'Organize records by category', description: 'Sort documentation to match the relevant deduction heads.' },
      { title: 'Enter details during filing', description: 'Reflect eligible deductions accurately in your income tax return.' },
      { title: 'Cross-check computation', description: 'Verify that deductions are correctly reducing your taxable income.' },
      { title: 'Retain proofs', description: 'Keep all supporting documents safely even after submission.' },
      { title: 'Review for next year', description: 'Reassess your eligible deductions periodically as your business grows.' },
      { title: 'Consult a professional if unsure', description: 'For complex situations, consider professional guidance to avoid errors.' },
    ],
    faqs: [
      { q: 'Can every business expense be claimed as a deduction?', a: 'No. Only expenses meeting specific criteria under applicable law can be claimed. Verify each category carefully.' },
    ],
  },
  {
    name: 'Income & Expense Record Keeping',
    folder: 'income-expense',
    category: 'Documents',
    short_description: 'Understand good practices for maintaining income and expense records.',
    introduction: 'Income & Expense Record Keeping refers to systematically maintaining financial records of a business\'s earnings and expenditures for compliance and decision-making.',
    purpose: 'Accurate record keeping supports correct tax filing, simplifies audits, and provides a clear financial picture for business planning.',
    eligibility: 'All businesses, regardless of size, benefit from maintaining organized income and expense records. Certain categories may be legally required to do so.',
    official_portal_name: 'Income Tax Department Portal',
    official_portal_url: 'https://www.incometax.gov.in/',
    important_information: 'Keep records updated regularly rather than at year-end. Reconcile bank statements with your books periodically to catch errors early.',
    final_information: 'Well-maintained records make annual filing significantly smoother and reduce the risk of errors or missed deductions.',
    documents: ['Sales invoices', 'Purchase bills', 'Bank statements', 'Cash records', 'Payroll records (if applicable)', 'Asset purchase records'],
    steps: [
      { title: 'Choose a record-keeping method', description: 'Decide between manual registers, spreadsheets, or accounting software.' },
      { title: 'Record transactions regularly', description: 'Log income and expenses as they occur rather than in bulk later.' },
      { title: 'Categorize expenses', description: 'Group expenses under consistent categories for easier analysis.' },
      { title: 'Reconcile with bank statements', description: 'Match recorded transactions against actual bank activity periodically.' },
      { title: 'Back up records', description: 'Maintain secure digital or physical backups of financial records.' },
      { title: 'Review monthly summaries', description: 'Check periodic summaries to track business performance.' },
      { title: 'Prepare for filing season', description: 'Compile annual summaries ahead of tax filing deadlines.' },
      { title: 'Retain records long-term', description: 'Keep records for the legally prescribed retention period.' },
    ],
    faqs: [
      { q: 'How long should I keep financial records?', a: 'Retention periods vary by document type and applicable law. Check current requirements or consult a professional.' },
    ],
  },
  {
    name: 'Tax Document Management',
    folder: 'tax-document-management',
    category: 'Documents',
    short_description: 'Understand how to organize and manage tax-related documents.',
    introduction: 'Tax Document Management involves systematically organizing, storing, and retrieving documents required for tax compliance, filings, and potential audits.',
    purpose: 'Proper document management reduces stress during filing season and ensures you can respond quickly to any tax notice or verification request.',
    eligibility: 'Applicable to any business that files taxes, maintains GST records, or is otherwise subject to tax compliance requirements.',
    official_portal_name: 'Income Tax Department Portal',
    official_portal_url: 'https://www.incometax.gov.in/',
    important_information: 'Organize documents by financial year and category. Keep both digital and physical copies where feasible, and ensure backups are secure.',
    final_information: 'A well-organized document system allows quick access during filing, audits, or when responding to official queries.',
    documents: ['PAN/TAN/GSTIN copies', 'Filed return copies', 'Payment challans', 'Invoices and bills', 'Bank statements', 'Prior year assessment records'],
    steps: [
      { title: 'Create a folder structure', description: 'Set up folders by financial year and document category.' },
      { title: 'Digitize physical documents', description: 'Scan paper documents for secure digital storage.' },
      { title: 'Label files clearly', description: 'Use consistent, descriptive file names for easy retrieval.' },
      { title: 'Store securely', description: 'Use password-protected or access-controlled storage where possible.' },
      { title: 'Maintain backups', description: 'Keep at least one additional backup copy in a separate location.' },
      { title: 'Review periodically', description: 'Check your document set quarterly to ensure completeness.' },
      { title: 'Prepare for filing', description: 'Compile the relevant documents before each filing deadline.' },
      { title: 'Retain per requirement', description: 'Keep documents for the legally prescribed retention period.' },
    ],
    faqs: [
      { q: 'Should I keep digital copies or originals?', a: 'Both are useful. Digital copies aid quick access; originals may still be required for certain verifications.' },
    ],
  },
  {
    name: 'Tax Calendar & Due Dates',
    folder: 'tax-calendar',
    category: 'Documents',
    short_description: 'Understand how to track important tax-related due dates.',
    introduction: 'The Tax Calendar helps businesses track important filing and payment due dates across income tax, GST, and TDS obligations.',
    purpose: 'Tracking due dates helps avoid late fees, interest, and compliance issues that arise from missed deadlines.',
    eligibility: 'Relevant to any business that has ongoing tax filing or payment obligations of any applicable category.',
    official_portal_name: 'Income Tax Department / GST Portal',
    official_portal_url: 'https://www.incometax.gov.in/',
    important_information: 'Due dates can change based on official notifications. Always confirm the current due date on the relevant official portal before the deadline.',
    final_information: 'Maintaining a personal or business tax calendar, cross-checked against official announcements, helps ensure consistent compliance.',
    documents: ['List of applicable tax obligations', 'Registration details (PAN/TAN/GSTIN)', 'Previous compliance history'],
    steps: [
      { title: 'List applicable obligations', description: 'Identify every tax filing or payment relevant to your business.' },
      { title: 'Check official due dates', description: 'Refer to the official portal for the current schedule.' },
      { title: 'Set reminders', description: 'Use calendar reminders ahead of each due date.' },
      { title: 'Prepare documents in advance', description: 'Gather required information before the deadline approaches.' },
      { title: 'Monitor for notifications', description: 'Watch for official updates that may shift due dates.' },
      { title: 'Complete filing/payment on time', description: 'Submit filings or payments within the applicable window.' },
      { title: 'Record completion', description: 'Note completed obligations to track your compliance history.' },
      { title: 'Review calendar periodically', description: 'Update your tracking system as your business obligations change.' },
    ],
    faqs: [
      { q: 'Do due dates ever get extended?', a: 'Occasionally, authorities may extend deadlines. Always check official announcements rather than assuming an extension.' },
    ],
  },
  {
    name: 'Tax Refund Status',
    folder: 'tax-refund',
    category: 'Income Tax',
    short_description: 'Understand how to generally track the status of a tax refund.',
    introduction: 'Tax Refund Status tracking allows a taxpayer to check the progress of a refund due after excess tax has been paid or deducted.',
    purpose: 'Tracking refund status helps you know when to expect funds and identify any issues that may need follow-up action.',
    eligibility: 'Applicable to any taxpayer who has filed a return resulting in a refund due, based on excess tax paid or deducted.',
    official_portal_name: 'Income Tax e-Filing Portal',
    official_portal_url: 'https://www.incometax.gov.in/',
    important_information: 'Ensure your bank account is validated and linked correctly on the portal, as this is a common reason for refund delays.',
    final_information: 'Once processed, the refund is credited directly to your validated bank account. Retain the refund confirmation for your records.',
    documents: ['PAN', 'Filed return acknowledgment', 'Bank account details (validated)', 'Assessment year reference'],
    steps: [
      { title: 'Log in to the official portal', description: 'Access your account using your PAN-linked credentials.' },
      { title: 'Navigate to refund status', description: 'Find the refund tracking section within the portal.' },
      { title: 'Enter relevant details', description: 'Provide the assessment year and any requested reference numbers.' },
      { title: 'Check current status', description: 'Review the displayed processing stage of your refund.' },
      { title: 'Verify bank details if prompted', description: 'Ensure your bank account is validated if the portal flags an issue.' },
      { title: 'Note any discrepancies', description: 'Record any mismatches for follow-up with official support.' },
      { title: 'Wait for credit confirmation', description: 'Refunds are typically credited after processing is complete.' },
      { title: 'Retain confirmation', description: 'Save the refund credit confirmation for your financial records.' },
    ],
    faqs: [
      { q: 'Why is my refund delayed?', a: 'Delays can occur due to bank validation issues, return scrutiny, or processing backlogs. Check official status updates for details.' },
    ],
  },
  {
    name: 'Tax Notice & Compliance Guidance',
    folder: 'tax-notice',
    category: 'Income Tax',
    short_description: 'Understand general guidance on responding to tax notices.',
    introduction: 'A Tax Notice is official communication from the tax authority regarding discrepancies, clarifications, or compliance requirements related to your filings.',
    purpose: 'Understanding how to respond to a notice helps ensure timely compliance and reduces the risk of further escalation.',
    eligibility: 'Relevant to any taxpayer who has received an official notice or communication from the tax department.',
    official_portal_name: 'Income Tax e-Filing Portal',
    official_portal_url: 'https://www.incometax.gov.in/',
    important_information: 'Always verify that a notice is genuine by checking it through the official portal. Do not respond to suspicious emails or calls claiming to be tax authorities requesting sensitive information.',
    final_information: 'Responding within the specified timeline through official channels helps resolve most notices smoothly. Keep a copy of your response and any related correspondence.',
    documents: ['Copy of the notice', 'Related filed return', 'Supporting documents relevant to the notice', 'Prior correspondence (if any)'],
    steps: [
      { title: 'Verify the notice', description: 'Confirm authenticity by logging into the official portal directly, not through links in emails.' },
      { title: 'Read the notice carefully', description: 'Understand exactly what clarification or action is being requested.' },
      { title: 'Gather relevant documents', description: 'Compile records that support your position or clarify the discrepancy.' },
      { title: 'Draft your response', description: 'Prepare a clear, factual response addressing each point raised.' },
      { title: 'Submit through official channels', description: 'Respond using the designated portal section, not external communication.' },
      { title: 'Track acknowledgment', description: 'Confirm your response has been recorded successfully.' },
      { title: 'Follow up if needed', description: 'Monitor for further communication or requests for clarification.' },
      { title: 'Retain records', description: 'Keep copies of the notice and your response for future reference.' },
    ],
    faqs: [
      { q: 'How do I know if a notice is genuine?', a: 'Always verify directly through the official portal rather than trusting links, calls, or messages claiming urgency.' },
    ],
  },
  {
    name: 'PAN Services',
    folder: 'pan-services',
    category: 'Documents',
    short_description: 'Understand the general process for PAN-related services.',
    introduction: 'PAN (Permanent Account Number) Services cover processes such as applying for a new PAN, updating details, or reprinting a PAN card.',
    purpose: 'A valid PAN is required for most financial and tax-related transactions, including filing returns and opening business bank accounts.',
    eligibility: 'Applicable to businesses and individuals who need to apply for, update, or reissue a PAN.',
    official_portal_name: 'Protean (NSDL) / UTIITSL PAN Services Portal',
    official_portal_url: 'https://www.protean-tinpan.com/',
    important_information: 'Ensure the name and details entered match your official identity documents exactly, as mismatches can delay processing.',
    final_information: 'Once processed, the PAN card is issued physically and/or digitally, depending on the option selected during application.',
    documents: ['Identity proof', 'Address proof', 'Date of birth proof', 'Business registration proof (for entities)', 'Photograph (for individual applicants)'],
    steps: [
      { title: 'Open the official PAN services portal', description: 'Navigate to the appropriate application section.' },
      { title: 'Choose the applicable service', description: 'Select new application, correction, or reprint as needed.' },
      { title: 'Fill in the application form', description: 'Enter details exactly as per your supporting documents.' },
      { title: 'Upload required documents', description: 'Attach scanned proofs in the specified format.' },
      { title: 'Make the applicable payment', description: 'Pay the prescribed fee through the available payment methods.' },
      { title: 'Complete verification', description: 'Verify using the applicable method (e-KYC, DSC, or physical submission).' },
      { title: 'Track application status', description: 'Use the acknowledgment number to monitor progress.' },
      { title: 'Receive PAN card', description: 'Collect the physical card and/or download the e-PAN once issued.' },
    ],
    faqs: [
      { q: 'Can I apply for PAN correction online?', a: 'Yes, correction requests can generally be submitted online through the official portal.' },
    ],
  },
  {
    name: 'TAN Services',
    folder: 'tan-services',
    category: 'Documents',
    short_description: 'Understand the general process for TAN-related services.',
    introduction: 'TAN (Tax Deduction and Collection Account Number) Services cover applying for or updating the number required by entities that deduct or collect tax at source.',
    purpose: 'A valid TAN is mandatory for any business responsible for deducting TDS, and is required when filing TDS returns.',
    eligibility: 'Applicable to businesses or individuals who are required to deduct or collect tax at source.',
    official_portal_name: 'Protean (NSDL) TAN Services Portal',
    official_portal_url: 'https://www.protean-tinpan.com/',
    important_information: 'Double-check business name and address details before submission, as these appear on the official TAN allotment letter.',
    final_information: 'Once allotted, the TAN should be used consistently across all TDS-related filings and payments.',
    documents: ['Business registration proof', 'Identity proof of applicant', 'Address proof of business', 'Existing PAN of the business (if applicable)'],
    steps: [
      { title: 'Open the official TAN application portal', description: 'Navigate to the new TAN application section.' },
      { title: 'Select applicant category', description: 'Choose the category matching your business structure.' },
      { title: 'Fill in application details', description: 'Provide accurate business and contact information.' },
      { title: 'Upload or submit documents', description: 'Provide required proofs as per the selected submission method.' },
      { title: 'Pay the applicable fee', description: 'Complete payment through the available methods.' },
      { title: 'Submit the application', description: 'Confirm and submit the completed form.' },
      { title: 'Track status', description: 'Use the acknowledgment number to check processing status.' },
      { title: 'Receive TAN allotment letter', description: 'Save the letter once TAN is allotted.' },
    ],
    faqs: [
      { q: 'Does every business need a TAN?', a: 'Only businesses required to deduct or collect tax at source generally need a TAN. Verify applicability for your case.' },
    ],
  },
  {
    name: 'Business Tax Registration',
    folder: 'business-tax-registration',
    category: 'Documents',
    short_description: 'Understand general registration requirements for a new business from a tax perspective.',
    introduction: 'Business Tax Registration covers the various registrations a new business may need, such as PAN, TAN, GST, and other applicable licenses, from a tax compliance standpoint.',
    purpose: 'Proper registration at the start of a business ensures smooth tax compliance and avoids penalties for operating without required registrations.',
    eligibility: 'Applicable to anyone starting a new business who needs to determine which tax registrations apply to their business type and turnover.',
    official_portal_name: 'Income Tax / GST Portal',
    official_portal_url: 'https://www.incometax.gov.in/',
    important_information: 'Registration requirements vary by business structure (proprietorship, partnership, company, etc.) and turnover. Confirm the exact requirements applicable to your business before proceeding.',
    final_information: 'Once all applicable registrations are complete, maintain the certificates and numbers together for easy reference during compliance activities.',
    documents: ['Business structure documents', 'Identity and address proof of owners/partners/directors', 'Business address proof', 'Bank account details'],
    steps: [
      { title: 'Determine applicable registrations', description: 'Identify which tax registrations (PAN, TAN, GST, etc.) apply to your business.' },
      { title: 'Gather common documents', description: 'Compile identity, address, and business proofs needed across registrations.' },
      { title: 'Apply for PAN', description: 'Complete PAN application if not already obtained.' },
      { title: 'Apply for TAN if applicable', description: 'Register for TAN if your business will deduct tax at source.' },
      { title: 'Apply for GST if applicable', description: 'Complete GST registration if turnover or business type requires it.' },
      { title: 'Track each application', description: 'Monitor status across all submitted registrations.' },
      { title: 'Collect certificates', description: 'Save all issued registration certificates and numbers.' },
      { title: 'Set up compliance calendar', description: 'Note ongoing filing obligations tied to each registration.' },
    ],
    faqs: [
      { q: 'Do I need GST registration from day one?', a: 'Not necessarily — it depends on your turnover and business category. Verify current thresholds on the official portal.' },
    ],
  },
  {
    name: 'Tax Compliance Checklist',
    folder: 'tax-compliance',
    category: 'Documents',
    short_description: 'Understand a general checklist approach to ongoing tax compliance.',
    introduction: 'A Tax Compliance Checklist helps a business track recurring obligations across income tax, GST, and TDS to reduce the risk of missed deadlines or filings.',
    purpose: 'Using a checklist approach improves consistency in compliance and provides a quick reference during audits or reviews.',
    eligibility: 'Useful for any business seeking a structured way to track its ongoing tax obligations.',
    official_portal_name: 'Income Tax / GST Portal',
    official_portal_url: 'https://www.incometax.gov.in/',
    important_information: 'A checklist is a planning aid, not a substitute for professional advice. Requirements vary by business and should be verified individually.',
    final_information: 'Review and update your compliance checklist periodically as regulations or your business circumstances change.',
    documents: ['List of applicable registrations (PAN/TAN/GSTIN)', 'Filing history', 'Previous compliance records'],
    steps: [
      { title: 'List all applicable obligations', description: 'Identify every recurring tax filing or payment relevant to your business.' },
      { title: 'Assign due dates', description: 'Map each obligation to its applicable due date.' },
      { title: 'Assign responsibility', description: 'Note who within the business is responsible for each item.' },
      { title: 'Track document readiness', description: 'Confirm supporting documents are prepared ahead of each deadline.' },
      { title: 'Mark completion status', description: 'Update the checklist as each obligation is completed.' },
      { title: 'Review for missed items', description: 'Periodically audit the checklist for gaps.' },
      { title: 'Update for regulatory changes', description: 'Revise the checklist when rules or thresholds change.' },
      { title: 'Retain historical checklists', description: 'Keep past checklists as a reference for future periods.' },
    ],
    faqs: [
      { q: 'Can this checklist replace professional advice?', a: 'No. It is a general planning aid. For specific situations, consult a qualified tax professional.' },
    ],
  },
  {
    name: 'Tax FAQs & Help',
    folder: 'tax-faq',
    category: 'FAQs',
    short_description: 'A general help section answering common tax-related questions.',
    introduction: 'The Tax FAQs & Help section brings together commonly asked questions from small business owners about digital tax processes.',
    purpose: 'This section helps clarify frequently misunderstood aspects of tax filing and compliance in a simple, accessible format.',
    eligibility: 'Open to all users of the platform seeking general clarification on tax-related topics.',
    official_portal_name: 'Income Tax Department Portal',
    official_portal_url: 'https://www.incometax.gov.in/',
    important_information: 'FAQ answers are general in nature and may not cover every specific circumstance. For complex or unusual situations, consult a tax professional or the official portal.',
    final_information: 'If your question is not answered here, use the Contact form to reach out for more information.',
    documents: ['No specific documents required to browse this section'],
    steps: [
      { title: 'Browse by category', description: 'Use categories such as Income Tax, GST, TDS, or Payments to find relevant questions.' },
      { title: 'Search for keywords', description: 'Use the search function to quickly locate a specific topic.' },
      { title: 'Read the full answer', description: 'Expand the FAQ to read the complete explanation.' },
      { title: 'Check related services', description: 'Visit the related service guide for more in-depth information.' },
      { title: 'Verify on official portal', description: 'Cross-check important details on the relevant official government portal.' },
      { title: 'Use the contact form', description: 'Reach out through the Contact page if your question remains unanswered.' },
      { title: 'Provide feedback', description: 'Let us know if an FAQ was unclear so it can be improved.' },
      { title: 'Return as needed', description: 'Revisit this section whenever new questions arise.' },
    ],
    faqs: [
      { q: 'Is this platform an official government service?', a: 'No. This platform provides general guidance only. All actual filing and payment should be done through the official government portal.' },
    ],
  },
  {
    name: 'Tax Safety & Fraud Awareness',
    folder: 'tax-safety',
    category: 'Safety',
    short_description: 'Understand common digital safety precautions related to tax processes.',
    introduction: 'Tax Safety & Fraud Awareness covers precautions to protect yourself from fraudulent websites, phishing attempts, and scams related to tax filing and payments.',
    purpose: 'Awareness of common fraud tactics helps protect your financial information and prevents unauthorized transactions.',
    eligibility: 'Relevant to every user who interacts with digital tax or financial services.',
    official_portal_name: 'Income Tax Department Portal',
    official_portal_url: 'https://www.incometax.gov.in/',
    important_information: 'Never share your OTP, passwords, or PINs with anyone, including anyone claiming to represent a tax department or this platform. Always verify official portal URLs directly.',
    final_information: 'When in doubt about the authenticity of a message, call, or website, do not proceed. Verify independently using official contact information.',
    documents: ['No specific documents required for this section'],
    steps: [
      { title: 'Verify the official URL', description: 'Always type or bookmark the official portal address directly rather than clicking links from messages.' },
      { title: 'Check for secure connection indicators', description: 'Look for standard browser security indicators before entering information.' },
      { title: 'Never share OTPs or PINs', description: 'No legitimate authority will ask you to share an OTP or PIN over call or message.' },
      { title: 'Be cautious with unsolicited messages', description: 'Treat unexpected emails, SMS, or calls about refunds or dues with caution.' },
      { title: 'Avoid suspicious attachments/links', description: 'Do not open attachments or links from unverified sources.' },
      { title: 'Use secure networks', description: 'Avoid conducting tax transactions over public or unsecured Wi-Fi.' },
      { title: 'Report suspicious activity', description: 'Report phishing attempts through official channels.' },
      { title: 'Stay informed', description: 'Periodically review official advisories about known scam patterns.' },
    ],
    faqs: [
      { q: 'Will this platform ever ask for my OTP or password?', a: 'No. This platform never asks for OTPs, portal passwords, bank passwords, UPI PINs, or card PINs.' },
    ],
  },
];

function buildSeedSQL() {
  const lines = [];
  lines.push('-- ============================================================');
  lines.push('-- Digital Tax Filing Support for Small Businesses');
  lines.push('-- Seed Data (auto-generated by database/generate-seed.js)');
  lines.push('-- ============================================================');
  lines.push('');
  lines.push('USE digital_tax_support;');
  lines.push('');
  lines.push('SET FOREIGN_KEY_CHECKS = 0;');
  lines.push('TRUNCATE TABLE service_faqs;');
  lines.push('TRUNCATE TABLE service_steps;');
  lines.push('TRUNCATE TABLE service_documents;');
  lines.push('TRUNCATE TABLE tax_calendar;');
  lines.push('TRUNCATE TABLE feedback;');
  lines.push('TRUNCATE TABLE contact_requests;');
  lines.push('TRUNCATE TABLE login_activity;');
  lines.push('TRUNCATE TABLE services;');
  lines.push('TRUNCATE TABLE users;');
  lines.push('SET FOREIGN_KEY_CHECKS = 1;');
  lines.push('');

  // --- Admin + sample user ---
  // Password hash below corresponds to bcrypt hash of a placeholder password.
  // IMPORTANT: Change this password immediately after first login in a real deployment.
  // The hash below is generated for the placeholder password: "ChangeMe@123"
  const ADMIN_HASH = '$2b$10$K1s7f0qX0F3kQ0m3v4Yv9uQfXQlA8m0m8m2s0P8yq3nWc3l6a3s0G'; // placeholder, replaced at bottom
  lines.push('-- Admin user: email admin@digitaltaxsupport.local');
  lines.push('-- Placeholder password: ChangeMe@123 (CHANGE THIS IMMEDIATELY AFTER FIRST LOGIN)');
  lines.push('-- The password_hash below must be generated using bcrypt. See backend/src/utils/hashPassword.js');
  lines.push(
    `INSERT INTO users (name, email, password_hash, role, status) VALUES (${esc('Platform Admin')}, ${esc('admin@digitaltaxsupport.local')}, ${esc('__ADMIN_HASH__')}, 'admin', 'active');`
  );
  lines.push(
    `INSERT INTO users (name, email, password_hash, role, status) VALUES (${esc('Sample Business Owner')}, ${esc('demo.user@digitaltaxsupport.local')}, ${esc('__DEMO_HASH__')}, 'user', 'active');`
  );
  lines.push('');

  // --- Services ---
  // Actual image filenames per folder (filesystem is the source of truth).
  // Some folders use _intro/_step_01/_complete, others use numbered 1/2/3.
  const IMAGE_FILENAMES = {
    'advance-tax':              ['advance-tax_intro.png',                     'advance-tax_step_01.png',                     'advance-tax_complete.png'],
    'business-tax-registration':['business-tax-registration_intro.png',       'business-tax-registration_step_01.png',       'business-tax-registration_complete.png'],
    'gst-invoice':              ['gst-invoice_intro.png',                     'gst-invoice_step_01.png',                     'gst-invoice_complete.png'],
    'gst-registration':         ['gst-registration_intro.png',                'gst-registration_step_01.png',                'gst-registration_complete.png'],
    'gst-return-filing':        ['gst-return-filing_intro.png',               'gst-return-filing_step_01.png',               'gst-return-filing_complete.png'],
    'income-expense':           ['income-expense_intro.png',                  'income-expense_step_01.png',                  'income-expense_complete.png'],
    'income-tax':               ['income-tax_intro.png',                      'income-tax_step_01.png',                      'income-tax_complete.png'],
    'pan-services':             ['pan-services_intro.png',                    'pan-services_step_01.png',                    'pan-services_complete.png'],
    'tan-services':             ['tan-services_intro.png',                    'tan-services_step_01.png',                    'tan-services_complete.png'],
    'tax-calendar':             ['tax-calendar_intro.png',                    'tax-calendar_step_01.png',                    'tax-calendar_complete.png'],
    'tax-compliance':           ['tax-compliance_intro.png',                  'tax-compliance_step_01.png',                  'tax-compliance_complete.png'],
    'tax-deduction':            ['tax-deducation1.png',                       'tax-deducation2.png',                         'tax-deducation3.png'],
    'tax-document-management':  ['tax-document1.png',                         'tax-document2.png',                           'tax-document3.png'],
    'tax-faq':                  ['tax-faq1.png',                              'tax-faq2.png',                                'tax-faq3.png'],
    'tax-notice':               ['tax-notice1.png',                           'tax-notice2.png',                             'tax-notice3.png'],
    'tax-payment-challan':      ['tax-payment1.png',                          'tax-payment2.png',                            'tax-payment3.png'],
    'tax-refund':               ['tax-refund1.png',                           'tax-refund2.png',                             'tax-refund3.png'],
    'tax-safety':               ['tax-safety1.png',                           'tax-safety2.png',                             'tax-safety3.png'],
    'tds-filing':               ['tds-filling1.png',                          'tds-filling2.png',                            'tds-filling3.png'],
    'tds-payment':              ['tds-payment1.png',                          'tds-payment2.png',                            'tsd-payment3.png'],
  };

  SERVICES.forEach((svc, idx) => {
    const slug = slugify(svc.name);
    const fnames = IMAGE_FILENAMES[svc.folder] || [`${svc.folder}_intro.png`, `${svc.folder}_step_01.png`, `${svc.folder}_complete.png`];
    const introImg = `services/${svc.folder}/${fnames[0]}`;
    const midImg   = `services/${svc.folder}/${fnames[1]}`;
    const finalImg = `services/${svc.folder}/${fnames[2]}`;

    lines.push(`-- Service ${idx + 1}: ${svc.name}`);
    lines.push(
      `INSERT INTO services (name, slug, short_description, introduction, purpose, eligibility, charges, official_portal_name, official_portal_url, important_information, final_information, intro_image, middle_image, final_image, display_order) VALUES (` +
      [
        esc(svc.name), esc(slug), esc(svc.short_description), esc(svc.introduction), esc(svc.purpose),
        esc(svc.eligibility), esc(GENERIC_CHARGES), esc(svc.official_portal_name), esc(svc.official_portal_url),
        esc(svc.important_information + ' ' + PORTAL_PLACEHOLDER_NOTE), esc(svc.final_information),
        esc(introImg), esc(midImg), esc(finalImg), idx + 1,
      ].join(', ') + ');'
    );
    lines.push(`SET @svc_id = LAST_INSERT_ID();`);

    svc.documents.forEach((doc, i) => {
      lines.push(`INSERT INTO service_documents (service_id, document_name, display_order) VALUES (@svc_id, ${esc(doc)}, ${i + 1});`);
    });

    svc.steps.forEach((step, i) => {
      lines.push(
        `INSERT INTO service_steps (service_id, step_number, step_title, step_description) VALUES (@svc_id, ${i + 1}, ${esc(step.title)}, ${esc(step.description)});`
      );
    });

    svc.faqs.forEach((faq) => {
      lines.push(
        `INSERT INTO service_faqs (service_id, category, question, answer) VALUES (@svc_id, ${esc(svc.category)}, ${esc(faq.q)}, ${esc(faq.a)});`
      );
    });

    lines.push('');
  });

  // --- General (non-service-specific) FAQs ---
  lines.push('-- General platform FAQs (service_id NULL)');
  const generalFaqs = [
    { category: 'Safety', q: 'Does this platform store my OTP or passwords?', a: 'No. This platform never collects OTPs, government portal passwords, bank passwords, UPI PINs, or card PINs.' },
    { category: 'Income Tax', q: 'Is this platform an official government portal?', a: 'No. This platform is an awareness and guidance tool. All actual filing and payment must be completed on the relevant official government portal.' },
    { category: 'Documents', q: 'Where can I see all documents required for a service?', a: 'Each service detail page includes a Documents/Information Required checklist specific to that service.' },
  ];
  generalFaqs.forEach((faq) => {
    lines.push(`INSERT INTO service_faqs (service_id, category, question, answer) VALUES (NULL, ${esc(faq.category)}, ${esc(faq.q)}, ${esc(faq.a)});`);
  });
  lines.push('');

  // --- Tax calendar seed (mock/sample; real dates must be verified on official portal) ---
  lines.push('-- Sample tax calendar entries (verify actual due dates on the official portal)');
  const calendarSeeds = [
    { title: 'Quarterly TDS Return Filing (Sample)', days: 20, desc: 'Sample placeholder date for quarterly TDS return filing. Verify exact due date on the official portal.' },
    { title: 'GST Monthly Return Filing (Sample)', days: 10, desc: 'Sample placeholder date for monthly GST return filing. Verify exact due date on the official portal.' },
    { title: 'Advance Tax Instalment (Sample)', days: 45, desc: 'Sample placeholder date for an advance tax instalment. Verify exact due date on the official portal.' },
    { title: 'Annual Income Tax Return Filing (Sample)', days: 90, desc: 'Sample placeholder date for annual income tax return filing. Verify exact due date on the official portal.' },
  ];
  calendarSeeds.forEach((c) => {
    lines.push(
      `INSERT INTO tax_calendar (title, due_date, description, status) VALUES (${esc(c.title)}, DATE_ADD(CURDATE(), INTERVAL ${c.days} DAY), ${esc(c.desc)}, 'upcoming');`
    );
  });
  lines.push('');

  return lines.join('\n');
}

const sql = buildSeedSQL();
fs.writeFileSync(path.join(__dirname, 'seed.sql'), sql, 'utf8');
console.log('seed.sql generated with', SERVICES.length, 'services.');
