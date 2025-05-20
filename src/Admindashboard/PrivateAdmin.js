import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth, db } from '../config'; // Ensure this path is correct
import { doc, getDoc } from 'firebase/firestore';

const PrivateAdmin = ({ children }) => {
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserType = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid); // Adjust collection path
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUserType(userSnap.data().userType);
          } else {
            setUserType(null); // User data not found
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserType(null);
        }
      } else {
        setUserType(null); // No user logged in
      }
      setLoading(false);
    };

    fetchUserType();
  }, []);

  if (loading || userType != 'admin') return <p>Loading...</p>;

  return userType === 'admin' ? children : <Navigate to="/" />;
};

export default PrivateAdmin;
