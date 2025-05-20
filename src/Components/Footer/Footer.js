import React from 'react'
import classes from './Footer.module.css'
import facebook from '../../Assets/Images/facebook 1.png'
import linkedin from '../../Assets/Images/linkedin.png'
import thread from '../../Assets/Images/threads.png'
import instagram from '../../Assets/Images/instagram.png'
import youtube from '../../Assets/Images/youtube.png'

const Footer = () => {
  return (
    <div className={classes.container}>
        <div className={classes.innerContainer}>
            <div className={classes.footerContent}>
                <div className={classes.footerSection}>
                    <div className={classes.footerTitle}>About Us</div>
                    <p className='text-white'>Nigeria's Real Agent Under One Roof</p>
                </div>
                <div className={classes.footerSection}>
                    <div className={classes.footerTitle}>Links</div>
                    <div className={classes.footerLinks}>
                        <a href="/terms" className={classes.footerLink}>Terms of Use</a>
                        <a href="/privacy" className={classes.footerLink}>Privacy Policy</a>
                    </div>
                </div>
                <div className={classes.footerSection}>
                    <div className={classes.footerTitle}>Follow Us</div>
                    <div className={classes.socialLinks}>
                        <a href="#" className={classes.socialIcon}><i className="fab fa-facebook-f text-white"></i></a>
                        <a href="#" className={classes.socialIcon}><i className="fab fa-linkedin-in text-white"></i></a>
                        <a href="#" className={classes.socialIcon}><i className="fab fa-instagram text-white"></i></a>
                        <a href="#" className={classes.socialIcon}><i className="fab fa-youtube text-white"></i></a>
                    </div>
                </div>
                <div className={classes.footerSection}>
                    <div className={classes.footerTitle}>Newsletter</div>
                    <div className={classes.newsletterInput}>
                        <input type="email" placeholder="Your email" />
                        <button>Subscribe</button>
                    </div>
                </div>
            </div>
            <div className={classes.copyright}>
                © 2023 Real Agent - All rights reserved
            </div>
        </div>
    </div>
  )
}

export default Footer