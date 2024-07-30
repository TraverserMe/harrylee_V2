import {
    initializeApp,
    applicationDefault,
    getApp,
    getApps,
} from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const firebaseConfig = {
    credential: applicationDefault(),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const adminAuth = getAuth(app);

export { adminAuth };
