import { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import { useSession } from 'next-auth/react'; // Import useSession
import styles from '../styles/Home.module.css';
import PartnerCard from '../components/PartnerCard';
import FilterControls from '../components/FilterControls';
import LoginModal from '../components/LoginModal'; // Import the modal
import TrustedPartners from '../components/TrustedPartners'; // Import the new component

// The number of items to show per page
const ITEMS_PER_PAGE = 6;

export default function Home() {
  const { data: session } = useSession(); // Get session status
  const [isModalOpen, setIsModalOpen] = useState(false); // State for the modal

  // --- STATE MANAGEMENT ---
  const [allPartners, setAllPartners] = useState([]); // Stores the original list from the API
  const [isLoading, setIsLoading] = useState(true); // For the loading state
  const [error, setError] = useState(null); // For any API errors
  const [currentPage, setCurrentPage] = useState(1); // For pagination

  // --- UPDATED: Add new filter states ---
  const [filters, setFilters] = useState({
    name: '',
    address: '',
    contact: '',
    specialties: [],
    category: 'All', // Default to 'All'
    subCategories: [],
  });

  // --- DATA FETCHING ---
  useEffect(() => {
    // This async function fetches and transforms the data
    const fetchPartners = async () => {
      try {
        // This is the only change required!
        // const apiUrl = '/data/partners.json'; // Points to the file in the public folder
        const apiUrl = '/api/partners'; // This now points to our secure API route
        
        const response = await fetch(apiUrl);
        // if (!response.ok) throw new Error('Failed to fetch static data.');
        if (!response.ok) throw new Error('Failed to fetch data from the API.');
        
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
      const { name, address, contact, specialties, category, subCategories } = filters;
      
      const nameMatch = (partner.name || '').toLowerCase().includes(name.toLowerCase());
      const addressMatch = (partner.address || '').toLowerCase().includes(address.toLowerCase());
      const contactMatch = (partner.contact || '').includes(contact);
      const specialtyMatch = specialties.length === 0 || specialties.includes(partner.specialty);
      
      // --- NEW: Add category and sub-category matching logic ---
      const categoryMatch = category === 'All' || partner.category === category;
      const subCategoryMatch = subCategories.length === 0 || subCategories.includes(partner.subCategory);
      
      return nameMatch && addressMatch && contactMatch && specialtyMatch && categoryMatch && subCategoryMatch;
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

      {/* Conditionally render the LoginModal */}
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <main className={styles.main}>
        <h1 className={styles.title}>SQUARISH! Partner Portal</h1>

        {/* --- ADD THE NEW COMPONENT HERE --- */}
        <TrustedPartners 
          isLoggedIn={!!session} 
          onAuthRequired={() => setIsModalOpen(true)} 
        />

        <h2 className={styles.allPartnersTitle}>All Partners</h2>
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
              {partnersToShow.map(partner => (
                <PartnerCard 
                  key={partner.id} 
                  partner={partner}
                  isLoggedIn={!!session} // Pass login status
                  onAuthRequired={() => setIsModalOpen(true)} // Pass function to open modal
                />
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
        )}
      </main>
    </div>
  );
}