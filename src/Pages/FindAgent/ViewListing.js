
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../config';
import classes from './ViewListing.module.css';
import bed from '../../Assets/Images/bed.png';
import bath from '../../Assets/Images/bath.png';
import fav from '../../Assets/Images/fav.png';
import next from '../../Assets/Images/next.png';
import 'bootstrap/dist/css/bootstrap.min.css';

function Property() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { agentId } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const q = query(collection(db, "properties"), where("user_id", "==", agentId));
        const data = await getDocs(q);
        const propertyList = data.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProperties(propertyList);
      } catch (error) {
        console.error("Error fetching properties: ", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [agentId]);

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

    const existingPropertiesStr = localStorage.getItem("PropertiesValue");
    let existingProperties = existingPropertiesStr ? JSON.parse(existingPropertiesStr) : [];

    if (!existingProperties.some(item => item.id === propertiesValue.id)) {
      existingProperties.push(propertiesValue);
      localStorage.setItem("PropertiesValue", JSON.stringify(existingProperties));
    }
  };

  if (loading) return <p>Loading properties...</p>;

  return (
    <div className={classes.container}>
      <div className="row">
        {properties.length > 0 ? (
          <>
            <div className={classes.innerContainer}>
              <h2 className="pb-5">Agent's Properties</h2>
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
                                            {property.sold && (
                    <div className={classes.soldLabel}>Sold</div>
                  )}
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
        ) : (
          <p>No properties found</p>
        )}
      </div>
    </div>
  );
}

export default Property;
