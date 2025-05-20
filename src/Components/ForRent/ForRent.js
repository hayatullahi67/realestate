import React from 'react'
import classes from './ForRent.module.css'
import imge1 from '../../Assets/Images/imge1.png'
import imge2 from '../../Assets/Images/imge2.png'
import imge3 from '../../Assets/Images/imge3.png'
import healthicon from '../../Assets/Images/healthicon.png'
import share from '../../Assets/Images/light_share.png'
import print from '../../Assets/Images/print.png'
import flag from '../../Assets/Images/flag-fill.png'
import sittingroom from '../../Assets/Images/sittingroom.png'
import bathroom from '../../Assets/Images/bathroom.png'
import bedroom from '../../Assets/Images/bedroom.png'



const ForRent = () => {
  return (
    <div className={classes.container}>
        <div className={classes.innerContainer}>
            <div className={classes.text}>
                <h4>House For Rent In Olokuta, Ogun State</h4>
                <h5>₦ 3,225,000</h5>
            </div>
            <div className={classes.images}>
                <img src={imge1} alt="imge1"/>
                <div className={classes.imagesII}>
                    <img src={imge2} alt="imge2"/>
                    <img src={imge3} alt="imge3"/>
                </div>                
            </div>
            <div className={classes.updatedDiv}>
                <div className={classes.updated}>
                    <img src={healthicon} alt="healthicon"/>
                    <h4>Updated on September 27, 2023 | Reference ID: 04568125</h4>
                </div>
                <div className={classes.tinyIcons}>
                    <img src={share} alt="share"/>
                    <img src={print} alt="print"/>
                    <img src={flag} alt="flag"/>
                </div>
            </div>
            <div className={classes.details}>
                <div className={classes.detailsdiv}>
                    <h6>564219</h6>
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
                    <h6><img src={sittingroom} alt="sittingroom"/>  1   </h6>
                    <h6>Sittingrooms</h6>
                </div>
                <div className={classes.detailsdiv}>
                    <h6><img src={bedroom} alt="bedroom"/>  2</h6>
                    <h6>Bedrooms</h6>
                </div>
                <div className={classes.detailsdiv}>
                    <h6><img src={bathroom} alt="bathroom"/>  3</h6>
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

export default ForRent