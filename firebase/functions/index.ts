// import { adminAuth } from "@/firebase/admin/config";
// const functions = require("firebase-functions");
// import { UserRole } from "@/schemas/user-schema";

// type data = {
//     uid: string;
//     claims: UserRole;
// };

// exports.setCustomClaims = functions.https.onCall((data: data) => {
//     const uid = data.uid;
//     const claims = data.claims;

//     return adminAuth
//         .setCustomUserClaims(uid, claims)
//         .then(() => {
//             return { message: `Custom claims set for user ${uid}` };
//         })
//         .catch((error) => {
//             throw new functions.https.HttpsError("internal", error.message);
//         });
// });
