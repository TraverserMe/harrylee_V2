import { ref, set, get, query, orderByChild, equalTo } from 'firebase/database';
import { realtime } from '@/firebase/config';
import { generateRandomString } from '@/lib/utils';

// Function to find an old room for the user
export const findOldRoom = async (userId: string) => {
    const roomsRef = ref(realtime, 'gameRoom');
    const userRoomQuery = query(roomsRef);
    const snapshot = await get(userRoomQuery);

    if (snapshot.exists()) {
        const roomData = snapshot.val();
        for (const roomId in roomData) {
            if (roomData[roomId][userId]) {
                return roomId;
            }
        }
    }
    return null;
};

// Function to create a new room or return an existing one
export const createRoom = async (userId: string, image?: string, name?: string) => {
    const oldRoomId = await findOldRoom(userId);

    if (oldRoomId) {
        return oldRoomId;
    } else {
        const newRoomId = generateRandomString(5);
        await set(ref(realtime, `gameRoom/${newRoomId}/${userId}`), {
            id: userId,
            score: 0,
            status: 'waiting',
            image,
            name,
        });
        return newRoomId;
    }
};
