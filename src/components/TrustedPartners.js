import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function TrustedPartners({ isLoggedIn, onAuthRequired }) {
  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/data/trustedPartners.json')
      .then(res => res.json())
      .then(data => {
        setPartners(data);
        setIsLoading(false);
      });
  }, []);

  const DetailButton = ({ partnerId }) => {
    const commonProps = { className: styles.trustedDetailButton };
    if (isLoggedIn) {
      // --- UPDATE THIS LINK ---
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
        <div className={styles.trustedPartnersGrid}>
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
      )}
    </section>
  );
}