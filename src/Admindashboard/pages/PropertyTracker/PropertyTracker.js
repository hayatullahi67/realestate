import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../../config";

function PropertyTracking({isSidebarVisible}) {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const propertiesRef = collection(db, "properties");
        const querySnapshot = await getDocs(propertiesRef);

        const propertyList = await Promise.all(
          querySnapshot.docs.map(async (docSnap) => {
            const data = docSnap.data();
            const createdAt = data.createdAt?.toDate
              ? data.createdAt.toDate().toLocaleDateString()
              : "N/A";

            // Fetch user details
            let userName = "Unknown";
            if (data.user_id) {
              const userRef = doc(db, "users", data.user_id);
              const userSnap = await getDoc(userRef);
              if (userSnap.exists()) {
                userName = userSnap.data().name || "Unknown";
              }
            }

            return {
              id: docSnap.id,
              createdAt,
              userName,
              baths: data.baths || "N/A",
              beds: data.beds || "N/A",
              country: data.country || "N/A",
              state: data.state || "N/A",
              lga: data.lga || "N/A",
              land: data.land || "N/A",
              propertyType: data.propertyType || "N/A",
              price: data.price || 0,
              sold: data.sold ? "Yes" : "No",
            };
          })
        );

        setProperties(propertyList);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);


  // const containerStyle = {
  //   width: isSidebarVisible ? 'calc(100% - 240px)' : '100%', // Adjust '250px' to your sidebar width
  //   transition: 'width 0.3s',
  //   marginLeft: isSidebarVisible ? '240px' : '0px',  
  //   paddingLeft: isSidebarVisible ? '0px' : '60px' ,
    
  //   marginTop:'100px'
  // };x\
  const containerStyle = {
    width: isSidebarVisible ? 'calc(97% - 240px)' : '90%',
    transition: 'width 0.3s',
    marginLeft: isSidebarVisible ? '260px' : '30px',
    paddingLeft: isSidebarVisible ? '0px' : '20px', // Reduce paddingLeft
    marginTop: '100px',
    overflowX: 'auto', // Add horizontal scroll if needed
    whiteSpace: 'nowrap', // Prevents text from breaking inside table cells
  };

  

  return (
    <div style={containerStyle} className="p-2    overflow-hidden">
      <h2 className="text-2xl font-semibold mb-4">Properties List</h2>
      <div  className="table-responsive">


      {/* <table className="w-full table table-bordered  border-collapse border border-gray-200  overflow-x-scroll">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-3">Property ID</th>
            <th className="border p-3">Created At</th>
            <th className="border p-3">User Name</th>
            <th className="border p-3">Baths</th>
            <th className="border p-3">Beds</th>
            <th className="border p-3">Country</th>
            <th className="border p-3">State</th>
            <th className="border p-3">LGA</th>
            <th className="border p-3">Land / House</th>
            <th className="border p-3">Property Type</th>
            <th className="border p-3">Price</th>
            <th className="border p-3">Sold</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id} className="border hover:bg-gray-50">
              <td className="border p-3">{property.id}</td>
              <td className="border p-3">{property.createdAt}</td>
              <td className="border p-3">{property.userName}</td>
              <td className="border p-3">{property.baths}</td>
              <td className="border p-3">{property.beds}</td>
              <td className="border p-3">{property.country}</td>
              <td className="border p-3">{property.state}</td>
              <td className="border p-3">{property.lga}</td>
              <td className="border p-3">{property.land}</td>
              <td className="border p-3">{property.propertyType}</td>
              <td className="border p-3">₦{property.price.toLocaleString()}</td>
              <td className="border p-3">
                <span className={`px-3 py-1 rounded-full  `}>
                  {property.sold}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}




<table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Property ID</th>
              <th>Created At</th>
              <th>User Name</th>
              <th>Baths</th>
              <th>Beds</th>
              <th>Country</th>
              <th>State</th>
              <th>LGA</th>
              <th>Land / House</th>
              <th>Property Type</th>
              <th>Price</th>
              <th>Sold</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id}>
                <td>{property.id}</td>
                <td>{property.createdAt}</td>
                <td>{property.userName}</td>
                <td>{property.baths}</td>
                <td>{property.beds}</td>
                <td>{property.country}</td>
                <td>{property.state}</td>
                <td>{property.lga}</td>
                <td>{property.land}</td>
                <td>{property.propertyType}</td>
                <td>₦{property.price.toLocaleString()}</td>
                <td>
                  <span
                    className={`badge ${
                      property.sold === "Yes" ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {property.sold}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
}

export default PropertyTracking;
