import React from 'react'
import classes from './Password.module.css'
import edit from '../../Assets/Images/edit.png'

const Password = () => {
  return (
    <div className={classes.container}>
        <div className={classes.innerContainer}>
            <div className={classes.formsDiv}>
                <div>
                    <div className={classes.personal}>
                        <p>Change Password</p>
                    </div>
                    <div className={classes.forms}>                        
                        <input type="text" placeholder="Old Password" className={classes.divform}/>
                        <img src={edit} alt="edit"/>
                    </div>
                    <div className={classes.forms}>                        
                        <input type="text" placeholder="New Password" className={classes.divform}/>
                        <img src={edit} alt="edit"/>
                    </div>
                    <div className={classes.forms}>                        
                        <input type="text" placeholder="Confirm New Password" className={classes.divform}/>
                        <img src={edit} alt="edit"/>
                    </div>                  
                </div>
                <div>
                    <div className={classes.personal}>
                        <p>Change Phone number</p>
                    </div>
                    <div className={classes.forms}>                        
                        <input type="text" placeholder="Old Number" className={classes.divform}/>
                        <img src={edit} alt="edit"/>
                    </div>
                    <div className={classes.forms}>                        
                        <input type="text" placeholder="New Number" className={classes.divform}/>
                        <img src={edit} alt="edit"/>
                    </div>
                    <div className={classes.forms}>                        
                        <input type="text" placeholder="OTP" className={classes.divform1}/>
                        <button className={classes.otp}>Get OTP</button>
                    </div>                  
                </div>
            </div>
            <div className={classes.picbtn}>
                <button>Save Changes</button>
            </div>
        </div>
    </div>
  )
}

export default Password