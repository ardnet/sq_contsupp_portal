import { useMemo } from 'react';
import styles from '../styles/Home.module.css';

// --- NEW: Define the relationship between categories and sub-categories ---
const subCategoryMap = {
  Contractor: ["Hacker", "Tiler", "Plumbing", "Partition", "Carpentry", "Electrical", "Painters", "Cleaner", "Flooring", "Counter Tops"],
  Supplier: ["Doors", "Windows", "Glass", "Curtains & Fabrics", "Paints"],
};

export default function FilterControls({ allPartners, filters, setFilters, onFilterChange }) {
  // --- UPDATED: Handlers for new filters ---
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

   // Determine which list of sub-categories to show
  const subCategoriesToShow = filters.category === 'All' 
    ? allUniqueSubCategories 
    : subCategoryMap[filters.category];

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

      {/* --- NEW: Dynamic Sub-Category Checkboxes --- */}
      {filters.category !== 'All' && (
        <div className={styles.filterSection}>
          <h4>{filters.category} Sub-Categories</h4>
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
      )}

    </div>
  );
}