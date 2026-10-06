import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, FirebaseStorage } from "firebase/storage";
import { getFirestore, doc, setDoc, getDoc, Firestore } from "firebase/firestore";

export interface FirebaseConfig {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
}

const LOCAL_STORAGE_FIREBASE_KEY = "comfort_firebase_config";

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
    apiKey: storedConfig.apiKey || process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
    authDomain: storedConfig.authDomain || process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
    projectId: storedConfig.projectId || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
    storageBucket: storedConfig.storageBucket || process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: storedConfig.messagingSenderId || process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: storedConfig.appId || process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
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
