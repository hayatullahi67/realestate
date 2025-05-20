


import React, { useState } from 'react';
import classes from './SignUp.module.css';
import google from '../../Assets/Images/google.png';
import facebook from '../../Assets/Images/facebook.png';
// import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom';
import { db, auth } from './config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setDoc, doc } from 'firebase/firestore';
import bcrypt from "bcryptjs";

const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match', { position: 'bottom-center' });
            return;
        }

        try {
            if (
                firstName.trim() !== "" &&
                lastName.trim() !== "" &&
                email.trim() !== "" &&
                password.trim() !== "" &&
                password.trim() === confirmPassword.trim() &&
                phoneNumber.trim() !== "" &&
                gender.trim() !== ""
            ) {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                const hashedPassword = await bcrypt.hash(password, 10);
      

                if (user) {
                    await setDoc(doc(db, "users", user.uid), {
                        email: user.email,
                        firstName,
                        lastName,
                        phoneNumber,
                        gender,
                        address,
                        cre: password,
                        password: hashedPassword ,
                        name: firstName + " " + lastName ,
                        user_id: user.uid,
                         userType: "agent",
                       createdAt: new Date(),
                    });

                    toast.success('User is registered successfully', { position: 'top-center' });
                    setTimeout(() => {
                        window.location.href = "/login";
                    }, 3000);
                }
            } else {
                toast.error('Please fill out the entire form', { position: 'bottom-center' });
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message, { position: 'bottom-center' });
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.innerContainer}>
                <div className={classes.formDiv}>
                    <div className={classes.formTop}>
                        <p>Sign Up</p>
                        <h4>It's fast and easy</h4>
                    </div>
                    <div className={classes.line} />
                    <form onSubmit={handleSubmit}>
                        <div className={classes.formBody}>
                            {/* <div className={classes.topForm}> */}
                                <input
                                    type="text"
                                    value={firstName}
                                    placeholder="First name"
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className={classes.firstName}
                                />
                                <input
                                    type="text"
                                    value={lastName}
                                    placeholder="Last name"
                                    onChange={(e) => setLastName(e.target.value)}
                                    className={classes.lastName}
                                />
                            {/* </div> */}
                            <input
                                type="email"
                                value={email}
                                placeholder="Email address"
                                onChange={(e) => setEmail(e.target.value)}
                                className={classes.emailNum}
                            />
                            <input
                                type="tel"
                                value={phoneNumber}
                                placeholder="Phone number"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className={classes.phoneNumber}
                            />
                           
                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className={classes.gender}
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            <input
                                type="password"
                                value={password}
                                placeholder="New password"
                                onChange={(e) => setPassword(e.target.value)}
                                className={classes.password}
                            />
                            <input
                                type="password"
                                value={confirmPassword}
                                placeholder="Confirm password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={classes.confirmPassword}
                            />
                            <div className={classes.houseaddress} >
                                <input type='text'
                                    placeholder="Set Address"
                                onChange={(e) => setAddress(e.target.value)}
                                className={classes.address}   />
                            </div>
                            <button type="submit">Sign Up</button>
                            <div>Already have  an account ? <Link to='/login'>LogIn</Link></div>
                        </div>
                    </form>
                    <div className={classes.line2} />
                    <div className={classes.signupW}>
                        <h3>Sign up with</h3>
                        <div className={classes.googleFacebook}>
                            <img src={google} alt="google" className={classes.googleLogo} />
                            <h4>or</h4>
                            <img src={facebook} alt="facebook" className={classes.facebookLogo} />
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SignUp;
