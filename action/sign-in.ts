"use server"

import * as z from "zod";
import { LoginSchema } from "@/schemas/login-schema";
import { signIn } from "@/auth";

export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password } = validatedFields.data
    try {

        // revalidatePath("/")
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
            // redirectTo: callbackUrl || "/",
        });

        // console.log("res in server", res);

        if (res?.error) {
            return { error: res.error };
        }

        return { success: "Login successful!" };
    } catch (error) {
        console.log("error", error);
        return { error: "Email or password is incorrect" };
    }
}

export const loginWithGoogle = async (callbackUrl?: string | null) => {

    // createUserWithEmailAndPassword(auth, user.email, user.password)
    const res = await signIn("google", {
        redirectTo: callbackUrl || "/",
    });

    console.log("Google_res", res);
}