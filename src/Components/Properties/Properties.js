import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query , where } from 'firebase/firestore';
import { db } from './config'; // Adjust the path to your Firebase config
import classes from './Properties.module.css'; // Ensure this is the correct path to your CSS module
import bed from '../../Assets/Images/bed.png';
import bath from '../../Assets/Images/bath.png';
import star from '../../Assets/Images/star.png';
import fav from '../../Assets/Images/fav.png';
import next from '../../Assets/Images/next.png';
// import 'bootstrap/dist/css/bootstrap.min.css';

const Properties = ({ 
    search = "", 
    propertyType = "", 
    minPrice = 0, 
    maxPrice = Infinity,
   
  }) => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const propertiesCollection = query( collection(db, 'properties'),where("sold", "==", false));
                const propertiesSnapshot = await getDocs(propertiesCollection);
                const propertiesList = propertiesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                console.log(propertiesList)
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

 

    const filteredProperties =   properties.filter(item => {
        return (
          ( !search || search.toLowerCase() === '' ||  
            (item.location && item.location.toLowerCase().includes(search.toLowerCase())) ||
            (item.price && item.price.toString().includes(search)) ||
            (item.state && item.state.toLowerCase().includes(search.toLowerCase())) ||
            (item.lga && item.lga.toLowerCase().includes(search.toLowerCase()))
          ) 
          && 
          (propertyType === '' || item.propertyType === propertyType) 
          && 
          (item.price >= minPrice && item.price <= maxPrice)
        );
      });

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
                ) : search === '' ? (
                    properties.length === 0 ? (
                        <p>No properties available</p>
                    ) : (
                        <>
                            <div className={classes.innerContainer}>
                                <h2 className='pb-5'>Featured Properties</h2>
                            </div>
                            {properties.map(property => (
                                <div key={property.id} className="col-12 col-md-6 col-lg-4 mb-4">
                                    <div className={classes.imgInnerDiv}>
                                    {/* <div className={classes.topImgs}>
                                            <button onClick={() => handleClick(property)}>
                                                <img src={fav} alt="fav" className={classes.fav} />
                                            </button>
                                            <Link to={`/view-details/${property.id}`}>
                                                <img src={next} alt="next" className={classes.next} />
                                            </Link>
                                        </div> */}
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
                                            ) }

                                        </div>
                                        <div className={classes.about}>
                                            <div style={{ fontWeight: 600, color: 'var(--neutral-dark)', fontSize: '0.7rem' }}>
                                                {property.location}
                                            </div>
                                            <div style={{ color: 'var(--neutral-medium)', fontSize: '0.9rem' }} className={classes.textOne}>LGA: {property.lga}</div>
                                            <div className={classes.textOne}>State: {property.state}</div>
                                            <div  style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.8rem' }}>
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
                    )
                ) : filteredProperties.length === 0 ? (
                    <p>No properties match your search criteria</p>
                ) : (
                    <>
                        <div className={classes.innerContainer}>
                            <h2>Featured Properties</h2>
                        </div>
                        {filteredProperties.map(property => (
                            <div key={property.id} className="col-12 col-md-6 col-lg-4 mb-4">
                                <div className={classes.imgInnerDiv}>
                                    <div className={classes.topImgs}>
                                        <button onClick={() => handleClick(property)}>
                                            <img src={fav} alt="fav" className={classes.fav} />
                                        </button>
                                        <Link to={`/view-details/${property.id}`}>
                                            <img src={next} alt="next" className={classes.next} />
                                        </Link>
                                    </div>
                                    <img
                                        src={property.mainImageUrl}
                                        alt={property.location}
                                        className={classes.lekkiphase2}
                                    />
                                    <div className={classes.apartment}>
                                        <span>{property.propertyType}</span>
                                        <span>{property.beds} <img src={bed} alt="bed" /></span>
                                        <span>{property.baths} <img src={bath} alt="bath" /></span>
                                    </div>
                                    <div className={classes.about}>
                                        <div style={{ fontWeight: 600, color: 'var(--neutral-dark)', fontSize: '1rem' }}>
                                            {property.location}
                                        </div>
                                        <div className={classes.textOne}>LGA: {property.lga}</div>
                                        <div className={classes.textOne}>State: {property.state}</div>
                                        <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1.2rem' }}>
                                            ₦{property.price}
                                        </span>
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


