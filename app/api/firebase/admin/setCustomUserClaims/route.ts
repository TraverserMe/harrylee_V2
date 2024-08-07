import { UserRole } from "@/schemas/user-schema";
import { NextResponse } from "next/server";
import { getFunctions, httpsCallable } from 'firebase/functions';
import { app, auth } from "@/firebase/config";

export async function PATCH(req: Request) {

    const { uid, claims, adminId }: { uid: string; claims: UserRole, adminId: string } = await req.json();

    if (!uid) return new NextResponse("uid is required", { status: 400 });
    if (!claims) return new NextResponse("claims is required", { status: 400 });

    if (!adminId) return new NextResponse("Unauthorized", { status: 401 });
    const functions = getFunctions(app, 'asia-northeast1');
    // console.log("functions", functions);
    const setCustomClaims = httpsCallable(functions, 'setCustomClaims')

    // return { status: 200, message: "success" }
    try {
        const server = await setCustomClaims({ uid, claims, adminId });
        console.log("server", server);
        return NextResponse.json(server);
    } catch (error) {
        console.log("[SERVER_ID_PATCH]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}