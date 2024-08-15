"use server"

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

export const getUserById = async (id: string) => {
    return await adminAuth.getUser(id);
};

export const getUserByEmail = async (email: string) => {
    return await adminAuth.getUserByEmail(email);
};
