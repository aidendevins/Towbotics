import './index.css';

const EFFECTIVE_DATE = 'March 6, 2026';
const COMPANY = 'Towbotics, Inc.';
const SITE = 'towbotic.com';
const EMAIL = 'hello@towbotic.com';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <a href="/" className="text-slate-800 font-black text-xl tracking-tight">
          TOW<span className="text-amber-500">BOTICS</span>
        </a>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-black text-slate-800 mb-2">Privacy Policy</h1>
        <p className="text-slate-500 text-sm mb-10">Effective date: {EFFECTIVE_DATE}</p>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">

          <section>
            <p>
              {COMPANY} ("we," "us," or "our") operates {SITE} (the "Site"). This Privacy Policy explains
              what information we collect, how we use it, and your rights regarding that information.
              By using the Site, you agree to the practices described here.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">1. Information We Collect</h2>
            <p className="mb-3">We collect information in two ways:</p>
            <p className="font-semibold text-slate-800 mb-1">Information you provide directly:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Email address</li>
              <li>First and last name (optional)</li>
              <li>Phone number (optional)</li>
            </ul>
            <p className="font-semibold text-slate-800 mb-1">Information collected automatically:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>IP address and approximate location (city, country)</li>
              <li>Browser type and device information (user agent)</li>
              <li>Pages visited and referring URL</li>
              <li>Date and time of visits</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">2. How We Use Your Information</h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Contact you about product availability, pricing, and updates for the Towbot system</li>
              <li>Respond to inquiries you submit through our contact form</li>
              <li>Analyze site traffic and usage to improve the Site</li>
              <li>Protect the security and integrity of our services</li>
            </ul>
            <p className="mt-3">
              We do not sell, rent, or share your personal information with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">3. Legal Basis for Processing (EEA/UK Users)</h2>
            <p>
              If you are located in the European Economic Area or the United Kingdom, we process your personal
              data on the following legal bases: your consent (when you voluntarily submit the contact form),
              and our legitimate interests in operating and improving the Site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">4. Data Storage and Security</h2>
            <p>
              Your information is stored securely in a hosted PostgreSQL database. We use industry-standard
              measures to protect your data from unauthorized access, disclosure, or loss. No method of
              transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">5. Data Retention</h2>
            <p>
              We retain contact information for as long as necessary to follow up on your inquiry or as
              required by law. You may request deletion of your data at any time by contacting us at{' '}
              <a href={`mailto:${EMAIL}`} className="text-amber-600 hover:text-amber-700 underline">{EMAIL}</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">6. Cookies and Tracking</h2>
            <p>
              We do not currently use third-party advertising or tracking cookies. We collect basic
              analytics data (page views, location, device type) using our own infrastructure to
              understand how visitors use the Site. No data is shared with advertising networks.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">7. Your Rights</h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of future communications at any time</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at{' '}
              <a href={`mailto:${EMAIL}`} className="text-amber-600 hover:text-amber-700 underline">{EMAIL}</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">8. Children's Privacy</h2>
            <p>
              The Site is not directed to individuals under the age of 13. We do not knowingly collect
              personal information from children. If you believe we have inadvertently collected such
              information, please contact us and we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. When we do, we will revise the
              effective date at the top of this page. Continued use of the Site after changes are
              posted constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">10. Contact Us</h2>
            <p>If you have questions or concerns about this Privacy Policy, please contact us:</p>
            <div className="mt-3 bg-slate-100 rounded-xl p-5 text-sm">
              <p className="font-semibold text-slate-800">{COMPANY}</p>
              <p className="text-slate-600">
                Email:{' '}
                <a href={`mailto:${EMAIL}`} className="text-amber-600 hover:text-amber-700 underline">{EMAIL}</a>
              </p>
              <p className="text-slate-600">Website: {SITE}</p>
            </div>
          </section>

        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-8 text-center text-slate-400 text-sm">
        © {new Date().getFullYear()} {COMPANY}. All rights reserved.
      </footer>
    </div>
  );
}
