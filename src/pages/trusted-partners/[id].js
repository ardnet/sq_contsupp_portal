import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';
import trustedPartners from '../../../data/trustedPartners.json';

// Pre-render one page per partner at build time.
export async function getStaticPaths() {
  return {
    paths: trustedPartners.map(p => ({ params: { id: String(p.id) } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const partner = trustedPartners.find(p => String(p.id) === params.id);
  return { props: { partner } };
}

export default function TrustedPartnerDetail({ partner }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{partner.name} - SQUARISH! Trusted Partner</title>
      </Head>

      <main className={styles.main}>
      <div className={styles.detailContainer}>
        <div className={styles.detailHeader}>
          <Image 
            src={partner.logoUrl} 
            alt={`${partner.name} Logo`} 
            width={100} 
            height={100} 
            className={styles.trustedPartnerLogo}
          />
          <div>
            <div className={styles.trustedBanner}>⭐ Trusted Partner</div>
            <h1>{partner.name}</h1>
          </div>
        </div>
        
        {/* --- Company Bio Section --- */}
        <div className={styles.detailSection}>
          <h3>Company Bio</h3>
          <p>{partner.bio}</p>
        </div>

        {/* --- Contact and Address Section --- */}
        <div className={styles.detailSection}>
          <h3>Contact Information</h3>
          <p><strong>Address:</strong> {partner.address}</p>
          <p><strong>Contact:</strong> {partner.contact}</p>
          {/* --- ADD THESE TWO LINES --- */}
          <p><strong>Category:</strong> {partner.category}</p>
          <p><strong>Specialties:</strong> {(partner.subCategory || []).join(', ')}</p>

          {partner.memberSince && (
            <p><strong>Partner Since:</strong> {new Date(partner.memberSince).toLocaleDateString()}</p>
          )}
        </div>

        {/* --- Projects Section (maps over the array) --- */}
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