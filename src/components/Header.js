import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image'; // Import the Image component
import styles from '../styles/Layout.module.css';

export default function Header() {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="https://squarish.com.sg" className={styles.logo}>
          {/* --- ADD THE LOGO IMAGE HERE --- */}
          <Image
            src="/logogreen.png" // The path to your logo in the public folder
            alt="SQUARISH! Logo"
            width={35} // Adjust the width as needed
            height={35} // Adjust the height as needed
          />
          <span>SQUARISH!</span>
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