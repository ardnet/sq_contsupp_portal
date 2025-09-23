import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function PartnerCard({ partner, isLoggedIn, onAuthRequired }) {
  const DetailLink = () => (
    <Link href={`/partners/${partner.id}`} className={styles.detailLink}>
      More details
    </Link>
  );

  const AuthRequiredButton = () => (
    <button onClick={onAuthRequired} className={styles.detailLink}>
      Login for details
    </button>
  );

  return (
    <div className={styles.partnerCard}>
      <h3>{partner.name}</h3>
      
      {/* --- CONDITIONAL RENDERING --- */}
      {/* These <p> tags will only render if the data exists */}
      {partner.address && <p><strong>Address:</strong> {partner.address}</p>}
      {partner.contact && <p><strong>Contact:</strong> {partner.contact}</p>}
      
      <p><strong>Category:</strong> {partner.category}</p>
      <p><strong>Sub-Categories:</strong> {(partner.subCategory || []).join(', ')}</p>
      
      {isLoggedIn ? <DetailLink /> : <AuthRequiredButton />}
    </div>
  );
}