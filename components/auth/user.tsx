import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import LoadingWithText from "@/components/loading-with-text";
import { ActionTooltip } from "@/components/action-tooltip";
import { UserButton } from "@/components/user-button";

export const CurrentUser = () => {
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();

    if (loading) {
        return <LoadingWithText text="" />;
    }
    if (error) {
        return (
            <div>
                <p>Error: {error.toString()}</p>
            </div>
        );
    }
    if (user) {
        return <UserButton user={user} />;
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
