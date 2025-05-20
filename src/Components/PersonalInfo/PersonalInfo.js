
// import React, { useState, useEffect } from 'react';
// import classes from './PersonalInfo.module.css';
// import edit from '../../Assets/Images/edit.png';
// import password from '../../Assets/Images/password.png';
// import profilepic from '../../Assets/Images/profilebig.png';
// import { auth , db } from '../../config';
// import { doc, getDoc, updateDoc } from 'firebase/firestore';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const PersonalInfo = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [address, setAddress] = useState("");
//   const [phone, setPhone] = useState("");
//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const user = auth.currentUser;
//       if (user) {
//         setUserId(user.uid);
//         const docRef = doc(db, "users", user.uid); // Assuming you have a 'users' collection
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           const userData = docSnap.data();
//           setName(userData.firstName + " " + userData.lastName || "");
//           setEmail(userData.email || user.email);
//           setAddress(userData.address || "");
//           setPhone(userData.phoneNumber || "");
//         } else {
//           console.log("No such document!");
//         }
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleSaveChanges = async () => {
//     if (userId) {
//       const docRef = doc(db, "users", userId);
//       try {
//         await updateDoc(docRef, {
//           name,
//           address,
//           phone
//         });
//         toast.success("Changes saved successfully!", { position: 'top-center' });
//       } catch (error) {
//         console.error("Error updating document: ", error);
//         toast.error("Error saving changes.", { position: 'top-center' });
//       }
//     }
//   };

//   return (
//     <div className={classes.container}>
//       <div className={classes.innerContainer}>
//         <div className={classes.personal}>
//           <p>Personal Info</p>
//         </div>
//         <div className={classes.formsDiv}>
//           <div>
//             <div className={classes.forms}>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className={classes.divform}
//               />
//               <img src={edit} alt="edit" />
//             </div>
//             <div className={classes.forms}>
//               <input
//                 type="text"
//                 value={email}
//                 readOnly
//                 className={classes.divform}
//               />
//               <img src={password} alt="password" />
//             </div>
//             <div className={classes.forms}>
//               <input
//                 type="text"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 className={classes.divform}
//               />
//               <img src={edit} alt="edit" />
//             </div>
//             <div className={classes.forms}>
//               <input
//                 type="text"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 className={classes.divform}
//               />
//               <img src={edit} alt="edit" />
//             </div>
//           </div>
//           <div className={classes.picbtn}>
//             <div>
//               <img src={profilepic} alt="profilepic"/>
//             </div>
//             <button onClick={handleSaveChanges}>Save Changes</button>
//           </div>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   )
// }

// export default PersonalInfo;

import React, { useState, useEffect } from 'react';
import classes from './PersonalInfo.module.css';
import edit from '../../Assets/Images/edit.png';
import password from '../../Assets/Images/password.png';
// import defaultProfilePic from '../../Assets/Images/profilebig.png'; // Default image
import { auth, db, storage } from '../../config';
import { doc, getDoc, updateDoc , setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import profile from '../../Assets/Images/profile.png'


const PersonalInfo = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState(null); // Initially null
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        setUserId(user.uid);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setName(userData.name || "");
          setEmail(userData.email || user.email);
          setAddress(userData.address || "");
          setPhone(userData.phoneNumber || "");
          if (userData.profileImage) {
            setProfileImage(userData.profileImage);
          } else {
            setProfileImage(null); // Default to null if no image
          }
        } else {
          console.log("No such document!");
        }
      }
    };
    
    // const updateUserStatus = async () => {
    //   const user = auth.currentUser;
    //   if (!user) return;
  
    //   const userRef = doc(db, "users", user.uid);
    //   const userSnap = await getDoc(userRef);
  
    //   if (userSnap.exists()) {
    //     const userData = userSnap.data();
    //     const lastLogin = userData.lastLogin ? new Date(userData.lastLogin.seconds * 1000) : 'inactive';
    //     const now = new Date();
        
    //     // Check if last login is more than a month old
    //     let status = "active";
    //     if (lastLogin) {
    //       const oneMonthAgo = new Date();
    //       oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    //       if (lastLogin < oneMonthAgo) {
    //         status = "inactive";
    //       }
    //     }
  
    //     // Update last login timestamp and status
    //     await updateDoc(userRef, {
    //       lastLogin: now,
    //       status: status,
    //     });
    //   }
    // };
    
     
   
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // updateUserStatus();
        fetchUserData();
      }
    });
  
    return () => unsubscribe();

  
    // updateUserStatus();

    // fetchUserData();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(storage, `profileImages/${userId}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle progress, etc.
        },
        (error) => {
          console.error("Upload failed: ", error);
          toast.error("Error uploading image.", { position: 'top-center' });
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            const docRef = doc(db, "users", userId);
            await updateDoc(docRef, { profileImage: downloadURL });
            setProfileImage(downloadURL);
            toast.success("Profile image updated successfully!", { position: 'top-center' });
          } catch (error) {
            console.error("Error updating document: ", error);
            toast.error("Error updating profile image.", { position: 'top-center' });
          }
        }
      );
    }
  };

  const handleSaveChanges = async () => {
    if (userId) {
      const docRef = doc(db, "users", userId);
      try {
        await updateDoc(docRef, {
          name,
          address,
          phone
        });
        toast.success("Changes saved successfully!", { position: 'top-center' });
      } catch (error) {
        console.error("Error updating document: ", error);
        toast.error("Error saving changes.", { position: 'top-center' });
      }
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <div className={classes.personal}>
          <p>Personal Info</p>
        </div>
        <div className={classes.formsDiv}>
          <div className={classes.formsDivs}>  
                      <div>
                          
                          <div className={classes.forms}>                        
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={classes.divform}
              />
              <img src={edit} alt="edit" />
            </div>
            <div className={classes.forms}>                        
              <input
                type="text"
                value={email}
                readOnly
                className={classes.divform}
              />
              <img src={password} alt="password" />
            </div>
            <div className={classes.forms}>                        
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={classes.divform}
              />
              <img src={edit} alt="edit" />
            </div>
            <div className={classes.forms}>                        
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={classes.divform}
              />
              <img src={edit} alt="edit" />
                      </div>
                      
                      </div>
            

            <div className={classes.picbtn}>
              <div>
                <input
                  type="file"
                  id="fileInput"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                              <label htmlFor="fileInput" className={classes.fileLabel}>
                                  <div className={classes.profilePic}>
                                  <img
                    src={profileImage || profile}
                    alt="Profile"
                    className={classes.profilePics}
                                  />
                                  </div>
                  
                                  <p>{profileImage ? "You can also change your profile image" : "Choose a profile image"}</p>
                </label>
              </div>
              <button onClick={handleSaveChanges}>Save Changes</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default PersonalInfo;
