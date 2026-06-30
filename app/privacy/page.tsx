import Link from 'next/link';
export const dynamic = 'force-static';


export const metadata = {
  title: 'Privacy Policy — Obsidia',
  description: 'How Obsidia collects, uses, and protects your personal data.',
};

const SECTIONS = [
  {
    n: '01',
    title: 'Introduction',
    content: `Welcome to OBSIDIA, a SaaS platform operated by Advanced Solution s.r.o. ("Company", "we", "us", or "our"), a company incorporated under the laws of the Slovak Republic. OBSIDIA provides workflow automation, website development, and application services to business clients worldwide.

This Privacy Policy explains how we collect, use, disclose, and safeguard information when you access or use our platform at obsidia.space and any related services (collectively, the "Services"). Please read this policy carefully. If you disagree with its terms, please discontinue use of the Services.`,
  },
  {
    n: '02',
    title: 'Information We Collect',
    subsections: [
      {
        title: 'Information You Provide Directly',
        items: [
          'Business contact details (company name, contact person name, business email address)',
          'Account credentials (email address and encrypted password)',
          'Billing and subscription information processed via Stripe (we do not store full payment card details)',
          'Communications you send us, including support requests to support@obsidia.space',
        ],
      },
      {
        title: 'Information Collected Automatically',
        items: [
          'Usage data — pages visited, features used, session duration, and interaction logs',
          'Log data — IP addresses, browser type and version, operating system, referring URLs, and timestamps',
          'Device information — hardware model, unique device identifiers',
          'Cookies and similar tracking technologies — see Section 5 for details',
        ],
      },
      {
        title: 'Information from Third Parties',
        content: 'We may receive information about you from third-party services integrated into our platform, including Google Analytics for usage analytics and Stripe for payment processing. These providers operate under their own privacy policies.',
      },
    ],
  },
  {
    n: '03',
    title: 'How We Use Your Information',
    items: [
      'Providing, operating, and maintaining the OBSIDIA platform and Services',
      'Processing transactions and managing your subscription via Stripe',
      'Communicating with you about your account, updates, and support requests',
      'Analysing usage patterns to improve performance, features, and user experience',
      'Detecting, preventing, and addressing fraud, security incidents, and technical issues',
      'Complying with legal obligations under applicable Slovak and EU law',
      'Sending service-related notices and, where permitted, marketing communications',
    ],
    footer: 'We process your personal data on the following legal bases under GDPR: contract performance (Art. 6(1)(b)), legitimate interests (Art. 6(1)(f)), legal obligation (Art. 6(1)(c)), and consent where specifically obtained (Art. 6(1)(a)).',
  },
  {
    n: '04',
    title: 'Sharing of Information',
    content: 'We do not sell, rent, or trade your personal data. We may share your information only in the following circumstances:',
    items: [
      'Service Providers: With trusted third-party vendors who assist in operating our Services, including Stripe (payment processing) and Google LLC (analytics), each bound by appropriate data processing agreements.',
      'Legal Requirements: When required by law, regulation, court order, or governmental authority, or to protect the rights, property, or safety of OBSIDIA, our clients, or others.',
      'Business Transfers: In the event of a merger, acquisition, or sale of company assets, your information may be transferred as part of that transaction. We will notify you via email or a prominent notice on our platform.',
      'With Your Consent: In any other circumstances with your explicit prior consent.',
    ],
  },
  {
    n: '05',
    title: 'Cookies and Tracking Technologies',
    content: 'We use cookies and similar technologies to enhance your experience and gather usage data. The types of cookies we use include:',
    items: [
      'Essential Cookies: Necessary for the platform to function. These cannot be disabled.',
      'Analytics Cookies: Used via Google Analytics to understand how users interact with our Services. Data is aggregated and anonymised where possible.',
      'Functional Cookies: Used to remember your preferences and settings.',
    ],
    footer: 'You can control cookie preferences through your browser settings. Disabling certain cookies may affect platform functionality. For more information on Google Analytics data practices, visit google.com/policies/privacy.',
  },
  {
    n: '06',
    title: 'Data Retention',
    content: 'We retain your personal data for as long as your account is active or as needed to provide the Services. Upon termination of your account, we will delete or anonymise your personal data within 90 days, unless a longer retention period is required or permitted by law (for example, for financial records under Slovak accounting legislation). Usage and analytics data may be retained in aggregated, anonymised form indefinitely.',
  },
  {
    n: '07',
    title: 'Data Security',
    content: 'We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. These measures include encrypted data transmission (TLS/SSL), access controls, and regular security assessments. However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your data, we cannot guarantee absolute security.',
  },
  {
    n: '08',
    title: 'International Data Transfers',
    content: 'Advanced Solution s.r.o. is based in Slovakia and operates within the European Economic Area (EEA). If we transfer personal data outside the EEA (for example, to Google LLC in the United States), we ensure such transfers are governed by appropriate safeguards, including Standard Contractual Clauses approved by the European Commission, in compliance with GDPR Chapter V.',
  },
  {
    n: '09',
    title: 'Your Data Protection Rights',
    content: 'As a data subject under GDPR, you have the following rights:',
    items: [
      'Right of Access: Request a copy of the personal data we hold about you.',
      'Right to Rectification: Request correction of inaccurate or incomplete data.',
      'Right to Erasure: Request deletion of your personal data under certain circumstances.',
      'Right to Restriction: Request that we limit the processing of your data.',
      'Right to Data Portability: Receive your data in a structured, machine-readable format.',
      'Right to Object: Object to processing based on legitimate interests or for direct marketing.',
      'Right to Withdraw Consent: Where processing is based on consent, withdraw it at any time without affecting prior processing.',
    ],
    footer: 'To exercise any of these rights, please contact us at support@obsidia.space. We will respond within 30 days. You also have the right to lodge a complaint with the Slovak Data Protection Authority (Úrad na ochranu osobných údajov Slovenskej republiky) at dataprotection.gov.sk.',
  },
  {
    n: '10',
    title: "Children's Privacy",
    content: 'Our Services are directed exclusively to business clients and are not intended for individuals under the age of 18. We do not knowingly collect personal data from minors. If we become aware that we have collected data from a minor, we will take steps to delete such information promptly.',
  },
  {
    n: '11',
    title: 'Third-Party Links',
    content: 'Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices of those third parties and encourage you to review their privacy policies independently.',
  },
  {
    n: '12',
    title: 'Changes to This Privacy Policy',
    content: 'We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of material changes by posting the updated policy on our platform and updating the "Last Updated" date. Your continued use of the Services after such changes constitutes acceptance of the updated policy.',
  },
  {
    n: '13',
    title: 'Contact Us',
    content: 'If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at support@obsidia.space. We are committed to resolving any complaints or concerns regarding our privacy practices.',
  },
];

export default function PrivacyPage() {
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
            Privacy Policy
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
                    {'items' in sub && sub.items ? (
                      <ul style={{ margin: 0, paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {sub.items.map((item, j) => (
                          <li key={j} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                            <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--accent)', flexShrink: 0, marginTop: '8px' }} />
                            <span className="font-body" style={{ fontSize: '14px', lineHeight: 1.78, color: 'var(--text-secondary)' }}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="font-body" style={{ fontSize: '14px', lineHeight: 1.78, color: 'var(--text-secondary)', margin: 0 }}>
                        {'content' in sub ? sub.content : ''}
                      </p>
                    )}
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
            href="/terms"
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
            Terms and Conditions
          </Link>
        </div>
      </div>
    </div>
  );
}
