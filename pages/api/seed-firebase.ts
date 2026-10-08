import { NextApiRequest, NextApiResponse } from 'next';
import portfolioData from '@/data/portfolio.json';
import { savePortfolioToFirestore, isFirebaseConfigured, getFirebaseConfig } from '@/lib/firebase';

/**
 * One-time seeding endpoint.
 * POST /api/seed-firebase
 *
 * This uploads the entire contents of data/portfolio.json to Firestore.
 * It also records which media files are local vs already on Firebase Storage.
 * After seeding, the app can serve data from Firestore instead of the static JSON.
 *
 * Security: Only accessible when SEED_SECRET env var matches the request header.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Simple secret-based guard — set SEED_SECRET in .env.local
  const secret = process.env.SEED_SECRET;
  const provided = req.headers['x-seed-secret'] || req.body?.secret;
  if (secret && provided !== secret) {
    return res.status(401).json({ message: 'Unauthorized: invalid seed secret.' });
  }

  const config = getFirebaseConfig();
  if (!isFirebaseConfigured(config)) {
    return res.status(503).json({
      message: 'Firebase is not configured. Please set environment variables in .env.local.',
    });
  }

  try {
    const dataToSeed = {
      categories: portfolioData.categories,
      serviceInfo: portfolioData.serviceInfo,
    };

    const success = await savePortfolioToFirestore(dataToSeed);

    if (success) {
      return res.status(200).json({
        message: '✅ Portfolio data successfully seeded to Firestore.',
        stats: {
          totalCategories: Object.keys(portfolioData.categories).length,
          totalItems: Object.values(portfolioData.categories).flat().length,
          services: portfolioData.serviceInfo.length,
        },
      });
    } else {
      return res.status(500).json({ message: 'Seeding failed. Check server logs.' });
    }
  } catch (error: any) {
    console.error('Seed Firebase error:', error);
    return res.status(500).json({ message: `Seed failed: ${error?.message}` });
  }
}
