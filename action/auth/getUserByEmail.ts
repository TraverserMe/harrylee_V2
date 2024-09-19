"use server"

import { adminAuth } from "@/firebase/admin/config";

export const getUserByEmail = async (email: string) => {
    const user = await adminAuth.getUserByEmail(email);

    if (!user) return null

    return user
};
