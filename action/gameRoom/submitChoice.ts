import { realtime } from "@/firebase/config";
import { Player } from "@/schemas/game-schema";
import { get, ref, set, update } from "firebase/database";

export const submitChoice = async (userId: string, roomId: string, choice: "rock" | "paper" | "scissors") => {

    await update(ref(realtime, `gameRoom/${roomId}/${userId}`), {
        status: "ready",
        choice,
    });
};
