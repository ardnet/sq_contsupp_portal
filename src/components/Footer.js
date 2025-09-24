import Link from 'next/link';
import styles from '../styles/Layout.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerLinks}>
        <Link href="/privacy">Privacy Policy</Link>
        <span>|</span>
        <Link href="/terms">Terms & Conditions</Link>
      </div>
      <p>Copyright &copy; {currentYear} <a
          href="https://squarish.com.sg"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.footerBrandLink}
        >
          SQUARISH
        </a>. All Rights Reserved.</p>
    </footer>
  );
}