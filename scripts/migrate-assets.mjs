import fs from 'fs';
import path from 'path';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import sharp from 'sharp';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const dataPath = path.join(__dirname, '..', 'data', 'portfolio.json');
const portfolioData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const OPTIMIZED_DIR = path.join(__dirname, '..', 'public', 'images', 'optimized');
if (!fs.existsSync(OPTIMIZED_DIR)) {
  fs.mkdirSync(OPTIMIZED_DIR, { recursive: true });
}

async function optimizeAndSaveLocal(localPath, categorySlug) {
  if (localPath.startsWith('http') || localPath.includes('/optimized/')) return localPath; // Already uploaded or optimized

  const absolutePath = path.join(__dirname, '..', 'public', localPath);
  if (!fs.existsSync(absolutePath)) {
    console.warn(`[WARN] File not found: ${absolutePath}`);
    return localPath;
  }

  const fileName = path.basename(localPath);
  let uploadName = fileName;

  if (fileName.match(/\.(jpg|jpeg|png)$/i)) {
    console.log(`Optimizing image: ${fileName}`);
    uploadName = fileName.replace(/\.[^/.]+$/, "") + ".webp";
    const destPath = path.join(OPTIMIZED_DIR, uploadName);
    
    // Only optimize if it doesn't already exist
    if (!fs.existsSync(destPath)) {
      let fileBuffer = fs.readFileSync(absolutePath);
      await sharp(fileBuffer)
        .resize({ width: 1920, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(destPath);
    }
  } else if (fileName.match(/\.mp4$/i)) {
    console.log(`Copying video: ${fileName}`);
    const destPath = path.join(OPTIMIZED_DIR, fileName);
    if (!fs.existsSync(destPath)) {
      fs.copyFileSync(absolutePath, destPath);
    }
  }

  return `/images/optimized/${uploadName}`;
}

async function run() {
  const newCategories = { ...portfolioData.categories };

  for (const [categorySlug, items] of Object.entries(newCategories)) {
    console.log(`\n=== Processing category: ${categorySlug} ===`);
    for (const item of items) {
      if (item.url) {
        item.url = await optimizeAndSaveLocal(item.url, categorySlug);
      }
      if (item.gallery && Array.isArray(item.gallery)) {
        for (let i = 0; i < item.gallery.length; i++) {
          item.gallery[i] = await optimizeAndSaveLocal(item.gallery[i], categorySlug);
        }
      }
    }
  }

  const dataToSeed = {
    categories: newCategories,
    serviceInfo: portfolioData.serviceInfo,
  };

  console.log('\nSaving optimized asset URLs to local portfolio.json...');
  fs.writeFileSync(dataPath, JSON.stringify(dataToSeed, null, 2), 'utf8');

  try {
    console.log('Seeding optimized data to Firestore...');
    const docRef = doc(db, 'site_data', 'portfolio');
    await setDoc(docRef, { ...dataToSeed, updatedAt: new Date().toISOString() }, { merge: true });
    console.log('✅ Firestore sync complete!');
  } catch (error) {
    console.error('⚠️ Firestore sync failed (check permissions or config). Data is saved locally.', error.message);
  }

  console.log('✅ Local Asset Optimization & Migration complete!');
  process.exit(0);
}

run().catch((error) => {
  console.error("Migration Failed:", error);
  process.exit(1);
});
