"use client";
import { auth } from "@/firebase/config";
import { getUserInfo, getUsers } from "@/firebase/user";
import { UserRole, UserSchema } from "@/schemas/user-schema";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/columns";

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
                console.log(1);
                return router.push("/");
            }
        },
    });

    const [users, setUsers] = useState<UserSchema[]>([]);

    useEffect(() => {
        if (!user) return;
        getUserInfo(user.uid).then((userInfo) => {
            setUserClaims({
                isAdmin: userInfo?.claims.isAdmin as boolean,
                isOwner: userInfo?.claims.isOwner as boolean,
                isUser: userInfo?.claims.isUser as boolean,
            });
            const permitted =
                userInfo?.claims.isOwner || userInfo?.claims.isAdmin;
            if (!permitted) {
                router.push("/");
            }
        });

        getUsers().then((users) => {
            setUsers(users);
        });
    }, [user, router]);

    const [userClaims, setUserClaims] = useState<UserRole>({
        isAdmin: false,
        isOwner: false,
        isUser: false,
    });

    if (loading) {
        return <main>Loading...</main>;
    }

    const permitted = userClaims.isOwner || userClaims.isAdmin;

    if (!userClaims.isOwner && !userClaims.isAdmin) {
        return <main>Permission Denied</main>;
    }

    return (
        <main>{permitted && <DataTable columns={columns} data={users} />}</main>
    );
}

export default ConsolePage;
