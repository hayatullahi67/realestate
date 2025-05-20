import React from 'react'
import classes from './Sidebar.module.css'
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <Link to = "/all"><p>All</p></Link>
        <Link to = "/trade"><p>Trade</p></Link>
        <Link to = "/propertynews"><p>Property news</p></Link>
        <Link to = "/messages"><p>System Messages</p></Link>
      </div>
    </div>
  )
}

export default Sidebar