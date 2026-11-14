import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import partners from '../../../data/partners.json';

// Pre-render one page per partner at build time.
export async function getStaticPaths() {
  return {
    paths: partners.map(p => ({ params: { id: String(p.id) } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const partner = partners.find(p => String(p.id) === params.id);
  return { props: { partner } };
}

export default function PartnerDetail({ partner }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{partner.name} - SQUARISH! Partners Portal</title>
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
            <p><strong>Specialties:</strong> {(partner.subCategory || []).join(', ')}</p>
          </div>

          <div className={styles.detailSection}>
            <h3>Recent Projects</h3>
            <ul>
              {(partner.projects || []).map(project => <li key={project}>{project}</li>)}
            </ul>
          </div>

          <Link href="/" className={styles.backLink}>
            &larr; Back to Homepage
          </Link>
        </div>
      </main>
    </div>
  );
}