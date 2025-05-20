import React, { useState } from 'react';
import * as IconName from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { sidebarData } from './sidebar';
import './adminheader.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { Dropdown } from 'react-bootstrap';
import { IoIosNotificationsOutline } from "react-icons/io";
import { AiOutlineMail } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { auth } from '../../config';
import {  signOut } from "firebase/auth"

function Header({ toggleSidebar,isSidebarVisible }) {
  const [sidebar, setSideBar] = useState(true);
  const [open ,setOpen] = useState(false)
  const navigate = useNavigate();
  const showSideBar = () => {
    setSideBar(!sidebar)
    localStorage.setItem('showSideBar', sidebar);
  }
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/*"); // Redirect to home page after logout
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };
  return (
    <>
          <header className='fixed-top '>
              
        <div className='navbar w-full position-relative '>
            <div className="header-left ">
                      {/* logo start  */}
                      <div className="logo">
                            Devingine
                      </div>

                        {/* logo ends  */}
                        <div>
                        <Link to="#" className='menu-bars'>
                 <IconName.HiMenu onClick={toggleSidebar} className='icon' /> 
                </Link>
                        </div>
               
            </div>
            <div className='d-flex justify-content-center'>
             <div style={{ width: "200px" }}>
              <button onClick={handleLogout} className='btn'>Log Out</button> 
              </div> 
          </div>
          </div>
          <nav className={isSidebarVisible ? 'nav-menu' : 'nav-menu active'}>
            <ul className='nav-menu-items'>
              
              {sidebarData.map((item, index) => {
                return (
                  <div key={index} className={item.CName} onClick={toggleSidebar}>
                    <Link to={item.path} >

                      {item.icon}
                      <span>{ item.title}</span>
                    </Link>
                  </div>
                 )
                 
              })}
            </ul>
            </nav>
            </header>
        </>
      );
    }

export default Header;
