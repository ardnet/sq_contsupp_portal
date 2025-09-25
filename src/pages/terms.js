import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/Home.module.css'; // We'll reuse some styles

export default function TermsAndConditions() {
  return (
    <>
      <Head>
        <title>Terms & Conditions - SQUARISH! Partners Portal</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.detailContainer}>
          <h1>Terms & Conditions</h1>
          <p><strong>Effective Date:</strong> September 25, 2025</p>

          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using partners.squarish.com.sg (“the Site”), you agree to these Terms & Conditions. If you do not agree, please discontinue use.</p>

          <h2>2. Eligibility</h2>
          <p>The Site is available to users who log in via Google authentication and are legally capable of entering into agreements.</p>

          <h2>3. Use of the Site</h2>
          <p>You may use the Site to:</p>
          <ul>
            <li>View contractor and supplier listings associated with Squarish.</li>
            <li>Access information for personal reference.</li>
          </ul>
          <p>You may not:</p>
          <ul>
            <li>Engage in unlawful or unauthorised activities on the Site.</li>
            <li>Copy, scrape, or reproduce Site content for commercial use without written consent.</li>
            <li>Disrupt or interfere with the Site’s operation.</li>
          </ul>

          <h2>4. User Accounts</h2>
          <ul>
            <li>You are responsible for maintaining the confidentiality of your Google account credentials.</li>
            <li>You must ensure all information provided is accurate and up to date.</li>
            <li>Squarish may suspend or terminate your access if misuse or violation of these Terms is detected.</li>
          </ul>

          <h2>5. Contractor & Supplier Listings Disclaimer</h2>
          <ul>
            <li>The Site lists contractors and suppliers that Squarish has previously worked with.</li>
            <li>Some may be identified as “Trusted Partners” based on our experience.</li>
            <li>While Squarish makes reasonable efforts to feature credible partners, we do not guarantee their future performance, pricing, or suitability for your independent use.</li>
            <li>Squarish is not liable for any disputes, damages, or losses arising from your engagement with listed third-party contractors or suppliers.</li>
          </ul>

          <h2>6. Intellectual Property</h2>
          <p>All content, design, branding, and layout on the Site belong to Squarish. You may not copy, reproduce, or distribute content without prior written permission.</p>

          <h2>7. Limitation of Liability</h2>
          <ul>
            <li>The Site and its content are provided “as is” without warranties of any kind.</li>
            <li>Squarish shall not be held liable for indirect, incidental, or consequential damages arising from the use or inability to use the Site.</li>
          </ul>

          <h2>8. Indemnity</h2>
          <p>You agree to indemnify and hold Squarish harmless from any claims, damages, or expenses resulting from your misuse of the Site.</p>

          <h2>9. Termination of Access</h2>
          <p>Squarish reserves the right to suspend or terminate your access at its sole discretion if you violate these Terms.</p>

          <h2>10. Governing Law & Jurisdiction</h2>
          <p>These Terms are governed by the laws of Singapore. Any disputes will be resolved in the courts of Singapore.</p>

          <h2>11. Amendments</h2>
          <p>We may update these Terms from time to time. Continued use of the Site constitutes acceptance of the updated Terms.</p>

          <h2>12. Contact Us</h2>
          <p>For questions about these Terms, please contact:</p>
          <p>
            <strong>Email:</strong> hello@squarish.com.sg<br />
            <strong>Address:</strong> 318 Tanglin Road, #01-49, Singapore 247979
          </p>

          <Link href="/" className={styles.backLink}>
            &larr; Back to Homepage
          </Link>
        </div>
      </div>
    </>
  );
}