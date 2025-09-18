import { signIn } from 'next-auth/react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>&times;</button>
        <h2>Login Required</h2>
        <p>You need to be logged in to view partner details.</p>
        
        <button onClick={() => signIn('google')} className={styles.googleButton}>
          Sign in with Google
        </button>

        <div className={styles.legalLinks}>
          <Link href="/privacy">Privacy Policy</Link>
          <span>&bull;</span>
          <Link href="/terms">Terms & Conditions</Link>
        </div>
      </div>
    </div>
  );
}