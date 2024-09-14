import { realtime } from "@/firebase/config";
import { Player } from "@/schemas/game-schema";
import { get, ref, set } from "firebase/database";

export const enterRoom = async (userId: string, roomId: string, playerData: Player) => {

    const snapshot = await get(ref(realtime, `gameRoom/${roomId}`));

    if (!snapshot.exists()) {
        return false;
    } else {
        const data = Object.values(snapshot.val()).map((val) => val as Player);
        if (data.length > 2) {
            return false;
        } else {
            await set(ref(realtime, `gameRoom/${roomId}/${userId}`), playerData);
            return true;
        }
    }
};
