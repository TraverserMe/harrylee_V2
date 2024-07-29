import LoginTab from "@/components/auth/login-tab";
import SignInTab from "@/components/auth/signup-tab";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LoginPage() {
    return (
        <Tabs defaultValue="Login" className="relative w-[400px] mt-52 mx-auto">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="Login">Login</TabsTrigger>
                <TabsTrigger value="Signup">Signup</TabsTrigger>
            </TabsList>
            <LoginTab />
            <SignInTab />
        </Tabs>
    );
}
