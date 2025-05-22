import React, { useState, useEffect } from 'react';
import classes from './Header.module.css';
import logo from '../../Assets/Images/logo.png';
import heart from '../../Assets/Images/heart.png';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { auth } from '../../config'; // Adjust the import path to your Firebase config
import { signOut } from 'firebase/auth';

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleNavToggle = () => {
    setNavOpen(!navOpen);
  };

  const handleNavLinkClick = () => {
    setNavOpen(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Redirect to home page after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div  className={classes.container}>
      <div className={classes.innerContainer}>
        <header>
          <div className={classes.logoDiv}>
            <Link to="/"><img src={logo} alt="Logo" /></Link>
            <h3 className={classes.realAgent}>Real Agent</h3>
          </div>
          <nav className={classes.firstNav}>
            <Link to="/buy" onClick={handleNavLinkClick}><li>Buy</li></Link>
            <Link to="/rent" onClick={handleNavLinkClick}><li>Rent</li></Link>
            <Link to="/commercial" onClick={handleNavLinkClick}><li>Commercial</li></Link>
            <Link to="/find-agent" onClick={handleNavLinkClick}><li>Find agent</li></Link>
          </nav>
          <nav className={classes.secondNav}>
            <Link to="/favorites"><img src={heart} alt="heart" className={classes.heartImg} /></Link>
            <Link to="/about-us" onClick={handleNavLinkClick}><li>About Us</li></Link>
            {isAuthenticated ? (
              <div className={classes.flex}>
              <button onClick={handleLogout} className={classes.logoutButton}>Logout</button>
              <Link className={classes.logoutButton} to="/profile">Profile</Link>
              </div>
              
            ) : (
              <Link to="/login" onClick={handleNavLinkClick}><li>Log In</li></Link>
            )}
          </nav>
          <div className={classes.hamburger} onClick={handleNavToggle}>
            {!navOpen ? (
              <HiOutlineMenuAlt4 className={classes.Icons} />
            ) : (
              <AiOutlineClose className={classes.Icons} />
            )}
          </div>
          <div className={navOpen ? classes.active : classes.mobileMenu}>
          <div className={classes.AiOutlineClose}> <AiOutlineClose className={classes.Icons} onClick={handleNavToggle} /></div>

            <nav className={classes.mobileNav}>

              <Link to="/" className={classes.navlink} onClick={handleNavLinkClick}><li>Home</li></Link>
              <Link to="/buy" className={classes.navlink} onClick={handleNavLinkClick}><li>Buy</li></Link>
              <Link to="/rent" className={classes.navlink} onClick={handleNavLinkClick}><li>Rent</li></Link>
              <Link to="/commercial" className={classes.navlink} onClick={handleNavLinkClick}><li>Commercial</li></Link>
            <Link to="/favorites" className={classes.navlink} onClick={handleNavLinkClick}><li>Favorites</li></Link>
              
              <Link to="/find-agent" className={classes.navlink} onClick={handleNavLinkClick}><li>Find Agent</li></Link>
          
              <Link to="/about" className={classes.navlink} onClick={handleNavLinkClick}><li>About Us</li></Link>
              {isAuthenticated ? (
                <>
                 <div>

                <Link className={classes.logoutButton} to="/profile"><li>Profile</li></Link>

                 </div>
                <button onClick={handleLogout} className={classes.logoutButton}><li>Logout</li></button>
                </>

              ) : (
                <Link to="/login" className={classes.navlink} onClick={handleNavLinkClick}><li>Log In</li></Link>
              )}
            </nav>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
