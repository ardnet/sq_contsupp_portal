import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const ITEMS_PER_PAGE = 3; // Show 3 partners at a time

export default function TrustedPartners({ partners = [] }) {
  const scrollContainerRef = useRef(null); // Create a ref for the scrollable container

  // --- NEW: Scroll handler functions ---
  const handleScroll = (direction) => {
    const scrollAmount = 300; // Amount to scroll in pixels
    if (scrollContainerRef.current) {
      if (direction === 'left') {
        scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const DetailButton = ({ partnerId }) => (
    <Link href={`/trusted-partners/${partnerId}`} className={styles.trustedDetailButton}>
      More details
    </Link>
  );

  return (
    <section className={styles.trustedPartnersSection}>
      <h2>Our Trusted Partners</h2>
      {partners.length === 0 ? (
        <p>No trusted partners yet.</p>
      ) : (
        // --- NEW: Wrapper for buttons and list ---
        <div className={styles.trustedPartnersContainer}>
          <button 
            onClick={() => handleScroll('left')} 
            className={`${styles.scrollButton} ${styles.left}`}
            aria-label="Scroll left"
          >
            &#8249;
          </button>
          
          <div className={styles.trustedPartnersGrid} ref={scrollContainerRef}>
            {partners.map(partner => (
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
          
          <button 
            onClick={() => handleScroll('right')} 
            className={`${styles.scrollButton} ${styles.right}`}
            aria-label="Scroll right"
          >
            &#8250;
          </button>
        </div>
      )}
    </section>
  );
}