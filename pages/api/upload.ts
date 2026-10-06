import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    const { fileData, fileName } = req.body;

    if (!fileData) {
      return res.status(400).json({ message: 'Missing fileData in request body' });
    }

    // Ensure public/images/uploads folder exists
    const uploadsDir = path.join(process.cwd(), 'public', 'images', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Clean base64 header
    const matches = fileData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let buffer: Buffer;
    let safeFileName = fileName ? fileName.replace(/[^a-zA-Z0-9_.-]/g, '_') : `upload_${Date.now()}.webp`;

    if (matches && matches.length === 3) {
      buffer = Buffer.from(matches[2], 'base64');
    } else {
      buffer = Buffer.from(fileData, 'base64');
    }

    const filePath = path.join(uploadsDir, safeFileName);
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/images/uploads/${safeFileName}`;
    return res.status(200).json({ 
      message: 'File uploaded successfully', 
      url: publicUrl,
      fileName: safeFileName
    });
  } catch (error) {
    console.error('Error saving uploaded file:', error);
    return res.status(500).json({ message: 'Failed to upload file locally' });
  }
}
