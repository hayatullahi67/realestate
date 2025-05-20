import React from 'react'
import classes from './SimiliarListingII.module.css'
import { Link } from 'react-router-dom'
import maps from '../../Assets/Images/maps.png'
import adam from '../../Assets/Images/adam.png'
import whatsapp from '../../Assets/Images/icwhatsapp.png'
import call from '../../Assets/Images/biphone.png'
import federal from '../../Assets/Images/federal.png'
import lipede from '../../Assets/Images/lipede.png'
import ibara from '../../Assets/Images/ibara.png'
import obasanjo from '../../Assets/Images/obasanjo.png'
import fav from '../../Assets/Images/fav.png'
import next from '../../Assets/Images/next.png'
import bed from '../../Assets/Images/bed.png'
import bath from '../../Assets/Images/bath.png'
import star from '../../Assets/Images/star.png'



const SimiliarListingII = () => {
  return (
    <div className={classes.container}>
        <div className={classes.innerContainer}>
            <div className={classes.buttonContact}>           
                <div className={classes.openButton}>
                    <button>
                        <img src={maps} alt="maps"/>
                        <p>Open on Google Maps</p>
                    </button>
                </div>
                <div className={classes.contactCard}>
                    <img src={adam} alt="adam"/>
                    <p>Kaneth Ayomide</p>
                    <button className={classes.whatsappButton}><img src={whatsapp} alt="whatsapp"/>Whatsapp</button>
                    <button className={classes.callButton}><img src={call} alt="call"/>Call</button>
                    <div className={classes.texts}>
                        <p>Sweet Estate</p>
                        <p>View all properties</p>
                    </div>
                </div>
            </div> 
            <div className={classes.similiarListing}>
                <p>Similiar Listing</p>
                <div className={classes.imagesDiv}>
                    <div className={classes.imagesDiv1}>
                        <div className={classes.imagesCard}>
                            <img src={federal} alt="federal" className={classes.federal}/>
                            <div className={classes.topImgs}>
                                <li><img src={fav} alt="fav" className={classes.fav}/></li>  
                                <Link to = "/rent"><li><img src={next} alt="next" className={classes.next}/></li></Link>
                            </div>
                            <div className={classes.apartment}>
                                <span>Apartment</span>
                                <span>1<img src={bed} alt="bed"/></span>
                                <span>2<img src={bath} alt="bath"/></span>
                            </div>
                            <div className={classes.spanTexts}>
                                <span className={classes.textOne}>
                                    <span>
                                        Federal Housing, Ogun State
                                    </span>
                                    <span className={classes.textStar1}>
                                        <img src={star} alt="star"/>
                                        4.75
                                    </span>
                                </span>
                                <span className={classes.textTwo}>Property for rent</span>
                                <span className={classes.textThree}>₦350,000</span>
                            </div>
                        </div>
                        <div className={classes.imagesCard}>
                            <img src={lipede} alt="lipede" className={classes.lipede}/>
                            <div className={classes.topImgs}>
                                <li><img src={fav} alt="fav" className={classes.fav}/></li>  
                                <Link to = "/rent"><li><img src={next} alt="next" className={classes.next}/></li></Link>
                            </div>
                            <div className={classes.apartment}>
                                <span>Apartment</span>
                                <span>4<img src={bed} alt="bed"/></span>
                                <span>5<img src={bath} alt="bath"/></span>
                            </div>
                            <div className={classes.spanTexts}>
                                <span className={classes.textOne}>
                                    <span>
                                        Lipede Estate, Ogun State
                                    </span>
                                    <span className={classes.textStar2}>
                                        <img src={star} alt="star"/>
                                        4.95
                                    </span>
                                </span>
                                <span className={classes.textTwo}>Property for rent</span>
                                <span className={classes.textThree}>₦450,000</span>
                            </div>
                        </div>
                    </div>
                    <div className={classes.imagesDiv2}>
                        <div className={classes.imagesCard}>
                            <img src={obasanjo} alt="obasanjo" className={classes.obasanjo}/>
                            <div className={classes.topImgs}>
                                <li><img src={fav} alt="fav" className={classes.fav}/></li>  
                                <Link to = "/sale"><li><img src={next} alt="next" className={classes.next}/></li></Link>
                            </div>
                            <div className={classes.apartment}>
                                <span>Apartment</span>
                                <span>2<img src={bed} alt="bed"/></span>
                                <span>3<img src={bath} alt="bath"/></span>
                            </div>
                            <div className={classes.spanTexts}>
                                <span className={classes.textOne}>
                                    <span>
                                        Obasanjo Hilltop, Ogun State
                                    </span>
                                    <span className={classes.textStar3}>
                                        <img src={star} alt="star"/>
                                        4.75
                                    </span>
                                </span>
                                <span className={classes.textTwo}>Property for sale</span>
                                <span className={classes.textThree}>₦12,005,000</span>
                            </div>
                        </div>
                        <div className={classes.imagesCard}>
                            <img src={ibara} alt="ibara" className={classes.ibara}/>
                            <div className={classes.topImgs}>
                                <li><img src={fav} alt="fav" className={classes.fav}/></li>  
                                <Link to = "/rent"><li><img src={next} alt="next" className={classes.next}/></li></Link>
                            </div>
                            <div className={classes.apartment}>
                                <span>Apartment</span>
                                <span>4<img src={bed} alt="bed"/></span>
                                <span>5<img src={bath} alt="bath"/></span>
                            </div>
                            <div className={classes.spanTexts}>
                                <span className={classes.textOne}>
                                    <span>
                                        Ibara Housing, Ogun State
                                    </span>
                                    <span className={classes.textStar4}>
                                        <img src={star} alt="star"/>
                                        4.95
                                    </span>
                                </span>
                                <span className={classes.textTwo}>Property for rent</span>
                                <span className={classes.textThree}>₦6,500,000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SimiliarListingII