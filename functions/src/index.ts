/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {
    HttpsError,
    onCall,
    // onRequest,
} from "firebase-functions/v2/https";
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { UserRole } from "../schemas/user-schema";
// import { logger } from "firebase-functions/v2";
const functions = require('firebase-functions');

// Start writing functions
// https://firebase.google.com/docs/functions/typescript


const app = initializeApp();
const adminAuth = getAuth(app);
const db = getFirestore(app);

export const setCustomClaims = onCall({ region: 'asia-northeast1' }, async (request) => {
    const { uid, claims, adminId }: { uid: string; claims: UserRole, adminId: string } = request.data
    if (!uid) return new HttpsError('invalid-argument', 'uid is required');
    if (!claims) return new HttpsError('invalid-argument', 'claims is required');
    if (!adminId) return new HttpsError('invalid-argument', 'adminId is required');

    const admin = await adminAuth.getUser(adminId);
    if (admin.customClaims?.isAdmin !== true) return new HttpsError('permission-denied', 'Unauthorized');

    // Setting custom user claims
    await adminAuth.setCustomUserClaims(uid, claims);

    //store in firestore
    const userRef = db.collection('users').doc(uid);
    await userRef.update(
        {
            isAdmin: claims.isAdmin,
            isUser: claims.isUser,
        }
    );
    return "success";
})

// exports.setCustomClaims = onRequest({ region: 'asia-northeast1' }, async (request: any) => {
//     logger.log('uid', request.auth.uid);
//     logger.log('email', request.auth.token.email);
//     const { uid, claims }: { uid: string; claims: UserRole } = request.data;
//     if (!uid) return new Error('uid is required');
//     if (!claims) return new Error('claims is required');
//     // Setting custom user claims
//     await adminAuth.setCustomUserClaims(uid, claims);

//     //store in firestore
//     const userRef = db.collection('users').doc(uid);
//     await userRef.set({ ...claims });

//     return "success";
// });


exports.onUserCreated = functions.auth.user().onCreate(
    async (user: any) => {
        const { uid, email, displayName } = user;
        const claims = {
            isAdmin: false,
            isUser: true,
        }

        // Setting custom user claims
        await adminAuth.setCustomUserClaims(uid, claims);
        //store in firestore
        const userRef = db.collection('users').doc(uid);
        await userRef.set({ email, displayName, ...claims });

    }
)

exports.onUserDeleted = functions.auth.user().onDelete(
    async (user: any) => {
        const { uid } = user;
        //delete in firestore
        const userRef = db.collection('users').doc(uid);
        await userRef.delete();
    }
)