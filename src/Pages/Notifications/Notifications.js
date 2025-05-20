// import React, { useState, useEffect } from 'react';
// import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
// import { db } from '../../config';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';
// import ProSetNot from '../../Components/ProSetNot/ProSetNot';
// import classes from './Notifications.module.css';
// import home from '../../Assets/Images/building-arch.png';
// import downarrow from '../../Assets/Images/moree.png';

// const Notifications = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [user, setUser] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const auth = getAuth();

//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUser(user);
//         fetchNotifications(user.uid);
//       } else {
//         setError("User is not logged in");
//         setLoading(false);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const fetchNotifications = async (userId) => {
//     try {
//       const q = query(collection(db, 'notifications'), where('agentId', '==', userId));
//       const querySnapshot = await getDocs(q);

//       const notificationsData = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         treated: doc.data().treated || false,
//         notSerious: doc.data().notSerious || false,
//         ...doc.data(),
//       }));

//       // Sort notifications by timestamp in descending order
//       const sortedNotifications = notificationsData.sort((a, b) =>
//         b.timestamp?.toDate() - a.timestamp?.toDate()
//       );

//       setNotifications(sortedNotifications);
//     } catch (err) {
//       console.error("Error fetching notifications:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTreat = async (notificationId) => {
//     try {
//       const notificationRef = doc(db, 'notifications', notificationId);
//       await updateDoc(notificationRef, { treated: true, notSerious: false });

//       setNotifications((prevNotifications) =>
//         prevNotifications.map((notification) =>
//           notification.id === notificationId
//             ? { ...notification, treated: true, notSerious: false }
//             : notification
//         )
//       );
//     } catch (error) {
//       console.error("Error updating treated status:", error);
//     }
//   };

//   const handleNotSerious = async (notificationId) => {
//     try {
//       const notificationRef = doc(db, 'notifications', notificationId);
//       await updateDoc(notificationRef, { notSerious: true, treated: false });

//       setNotifications((prevNotifications) =>
//         prevNotifications.map((notification) =>
//           notification.id === notificationId
//             ? { ...notification, notSerious: true, treated: false }
//             : notification
//         )
//       );
//     } catch (error) {
//       console.error("Error updating not serious status:", error);
//     }
//   };

//   const handleNavigateToDetails = (userId) => {
//     if (userId) {
//       navigate(`/view-details/${userId}`);
//     } else {
//       console.warn("Property ID is missing in the notification.");
//     }
//   };

//   if (loading) return <p>Loading notifications...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <ProSetNot />
//       <div className={classes.container}>
//         <div className='mt-5'>
//           {notifications.length > 0 ? (
//             notifications.map((notification) => {
//               const clientDetails = notification.clientDetails || {};
//               return (
//                 <div className={classes.innerContainer} key={notification.id}>
//                   <div className={classes.card}>
//                     <div className={classes.innerCard}>
//                       <div>
//                         <img src={home} alt="home" />
//                         <p>{notification.type || 'Sales Alert'}</p>
//                       </div>
//                       <span>
//                         {notification.timestamp?.toDate().toLocaleString()}
//                         <img src={downarrow} alt="downarrow" className={classes.downarrow} />
//                       </span>
//                     </div>
//                     <p>{notification.message}</p>
//                     <p>{clientDetails.phoneNumber || 'Phone number not available'}</p>
//                     <p>{clientDetails.email || 'Email not available'}</p>

//                     {notification.treated ? (
//                       <div className={classes.client}>Client Treated</div>
//                     ) : notification.notSerious ? (
//                       <div className={classes.client}>Client Not Serious</div>
//                     ) : null}

//                     <div className={classes.flexbtn}>
//                       <button
//                         className={classes.viewImagesBtn}
//                         onClick={() => handleNavigateToDetails(notification.propertId)}
//                       >
//                         View Property details
//                       </button>

//                       <button
//                         className={classes.treated}
//                         onClick={() => handleTreat(notification.id)}
//                       >
//                         Treated
//                       </button>

//                       <button
//                         className={classes.not}
//                         onClick={() => handleNotSerious(notification.id)}
//                       >
//                         Client Not Serious
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <p>No notifications available</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Notifications;

import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import ProSetNot from '../../Components/ProSetNot/ProSetNot';
import classes from './Notifications.module.css';
import home from '../../Assets/Images/building-arch.png';
import downarrow from '../../Assets/Images/moree.png';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchNotifications(user.uid);
      } else {
        setError("User is not logged in");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchNotifications = async (userId) => {
    try {
      const q = query(collection(db, 'notifications'), where('agentId', '==', userId));
      const querySnapshot = await getDocs(q);

      const notificationsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        treated: doc.data().treated || false,
        notSerious: doc.data().notSerious || false,
        showTreatedButton: true,
        showNotSeriousButton: true,
        ...doc.data(),
      }));

      const sortedNotifications = notificationsData.sort((a, b) =>
        b.timestamp?.toDate() - a.timestamp?.toDate()
      );

      setNotifications(sortedNotifications);
    } catch (err) {
      console.error("Error fetching notifications:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTreat = async (notificationId) => {
    try {
      const notificationRef = doc(db, 'notifications', notificationId);
      await updateDoc(notificationRef, { treated: true, notSerious: false });

      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId
            ? {
                ...notification,
                treated: true,
                notSerious: false,
                showTreatedButton: false,
                showNotSeriousButton: true,
              }
            : notification
        )
      );
    } catch (error) {
      console.error("Error updating treated status:", error);
    }
  };

  const handleNotSerious = async (notificationId) => {
    try {
      const notificationRef = doc(db, 'notifications', notificationId);
      await updateDoc(notificationRef, { notSerious: true, treated: false });

      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId
            ? {
                ...notification,
                notSerious: true,
                treated: false,
                showNotSeriousButton: false,
                showTreatedButton: true,
              }
            : notification
        )
      );
    } catch (error) {
      console.error("Error updating not serious status:", error);
    }
  };

  const handleNavigateToDetails = (userId) => {
    if (userId) {
      navigate(`/view-details/${userId}`);
    } else {
      console.warn("Property ID is missing in the notification.");
    }
  };

  if (loading) return <p>Loading notifications...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <ProSetNot />
      <div className={classes.container}>
        <div className='mt-5'>
          {notifications.length > 0 ? (
            notifications.map((notification) => {
              const clientDetails = notification.clientDetails || {};
              return (
                <div className={classes.innerContainer} key={notification.id}>
                  <div className={classes.card}>
                    <div className={classes.innerCard}>
                      <div>
                        <img src={home} alt="home" />
                        <p>{notification.type || 'Sales Alert'}</p>
                      </div>
                      <span>
                        {notification.timestamp?.toDate().toLocaleString()}
                        <img src={downarrow} alt="downarrow" className={classes.downarrow} />
                      </span>
                    </div>
                    <p>{notification.message}</p>
                    <p>{clientDetails.phoneNumber || 'Phone number not available'}</p>
                    <p>{clientDetails.email || 'Email not available'}</p>

                    {notification.treated ? (
                      <div className={classes.client}>Client Treated</div>
                    ) : notification.notSerious ? (
                      <div className={classes.client}>Client Not Serious</div>
                    ) : null}

                    <div className={classes.flexbtn}>
                      <button
                        className={classes.viewImagesBtn}
                        onClick={() => handleNavigateToDetails(notification.propertId)}
                      >
                        View Property details
                      </button>

                      {notification.showTreatedButton && (
                        <button
                          className={classes.treated}
                          onClick={() => handleTreat(notification.id)}
                        >
                          Treated
                        </button>
                      )}

                      {notification.showNotSeriousButton && (
                        <button
                          className={classes.not}
                          onClick={() => handleNotSerious(notification.id)}
                        >
                          Client Not Serious
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No notifications available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
