import path from 'path';
import { promises as fs } from 'fs';
import { getServerSession } from "next-auth/next";
import { authOptions } from './auth/[...nextauth]'; // Import authOptions

export default async function handler(req, res) {
  // 1. Check if the user is logged in on the server
  const session = await getServerSession(req, res, authOptions);

  // 2. Find the absolute path to the JSON file
  const jsonDirectory = path.join(process.cwd(), 'data');
  const fileContents = await fs.readFile(path.join(jsonDirectory, 'partners.json'), 'utf8');
  const partners = JSON.parse(fileContents);

  if (session) {
    // 3. If the user IS logged in, send the FULL data
    res.status(200).json(partners);
  } else {
    // 4. If the user IS NOT logged in, send only the public data
    const publicData = partners.map(partner => ({
      id: partner.id,
      name: partner.name,
      specialty: partner.specialty,
      // Address and Contact are intentionally left out
    }));
    res.status(200).json(publicData);
  }
}