import { useState, useMemo } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import PartnerCard from '../components/PartnerCard';
import FilterControls from '../components/FilterControls';
import TrustedPartners from '../components/TrustedPartners'; // Import the new component
import partnersData from '../../data/partners.json';
import trustedPartnersData from '../../data/trustedPartners.json';

// The number of items to show per page
const ITEMS_PER_PAGE = 6;

// Data is read from data/*.json at build time and baked into the static HTML.
export async function getStaticProps() {
  return {
    props: {
      allPartners: partnersData,
      trustedPartners: trustedPartnersData,
    },
  };
}

export default function Home({ allPartners, trustedPartners }) {
  const [currentPage, setCurrentPage] = useState(1); // For pagination

  // --- UPDATED: Add new filter states ---
  const [filters, setFilters] = useState({
    name: '',
    address: '',
    contact: '',
    category: 'All', // Default to 'All'
    subCategories: [],
  });

  // --- FILTERING LOGIC ---
  const filteredPartners = useMemo(() => {
    return allPartners.filter(partner => {
      const { name, address, contact, specialties, category, subCategories } = filters;
      
      const nameMatch = (partner.name || '').toLowerCase().includes(name.toLowerCase());
      const addressMatch = (partner.address || '').toLowerCase().includes(address.toLowerCase());
      const contactMatch = (partner.contact || '').includes(contact);
      
      // --- NEW: Add category and sub-category matching logic ---
      const categoryMatch = category === 'All' || partner.category === category;
      const subCategoryMatch = subCategories.length === 0 || 
        subCategories.some(sc => (partner.subCategory || []).includes(sc));
      
      return nameMatch && addressMatch && contactMatch && categoryMatch && subCategoryMatch;
    });
  }, [filters, allPartners]);

  // --- PAGINATION LOGIC ---
  const partnersToShow = filteredPartners.slice(0, currentPage * ITEMS_PER_PAGE);
  const hasMorePartners = partnersToShow.length < filteredPartners.length;

  // --- RENDER ---
  return (
    <div className={styles.container}>
      <Head>
        <title>SQUARISH! Partners Portal</title>
        <meta name="description" content="A portal for SQUARISH! suppliers and contractors" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>SQUARISH! Partners Portal</h1>

        {/* --- ADD THE NEW COMPONENT HERE --- */}
        <TrustedPartners partners={trustedPartners} />

        <h2 className={styles.allPartnersTitle}>All Other Partners</h2>
        <FilterControls
          allPartners={allPartners}
          filters={filters}
          setFilters={setFilters}
          onFilterChange={() => setCurrentPage(1)} // Reset pagination on filter change
        />

        {filteredPartners.length === 0 && (
          <p className={styles.statusMessage}>No partners match your filters.</p>
        )}

        <>
            <div className={styles.partnerList}>
              {partnersToShow.map(partner => (
                <PartnerCard key={partner.id} partner={partner} />
              ))}
            </div>

            {hasMorePartners && (
              <div className={styles.loadMoreContainer}>
                <button onClick={() => setCurrentPage(prev => prev + 1)} className={styles.loadMoreBtn}>
                  Load More
                </button>
              </div>
            )}
        </>
      </main>
    </div>
  );
}