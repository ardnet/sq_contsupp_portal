// This file is server-side code. It will never be sent to the browser.

// This function generates our partner data.
// In a real-world scenario, this might fetch data from a database.
function getPartnerData() {
  const specialties = ["Electrical", "Contractor", "Plumbing", "Painting", "Flooring", "HVAC"];
  const names = ["Alpha", "Beta", "Gamma", "Delta", "Omega", "Sigma", "Epsilon"];
  const suffixes = ["Solutions", "Builders", "Services", "Group", "Pte Ltd", "Co"];
  const partners = [];

  for (let i = 1; i <= 50; i++) {
    partners.push({
      id: i, // Add a unique ID
      name: `${names[i % names.length]} ${suffixes[i % suffixes.length]} #${i}`,
      address: `${i * 10} Main Street, Singapore ${100000 + i}`,
      contact: `6000-${1000 + i}`,
      specialty: specialties[i % specialties.length]
    });
  }
  return partners;
}

// The API route handler
export default function handler(req, res) {
  // We only allow GET requests to this endpoint
  if (req.method === 'GET') {
    const partnersData = getPartnerData();
    // Set the status to 200 (OK) and return the JSON data
    res.status(200).json(partnersData);
  } else {
    // If any other method is used, return an error
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}