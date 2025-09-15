import { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import PartnerCard from '../components/PartnerCard';
import FilterControls from '../components/FilterControls';

// The number of items to show per page
const ITEMS_PER_PAGE = 6;

export default function Home() {
  // --- STATE MANAGEMENT ---
  const [allPartners, setAllPartners] = useState([]); // Stores the original list from the API
  const [isLoading, setIsLoading] = useState(true); // For the loading state
  const [error, setError] = useState(null); // For any API errors
  const [currentPage, setCurrentPage] = useState(1); // For pagination

  // State for each filter input
  const [filters, setFilters] = useState({
    name: '',
    address: '',
    contact: '',
    specialties: [],
  });

  // --- DATA FETCHING ---
  useEffect(() => {
    // This async function fetches and transforms the data
    const fetchPartners = async () => {
      try {
        // This is the only change required!
        const apiUrl = '/data/partners.json'; // Points to the file in the public folder
        
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch static data.');
        
        const partnersData = await response.json(); 
        
        setAllPartners(partnersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartners();
  }, []); // The empty array [] means this effect runs only once when the page loads

  // --- FILTERING LOGIC ---
  const filteredPartners = useMemo(() => {
    return allPartners.filter(partner => {
      const { name, address, contact, specialties } = filters;
      // Return true only if all conditions are met
      return (
        partner.name.toLowerCase().includes(name.toLowerCase()) &&
        partner.address.toLowerCase().includes(address.toLowerCase()) &&
        partner.contact.includes(contact) &&
        (specialties.length === 0 || specialties.includes(partner.specialty))
      );
    });
  }, [filters, allPartners]);

  // --- PAGINATION LOGIC ---
  const partnersToShow = filteredPartners.slice(0, currentPage * ITEMS_PER_PAGE);
  const hasMorePartners = partnersToShow.length < filteredPartners.length;

  // --- RENDER ---
  return (
    <div className={styles.container}>
      <Head>
        <title>SQUARISH! Partner Portal</title>
        <meta name="description" content="A portal for SQUARISH! suppliers and contractors" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>SQUARISH! Partner Portal</h1>

        <FilterControls
          allPartners={allPartners}
          filters={filters}
          setFilters={setFilters}
          onFilterChange={() => setCurrentPage(1)} // Reset pagination on filter change
        />

        {isLoading && <p className={styles.statusMessage}>Loading partners...</p>}
        {error && <p className={`${styles.statusMessage} ${styles.error}`}>{error}</p>}
        
        {!isLoading && !error && (
          <>
            <div className={styles.partnerList}>
              {partnersToShow.length > 0 ? (
                partnersToShow.map(partner => <PartnerCard key={partner.id} partner={partner} />)
              ) : (
                <p className={styles.statusMessage}>No partners found matching your criteria.</p>
              )}
            </div>

            {hasMorePartners && (
              <div className={styles.loadMoreContainer}>
                <button onClick={() => setCurrentPage(prev => prev + 1)} className={styles.loadMoreBtn}>
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}