import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react'; // Import useSession
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import LoginModal from '../../components/LoginModal'; // Import the modal

export default function PartnerDetail() {
  const { data: session, status } = useSession(); // Get session status
  const router = useRouter();
  const { id } = router.query; // Get the 'id' from the URL

  const [partner, setPartner] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch data if the id is available in the router query
    if (status === 'authenticated' && id) {
      const fetchPartnerData = async () => {
        try {
          const response = await fetch('/api/partners');
          if (!response.ok) throw new Error('Could not fetch partner data.');
          const allPartners = await response.json();
          
          // Find the specific partner by its id
          const currentPartner = allPartners.find(p => p.id.toString() === id);

          if (currentPartner) {
            setPartner(currentPartner);
          } else {
            throw new Error('Partner not found.');
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchPartnerData();
    }
  }, [id, status]); // This effect runs whenever the 'id' changes

  // --- PROTECTION LOGIC ---
  if (status === 'loading') {
    return <div className={styles.statusMessage}>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    // If not logged in, show the LoginModal. No page content is rendered.
    return <LoginModal isOpen={true} onClose={() => router.push('/')} />;
  }

  if (isLoading) {
    return <div className={styles.statusMessage}>Loading partner details...</div>;
  }

  if (error) {
    return <div className={`${styles.statusMessage} ${styles.error}`}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{partner.name} - SQUARISH Partner Portal</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.detailContainer}>
          <div className={styles.detailHeader}>
            <h1>{partner.name}</h1>
          </div>
          
          <div className={styles.detailSection}>
            <h3>Company Bio</h3>
            <p>{partner.bio}</p>
          </div>

          <div className={styles.detailSection}>
            <h3>Contact Information</h3>
            <p><strong>Address:</strong> {partner.address}</p>
            <p><strong>Contact:</strong> {partner.contact}</p>
            {partner.memberSince && (
              <p><strong>Partner Since:</strong> {new Date(partner.memberSince).toLocaleDateString()}</p>
            )}
            <p><strong>Category:</strong> {partner.category}</p>
            <p><strong>Sub-Categories:</strong> {(partner.subCategory || []).join(', ')}</p>
          </div>

          <div className={styles.detailSection}>
            <h3>Recent Projects</h3>
            <ul>
              {partner.projects.map(project => <li key={project}>{project}</li>)}
            </ul>
          </div>

          <Link href="/" className={styles.backLink}>
            &larr; Back to Partner List
          </Link>
        </div>
      </main>
    </div>
  );
}