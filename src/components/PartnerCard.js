import styles from '../styles/Home.module.css';

export default function PartnerCard({ partner }) {
  return (
    <div className={styles.partnerCard}>
      <h3>{partner.name}</h3>
      <p><strong>Specialty:</strong> {partner.specialty}</p>
    </div>
  );
}
