import * as z from "zod";

export const SignUpSchema = z
    .object({
        name: z.string().min(1, {
            message: "Please enter a nickname",
        }),
        email: z.string().email({
            message: "Please enter a valid email address",
        }),
        password: z.string().min(6, {
            message: "Password must be at least 6 characters",
        }),
        confirmPassword: z.string().min(6, {
            message: "Password must be at least 6 characters",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
