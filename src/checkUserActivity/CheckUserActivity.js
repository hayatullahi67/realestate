// import React, { useState, useEffect } from 'react';
// import { app } from "../config";
// import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { initializeApp } from 'firebase/app';

// const firebaseConfig = {
//   // Your Firebase project configuration
// };


// const auth = getAuth(app);

// const CheckUserActivity = () => {
//   const [userEmail, setUserEmail] = useState('');

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUserEmail(user.email);
//       } else {
//         setUserEmail('');
//       }
//       console.log("piii", userEmail)
//     });
//     return unsubscribe;
//   }, [auth]);

//   return null; // Return something or use React.memo
// };

// export default CheckUserActivity;



// import React, { useState, useEffect } from 'react';
// import { app } from "../config";
// import { getAuth, onAuthStateChanged } from 'firebase/auth';

// const auth = getAuth(app);

// const CheckUserActivity = () => {
//   const [userEmail, setUserEmail] = useState('');

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUserEmail(user.email);
//       } else {
//         setUserEmail('');
//       }
//       console.log("piii", user.getIdToken().then((idToken) => {
//         const user = auth.currentUser;
//         const lastSignInTime = user.metadata.lastSignInTime;
//         console.log(lastSignInTime);
//       }))
//     });
//     return unsubscribe;
//   }, [auth]);


// };

// export default CheckUserActivity;








import React, { useState, useEffect } from 'react';
import { app } from "../config";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth(app);

const CheckUserActivity = () => {
  const [userEmail, setUserEmail] = useState('');
  const [lastSignIn, setLastSignIn] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserEmail(user.email);
        const lastSignInTime = user.metadata.lastSignInTime;
        setLastSignIn(lastSignInTime);
        console.log("Last Sign-In:", lastSignInTime);
      } else {
        setUserEmail('');
        setLastSignIn('');
      }
    });

    return unsubscribe;
  }, []);

 
  
};

export default CheckUserActivity;
