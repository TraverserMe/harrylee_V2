import "@/styles/globals.css";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";

import { Roboto } from "next/font/google";
import { Suspense } from "react";

import { SessionProvider } from "next-auth/react";

const roboto = Roboto({
    weight: "400",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Nice to Meet You",
    description: "A personal website and portfolio",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SessionProvider>
            <html lang="en" suppressHydrationWarning>
                <head />
                <body
                    className={cn(
                        "min-h-screen bg-background font-sans antialiased",
                        roboto.className
                    )}
                >
                    <Suspense fallback={<main>Loading...</main>}>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange
                        >
                            <Navbar />
                            {children}
                        </ThemeProvider>
                    </Suspense>
                </body>
            </html>
        </SessionProvider>
    );
}
