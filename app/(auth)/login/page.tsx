import { auth } from "@/auth";
import LoginTab from "@/components/auth/login-tab";
import SignInTab from "@/components/auth/signup-tab";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function LoginPage() {
    return (
        <Tabs defaultValue="Login" className="relative w-[300px] mt-10 md:mt-48 mx-auto md:w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="Login">Login</TabsTrigger>
                <TabsTrigger value="Signup">Signup</TabsTrigger>
            </TabsList>
            <LoginTab />
            <SignInTab />
        </Tabs>
    );
}
