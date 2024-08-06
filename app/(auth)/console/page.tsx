"use client";
import { auth } from "@/firebase/config";
import { getUserInfo } from "@/firebase/user";
import { UserRole } from "@/schemas/user-schema";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

function ConsolePage() {
    const router = useRouter();
    const [user, loading, error] = useAuthState(auth, {
        onUserChanged: async (user) => {
            if (user) {
                const userInfo = await getUserInfo(user.uid);
                setUserClaims({
                    isAdmin: userInfo?.claims.isAdmin as boolean,
                    isOwner: userInfo?.claims.isOwner as boolean,
                    isUser: userInfo?.claims.isUser as boolean,
                });
            } else {
                return router.push("/");
            }
        },
    });

    useEffect(() => {
        if (!user) return;
        getUserInfo(user.uid).then((userInfo) => {
            setUserClaims({
                isAdmin: userInfo?.claims.isAdmin as boolean,
                isOwner: userInfo?.claims.isOwner as boolean,
                isUser: userInfo?.claims.isUser as boolean,
            });
            if (!userInfo?.claims.isOwner && !userInfo?.claims.isAdmin) {
                router.push("/");
            }
        });
    }, [user]);

    const [userClaims, setUserClaims] = useState<UserRole>({
        isAdmin: false,
        isOwner: false,
        isUser: false,
    });

    if (loading) {
        return <main>Loading...</main>;
    }

    if (!userClaims.isOwner && !userClaims.isAdmin) {
        return <main>Permission Denied</main>;
    }

    return <main>ConsolePage</main>;
}

export default ConsolePage;
