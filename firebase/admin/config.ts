import {
    initializeApp,
    getApp,
    getApps,
} from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";


const credential = JSON.parse(
    Buffer.from(process.env.GOOGLE_SERVICE_KEY ?? "", "base64").toString().replace(/\n/g, "")
)

const firebaseConfig = {
    credential: credential,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const adminAuth = getAuth(app);

export { adminAuth };
