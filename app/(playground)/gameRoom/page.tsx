import { auth } from "@/auth";
import { redirect } from "next/navigation";
import GameRoom from "@/app/(playground)/gameRoom/gameRoom";

export default async function gameRoomPage() {
    return <GameRoom />;
}
