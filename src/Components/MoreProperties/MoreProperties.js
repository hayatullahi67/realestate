import React from 'react'
import classes from './MoreProperties.module.css'
import apartment from '../../Assets/Images/apartment.png'
import villa from '../../Assets/Images/villa.png'
import land from '../../Assets/Images/land.png'
import building from '../../Assets/Images/building.png'
import warehouse from '../../Assets/Images/warehouse.png'
import office from '../../Assets/Images/office.png'


const MoreProperties = () => {
  return (
    <div className={classes.container}>
        <div className={classes.innerContainer}>
            <p>More Properties</p>
            <div className={classes.imagesDiv}>
                <img src={apartment} alt="apartment"/>
                <img src={villa} alt="villa"/>
                <img src={land} alt="land"/>
            </div>
            <div className={classes.imagesDiv}>
                <img src={building} alt="building"/>
                <img src={warehouse} alt="warehouse"/>
                <img src={office} alt="office"/>
            </div>
        </div>
    </div>
  )
}

export default MoreProperties