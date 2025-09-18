import { useMemo } from 'react';
import styles from '../styles/Home.module.css';

export default function FilterControls({ allPartners, filters, setFilters, onFilterChange }) {
  // Get a unique, sorted list of specialties for the checkboxes
  const uniqueSpecialties = useMemo(() => {
    const specialties = new Set(allPartners.map(p => p.specialty));
    return Array.from(specialties).sort();
  }, [allPartners]);

  // Handler for text input changes
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    onFilterChange();
  };

  // Handler for checkbox changes
  const handleSpecialtyChange = (e) => {
    const { value, checked } = e.target;
    const currentSpecialties = filters.specialties;
    const newSpecialties = checked
      ? [...currentSpecialties, value]
      : currentSpecialties.filter(s => s !== value);
    setFilters(prev => ({ ...prev, specialties: newSpecialties }));
    onFilterChange();
  };

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
      <div className={styles.specialtyFilters}>
        {uniqueSpecialties.map(specialty => (
          <label key={specialty} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              value={specialty}
              onChange={handleSpecialtyChange}
              checked={filters.specialties.includes(specialty)}
            />
            {specialty}
          </label>
        ))}
      </div>
    </div>
  );
}