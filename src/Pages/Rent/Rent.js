// import React from 'react'
// import ForRent from '../../Components/ForRent/ForRent'
// import SimiliarListingII from '../../Components/SimiliarListingII/SimiliarListingII'
// import MoreProperties from '../../Components/MoreProperties/MoreProperties'

// const Rent = () => {
//   return (
//     <div>
//         <ForRent/>
//         <SimiliarListingII/>
//         <MoreProperties/>
//     </div>
//   )
// }

// export default Rent



import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config'; // Adjust the path to your Firebase config
import classes from './Rent.module.css'; // Ensure this is the correct path to your CSS module
import bed from '../../Assets/Images/bed.png';
import bath from '../../Assets/Images/bath.png';
import star from '../../Assets/Images/star.png';
import fav from '../../Assets/Images/fav.png';
import next from '../../Assets/Images/next.png';
import 'bootstrap/dist/css/bootstrap.min.css';


const Properties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const propertiesCollection = collection(db, 'rent');
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

    const handleClick = (property) => {
        const propertiesValue = {
            mainImageUrl: property.mainImageUrl,
            propertyType: property.propertyType,
            beds: property.beds,
            baths: property.baths,
            location: property.location,
            lga: property.lga,
            state: property.state,
            price: property.price,
           

            id: property.id,
        };
    
        // Retrieve existing properties from local storage
        const existingPropertiesStr = localStorage.getItem("PropertiesValue");
        let existingProperties = [];
    
        // Check if existing properties are present and parse if they are
        if (existingPropertiesStr) {
            try {
                existingProperties = JSON.parse(existingPropertiesStr);
                // Ensure it's an array
                if (!Array.isArray(existingProperties)) {
                    console.error("Existing properties data is not an array:", existingProperties);
                    existingProperties = []; // Reset to empty array if it's not valid
                }
            } catch (error) {
                console.error("Error parsing existing properties:", error);
                existingProperties = []; // Reset to empty array on parse error
            }
        }
    
        // Check if the property already exists in the favorites
        const propertyExists = existingProperties.some((item) => item.id === propertiesValue.id);
        if (!propertyExists) {
            // Add the new property to the array
            existingProperties.push(propertiesValue);
            console.log("Updated properties before saving:", existingProperties); // Debug log
    
            // Save the updated properties array back to local storage
            localStorage.setItem("PropertiesValue", JSON.stringify(existingProperties));
            console.log("Property data saved:", propertiesValue); // Log the saved property data
        } else {
            console.log("Property already in favorites:", propertiesValue.id);
        }
    };

    
    return (
        <div className={classes.container}>
            <div className="row">
                {loading ? (
                    <p>Loading properties...</p>
                ) : properties.length === 0 ? (
                    <p>No properties available</p>
                ) : (
                    <>
                        <div className={classes.innerContainer}>
                            <h2 className='pb-5'> Properties for Rent </h2>
                        </div>
                        {properties.map(property => (
                            <div  className="col-12 col-md-6 col-lg-4 mb-4">
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
