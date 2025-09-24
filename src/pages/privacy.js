import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/Home.module.css'; // We'll reuse some styles

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - SQUARISH Portal</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.detailContainer}> {/* Reuse this style for a nice card effect */}
          <h1>Privacy Policy</h1>
          <p>
            This document outlines how SQUARISH ("we," "us," or "our") collects, 
            uses, and protects your information when you use the SQUARISH Partner Portal...
            {/* ...your full privacy policy text... */}
          </p>
          <Link href="/" className={styles.backLink}>
            &larr; Back to Homepage
          </Link>
        </div>
      </div>
    </>
  );
}