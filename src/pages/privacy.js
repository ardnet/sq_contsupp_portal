import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/Home.module.css'; // We'll reuse some styles

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - SQUARISH! Partners Portal</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.detailContainer}>
          <h1>Privacy Policy</h1>
          <p><strong>Effective Date:</strong> September 25, 2025</p>

          <h2>1. Introduction</h2>
          <p>
            Welcome to partners.squarish.com.sg (“the Site”), operated by Squarish Pte. Ltd. (“Squarish”, “we”, “our”, “us”).
          </p>
          <p>
            This Privacy Policy explains how we collect, use, and protect your personal information when you access or use the Site. By using the Site, you consent to the practices described in this Policy.
          </p>

          <h2>2. Information We Collect</h2>
          <p>We may collect the following information when you use the Site:</p>
          <ul>
            <li><strong>Personal Information:</strong> Your name and email address when you log in using Google authentication.</li>
            <li><strong>Technical Information:</strong> IP address, browser type, device information, and access logs.</li>
            <li><strong>Usage Data:</strong> Pages visited, features accessed, and interactions on the Site.</li>
          </ul>

          <h2>3. How We Collect Data</h2>
          <ul>
            <li>Directly from you when you log in via Google authentication.</li>
            <li>Automatically through cookies, analytics tools, and server logs.</li>
          </ul>

          <h2>4. How We Use Your Information</h2>
          <p>Your information may be used to:</p>
          <ul>
            <li>Provide access to contractor and supplier listings.</li>
            <li>Improve and personalise the Site and user experience.</li>
            <li>Maintain security and prevent misuse.</li>
            <li>Support marketing, promotional, and business-related communications.</li>
            <li>Comply with legal or regulatory obligations.</li>
          </ul>

          <h2>5. Sharing of Information</h2>
          <p>We may share your information with:</p>
          <ul>
            <li>Service Providers (e.g., hosting, analytics, IT support).</li>
            <li>Business Partners for legitimate business or marketing purposes.</li>
            <li>Regulators or Authorities where disclosure is required by law.</li>
          </ul>
          <p>We do not sell your personal information.</p>

          <h2>6. Data Retention</h2>
          <p>We retain personal information only as long as necessary for the purposes stated above, or as required by law.</p>

          <h2>7. Security</h2>
          <p>We use reasonable technical and organisational safeguards to protect your data against unauthorised access, disclosure, alteration, or destruction.</p>

          <h2>8. Your Rights</h2>
          <p>Under Singapore’s Personal Data Protection Act (PDPA), you have the right to:</p>
          <ul>
            <li>Access and obtain a copy of your personal data.</li>
            <li>Request corrections or updates.</li>
            <li>Withdraw consent for certain uses (note: this may affect your ability to use the Site).</li>
          </ul>
          <p>Requests can be sent to: hello@squarish.com.sg</p>

          <h2>9. Cookies & Tracking</h2>
          <p>The Site may use cookies and similar technologies to enhance functionality, analytics, and performance. You can manage cookie preferences in your browser settings.</p>

          <h2>10. Cross-Border Data Transfers</h2>
          <p>Your personal information may be processed in multiple locations:</p>
          <ul>
            <li>The Site is hosted in the United States.</li>
            <li>The main database is hosted in Singapore.</li>
          </ul>
          <p>We ensure all transfers comply with PDPA and that your data is safeguarded with standards comparable to Singapore’s data protection laws.</p>

          <h2>11. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Changes will be posted here with a revised effective date.</p>

          <h2>12. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy or your personal data, please contact us at:</p>
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