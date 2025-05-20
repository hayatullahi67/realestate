// const admin = require("firebase-admin");

// // Initialize Firebase Admin
// const serviceAccount = require("./serviceAccountKey.json"); // Replace with your service account file

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// const auth = admin.auth();

// // Fetch all users' last sign-in times
// const fetchAllUsersLastSignIn = async () => {
//   try {
//     const listUsersResult = await auth.listUsers();
//     listUsersResult.users.forEach((user) => {
//       console.log(`User: ${user.email}, Last Sign-In: ${user.metadata.lastSignInTime}`);
//     });
//   } catch (error) {
//     console.error("Error fetching users:", error);
//   }
// };

// // Run the function
// fetchAllUsersLastSignIn();

import admin from "firebase-admin";

// Initialize Firebase Admin SDK
import serviceAccount from "./serviceAccountKey.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const auth = admin.auth();

// Function to fetch all users and their last sign-in time
const fetchAllUsers = async () => {
  try {
    const listUsersResult = await auth.listUsers(); // Fetch all users
    listUsersResult.users.forEach((userRecord) => {
      console.log(
        `Email: ${userRecord.email}, Last Sign-in: ${userRecord.metadata.lastSignInTime}`
      );
    });
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

// Call the function
fetchAllUsers();
