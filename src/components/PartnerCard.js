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
      Login for more detail
    </button>
  );

  return (
    <div className={styles.partnerCard}>
      <h3>{partner.name}</h3>
      
      {/* --- CONDITIONAL RENDERING --- */}
      {/* These <p> tags will only render if the data exists */}
      {partner.address && <p><strong>Address:</strong> {partner.address}</p>}
      {partner.contact && <p><strong>Contact:</strong> {partner.contact}</p>}
      
      <p><strong>Specialty:</strong> {partner.specialty}</p>
      
      {isLoggedIn ? <DetailLink /> : <AuthRequiredButton />}
    </div>
  );
}