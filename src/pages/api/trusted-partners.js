import { getServerSession } from "next-auth/next";
import { authOptions } from './auth/[...nextauth]';

// Import the trusted partners data
import trustedPartners from '../../../data/trustedPartners.json';

export default async function handler(req, res) {
  // Check the user's session on the server
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    // If the user IS logged in, send the FULL data
    res.status(200).json(trustedPartners);
  } else {
    // If the user IS NOT logged in, send only the public data
    const publicData = trustedPartners.map(partner => ({
      id: partner.id,
      name: partner.name,
      logoUrl: partner.logoUrl,
      // All other sensitive fields are left out
    }));
    res.status(200).json(publicData);
  }
}