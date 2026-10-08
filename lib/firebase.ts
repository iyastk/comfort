import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, FirebaseStorage } from "firebase/storage";
import { getFirestore, doc, setDoc, getDoc, Firestore } from "firebase/firestore";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

export interface FirebaseConfig {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  measurementId?: string;
}

const LOCAL_STORAGE_FIREBASE_KEY = "comfort_firebase_config";

const DEFAULT_FIREBASE_CONFIG: FirebaseConfig = {
  apiKey: "AIzaSyAALOCn8McZyxEBV0PCFWEP7GGz1oddcMM",
  authDomain: "comfortsplus-2378e.firebaseapp.com",
  projectId: "comfortsplus-2378e",
  storageBucket: "comfortsplus-2378e.firebasestorage.app",
  messagingSenderId: "266261766395",
  appId: "1:266261766395:web:2f22447711ec5efb2e905e",
  measurementId: "G-PM4VC1DRSV"
};

// Read configuration from environment or localStorage
export function getFirebaseConfig(): FirebaseConfig {
  let storedConfig: FirebaseConfig = {};
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_FIREBASE_KEY);
      if (saved) {
        storedConfig = JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Failed to parse stored Firebase config", e);
    }
  }

  return {
    apiKey: storedConfig.apiKey || process.env.NEXT_PUBLIC_FIREBASE_API_KEY || DEFAULT_FIREBASE_CONFIG.apiKey,
    authDomain: storedConfig.authDomain || process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || DEFAULT_FIREBASE_CONFIG.authDomain,
    projectId: storedConfig.projectId || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || DEFAULT_FIREBASE_CONFIG.projectId,
    storageBucket: storedConfig.storageBucket || process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || DEFAULT_FIREBASE_CONFIG.storageBucket,
    messagingSenderId: storedConfig.messagingSenderId || process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || DEFAULT_FIREBASE_CONFIG.messagingSenderId,
    appId: storedConfig.appId || process.env.NEXT_PUBLIC_FIREBASE_APP_ID || DEFAULT_FIREBASE_CONFIG.appId,
    measurementId: storedConfig.measurementId || process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || DEFAULT_FIREBASE_CONFIG.measurementId,
  };
}

export function saveFirebaseConfig(config: FirebaseConfig): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_FIREBASE_KEY, JSON.stringify(config));
  }
}

export function isFirebaseConfigured(config?: FirebaseConfig): boolean {
  const cfg = config || getFirebaseConfig();
  return Boolean(cfg.apiKey && cfg.projectId && cfg.storageBucket);
}

// Get or initialize Firebase App instance
export function getFirebaseApp(customConfig?: FirebaseConfig): FirebaseApp | null {
  const config = customConfig || getFirebaseConfig();
  if (!isFirebaseConfigured(config)) {
    return null;
  }

  try {
    if (!getApps().length) {
      return initializeApp(config);
    } else {
      return getApp();
    }
  } catch (error) {
    console.error("Error initializing Firebase App:", error);
    return null;
  }
}

// Get or initialize Firebase Analytics safely (client-side only)
export async function getFirebaseAnalytics(): Promise<Analytics | null> {
  if (typeof window === "undefined") return null;
  const app = getFirebaseApp();
  if (!app) return null;
  try {
    const supported = await isSupported();
    if (supported) {
      return getAnalytics(app);
    }
  } catch (error) {
    console.warn("Firebase Analytics initialization warning:", error);
  }
  return null;
}


// ──────────────────────────────────────────────────────────────────────────────
// Firestore: Portfolio Data Read / Write
// ──────────────────────────────────────────────────────────────────────────────

export interface PortfolioFirestoreData {
  categories: Record<string, any[]>;
  serviceInfo: any[];
  updatedAt?: string;
}

/**
 * Read portfolio data from Firestore.
 * Returns null if Firebase is not configured or if the document doesn't exist yet.
 */
export async function getPortfolioFromFirestore(): Promise<PortfolioFirestoreData | null> {
  try {
    const app = getFirebaseApp();
    if (!app) return null;

    const db: Firestore = getFirestore(app);
    const docRef = doc(db, "site_data", "portfolio");
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      return snap.data() as PortfolioFirestoreData;
    }
    return null;
  } catch (error) {
    console.error("Error reading portfolio from Firestore:", error);
    return null;
  }
}

/**
 * Write portfolio data to Firestore.
 * Merges the data so existing fields not in the payload are preserved.
 */
export async function savePortfolioToFirestore(data: PortfolioFirestoreData): Promise<boolean> {
  try {
    const app = getFirebaseApp();
    if (!app) {
      console.warn("Firebase not configured. Portfolio saved only to local JSON.");
      return false;
    }

    const db: Firestore = getFirestore(app);
    const docRef = doc(db, "site_data", "portfolio");
    await setDoc(docRef, { ...data, updatedAt: new Date().toISOString() }, { merge: true });
    console.log("Portfolio successfully synced to Firestore.");
    return true;
  } catch (error) {
    console.error("Error saving portfolio to Firestore:", error);
    return false;
  }
}

// Upload file to Firebase Storage
export async function uploadToFirebaseStorage(
  file: File | Blob,
  folder: string = "portfolio",
  customFileName?: string,
  onProgress?: (progress: number) => void
): Promise<string> {
  const app = getFirebaseApp();

  // Fallback to local Data URL if Firebase is not configured
  if (!app) {
    console.warn("Firebase Storage is not configured. Converting image to local Data URL preview.");
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Simulate upload progress
        if (onProgress) {
          onProgress(50);
          setTimeout(() => onProgress(100), 200);
        }
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }

  const storage: FirebaseStorage = getStorage(app);
  const fileName = customFileName || `${Date.now()}_${(file as File).name || 'asset.webp'}`;
  const storageRef = ref(storage, `${folder}/${fileName}`);

  return new Promise((resolve, reject) => {
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (onProgress) {
          onProgress(Math.round(progress));
        }
      },
      (error) => {
        console.error("Firebase Storage Upload Error:", error);
        reject(error);
      },
      async () => {
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadUrl);
        } catch (err) {
          reject(err);
        }
      }
    );
  });
}
