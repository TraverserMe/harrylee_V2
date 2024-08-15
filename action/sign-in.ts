"use server"

import * as z from "zod";
import { LoginSchema } from "@/schemas/login-schema";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password } = validatedFields.data

    // revalidatePath("/")
    const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        // redirectTo: callbackUrl || "/",
    });

    if (res?.error) {
        return { error: res.error };
    }

    return { success: "Login successful!" };
}

export const loginWithGoogle = async (callbackUrl?: string | null) => {
    const res = await signIn("google", {
        redirectTo: callbackUrl || "/",
    });

    // console.log("Google_res", res);
}