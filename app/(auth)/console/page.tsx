import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Console from "@/app/(auth)/console/console";

const ConsolePage = async () => {
    return <Console />;
};

export default ConsolePage;
