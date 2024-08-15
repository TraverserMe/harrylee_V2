"use client";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import { FirebaseError } from "@firebase/util";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "@/schemas/signup-schema";
import { useState } from "react";
import {
    Form,
    FormControl,
    FormLabel,
    FormItem,
    FormField,
    FormMessage,
} from "@/components/ui/form";
import { createUser } from "@/firebase/user";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import LoginProvider from "@/components/auth/loginProvider";
import { useRouter } from "next/navigation";
import LoadingWithText from "@/components/loading-with-text";

function SignInTab() {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const router = useRouter();
    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const isLoading = form.formState.isSubmitting;

    //prevent copy and paste in the password field and confirm password field
    const preventCopyPaste = (e: any) => {
        e.preventDefault();
    };

    const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
        setError("");
        setSuccess("");
        try {
            await createUser({
                email: values.email,
                password: values.password,
            });

            setSuccess("Check your email account for verification");
            form.reset();
            setTimeout(() => {
                router.push("/login");
            }, 3000);
        } catch (error) {
            if (
                error instanceof FirebaseError &&
                error.code == "auth/email-already-in-use"
            ) {
                setError("Email already in use");
            } else {
                setError("An error occurred, please try again later");
            }
        }
    };

    return (
        <TabsContent value="Signup">
            <Card>
                <CardHeader>
                    <CardTitle>Signup</CardTitle>
                    <CardDescription>
                        Create your account with your email and password.
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
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Please confirm your password"
                                                {...field}
                                                id="confirm-password"
                                                type="password"
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        form.handleSubmit(
                                                            onSubmit
                                                        )();
                                                    }
                                                }}
                                                disabled={isLoading}
                                                onPaste={preventCopyPaste}
                                                onCopy={preventCopyPaste}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormError message={error} />
                            <FormSuccess message={success} />

                            <Button
                                className="w-full"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <LoadingWithText text="Creating..." />
                                ) : (
                                    "Create Account"
                                )}
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

export default SignInTab;
