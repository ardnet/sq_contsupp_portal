import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const ITEMS_PER_PAGE = 3; // Show 3 partners at a time

export default function TrustedPartners({ isLoggedIn, onAuthRequired }) {
  const [allPartners, setAllPartners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/data/trustedPartners.json')
      .then(res => res.json())
      .then(data => {
        setAllPartners(data);
        setIsLoading(false);
      });
  }, []);

  // Calculate which partners to show based on the current page
  const partnersToShow = allPartners.slice(0, currentPage * ITEMS_PER_PAGE);
  const hasMorePartners = partnersToShow.length < allPartners.length;

  const DetailButton = ({ partnerId }) => {
    // This part remains the same
    const commonProps = { className: styles.trustedDetailButton };
    if (isLoggedIn) {
      return (
        <Link href={`/trusted-partners/${partnerId}`} {...commonProps}>
          View Details
        </Link>
      );
    }
    return (
      <button onClick={onAuthRequired} {...commonProps}>
        Login for Details
      </button>
    );
  };

  return (
    <section className={styles.trustedPartnersSection}>
      <h2>Our Trusted Partners</h2>
      {isLoading ? (
        <p>Loading trusted partners...</p>
      ) : (
        <>
          <div className={styles.trustedPartnersGrid}>
            {partnersToShow.map(partner => (
              <div key={partner.id} className={styles.trustedPartnerCard}>
                <Image
                  src={partner.logoUrl}
                  alt={`${partner.name} Logo`}
                  width={100}
                  height={100}
                  className={styles.trustedPartnerLogo}
                />
                <h3>{partner.name}</h3>
                <DetailButton partnerId={partner.id} />
              </div>
            ))}
          </div>

          {/* --- NEW: Load More Button --- */}
          {hasMorePartners && (
            <div className={styles.loadMoreContainer}>
              <button onClick={() => setCurrentPage(prev => prev + 1)} className={styles.loadMoreBtn}>
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}