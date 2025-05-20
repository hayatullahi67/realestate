import React from 'react'
import classes from './ForSale.module.css'
import img1 from '../../Assets/Images/img1.png'
import img2 from '../../Assets/Images/img2.png'
import img3 from '../../Assets/Images/img3.png'
import healthicon from '../../Assets/Images/healthicon.png'
import share from '../../Assets/Images/light_share.png'
import print from '../../Assets/Images/print.png'
import flag from '../../Assets/Images/flag-fill.png'
import sittingroom from '../../Assets/Images/sittingroom.png'
import bathroom from '../../Assets/Images/bathroom.png'
import bedroom from '../../Assets/Images/bedroom.png'



const ForSale = () => {
  return (
    <div className={classes.container}>
        <div className={classes.innerContainer}>
            <div className={classes.text}>
                <h4>House For Sale In Epe, Lagos</h4>
                <h5>₦ 53,105,000</h5>
            </div>
            <div className={classes.images}>
                <img src={img1} alt="img1"/>
                <div className={classes.imagesII}>
                    <img src={img2} alt="img2"/>
                    <img src={img3} alt="img3"/>
                </div>                
            </div>
            <div className={classes.updatedDiv}>
                <div className={classes.updated}>
                    <img src={healthicon} alt="healthicon"/>
                    <h4>Updated on September 20, 2023 | Reference ID: 02038125</h4>
                </div>
                <div className={classes.tinyIcons}>
                    <img src={share} alt="share"/>
                    <img src={print} alt="print"/>
                    <img src={flag} alt="flag"/>
                </div>
            </div>
            <div className={classes.details}>
                <div className={classes.detailsdiv}>
                    <h6>569312</h6>                     
                    <h6>BF ID</h6>
                </div>
                <div className={classes.detailsdiv}>
                    <h6>Residential</h6>
                    <h6>Property Usage</h6>
                </div>
                <div className={classes.detailsdiv}>
                    <h6>New</h6>
                    <h6>Build-up status</h6>
                </div>
                <div className={classes.detailsdiv}>
                    <h6><img src={sittingroom} alt="sittingroom"/>  2</h6>
                    <h6>Sittingrooms</h6>
                </div>
                <div className={classes.detailsdiv}>
                    <h6><img src={bedroom} alt="bedroom"/>  2</h6>
                    <h6>Bedrooms</h6>
                </div>
                <div className={classes.detailsdiv}>
                    <h6><img src={bathroom} alt="bathroom"/>  2</h6>
                    <h6>Bathrooms</h6>
                </div>
                <div className={classes.detailsdiv}>
                    <h6>Semi Furnished</h6>
                    <h6>Furnished</h6>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ForSale