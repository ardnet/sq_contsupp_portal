import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function PartnerCard({ partner }) {
  return (
    <div className={styles.partnerCard}>
      <h3>{partner.name}</h3>
      <p><strong>Address:</strong> {partner.address}</p>
      <p><strong>Contact:</strong> {partner.contact}</p>
      <p><strong>Specialty:</strong> {partner.specialty}</p>

      {/* --- NEW LINK --- */}
      <Link href={`/partners/${partner.id}`} className={styles.detailLink}>
        More detail
      </Link>
  
    </div>
  );
}