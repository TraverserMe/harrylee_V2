"use server"

import { auth } from "@/firebase/config";
import * as z from 'zod'
import { SignUpSchema } from "@/schemas/signup-schema";

import { createUserWithEmailAndPassword } from "firebase/auth";

export const createUser = async (values: z.infer<typeof SignUpSchema>) => {
    const validationFields = SignUpSchema.safeParse(values)

    if (!validationFields.success) {
        return { error: 'Invalid data' }
    }

    const { email, password } = validationFields.data

    const res = await createUserWithEmailAndPassword(auth, email, password);
    console.log("res", res)
    return res
}
