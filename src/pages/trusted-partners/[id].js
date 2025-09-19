import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';
import LoginModal from '../../components/LoginModal';

export default function TrustedPartnerDetail() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const [partner, setPartner] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === 'authenticated' && id) {
      const fetchPartnerData = async () => {
        try {
          // --- IMPORTANT: Fetch from the correct JSON file ---
          const response = await fetch('/data/trustedPartners.json');
          if (!response.ok) throw new Error('Could not fetch trusted partner data.');
          
          const allPartners = await response.json();
          const currentPartner = allPartners.find(p => p.id.toString() === id);

          if (currentPartner) {
            setPartner(currentPartner);
          } else {
            throw new Error('Trusted Partner not found.');
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchPartnerData();
    }
  }, [id, status]);

  // --- Authentication Protection ---
  if (status === 'loading') {
    return <div className={styles.statusMessage}>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return <LoginModal isOpen={true} onClose={() => router.push('/')} />;
  }
  
  // --- Page Content ---
  if (isLoading) {
    return <div className={styles.statusMessage}>Loading partner details...</div>;
  }

  if (error) {
    return <div className={`${styles.statusMessage} ${styles.error}`}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{partner.name} - SQUARISH Trusted Partner</title>
      </Head>

      <div className={styles.detailContainer}>
        <div className={styles.detailHeader}>
          <Image 
            src={partner.logoUrl} 
            alt={`${partner.name} Logo`} 
            width={100} 
            height={100} 
            className={styles.trustedPartnerLogo}
          />
          <div>
            <div className={styles.trustedBanner}>⭐ Trusted Partner</div>
            <h1>{partner.name}</h1>
          </div>
        </div>
        
        <div className={styles.detailSection}>
          <h3>About This Partner</h3>
          <p>
            {partner.name} is one of our most valued partners, recognized for their consistent quality and reliability. 
            More detailed information, including their full bio and project history, is available to authorized personnel.
          </p>
        </div>

        <Link href="/" className={styles.backLink}>
          &larr; Back to Partner List
        </Link>
      </div>
    </div>
  );
}