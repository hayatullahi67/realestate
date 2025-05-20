import React, { useState } from "react";
import classes from "./ProSetNot.module.css";
import Sidebar from "../Sidebar/Sidebar";
import lefthand from "../../Assets/Images/left-hand.png";
import { Link } from 'react-router-dom';


const ProSetNot = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <div className={classes.profile}>
          <div>
            <img
              src={lefthand}
              alt="left-hand"
              className={classes.lefthand}
              onClick={toggleSidebar}
            />
            {isSidebarVisible ? "" : ""}
            {isSidebarVisible && <Sidebar />}
          </div>
          <div className={classes.ProSetNot}> 
            <Link to = "/profile"><p>Profile</p></Link>
            <Link to = "/settings"><p>Settings</p></Link>
            <Link to="/notifications"><p>Notifications</p></Link>
            <Link to="/property"><p>Properties</p></Link>
            <Link to="/addproperty"><p> <button className={classes.button}> Add Properties </button></p> </Link>
          </div>
        </div>
        <div className={classes.line}/>
      </div>
    </div>
  );
};

export default ProSetNot;
