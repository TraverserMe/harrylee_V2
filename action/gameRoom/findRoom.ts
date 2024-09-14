import { realtime } from "@/firebase/config";
import { ref, get } from "firebase/database";

export const getRoom = async (roomId: string) => {
    const roomRef = ref(realtime, `gameRoom/${roomId}`);
    const snapshot = await get(roomRef);

    if (snapshot.exists()) {
        return snapshot.val()
    }

    return null;

}