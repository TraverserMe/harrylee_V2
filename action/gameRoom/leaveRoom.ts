import { ref, set } from 'firebase/database';
import { realtime } from '@/firebase/config';

// Function to leave a room
export const leaveRoom = async (userId: string, roomId: string) => {
    const userRef = ref(realtime, `gameRoom/${roomId}/${userId}`);
    await set(userRef, null);
};
