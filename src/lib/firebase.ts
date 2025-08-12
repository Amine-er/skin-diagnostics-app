import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: 'test-project-ktspu',
  appId: '1:1234567890:web:1234567890abcdef123456',
  storageBucket: 'test-project-ktspu.appspot.com',
  apiKey: 'AIzaSyD-1234567890abcdef1234567890abcdef',
  authDomain: 'test-project-ktspu.firebaseapp.com',
  measurementId: '',
  messagingSenderId: '1234567890',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
