// REMOVE the 'path' and 'fs' imports
// import path from 'path';
// import { promises as fs } from 'fs';

import { getServerSession } from "next-auth/next";
import { authOptions } from './auth/[...nextauth]';

// --- NEW: Import the JSON data directly ---
// The path is relative from this file (pages/api/partners.js) to the root
import partners from '../../data/partners.json';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  // --- REMOVE the file reading logic ---
  // const jsonDirectory = path.join(process.cwd(), 'data');
  // const fileContents = await fs.readFile(path.join(jsonDirectory, 'partners.json'), 'utf8');
  // const partners = JSON.parse(fileContents);
  // The 'partners' variable now comes directly from the import above.

  if (session) {
    // If the user IS logged in, send the FULL data
    res.status(200).json(partners);
  } else {
    // If the user IS NOT logged in, send only the public data
    const publicData = partners.map(partner => ({
      id: partner.id,
      name: partner.name,
      specialty: partner.specialty,
    }));
    res.status(200).json(publicData);
  }
}