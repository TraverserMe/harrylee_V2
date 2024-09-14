import { realtime } from "@/firebase/config";
import { Player } from "@/schemas/game-schema";
import { ref, update } from "firebase/database";

export const updateRoom = async (userId: string, roomId: string, playerData: Player) => {

    await update(ref(realtime, `gameRoom/${roomId}/${userId}`), playerData);
};
