/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onCall } from "firebase-functions/v2/https";
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from "firebase-admin/auth";
import { UserRole } from "../schemas/user-schema";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript


const app = initializeApp();
const adminAuth = getAuth(app);

exports.setCustomClaims = onCall({ region: 'asia-northeast1' }, async (req: any) => {
    // logger.log('req', req);
    const { uid, claims }: { uid: string; claims: UserRole } = req.data;
    if (!uid) return new Error('uid is required');
    if (!claims) return new Error('claims is required');
    // Setting custom user claims
    await adminAuth.setCustomUserClaims(uid, claims);
    return "success";
});
