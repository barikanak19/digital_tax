import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchServiceDetails } from '../services/serviceService';
import ServiceHeader from '../components/ServiceHeader';
import ServiceImage from '../components/ServiceImage';
import DocumentChecklist from '../components/DocumentChecklist';
import FeeCard from '../components/FeeCard';
import StepGuide from '../components/StepGuide';
import OfficialPortalButton from '../components/OfficialPortalButton';
import FAQAccordion from '../components/FAQAccordion';
import SafetyTips from '../components/SafetyTips';
import FeedbackForm from '../components/FeedbackForm';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { resolveImageSlug } from '../data/serviceImageMap';

function Section({ title, children }) {
  return (
    <section className="mt-6">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function ServiceDetails() {
  const { serviceId } = useParams();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('loading');

  const load = () => {
    setStatus('loading');
    fetchServiceDetails(serviceId)
      .then((res) => {
        setData(res.data);
        setStatus('success');
      })
      .catch(() => setStatus('error'));
  };

  useEffect(load, [serviceId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (status === 'loading') return <div className="container section"><LoadingState label="Loading service guide..." /></div>;
  if (status === 'error' || !data) return <div className="container section"><ErrorState onRetry={load} /></div>;

  const { service, documents, steps, faqs } = data;

  // Map the raw DB slug to the image-folder slug used in SERVICE_IMAGE_MAP.
  const imageSlug = resolveImageSlug(service.slug);

  return (
    <div className="container section">
      <Link to="/services" className="text-muted">&larr; Back to all services</Link>

      {/* 1. Service Header */}
      <div className="mt-4">
        <ServiceHeader service={service} />
      </div>

      {/* Main service image — same image used on the Services listing card */}
      <div className="mt-4">
        <ServiceImage slug={imageSlug} role="card" alt={`${service.name} service illustration`} />
      </div>

      {/* 2. Introduction */}
      <Section title="Introduction">
        <p>{service.introduction}</p>
      </Section>

      {/* 3. Intro Image */}
      <Section title="Overview">
        <ServiceImage slug={imageSlug} role="intro" path={service.intro_image} alt={`${service.name} overview illustration`} />
      </Section>

      {/* 4. What is it used for? */}
      <Section title="What Is It Used For?">
        <p>{service.purpose}</p>
      </Section>

      {/* 4. Eligibility / Applicability */}
      <Section title="Eligibility / Applicability">
        <p>{service.eligibility}</p>
      </Section>

      {/* 5. Charges / Fees */}
      <Section title="Charges / Fees">
        <FeeCard charges={service.charges} />
      </Section>

      {/* 6. Documents / Information Required */}
      <Section title="Documents / Information Required">
        <div className="card">
          <DocumentChecklist documents={documents} />
        </div>
      </Section>

      {/* 7. Official Portal */}
      <Section title="Official Portal">
        <div className="card">
          <h3 className="mb-1">{service.official_portal_name}</h3>
          <p>Use the official portal to complete your actual filing, registration, or payment.</p>
          <a href={service.official_portal_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Visit Official Portal →
          </a>
        </div>
      </Section>

      {/* 8. How to Register / Apply / File */}
      <Section title="How to Register / Apply / File">
        <StepGuide steps={steps} />
      </Section>

      {/* 9. Middle Process Theory */}
      <Section title="Understanding the Process">
        <p>This step-by-step guide ensures you complete each phase correctly. Follow the sequence carefully to avoid errors or delays in your tax filing process.</p>
      </Section>

      {/* 10. Middle process image */}
      <Section title="Process Illustration">
        <ServiceImage slug={imageSlug} role="step" path={service.middle_image} alt={`${service.name} process illustration`} />
      </Section>

      {/* 11. Important Information */}
      <Section title="Important Information">
        <div className="alert alert-info">{service.important_information}</div>
      </Section>

      {/* 12. Final / Completion Theory */}
      <Section title="Final Step">
        <p>{service.final_information}</p>
      </Section>

      {/* 13. Final Image */}
      <Section title="Completion Illustration">
        <ServiceImage slug={imageSlug} role="complete" path={service.final_image} alt={`${service.name} completion illustration`} />
      </Section>

      {/* 14. FAQs */}
      <Section title="Frequently Asked Questions">
        <FAQAccordion faqs={faqs} />
      </Section>

      {/* 15. Safety Tips */}
      <Section title="Safety Tips">
        <SafetyTips />
      </Section>

      {/* 16. Final Official Portal Button */}
      <div className="mt-6">
        <OfficialPortalButton portalName={service.official_portal_name} portalUrl={service.official_portal_url} />
      </div>

      <div className="mt-6">
        <FeedbackForm serviceId={service.id} />
      </div>
    </div>
  );
}
