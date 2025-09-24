import { useMemo } from 'react';
import styles from '../styles/Home.module.css';

// --- NEW: Define the relationship between categories and sub-categories ---
// const subCategoryMap = {
//   Contractor: ["Hacker", "Tiler", "Plumbing", "Partition", "Carpentry", "Electrical", "Painters", "Cleaner", "Flooring", "Counter Tops"],
//   Supplier: ["Doors", "Windows", "Glass", "Curtains & Fabrics", "Paints"],
// };

export default function FilterControls({ allPartners, filters, setFilters, onFilterChange }) {
  // const allPossibleSubCategories = useMemo(() => {
  //   const combined = [...subCategoryMap.Contractor, ...subCategoryMap.Supplier];
  //   // Use a Set to get unique values, then convert back to an array and sort
  //   return Array.from(new Set(combined)).sort();
  // }, []); // Empty dependency array because our map is static

  // --- UPDATED: Handlers for new filters ---
  // const allUniqueSubCategories = useMemo(() => {
  //   const allSubCats = allPartners.flatMap(p => p.subCategory);
  //   return Array.from(new Set(allSubCats)).sort();
  // }, [allPartners]);

  // --- NEW: A single, dynamic way to get sub-category options ---
  const subCategoriesToShow = useMemo(() => {
    if (!allPartners) return [];

    // 1. Determine which partners to look at
    const relevantPartners = filters.category === 'All'
      ? allPartners
      : allPartners.filter(p => p.category === filters.category);

    // 2. Get all sub-categories from those partners
    const allSubCats = relevantPartners.flatMap(p => p.subCategory || []);

    // 3. Return a unique, sorted list
    return Array.from(new Set(allSubCats)).sort();
  }, [allPartners, filters.category]); // Recalculates when data or category changes

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    // When category changes, reset the sub-category selections
    setFilters(prev => ({ ...prev, category: value, subCategories: [] }));
    onFilterChange();
  };

  const handleSubCategoryChange = (e) => {
    const { value, checked } = e.target;
    const currentSubCategories = filters.subCategories;
    const newSubCategories = checked
      ? [...currentSubCategories, value]
      : currentSubCategories.filter(s => s !== value);
    setFilters(prev => ({ ...prev, subCategories: newSubCategories }));
    onFilterChange();
  };

  // Handler for text input changes
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    onFilterChange();
  };

  //  // --- UPDATED: This logic now uses the correct list for the "All" case ---
  // const subCategoriesToShow = filters.category === 'All' 
  //   ? allPossibleSubCategories // Use the new combined list
  //   : subCategoryMap[filters.category];

  return (
    <div className={styles.filters}>
      <div className={styles.textFilters}>
        <input
          type="text"
          name="name"
          placeholder="Filter by name..."
          value={filters.name}
          onChange={handleTextChange}
        />
      </div>

      {/* --- NEW: Category Radio Buttons --- */}
      <div className={styles.filterSection}>
        <h4>Category</h4>
        <div className={styles.categoryFilters}>
          {['All', 'Contractor', 'Supplier'].map(cat => (
            <label key={cat} className={styles.radioLabel}>
              <input 
                type="radio" 
                name="category" 
                value={cat} 
                checked={filters.category === cat}
                onChange={handleCategoryChange}
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.filterSection}>
        <h4>
          {filters.category === 'All' ? 'All Specialties' : `${filters.category} Specialties`}
        </h4>
        <div className={styles.specialtyFilters}>
          {subCategoriesToShow.map(subCat => (
            <label key={subCat} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                value={subCat}
                onChange={handleSubCategoryChange}
                checked={filters.subCategories.includes(subCat)}
              />
              {subCat}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}