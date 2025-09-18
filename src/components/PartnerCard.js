import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function PartnerCard({ partner, isLoggedIn, onAuthRequired }) {
  const DetailLink = () => (
    <Link href={`/partners/${partner.id}`} className={styles.detailLink}>
      More detail
    </Link>
  );

  const AuthRequiredButton = () => (
    <button onClick={onAuthRequired} className={styles.detailLink}>
      More detail
    </button>
  );

  return (
    <div className={styles.partnerCard}>
      <h3>{partner.name}</h3>
      <p><strong>Address:</strong> {partner.address}</p>
      <p><strong>Contact:</strong> {partner.contact}</p>
      <p><strong>Specialty:</strong> {partner.specialty}</p>

      {/* --- CONDITIONAL LINK --- */}
      {isLoggedIn ? <DetailLink /> : <AuthRequiredButton />}
  
    </div>
  );
}