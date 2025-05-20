

import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from './config'; // Adjust the path to your firebase.js
import './property.css';
import ProSetNot from '../ProSetNot/ProSetNot';
import PropertyCard from './PropertyCard';

function Property() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const userId = auth.currentUser.uid; // Get the logged-in user's ID
        const q = query(collection(db, "properties"), where("user_id", "==", userId));
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
  }, []);

  // Function to handle property deletion
  const handleDelete = async (propertyId) => {
    try {
      const propertyDocRef = doc(db, "properties", propertyId);
      await deleteDoc(propertyDocRef);
      setProperties(prevProperties => prevProperties.filter(property => property.id !== propertyId));
    } catch (error) {
      console.error("Error deleting property: ", error);
    }
  };

  const handleSold = async (propertyId) => {
    try {
      const propertyDocRef = doc(db, "properties", propertyId);
      await updateDoc(propertyDocRef, { sold: true });
      // setProperties(prevProperties =>
      //   prevProperties.map(property =>
      //     property.id === propertyId ? { ...property, sold: true } : property
      //   ));
      setProperties(prevProperties =>
        prevProperties.map(property =>
          property.id === propertyId ? { ...property, sold: true } : property
        )
      );
    } catch (error) {
      console.error("Error marking property as sold: ", error);
    }
  };
  // Function to handle property edit
  const handleEdit = async (updatedProperty) => {
    try {
      const propertyDocRef = doc(db, "properties", updatedProperty.id);
      await updateDoc(propertyDocRef, updatedProperty);
      setProperties(prevProperties => prevProperties.map(property => 
        property.id === updatedProperty.id ? updatedProperty : property
      ));
    } catch (error) {
      console.error("Error updating property: ", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <ProSetNot />
      <div className="container">
        <div className='grid-container'>
          {properties.length > 0 ? (
            properties.map(property => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                onDelete={handleDelete}
                onEdit={handleEdit}
                onSold={handleSold}
              />
            ))
          ) : (
            <p>No properties found</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Property;


