import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const dataPath = path.join(process.cwd(), 'data', 'portfolio.json');
      const newPortfolioData = req.body;

      // Ensure the data directory exists
      const dataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
      }

      fs.writeFileSync(dataPath, JSON.stringify(newPortfolioData, null, 2));
      res.status(200).json({ message: 'Portfolio updated successfully' });
    } catch (error) {
      console.error('Failed to save portfolio data:', error);
      res.status(500).json({ message: 'Failed to update portfolio' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
