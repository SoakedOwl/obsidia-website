import Link from 'next/link';

export const metadata = {
  title: 'Terms and Conditions — Obsidia',
  description: 'Terms governing your use of the Obsidia platform and services.',
};

const SECTIONS = [
  {
    n: '01',
    title: 'Agreement to Terms',
    content: `These Terms and Conditions ("Terms") constitute a legally binding agreement between Advanced Solution s.r.o., a company incorporated under the laws of the Slovak Republic ("Company", "OBSIDIA", "we", "us", or "our"), and you, the business entity or individual accessing our Services ("Client" or "you").

By registering for, accessing, or using the OBSIDIA platform and any related services at obsidia.space (collectively, the "Services"), you confirm that you have read, understood, and agree to be bound by these Terms. If you do not agree, you must not use our Services.

You represent that you are authorised to enter into this agreement on behalf of the organisation you represent, and that such organisation is a legal business entity. Our Services are not intended for consumers or individuals acting in a personal capacity.`,
  },
  {
    n: '02',
    title: 'Description of Services',
    content: 'OBSIDIA is a Software-as-a-Service (SaaS) platform that provides business clients with:',
    items: [
      'Workflow Automation — design, deployment, and management of automated business processes and integrations',
      'Website Development — creation and management of professional websites and web presences',
      'Application Development — custom web application development and deployment services',
    ],
    footer: 'The specific Services available to you depend on your chosen subscription plan or agreed one-time engagement. We reserve the right to modify, expand, or discontinue any feature or Service component at any time, with reasonable notice where such changes materially affect your use.',
  },
  {
    n: '03',
    title: 'Account Registration and Security',
    content: 'To access the Services, you must register for an account. You agree to:',
    items: [
      'Provide accurate, current, and complete information during registration',
      'Maintain and update your account information to keep it accurate',
      'Keep your login credentials confidential and not share them with unauthorised parties',
      'Notify us immediately at support@obsidia.space of any unauthorised access or security breach',
      'Take responsibility for all activity that occurs under your account',
    ],
    footer: 'We reserve the right to suspend or terminate accounts that violate these Terms, provide false information, or engage in fraudulent or harmful activity.',
  },
  {
    n: '04',
    title: 'Subscriptions, Payments, and Billing',
    subsections: [
      {
        title: 'Plans and Pricing',
        content: 'OBSIDIA offers Services on a subscription basis (monthly or annual) and through one-time project engagements. Pricing for each plan is set out on our platform and may be updated from time to time. We will provide at least 30 days\' notice of any price changes affecting active subscriptions.',
      },
      {
        title: 'Payment Processing',
        content: 'All payments are processed securely through Stripe, Inc. By providing your payment details, you authorise us to charge the applicable fees to your chosen payment method. You represent that you are authorised to use the payment method provided. We do not store full payment card data on our systems.',
      },
      {
        title: 'Subscription Billing',
        content: 'Subscriptions are billed in advance on a recurring basis (monthly or annually, as selected). Your subscription will automatically renew at the end of each billing period unless you cancel before the renewal date.',
      },
      {
        title: 'Cancellation and Refunds',
        content: 'You may cancel your subscription at any time through your account settings or by contacting support@obsidia.space. Cancellation takes effect at the end of the current billing period; you will retain access to the Services until that date. We do not provide refunds for partial billing periods, except where required by applicable law or at our sole discretion. For one-time project engagements, refund terms are governed by the individual project agreement or statement of work agreed between the parties.',
      },
      {
        title: 'Late Payments',
        content: 'If payment is not received by the due date, we reserve the right to suspend access to the Services until the outstanding balance is settled. Continued non-payment may result in termination of the account and referral to a collections process.',
      },
    ],
  },
  {
    n: '05',
    title: 'Acceptable Use Policy',
    content: 'You agree to use the Services only for lawful business purposes and in accordance with these Terms. You must not:',
    items: [
      'Use the Services to violate any applicable local, national, or international law or regulation',
      'Upload, transmit, or process any data that is unlawful, fraudulent, defamatory, obscene, or harmful',
      'Attempt to gain unauthorised access to our systems, other accounts, or any related networks',
      'Use the Services to infringe the intellectual property rights of any third party',
      'Introduce viruses, malware, or other harmful code into the platform',
      'Engage in any activity that disrupts, damages, or impairs the integrity or performance of the Services',
      'Resell or sublicense access to the Services without our prior written consent',
      'Use automated tools to scrape, crawl, or extract data from the platform without authorisation',
    ],
    footer: 'We reserve the right to investigate and take appropriate action, including immediate suspension or termination, against any account we reasonably believe to be in breach of this policy.',
  },
  {
    n: '06',
    title: 'Intellectual Property',
    subsections: [
      {
        title: 'OBSIDIA Platform',
        content: 'All intellectual property rights in the OBSIDIA platform, including its software, design, trademarks, logos, and content (excluding Client Data), are owned by or licensed to Advanced Solution s.r.o. Nothing in these Terms grants you any ownership rights in the platform or its underlying technology.',
      },
      {
        title: 'Client Data',
        content: 'You retain all ownership rights to data, content, and materials you upload to or create using the Services ("Client Data"). You grant us a limited, non-exclusive licence to process, store, and use Client Data solely to provide and improve the Services.',
      },
      {
        title: 'Feedback',
        content: 'If you provide feedback, suggestions, or ideas about our Services, you grant us a perpetual, royalty-free licence to use such feedback without restriction or compensation to you.',
      },
    ],
  },
  {
    n: '07',
    title: 'Confidentiality',
    content: `Each party may have access to confidential information of the other in connection with these Terms. Each party agrees to keep such information confidential, to use it only for the purposes of performing obligations under these Terms, and not to disclose it to third parties without prior written consent, except as required by law.

This obligation does not apply to information that is or becomes publicly available through no fault of the receiving party, was already known to the receiving party, or was independently developed without reference to the confidential information.`,
  },
  {
    n: '08',
    title: 'Data Protection',
    content: 'We process personal data in accordance with our Privacy Policy (available at obsidia.space) and applicable data protection law, including the General Data Protection Regulation (GDPR). Where we process personal data on your behalf as a data processor, we will comply with applicable obligations and enter into a Data Processing Agreement upon request. You are responsible for ensuring you have a lawful basis for sharing any personal data with us and for informing relevant individuals about such processing.',
  },
  {
    n: '09',
    title: 'Service Availability',
    content: 'We aim to provide reliable, high-availability Services, but we do not guarantee uninterrupted access. The Services may be temporarily unavailable due to:',
    items: [
      'Scheduled maintenance (we will provide advance notice where possible)',
      'Unscheduled outages, technical failures, or circumstances beyond our reasonable control',
      'Security incidents or necessary emergency interventions',
    ],
    footer: 'We are not liable for losses or damages arising from service interruptions, delays, or outages, except to the extent caused by our gross negligence or wilful misconduct.',
  },
  {
    n: '10',
    title: 'Limitation of Liability',
    content: 'To the maximum extent permitted by applicable law:',
    items: [
      'OBSIDIA and Advanced Solution s.r.o. shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Services, including loss of profits, loss of data, or business interruption, even if we have been advised of the possibility of such damages.',
      'Our total cumulative liability to you for any claims arising from or related to these Terms or the Services shall not exceed the total fees paid by you to OBSIDIA in the three (3) months immediately preceding the event giving rise to the claim.',
    ],
    footer: 'Nothing in these Terms excludes or limits liability for death or personal injury caused by our negligence, fraud, or any other liability that cannot be excluded or limited under Slovak law.',
  },
  {
    n: '11',
    title: 'Indemnification',
    content: 'You agree to indemnify, defend, and hold harmless OBSIDIA, Advanced Solution s.r.o., and their directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or related to:',
    items: [
      'Your breach of these Terms',
      'Your use of the Services in a manner not authorised by these Terms',
      'Your violation of any applicable law or regulation',
      'Any infringement by you of any third-party rights, including intellectual property rights',
    ],
  },
  {
    n: '12',
    title: 'Third-Party Services and Integrations',
    content: 'The Services may integrate with or link to third-party platforms and services, including Stripe (payment processing) and Google Analytics. We are not responsible for the availability, content, or practices of third-party services. Your use of such services is subject to their respective terms and privacy policies.',
  },
  {
    n: '13',
    title: 'Termination',
    subsections: [
      {
        title: 'Termination by You',
        content: 'You may terminate your account at any time by cancelling your subscription and ceasing use of the Services. Cancellation is effective at the end of the current billing period.',
      },
      {
        title: 'Termination by Us',
        content: 'We may suspend or terminate your access to the Services at any time, with or without notice, if you breach any provision of these Terms, we are required to do so by law or regulatory authority, or we reasonably believe your continued use poses a risk to the security or integrity of our platform or other clients.',
      },
      {
        title: 'Effect of Termination',
        content: 'Upon termination, your right to access and use the Services will immediately cease. You remain responsible for all charges incurred prior to termination. Provisions that by their nature should survive termination (including Sections 6, 7, 10, 11, and 15) will remain in effect.',
      },
    ],
  },
  {
    n: '14',
    title: 'Amendments to These Terms',
    content: 'We reserve the right to modify these Terms at any time. We will provide at least 14 days\' notice of material changes via email to your registered address or through a prominent notice on the platform. Your continued use of the Services after the effective date of changes constitutes acceptance of the updated Terms. If you do not agree to the updated Terms, you must cease using the Services and cancel your account before the changes take effect.',
  },
  {
    n: '15',
    title: 'Governing Law and Dispute Resolution',
    content: 'These Terms are governed by and construed in accordance with the laws of the Slovak Republic, without regard to its conflict of law provisions. The parties agree that any disputes arising out of or in connection with these Terms or the Services shall be subject to the exclusive jurisdiction of the competent courts of the Slovak Republic. Before initiating formal legal proceedings, the parties agree to attempt to resolve any dispute in good faith through negotiation. Either party may initiate this process by providing written notice of the dispute to the other party.',
  },
  {
    n: '16',
    title: 'General Provisions',
    items: [
      'Entire Agreement: These Terms, together with our Privacy Policy and any applicable order forms or statements of work, constitute the entire agreement between the parties regarding the Services.',
      'Severability: If any provision of these Terms is found to be unenforceable, it will be modified to the minimum extent necessary to make it enforceable, and the remaining provisions will continue in full force.',
      'Waiver: Failure to enforce any provision of these Terms shall not constitute a waiver of our rights to enforce that provision in future.',
      'Assignment: You may not assign or transfer any rights or obligations under these Terms without our prior written consent. We may assign our rights and obligations without restriction.',
      'Force Majeure: Neither party shall be liable for delays or failures in performance resulting from circumstances beyond their reasonable control.',
      'Notices: All formal notices under these Terms should be sent to support@obsidia.space.',
    ],
  },
  {
    n: '17',
    title: 'Contact Information',
    content: 'For questions about these Terms or our Services, please contact us at support@obsidia.space. We aim to respond to all enquiries within 5 business days.\n\nOBSIDIA — operated by Advanced Solution s.r.o., Slovak Republic.',
  },
];

export default function TermsPage() {
  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: '100dvh' }}>
      {/* Hero */}
      <div
        style={{
          backgroundColor: 'var(--dark-bg)',
          borderBottom: '1px solid var(--dark-border)',
          padding: '120px 32px 64px',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              display: 'block',
              marginBottom: '20px',
            }}
          >
            Legal
          </span>
          <h1
            className="font-heading"
            style={{
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 500,
              letterSpacing: '-0.04em',
              color: 'var(--dark-text)',
              lineHeight: 0.96,
              marginBottom: '24px',
            }}
          >
            Terms and Conditions
          </h1>
          <div
            style={{
              display: 'flex',
              gap: '24px',
              flexWrap: 'wrap',
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '10px',
              letterSpacing: '0.14em',
              color: 'rgba(220,225,248,0.38)',
            }}
          >
            <span>Effective: June 28, 2026</span>
            <span style={{ color: 'rgba(220,225,248,0.15)' }}>·</span>
            <span>Last Updated: June 28, 2026</span>
            <span style={{ color: 'rgba(220,225,248,0.15)' }}>·</span>
            <span>Advanced Solution s.r.o., Bratislava, Slovakia</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '64px 32px 96px' }}>
        {SECTIONS.map((section) => (
          <div
            key={section.n}
            style={{
              borderTop: '1px solid var(--border)',
              paddingTop: '48px',
              paddingBottom: '48px',
            }}
          >
            {/* Section header */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '20px', marginBottom: '20px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '10px',
                  letterSpacing: '0.18em',
                  color: 'var(--accent)',
                  flexShrink: 0,
                }}
              >
                {section.n}
              </span>
              <h2
                className="font-heading"
                style={{
                  fontSize: 'clamp(20px, 2.2vw, 28px)',
                  fontWeight: 500,
                  letterSpacing: '-0.025em',
                  color: 'var(--text)',
                  lineHeight: 1.1,
                  margin: 0,
                }}
              >
                {section.title}
              </h2>
            </div>

            {/* Content */}
            {'content' in section && section.content && (
              <p
                className="font-body"
                style={{
                  fontSize: '15px',
                  lineHeight: 1.82,
                  color: 'var(--text-secondary)',
                  marginBottom: 'items' in section && section.items ? '20px' : '0',
                  whiteSpace: 'pre-line',
                }}
              >
                {section.content}
              </p>
            )}

            {/* Subsections */}
            {'subsections' in section && section.subsections && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                {section.subsections.map((sub, i) => (
                  <div key={i}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '13px',
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                        color: 'var(--text)',
                        marginBottom: '12px',
                      }}
                    >
                      {sub.title}
                    </h3>
                    <p className="font-body" style={{ fontSize: '14px', lineHeight: 1.78, color: 'var(--text-secondary)', margin: 0 }}>
                      {sub.content}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Items list */}
            {'items' in section && section.items && !('subsections' in section) && (
              <ul style={{ margin: 0, paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {section.items.map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--accent)', flexShrink: 0, marginTop: '8px' }} />
                    <span className="font-body" style={{ fontSize: '14px', lineHeight: 1.78, color: 'var(--text-secondary)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Footer note */}
            {'footer' in section && section.footer && (
              <p
                className="font-body"
                style={{
                  fontSize: '14px',
                  lineHeight: 1.78,
                  color: 'var(--text-secondary)',
                  marginTop: '16px',
                  marginBottom: 0,
                }}
              >
                {section.footer}
              </p>
            )}
          </div>
        ))}

        {/* Back link */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '48px', display: 'flex', gap: '24px' }}>
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(61,82,230,0.3)',
              paddingBottom: '2px',
            }}
          >
            Back to Home
          </Link>
          <Link
            href="/privacy"
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--border)',
              paddingBottom: '2px',
            }}
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
