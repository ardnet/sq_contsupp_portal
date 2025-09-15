<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SQUARISH Partner Portal</title>
    <style>
        /* All CSS remains the same as the previous version */
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #f4f7f9;
            color: #333;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 1100px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 { color: #2c3e50; text-align: center; }
        .filters {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid #e0e0e0;
        }
        .text-filters {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }
        .filters input[type="text"] {
            width: 100%;
            padding: 12px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
            box-sizing: border-box;
        }
        .specialty-filters {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            align-items: center;
        }
        .specialty-filters label {
            display: flex;
            align-items: center;
            gap: 5px;
            padding: 8px 12px;
            border: 1px solid #ccc;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
        }
        .specialty-filters input[type="checkbox"] { display: none; }
        .specialty-filters label:has(input:checked) {
            background-color: #3498db;
            color: white;
            border-color: #3498db;
        }
        .specialty-filters label:hover { background-color: #ecf0f1; }
        .specialty-filters label:has(input:checked):hover { background-color: #2980b9; }
        .partner-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 20px;
            min-height: 100px; /* For loading/error message visibility */
        }
        .partner-card { border: 1px solid #e0e0e0; border-radius: 8px; padding: 15px; background-color: #fafafa; transition: box-shadow 0.3s ease; }
        .partner-card:hover { box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        .partner-card h3 { margin-top: 0; color: #3498db; }
        .partner-card p { margin: 5px 0; font-size: 14px; line-height: 1.5; }
        .partner-card strong { color: #555; }
        .load-more-container { text-align: center; margin-top: 30px; }
        #loadMoreBtn { padding: 12px 25px; font-size: 16px; background-color: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer; transition: background-color 0.3s ease; }
        #loadMoreBtn:hover { background-color: #2980b9; }
        #loadMoreBtn.hidden, #noResults.hidden { display: none; }
        #noResults, .status-message { text-align: center; color: #777; font-size: 18px; padding: 20px; }
        .status-message.error { color: #e74c3c; }
    </style>
</head>
<body>

    <div class="container">
        <h1>SQUARISH Partner Portal</h1>

        <div class="filters">
            <div class="text-filters">
                <input type="text" id="nameFilter" placeholder="Filter by name...">
                <input type="text" id="addressFilter" placeholder="Filter by address...">
                <input type="text" id="contactFilter" placeholder="Filter by contact...">
            </div>
            <div id="specialtyFilterContainer" class="specialty-filters"></div>
        </div>

        <div id="partnerList" class="partner-list">
            </div>
        <p id="noResults" class="hidden">No partners found matching your criteria.</p>
        <div class="load-more-container">
            <button id="loadMoreBtn" class="hidden">Load More</button>
        </div>
    </div>

    <script>
        // --- GLOBAL STATE & REFERENCES ---
        let partners = []; // This will be populated from the API
        let currentFilteredItems = [];
        let currentPage = 1;
        const itemsPerPage = 6;
        
        // References to DOM elements
        const partnerListContainer = document.getElementById('partnerList');
        const nameFilterInput = document.getElementById('nameFilter');
        const addressFilterInput = document.getElementById('addressFilter');
        const contactFilterInput = document.getElementById('contactFilter');
        const specialtyFilterContainer = document.getElementById('specialtyFilterContainer');
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        const noResultsMessage = document.getElementById('noResults');

        /**
         * NEW: Fetches and transforms partner data from a public API.
         * @returns {Promise<Array>} A promise that resolves to the formatted partner list.
         */
        async function fetchPartners() {
            const apiUrl = 'https://jsonplaceholder.typicode.com/users';
            const specialties = ["Electrical", "Contractor", "Plumbing", "Painting", "Flooring", "HVAC"];

            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const users = await response.json();

                // Map the API data to our application's data structure
                return users.map((user, index) => ({
                    name: user.name,
                    address: `${user.address.street}, ${user.address.suite}, ${user.address.city}`,
                    contact: user.phone.split(' ')[0], // Clean up phone number format
                    specialty: specialties[index % specialties.length] // Assign a specialty
                }));

            } catch (error) {
                console.error('Failed to fetch partners:', error);
                // Display error message to the user in the UI
                partnerListContainer.innerHTML = `<p class="status-message error">Failed to load partner data. Please try again later.</p>`;
                return []; // Return an empty array on failure
            }
        }
        
        // --- Functions for rendering, filtering, and pagination (mostly unchanged) ---
        function appendPartners(items) {
            items.forEach(partner => {
                const card = document.createElement('div');
                card.className = 'partner-card';
                card.innerHTML = `<h3>${partner.name}</h3><p><strong>Address:</strong> ${partner.address}</p><p><strong>Contact:</strong> ${partner.contact}</p><p><strong>Specialty:</strong> ${partner.specialty}</p>`;
                partnerListContainer.appendChild(card);
            });
        }

        function loadMorePartners() {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const nextBatch = currentFilteredItems.slice(startIndex, endIndex);
            appendPartners(nextBatch);
            currentPage++;
            if (endIndex >= currentFilteredItems.length) {
                loadMoreBtn.classList.add('hidden');
            } else {
                loadMoreBtn.classList.remove('hidden');
            }
        }

        function populateSpecialties() {
            const uniqueSpecialties = [...new Set(partners.map(p => p.specialty))];
            uniqueSpecialties.sort().forEach(specialty => {
                const label = document.createElement('label');
                label.innerHTML = `<input type="checkbox" value="${specialty}">${specialty}`;
                specialtyFilterContainer.appendChild(label);
            });
        }

        function applyFilters() {
            const nameQuery = nameFilterInput.value.toLowerCase();
            const addressQuery = addressFilterInput.value.toLowerCase();
            const contactQuery = contactFilterInput.value;
            const checkedBoxes = document.querySelectorAll('#specialtyFilterContainer input:checked');
            const selectedSpecialties = Array.from(checkedBoxes).map(cb => cb.value);

            currentFilteredItems = partners.filter(partner => {
                const nameMatch = partner.name.toLowerCase().includes(nameQuery);
                const addressMatch = partner.address.toLowerCase().includes(addressQuery);
                const contactMatch = partner.contact.includes(contactQuery);
                const specialtyMatch = selectedSpecialties.length === 0 || selectedSpecialties.includes(partner.specialty);
                return nameMatch && addressMatch && contactMatch && specialtyMatch;
            });

            currentPage = 1;
            partnerListContainer.innerHTML = '';
            loadMoreBtn.classList.add('hidden');
            
            if (currentFilteredItems.length === 0) {
                noResultsMessage.classList.remove('hidden');
            } else {
                noResultsMessage.classList.add('hidden');
                loadMorePartners();
            }
        }

        /**
         * NEW: Main function to initialize the application.
         */
        async function initializeApp() {
            // 1. Show a loading message
            partnerListContainer.innerHTML = `<p class="status-message">Loading partners...</p>`;

            // 2. Fetch data from the API
            partners = await fetchPartners();

            // 3. If data fetching was successful, build the UI
            if (partners.length > 0) {
                partnerListContainer.innerHTML = ''; // Clear loading message
                populateSpecialties();
                currentFilteredItems = [...partners];
                loadMorePartners();
            }
            
            // 4. Attach event listeners
            nameFilterInput.addEventListener('keyup', applyFilters);
            addressFilterInput.addEventListener('keyup', applyFilters);
            contactFilterInput.addEventListener('keyup', applyFilters);
            specialtyFilterContainer.addEventListener('change', applyFilters);
            loadMoreBtn.addEventListener('click', loadMorePartners);
        }

        // --- START THE APP ---
        document.addEventListener('DOMContentLoaded', initializeApp);

    </script>
</body>
</html>