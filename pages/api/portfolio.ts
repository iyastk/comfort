import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { savePortfolioToFirestore } from '@/lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const dataPath = path.join(process.cwd(), 'data', 'portfolio.json');
      const raw = fs.readFileSync(dataPath, 'utf8');
      const data = JSON.parse(raw);
      return res.status(200).json(data);
    } catch (error) {
      console.error('Failed to read portfolio data:', error);
      return res.status(500).json({ message: 'Failed to read portfolio data' });
    }
  }

  if (req.method === 'POST') {
    try {
      const dataPath = path.join(process.cwd(), 'data', 'portfolio.json');
      const newPortfolioData = req.body;

      // 1. Write to local JSON (always works, even offline)
      const dataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(dataPath, JSON.stringify(newPortfolioData, null, 2));

      // 2. Also sync to Firestore (non-blocking — won't fail the request if Firebase is down)
      savePortfolioToFirestore(newPortfolioData).catch((err) =>
        console.warn('Firestore sync skipped:', err?.message)
      );

      return res.status(200).json({ message: 'Portfolio updated successfully' });
    } catch (error) {
      console.error('Failed to save portfolio data:', error);
      return res.status(500).json({ message: 'Failed to update portfolio' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
