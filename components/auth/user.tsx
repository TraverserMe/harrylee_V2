import { useIdToken } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import LoadingWithText from "@/components/loading-with-text";
import { ActionTooltip } from "@/components/action-tooltip";
import { UserButton } from "@/components/user-button";
import { getUserInfo } from "@/firebase/user";
import { useState } from "react";
import { UserRole } from "@/schemas/user-schema";

export const CurrentUser = () => {
    const [user, loading, error] = useIdToken(auth, {
        onUserChanged: async (user) => {
            if (user) {
                const userInfo = await getUserInfo(user.uid);
                setUserClaims({
                    isAdmin: userInfo?.claims.isAdmin as boolean,
                    isOwner: userInfo?.claims.isOwner as boolean,
                    isUser: userInfo?.claims.isUser as boolean,
                });
            }
        },
    });
    const [userClaims, setUserClaims] = useState<UserRole>({
        isAdmin: false,
        isOwner: false,
        isUser: false,
    });
    const router = useRouter();

    if (loading) {
        return <LoadingWithText text="Loading..." />;
    }
    if (error) {
        return (
            <div>
                <p>Error: {error.toString()}</p>
            </div>
        );
    }
    if (user) {
        return <UserButton user={user} userClaims={userClaims} />;
    }
    return (
        <ActionTooltip
            side="bottom"
            align="center"
            label="More funs"
            className="mr-4"
        >
            <Button
                variant="outline"
                onClick={() => {
                    router.push("/login");
                }}
            >
                Log in
            </Button>
        </ActionTooltip>
    );
};
