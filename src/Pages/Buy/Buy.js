// import React from 'react'
// import ForSale from '../../Components/ForSale/ForSale'
// import SimiliarListing from '../../Components/SimiliarListing/SimiliarListing'
// import MoreProperties from '../../Components/MoreProperties/MoreProperties'


// const Buy = () => {
//   return (
//     <div>
//         <ForSale/>
//         <SimiliarListing/>
//         <MoreProperties/>
//     </div>
//   )
// }

// export default Buy




import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config'; // Adjust the path to your Firebase config
import classes from './Buy.module.css'; // Ensure this is the correct path to your CSS module
import bed from '../../Assets/Images/bed.png';
import bath from '../../Assets/Images/bath.png';
import star from '../../Assets/Images/star.png';
import fav from '../../Assets/Images/fav.png';
import next from '../../Assets/Images/next.png';

const Properties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const propertiesCollection = collection(db, 'buy');
                const propertiesSnapshot = await getDocs(propertiesCollection);
                const propertiesList = propertiesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProperties(propertiesList);
            } catch (error) {
                console.error("Error fetching properties: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    if (loading) return <p>Loading properties...</p>;

    return (
        // <div className={classes.container}>
        //     <div>
        //          {/* Check if there are no properties */}
        //     {properties.length === 0 ? (
        //         <p>No properties available for now.</p>
        //     ) : (
        //             <>
        //             <div className={classes.innerContainer}>
        //           <h1 className='sale'> Properties For Sale</h1>
        //            </div>
        //             <div className={classes.imgDiv}>
        //             {properties.map(property => (
        //                 <div key={property.id} className={classes.imgInnerDiv}>
        //                     <img src={property.mainImageUrl} alt={property.location} className={classes.lekkiphase2} />
        //                     <span className={classes.textOne}>
        //                         <span>{property.location}</span>
        //                         <span className={property.rating >= 4.75 ? classes.textStar3 : property.rating >= 4.5 ? classes.textStar2 : classes.textStar1}>
        //                             <img src={star} alt="star" /> {property.rating || 'N/A'}
        //                         </span>
        //                     </span>
        //                     <span className={classes.textTwo}>{property.type}</span>
        //                     <span className={classes.textThree}>{property.price}₦</span>
        //                     <div className={classes.topImgs}>
        //                         <li><img src={fav} alt="fav" className={classes.fav} /></li>
        //                         <Link to={`/view-details/${property.id}`}>
        //                             <li><img src={next} alt="next" className={classes.next} /></li>
        //                         </Link>
        //                     </div>
        //                     <div className={classes.apartment}>
        //                         <span>{property.apartmentType}</span>
        //                         {/* <span>{property.beds} <img src={bed} alt="bed" /></span>
        //                         <span>{property.baths} <img src={bath} alt="bath" /></span> */}
        //                         {property.land !== "land" && (
        //                                         <>
        //                                         <span>{property.beds} <img src={bed} alt="bed" /></span>
        //                                         <span>{property.baths} <img src={bath} alt="bath" /></span>
        //                                         </>
        //                                     ) }
        //                     </div>
        //                 </div>
        //             ))}
        //         </div>
        //             </>
               
        //     )}
        //  </div>         
  
           
        // </div>

        <div className={classes.container}>
            <div className="row">
                {loading ? (
                    <p>Loading properties...</p>
                ) : properties.length === 0 ? (
                    <p>No properties available</p>
                ) : (
                    <>
                        <div className={classes.innerContainer}>
                            <h2 className='pb-5'> Properties For sale </h2>
                        </div>
                        {properties.map(property => (
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
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default Properties;
