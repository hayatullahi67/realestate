// import React from 'react'
// import classes from './YourFavorites.module.css'
// import banana from '../../Assets/Images/banana.png'
// import amen from '../../Assets/Images/amen II.png'
// import ojodu from '../../Assets/Images/ojodu.png'
// import palmgroove from '../../Assets/Images/palmgroove.png'
// import fav from '../../Assets/Images/fav.png'
// import star from '../../Assets/Images/star.png'
// import next from '../../Assets/Images/next.png'
// import bed from '../../Assets/Images/bed.png'
// import bath from '../../Assets/Images/bath.png'

// const YourFavorites = () => {
//   return (
//     <div className={classes.container}>
//         <h1>Your Favorites</h1>
//         <h3>Your Favorites</h3>
//         <div className={classes.imgDiv}>
//             <div className={classes.imgInnerDiv}>
//                 <img src={banana} alt="banana" className={classes.lekkiphase2}/>
//                 <span className={classes.textOne}>Banana, Ikorodu, Lagos State<span className={classes.textStar1}><img src={star} alt="star"/>4.75</span></span>
//                 <span className={classes.textTwo}>Property for sale</span>
//                 <span className={classes.textThree}>₦23,011,000</span>
//                 <div className={classes.topImgs}>
//                     <li><img src={fav} alt="fav" className={classes.fav}/></li>
//                     <li><img src={next} alt="" className={classes.next}/></li>
//                 </div>
//                 <div className={classes.apartment}>
//                     <span>Apartment</span>
//                     <span>2<img src={bed} alt="bed"/></span>
//                     <span>3<img src={bath} alt="bath"/></span>
//                 </div>
//             </div>
//             <div className={classes.imgInnerDiv}>
//                 <img src={amen} alt="amenestate" className={classes.amenestate}/>
//                 <span className={classes.textOne}>Amen Estate, Epe, Lagos State<span className={classes.textStar2}><img src={star} alt="star"/>4.95</span></span>
//                 <span className={classes.textTwo}>Property for sale</span>
//                 <span className={classes.textThree}>₦53,105,000</span>
//                 <div className={classes.topImgs}>
//                     <li><img src={fav} alt="fav" className={classes.fav}/></li>
//                     <li><img src={next} alt="next" className={classes.next}/></li>
//                 </div>
//                 <div className={classes.apartment}>
//                     <span>Apartment</span>
//                     <span>4<img src={bed} alt="bed"/></span>
//                     <span>5<img src={bath} alt="bath"/></span>
//                 </div>
//             </div>
//             <div className={classes.imgInnerDiv}>
//                 <img src={amen} alt="amen" className={classes.solomade}/>
//                 <span className={classes.textOne}>Amen Estate, Epe, Lagos State<span className={classes.textStar3}><img src={star} alt="star"/>5.0</span></span>
//                 <span className={classes.textTwo}>Property for sale</span>
//                 <span className={classes.textThree}>₦53,105,000</span>
//                 <div className={classes.topImgs}>
//                     <li><img src={fav} alt="fav" className={classes.fav}/></li>
//                     <li><img src={next} alt="" className={classes.next}/></li>
//                 </div>
//                 <div className={classes.apartment}>
//                     <span>Apartment</span>
//                     <span>3<img src={bed} alt="bed"/></span>
//                     <span>4<img src={bath} alt="bath"/></span>
//                 </div>
//             </div>
//         </div>
//         <div className={classes.imgDiv}>
//             <div className={classes.imgInnerDiv}>
//                 <img src={ojodu} alt="ojodu" className={classes.lekkiphase2}/>
//                 <span className={classes.textOne}>Lekki Phaze 2, Ajah, Lagos State<span className={classes.textStar1}><img src={star} alt="star"/>4.75</span></span>
//                 <span className={classes.textTwo}>Property for sale</span>
//                 <span className={classes.textThree}>₦131,058,000r</span>
//                 <div className={classes.topImgs}>
//                     <li><img src={fav} alt="fav" className={classes.fav}/></li>
//                     <li><img src={next} alt="" className={classes.next}/></li>
//                 </div>
//                 <div className={classes.apartment}>
//                     <span>Apartment</span>
//                     <span>2<img src={bed} alt="bed"/></span>
//                     <span>3<img src={bath} alt="bath"/></span>
//                 </div>
//             </div>
//             <div className={classes.imgInnerDiv}>
//                 <img src={palmgroove} alt="palmgroove" className={classes.amenestate}/>
//                 <span className={classes.textOne}>Palmgroove, Yaba, Lagos State<span className={classes.textStar2}><img src={star} alt="star"/>4.95</span></span>
//                 <span className={classes.textTwo}>Property for sale</span>
//                 <span className={classes.textThree}>₦147,876,000</span>
//                 <div className={classes.topImgs}>
//                     <li><img src={fav} alt="fav" className={classes.fav}/></li>
//                     <li><img src={next} alt="" className={classes.next}/></li>
//                 </div>
//                 <div className={classes.apartment}>
//                     <span>Apartment</span>
//                     <span>4<img src={bed} alt="bed"/></span>
//                     <span>5<img src={bath} alt="bath"/></span>
//                 </div>
//             </div>
//             <div className={classes.imgInnerDiv}>
//                 <img src={palmgroove} alt="palmgroove" className={classes.solomade}/>
//                 <span className={classes.textOne}>Palmgroove, Yaba, Lagos State<span className={classes.textStar3}><img src={star} alt="star"/>5.0</span></span>
//                 <span className={classes.textTwo}>Property for sale</span>
//                 <span className={classes.textThree}>₦147,876,000</span>
//                 <div className={classes.topImgs}>
//                     <li><img src={fav} alt="fav" className={classes.fav}/></li>
//                     <li><img src={next} alt="" className={classes.next}/></li>
//                 </div>
//                 <div className={classes.apartment}>
//                     <span>Apartment</span>
//                     <span>3<img src={bed} alt="bed"/></span>
//                     <span>4<img src={bath} alt="bath"/></span>
//                 </div>
//             </div>
//         </div>
//     </div>
//   );
// }

// export default YourFavorites

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Ensure to import Link for navigation
import bed from '../../Assets/Images/bed.png' // Adjust the path for your bed icon
import bath from '../../Assets/Images/bath.png'; // Adjust the path for your bath icon
import fav from '../../Assets/Images/fav.png'; // Adjust the path for your favorite icon
import next from '../../Assets/Images/next.png'; // Adjust the path for your next icon
import classes from './YourFavorites.module.css'; // Adjust the path for your CSS module
// import 'bootstrap/dist/css/bootstrap.min.css';


const YourFavorites = () => {
    const [properties, setProperties] = useState([]); // Initialize an array for properties

    useEffect(() => {
        const propertyData = localStorage.getItem("PropertiesValue");
        console.log("Data from local storage:", propertyData); // Debug log
    
        if (propertyData) {
            const parsedData = JSON.parse(propertyData);
            console.log("Parsed data:", parsedData); // Debug log
            // Ensure parsedData is an array
            if (Array.isArray(parsedData)) {
                setProperties(parsedData);
            } else {
                console.error("Expected an array but got:", parsedData);
                // If it's not an array, set properties to an empty array
                setProperties([]);
            }
        }
    }, []);
    

    if (properties.length === 0) {
        return <p>No property details available</p>; // Handle the case where no data is found
    }


    return (
        <div className='row container'>
            <h3 className={classes.heading}>Your Favorite Properties</h3>
            {properties.length === 0 ? (
                <p>No properties found.</p>
            ) : (
                // properties.map(property => (
                //     <div key={property.id} className="col-12 col-md-6 col-lg-4 mb-4">
                //         <div className={classes.imgInnerDiv}>
                //             <img
                //                 src={property.mainImageUrl}
                //                 alt={property.location}
                //                 className={classes.lekkiphase2}
                //             />
                //             <div className={classes.apartment}>
                //                 <span>{property.propertyType}</span>
                //                 {/* <span>{property.beds} <img src={bed} alt="bed" /></span>
                //                 <span>{property.baths} <img src={bath} alt="bath" /></span> */}
                //                 {property.land !== "land" && (
                //                                 <>
                //                                 <span>{property.beds} <img src={bed} alt="bed" /></span>
                //                                 <span>{property.baths} <img src={bath} alt="bath" /></span>
                //                                 </>
                //                             ) }
                           
                //             </div>
                //             <div className={classes.about}>
                //                 <span className={classes.textOne}>
                //                     <span>{property.location}</span>
                //                 </span>
                //                 <div className={classes.textOne}>LGA: {property.lga}</div>
                //                 <div className={classes.textOne}>State: {property.state}</div>
                //                 <span className={classes.textThree}>{property.price}₦</span>
                //                 <div className={classes.topImgs}>
                //                     <li>
                //                         <button onClick={() => handleClick(property)}>
                //                             <img src={fav} alt="fav" className={classes.fav} />
                //                         </button>
                //                     </li>
                //                     <Link to={`/view-details/${property.id}`}>
                //                         <li>
                //                             <img src={next} alt="next" className={classes.next} />
                //                         </li>
                //                     </Link>
                //                 </div>
                //             </div>
                //         </div>
                //     </div>
                // ))

                properties.map(property => (
                    <div key={property.id} className="col-12 col-md-6 col-lg-4 mb-4">
                        <div className={classes.imgInnerDiv}>
                            <img
                                src={property.mainImageUrl}
                                alt={property.location}
                                className={classes.lekkiphase2}
                            />
                            <div className={classes.apartment}>
                                <span>{property.propertyType}</span>
                                {property.land !== "land" && (
                                    <>
                                        <span>{property.beds} <img src={bed} alt="bed" /></span>
                                        <span>{property.baths} <img src={bath} alt="bath" /></span>
                                    </>
                                )}
                            </div>
                            <div className={classes.about}>
                                <div style={{ fontWeight: 600, color: 'var(--neutral-dark)', fontSize: '0.7rem' }}>
                                    {property.location}
                                </div>
                                <div style={{ color: 'var(--neutral-medium)', fontSize: '0.9rem' }} className={classes.textOne}>LGA: {property.lga}</div>
                                <div className={classes.textOne}>State: {property.state}</div>
                                <div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.8rem' }}>
                                    ₦{property.price}
                                </div>
                                <div className={classes.topImgs}>
                                    <li>
                                        <button onClick={() => handleClick(property)}>
                                            <img src={fav} alt="fav" className={classes.fav} />
                                        </button>
                                    </li>
                                    <Link to={`/view-details/${property.id}`}>
                                        <li>
                                            <img src={next} alt="next" className={classes.next} />
                                        </li>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
export default YourFavorites;


