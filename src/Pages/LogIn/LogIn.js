

import React, { useState, useEffect ,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './LogIn.module.css';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth ,db } from './config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { differenceInMonths, parse } from "date-fns";
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc 
} from "firebase/firestore";
const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Monitor authentication state
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setIsAuthenticated(true);
  //       navigate('/profile');
  //     } else {
  //       setIsAuthenticated(false);
  //     }
  //   });

  //   // Clean up the subscription on component unmount
  //   return () => unsubscribe();
  // }, [navigate]);

  // const handleLogin = async () => {
  //   try {
  //     await signInWithEmailAndPassword(auth, email, password);
  //     toast.success("User logged in successfully", { position: 'top-center' });

  //     setTimeout(() => {
  //       navigate('/profile');
  //     }, 3000);
  //   } catch (error) {
  //     console.error("Login failed", error);
  //     toast.error(`Error: ${error.message}`, { position: 'top-center' });
  //   }
  // };

  const handleLogin = async () => {
    try {

      // Authenticate the user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;


      
    // Fetch user data from Firestore
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.userType == "admin") {
          
          console.log(userData.userType);
          toast.success("Welcome Admin!", { position: 'top-center' });
          
             navigate('/Admin');  // Navigate to the dashboardx
             return;


         
        } else {
          toast.success("User logged in successfully", { position: 'top-center' });
        
         
          

            navigate('/profile'); // Navigate to the profile page
         
        }
      } else {
        toast.error("User data not found", { position: 'top-center' });
      }
    } catch (error) {
      console.error("Login failed", error);
      toast.error(`Error: ${error.message}`, { position: 'top-center' });
    }
  };

  if (isAuthenticated) {
    return null; // Prevent login form from rendering if already logged in
  }

  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <div className={classes.text}>
          <p>
            <span>Esfassen</span> 
            helps you find and sell Property to people seamlessly in small time.
          </p>
        </div>
        <div className={classes.logInForm}>
          <input
            type="text"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin} className={classes.logInButton}>
            Log in
          </button>
          <div>
            <span>Forgotten password?</span>
          </div>
          <div className={classes.line} />
          <Link to="/signup">
            <button className={classes.createButton}>
              Create a new account
            </button>
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LogIn;
