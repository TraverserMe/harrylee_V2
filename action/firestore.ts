"use server"

import { UserRole } from '@/schemas/user-schema';
import * as admin from 'firebase-admin';

// Initialize the Firebase app if it hasn't been initialized already
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
            clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY, // Replace escaped newline characters
        }),
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    });
}

const adminAuth = admin.auth();

const firestore = admin.firestore();

export const getUserById = async (id: string) => {
    return await adminAuth.getUser(id);
};

export const getUserByEmail = async (email: string) => {
    return await adminAuth.getUserByEmail(email);
};

export const setCustomClaims = async (uid: string, claims: UserRole, adminId: string) => {

    if (!uid) return "No user ID provided";
    if (!claims) return "No claims provided";
    if (!adminId) return "No admin ID provided";


    const user = await adminAuth.getUser(adminId);
    if (!user.customClaims?.isAdmin || !user.customClaims?.isOwner) return "Unauthorized";

    await adminAuth.setCustomUserClaims(uid, claims);

    await firestore.collection('users').doc(uid).update({
        ...claims
    });

    return "success";
}