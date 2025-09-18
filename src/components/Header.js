import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import styles from '../styles/Layout.module.css';

export default function Header() {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.logo}>
          SQUARISH Portal
        </Link>
        <div className={styles.authSection}>
          {isLoading ? (
            <div className={styles.loading}>Loading...</div>
          ) : session ? (
            <>
              <span className={styles.userName}>{session.user.name}</span>
              <button onClick={() => signOut()} className={styles.authButton}>
                Sign Out
              </button>
            </>
          ) : (
            <button onClick={() => signIn('google')} className={styles.authButton}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}