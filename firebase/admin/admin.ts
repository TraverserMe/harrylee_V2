"use server";

import { adminAuth } from "@/firebase/admin/config";
import { NextResponse } from "next/server";
import { UserRole } from "@/schemas/user-schema";

const retrieveUser = async (uid: string) => {
    try {
        const res = await adminAuth.getUser(uid);
        console.log(res);
        if (!res) {
            return false;
        }
        console.log(JSON.stringify(res));
        return JSON.stringify(res);
    } catch (error) {
        return false;
    }
};

const getAllUsers = async () => {
    const querySnapshot = await adminAuth.listUsers();
    const res = [] as string[];

    console.log(querySnapshot.users);
    querySnapshot.users.forEach((user) => {
        res.push(user.uid);
    });
    return res;
};

const firstTimeClaim = async (uid: string) => {
    const user = await adminAuth.getUser(uid);
    if (!user) {
        return NextResponse.json({ error: "user not found" }, { status: 404 });
    }

    if (user.customClaims) {
        return NextResponse.json({ message: "success" }, { status: 200 });
    }

    await adminAuth.setCustomUserClaims(uid, {
        isOwner: true,
        isAdmin: true,
        isUser: true,
    });

    return NextResponse.json({ message: "success" }, { status: 200 });
};

const setCustomUserClaims = async (uid: string, UserRole: UserRole) => {
    const user = await adminAuth.getUser(uid);
    if (!user) {
        return NextResponse.json({ error: "user not found" }, { status: 404 });
    }

    await adminAuth.setCustomUserClaims(uid, UserRole);

    return NextResponse.json({ message: "success" }, { status: 200 });
};

export { retrieveUser, firstTimeClaim, getAllUsers };
