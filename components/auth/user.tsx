"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import LoadingWithText from "@/components/loading-with-text";
import { ActionTooltip } from "@/components/action-tooltip";
import { UserButton } from "@/components/user-button";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export const CurrentUser = () => {
    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        console.log(session);
    }, [session]);

    if (session.status === "loading") {
        return <LoadingWithText text="Loading..." />;
    }

    if (session.data != null) {
        return <UserButton session={session.data} />;
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
