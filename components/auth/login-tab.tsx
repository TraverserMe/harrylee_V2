"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema } from "@/schemas/signup-schema";
import { useState } from "react";
import LoginProvider from "@/components/auth/loginProvider";
import { login } from "@/firebase/user";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import {
    Form,
    FormControl,
    FormLabel,
    FormItem,
    FormField,
    FormMessage,
} from "@/components/ui/form";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";

function LoginTab() {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const router = useRouter();
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const isLoading = form.formState.isSubmitting;
    const preventCopyPaste = (e: any) => {
        e.preventDefault();
    };

    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");
        try {
            const UserCredential = await login({
                email: values.email,
                password: values.password,
            });

            if (!UserCredential.user.emailVerified) {
                setError("Please verify your email first");
                signOut(auth);
                return;
            }
            setSuccess("Login successful");
            form.reset();
            setTimeout(() => {
                setSuccess("");
                router.push("/");
            }, 1000);
        } catch (error) {
            if (
                error instanceof FirebaseError &&
                error.code == "auth/user-not-found"
            ) {
                setError("User not found");
            } else if (
                error instanceof FirebaseError &&
                error.code == "auth/wrong-password"
            ) {
                setError("Wrong password");
            } else {
                setError("Maybe you have use other provider?");
            }
        }
    };

    return (
        <TabsContent value="Login">
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                        Enter your details to login and unlock more functions in
                        this website.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-2"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="xxx@gmail.com"
                                                type="email"
                                                {...field}
                                                disabled={isLoading}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your password"
                                                {...field}
                                                id="password"
                                                type="password"
                                                onPaste={preventCopyPaste}
                                                onCopy={preventCopyPaste}
                                                disabled={isLoading}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormError message={error} />
                            <FormSuccess message={success} />
                            <Button className="w-full" type="submit">
                                Login
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                    <div className="h-5 flex flex-row mb-2 w-full">
                        <span className="block w-full border-t-2 relative top-1/2"></span>
                        <span className="mx-2 text-gray-500"> or </span>
                        <span className="block w-full border-t-2 relative top-1/2"></span>
                    </div>
                    <LoginProvider />
                </CardFooter>
            </Card>
        </TabsContent>
    );
}

export default LoginTab;
