import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: 'skindeep-insights-ktspu',
  appId: '1:607151478583:web:ec44dd3d41d8a47e996cb2',
  storageBucket: 'skindeep-insights-ktspu.firebasestorage.app',
  apiKey: 'AIzaSyBHv8q_3OVmj3w0LvzRiYKg3yrIa1wLBUs',
  authDomain: 'skindeep-insights-ktspu.firebaseapp.com',
  measurementId: '',
  messagingSenderId: '607151478583',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
