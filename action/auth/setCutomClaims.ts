"use server"


import { adminAuth } from "@/firebase/admin/config";
import { UserRole } from "@/schemas/user-schema";

export const setCustomClaims = async (uid: string, claims: UserRole) => {
    if (!uid) return "No user ID provided";
    if (!claims) return "No claims provided";
    const res = await adminAuth.setCustomUserClaims(uid, claims);
    return res
}
