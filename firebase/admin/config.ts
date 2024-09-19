import {
    initializeApp,
    getApp,
    getApps,
    cert,
} from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";


// const credential = JSON.parse(
//     Buffer.from(process.env.GOOGLE_SERVICE_KEY ?? "", "base64").toString().replace(/\n/g, "")
// )

// const firebaseConfig = {
//     credential: credential,
//     // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//     databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
// };

const app = !getApps().length ? initializeApp({
    credential: cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY,
    })
}) : getApp();

const adminAuth = getAuth(app);

export { adminAuth };
