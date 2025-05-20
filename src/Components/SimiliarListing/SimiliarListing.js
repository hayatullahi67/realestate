import React from 'react'
import classes from './SimiliarListing.module.css'
import { Link } from 'react-router-dom'
import maps from '../../Assets/Images/maps.png'
import kaneth from '../../Assets/Images/kaneth.png'
import whatsapp from '../../Assets/Images/icwhatsapp.png'
import call from '../../Assets/Images/biphone.png'
import banana from '../../Assets/Images/banana.png'
import amen from '../../Assets/Images/amen II.png'
import ojodu from '../../Assets/Images/ojodu.png'
import palmgroove from '../../Assets/Images/palmgroove.png'
import fav from '../../Assets/Images/fav.png'
import next from '../../Assets/Images/next.png'
import bed from '../../Assets/Images/bed.png'
import bath from '../../Assets/Images/bath.png'
import star from '../../Assets/Images/star.png'



const SimiliarListing = () => {
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
                    <img src={kaneth} alt="kaneth"/>
                    <p>Kaneth Ayomide</p>
                    <button className={classes.whatsappButton}><img src={whatsapp} alt="whatsapp"/>Whatsapp</button>
                    <button className={classes.callButton}><img src={call} alt="call"/>Call</button>
                    <div className={classes.texts}>
                        <p>Adrons Real Estate</p>
                        <p>View all properties</p>
                    </div>
                </div>
            </div>
            <div className={classes.similiarListing}>
                <p>Similiar Listing</p>
                <div className={classes.imagesDiv}>
                    <div className={classes.imagesDiv1}>
                        <div className={classes.imagesCard}>
                            <img src={banana} alt="banana" className={classes.banana}/>
                            <div className={classes.topImgs}>
                                <li><img src={fav} alt="fav" className={classes.fav}/></li>  
                                <Link to = "/sale"><li><img src={next} alt="next" className={classes.next}/></li></Link>
                            </div>
                            <div className={classes.apartment}>
                                <span>Apartment</span>
                                <span>1<img src={bed} alt="bed"/></span>
                                <span>2<img src={bath} alt="bath"/></span>
                            </div>
                            <div className={classes.spanTexts}>
                                <span className={classes.textOne}>
                                    <span>
                                        Banana, Ikorodu, Lagos State
                                    </span>
                                    <span className={classes.textStar}>
                                        <img src={star} alt="star"/>
                                        4.75
                                    </span>
                                </span>
                                <span className={classes.textTwo}>Property for sale</span>
                                <span className={classes.textThree}>₦23,011,000</span>
                            </div>
                        </div>
                        <div className={classes.imagesCard}>
                            <img src={amen} alt="amen" className={classes.amen}/>
                            <div className={classes.topImgs}>
                                <li><img src={fav} alt="fav" className={classes.fav}/></li>  
                                <Link to = "/sale"><li><img src={next} alt="next" className={classes.next}/></li></Link>
                            </div>
                            <div className={classes.apartment}>
                                <span>Apartment</span>
                                <span>4<img src={bed} alt="bed"/></span>
                                <span>5<img src={bath} alt="bath"/></span>
                            </div>
                            <div className={classes.spanTexts}>
                                <span className={classes.textOne}>
                                    <span>
                                        Amen Estate, Epe, Lagos State
                                    </span>
                                    <span className={classes.textStar}>
                                        <img src={star} alt="star"/>
                                        4.95
                                    </span>
                                </span>
                                <span className={classes.textTwo}>Property for sale</span>
                                <span className={classes.textThree}>₦53,105,000</span>
                            </div>
                        </div>
                    </div>
                    <div className={classes.imagesDiv2}>
                        <div className={classes.imagesCard}>
                            <img src={ojodu} alt="ojodu" className={classes.ojodu}/>
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
                                        Ojodu, Berger, Lagos State
                                    </span>
                                    <span className={classes.textStar}>
                                        <img src={star} alt="star"/>
                                        4.75
                                    </span>
                                </span>
                                <span className={classes.textTwo}>Property for sale</span>
                                <span className={classes.textThree}>₦131,058,000</span>
                            </div>
                        </div>
                        <div className={classes.imagesCard}>
                            <img src={palmgroove} alt="palmgroove" className={classes.palmgroove}/>
                            <div className={classes.topImgs}>
                                <li><img src={fav} alt="fav" className={classes.fav}/></li>  
                                <Link to = "/sale"><li><img src={next} alt="next" className={classes.next}/></li></Link>
                            </div>
                            <div className={classes.apartment}>
                                <span>Apartment</span>
                                <span>4<img src={bed} alt="bed"/></span>
                                <span>5<img src={bath} alt="bath"/></span>
                            </div>
                            <div className={classes.spanTexts}>
                                <span className={classes.textOne}>
                                    <span>
                                        Palmgroove, Yaba, Lagos State
                                    </span>
                                    <span className={classes.textStar}>
                                        <img src={star} alt="star"/>
                                        4.95
                                    </span>
                                </span>
                                <span className={classes.textTwo}>Property for sale</span>
                                <span className={classes.textThree}>₦147,876,000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SimiliarListing