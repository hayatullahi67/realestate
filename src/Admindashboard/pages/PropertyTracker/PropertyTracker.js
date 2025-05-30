// import React, { useEffect, useState } from "react";
// import { collection, getDocs, doc, getDoc } from "firebase/firestore";
// import { db } from "../../../config";
// import { useNavigate } from 'react-router-dom';
// import DataTable from 'react-data-table-component';
// import styles from './propertTracker.module.css';

// function PropertyTracking({isSidebarVisible}) {
//   const [properties, setProperties] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedProperty, setSelectedProperty] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const propertiesRef = collection(db, "properties");
//         const querySnapshot = await getDocs(propertiesRef);
        
//         const propertyList = await Promise.all(
//           querySnapshot.docs.map(async (docSnap) => {
//             const data = docSnap.data();
//             const createdAt = data.createdAt?.toDate
//               ? data.createdAt.toDate().toLocaleDateString()
//               : "N/A";

//             // Fetch user details
//             let userName = "Unknown";
//             if (data.user_id) {
//               const userRef = doc(db, "users", data.user_id);
//               const userSnap = await getDoc(userRef);
//               if (userSnap.exists()) {
//                 userName = userSnap.data().name || "Unknown";
//               }
//             }

//             return {
//               id: docSnap.id,
//               title: data.title || "Untitled Property",
//               price: data.price || 0,
//               location: `${data.state || ""}, ${data.country || ""}`,
//               status: data.sold ? "Sold" : "Available",
//               description: data.description || "No description available",
//               mainImageUrl: data.mainImageUrl || "",
//               additionalImageUrls: data.additionalImageUrls || [],
//               createdAt,
//               userName,
//               baths: data.baths || "N/A",
//               beds: data.beds || "N/A",
//               country: data.country || "N/A",
//               state: data.state || "N/A",
//               lga: data.lga || "N/A",
//               land: data.land || "N/A",
//               propertyType: data.propertyType || "N/A",
//             };
//           })
//         );

//         setProperties(propertyList);
//       } catch (error) {
//         console.error("Error fetching properties:", error);
//       }
//     };

//     fetchProperties();
//   }, []);

//   const handleRowClick = (row) => {
//     setSelectedProperty(row);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedProperty(null);
//   };

//   const handleImageClick = (imageUrl) => {
//     setSelectedImage(imageUrl);
//   };

//   const closeImageModal = () => {
//     setSelectedImage(null);
//   };

//   const columns = [
//     // {
//     //   name: 'Title',
//     //   selector: row => row.title,
//     //   sortable: true,
//     // },
//     {
//       name: 'Price',
//       selector: row => `₦${row.price.toLocaleString()}`,
//       sortable: true,
//     },
//     {
//       name: 'Location',
//       selector: row => row.location,
//       sortable: true,
//     },
//     {
//       name: 'Status',
//       selector: row => row.status,
//       sortable: true,
//     },
//   ];

//   const customStyles = {
//     headRow: {
//       style: {
//         backgroundColor: '#007bff',
//         color: 'white',
//         fontWeight: 'bold',
//       },
//     },
//     rows: {
//       style: {
//         minHeight: '72px',
//         '&:nth-of-type(odd)': {
//           backgroundColor: '#f8f9fa',
//         },
//       },
//     },
//     cells: {
//       style: {
//         paddingLeft: '16px',
//         paddingRight: '16px',
//       },
//     },
//   };

//   const containerStyle = {
//     width: isSidebarVisible ? 'calc(97% - 240px)' : '90%',
//     transition: 'width 0.3s',
//     marginLeft: isSidebarVisible ? '260px' : '30px',
//     paddingLeft: isSidebarVisible ? '0px' : '20px',
//     marginTop: '100px',
//     overflowX: 'auto',
//     whiteSpace: 'nowrap',
//   };

//   return (
//     <div style={containerStyle} className="p-2 overflow-hidden">
//       <h2 className="text-2xl font-semibold mb-4">Properties List</h2>
//       <div className="table-responsive">
//         <DataTable
//           columns={columns}
//           data={properties}
//           pagination
//           highlightOnHover
//           responsive
//           customStyles={customStyles}
//           onRowClicked={handleRowClick}
//         />
//       </div>
      
//       {isModalOpen && selectedProperty && (
//         <div className={styles.modalOverlay}>
//           <div className={styles.modalContent}>
//             {selectedProperty.mainImageUrl && (
//               <img 
//                 src={selectedProperty.mainImageUrl} 
//                 alt={selectedProperty.title} 
//                 className={styles.addimg}
//               />
//             )}
//             <p><strong>Price:</strong> ₦{selectedProperty.price.toLocaleString()}</p>
//             <p><strong>Location:</strong> {selectedProperty.location}</p>
//             <p><strong>Status:</strong> {selectedProperty.status}</p>
//             <p><strong>Description:</strong> {selectedProperty.description}</p>
//             <p><strong>Property Type:</strong> {selectedProperty.propertyType}</p>
//             <p><strong>Beds:</strong> {selectedProperty.beds}</p>
//             <p><strong>Baths:</strong> {selectedProperty.baths}</p>
//             <p><strong>Listed By:</strong> {selectedProperty.userName}</p>
//             <p><strong>Listed On:</strong> {selectedProperty.createdAt}</p>
//             {selectedProperty.additionalImageUrls && selectedProperty.additionalImageUrls.length > 0 && (
//               <div className={styles.additionalImages}>
//                 {selectedProperty.additionalImageUrls.map((imageUrl, index) => (
//                   <img 
//                     key={index} 
//                     src={imageUrl} 
//                     alt={`Additional ${index + 1}`}
//                     onClick={() => handleImageClick(imageUrl)}
//                     className={styles.addmg}
//                   />
//                 ))}
//               </div>
//             )}
//             <button onClick={closeModal}>Close</button>
//           </div>
//         </div>
//       )}

//       {selectedImage && (
//         <div className={styles.imageModalOverlay} onClick={closeImageModal}>
//           <div className={styles.imageModalContent} onClick={e => e.stopPropagation()}>
//             <button className={styles.closeImageButton} onClick={closeImageModal}>×</button>
//             <img src={selectedImage} alt="Full size" className={styles.selimg} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default PropertyTracking;











import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../../config";
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import styles from './propertTracker.module.css';

function PropertyTracking({isSidebarVisible}) {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
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
              try {
                const userRef = doc(db, "users", data.user_id);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                  userName = userSnap.data().name || "Unknown";
                }
              } catch (error) {
                console.error("Error fetching user:", error);
              }
            }

            return {
              id: docSnap.id,
              title: data.title || "Untitled Property",
              price: data.price || 0,
              location: `${data.state || ""}, ${data.country || ""}`.replace(/^,\s*/, ''),
              status: data.sold ? "Sold" : "Available",
              description: data.description || "No description available",
              mainImageUrl: data.mainImageUrl || "",
              additionalImageUrls: data.additionalImageUrls || [],
              createdAt,
              userName,
              baths: data.baths || "N/A",
              beds: data.beds || "N/A",
              country: data.country || "N/A",
              state: data.state || "N/A",
              lga: data.lga || "N/A",
              land: data.land || "N/A",
              propertyType: data.propertyType || "N/A",
            };
          })
        );

        setProperties(propertyList);
        setFilteredProperties(propertyList);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Filter properties based on search and status
  useEffect(() => {
    let filtered = properties;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(property =>
        property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.propertyType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.userName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'All') {
      filtered = filtered.filter(property => property.status === statusFilter);
    }

    setFilteredProperties(filtered);
  }, [searchTerm, statusFilter, properties]);

  const handleRowClick = (row) => {
    setSelectedProperty(row);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `₦${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `₦${(price / 1000).toFixed(0)}K`;
    }
    return `₦${price.toLocaleString()}`;
  };

  const columns = [
    // {
    //   name: 'Title',
    //   selector: row => row.title,
    //   sortable: true,
    //   minWidth: '200px',
    //   wrap: true,
    //   omit: window.innerWidth < 640,
    // },
    {
      name: 'Price',
      selector: row => formatPrice(row.price),
      sortable: true,
      minWidth: '120px',
      right: true,
    },
    {
      name: 'Location',
      selector: row => row.location,
      sortable: true,
      minWidth: '150px',
      wrap: true,
      omit: window.innerWidth < 768,
    },
    {
      name: 'Type',
      selector: row => row.propertyType,
      sortable: true,
      minWidth: '120px',
      omit: window.innerWidth < 480,
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      minWidth: '100px',
      cell: row => (
        <span className={`${styles.statusBadge} ${
          row.status === 'Available' ? styles.statusAvailable : styles.statusSold
        }`}>
          {row.status}
        </span>
      ),
    },
    {
      name: 'Listed By',
      selector: row => row.userName,
      sortable: true,
      minWidth: '130px',
      omit: window.innerWidth < 992,
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: '#007bff',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '14px',
        minHeight: '50px',
      },
    },
    headCells: {
      style: {
        paddingLeft: '12px',
        paddingRight: '12px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      },
    },
    rows: {
      style: {
        minHeight: '60px',
        '&:nth-of-type(odd)': {
          backgroundColor: '#f8f9fa',
        },
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
      },
      highlightOnHoverStyle: {
        backgroundColor: '#e3f2fd',
        borderBottomColor: '#2196f3',
        outline: '1px solid #2196f3',
      },
    },
    cells: {
      style: {
        paddingLeft: '12px',
        paddingRight: '12px',
        fontSize: '13px',
      },
    },
    pagination: {
      style: {
        fontSize: '13px',
        minHeight: '56px',
        backgroundColor: '#f8f9fa',
        borderTop: '1px solid #dee2e6',
      },
    },
  };

  const containerStyle = {
    width: '100%',
    transition: 'all 0.3s ease',
    marginLeft: isSidebarVisible ? '0px' : '0px',
    paddingLeft: isSidebarVisible ? '20px' : '60px',
    paddingRight: '20px',
    marginTop: '100px',
    boxSizing: 'border-box',
  };

  const stats = {
    total: properties.length,
    available: properties.filter(p => p.status === 'Available').length,
    sold: properties.filter(p => p.status === 'Sold').length,
    totalValue: properties.reduce((sum, p) => sum + p.price, 0),
  };

  if (isLoading) {
    return (
      <div style={containerStyle} className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading properties...</p>
      </div>
    );
  }

  return (
    <div style={containerStyle} className={styles.responsiveContainer}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <h2 className={styles.pageTitle}>Properties Dashboard</h2>
        <p className={styles.pageSubtitle}>Manage and track all property listings</p>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsSection}>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{stats.total}</div>
            <div className={styles.statLabel}>Total Properties</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{stats.available}</div>
            <div className={styles.statLabel}>Available</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{stats.sold}</div>
            <div className={styles.statLabel}>Sold</div>
          </div>
          {/* <div className={styles.statCard}>
            <div className={styles.statValue}>
              ₦{(stats.totalValue / 1000000).toFixed(1)}M
            </div>
            <div className={styles.statLabel}>Total Value</div>
          </div> */}
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className={styles.searchSection}>
        <div className={styles.searchContainer}>
          <div className={styles.searchInputWrapper}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search properties, locations, or agents..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className={styles.filterWrapper}>
            <select
              className={styles.filterSelect}
              value={statusFilter}
              onChange={handleStatusFilterChange}
            >
              <option value="All">All Status</option>
              <option value="Available">Available</option>
              <option value="Sold">Sold</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Table Section */}
      <div className={styles.tableSection}>
        <DataTable
          columns={columns}
          data={filteredProperties}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[5, 10, 20, 50]}
          highlightOnHover
          responsive
          customStyles={customStyles}
          onRowClicked={handleRowClick}
          noDataComponent={
            <div className={styles.noData}>
              <p>No properties found matching your criteria</p>
            </div>
          }
          progressPending={isLoading}
          progressComponent={
            <div className={styles.loadingTable}>
              <div className={styles.spinner}></div>
            </div>
          }
        />
      </div>
      
      {/* Property Details Modal */}
      {isModalOpen && selectedProperty && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{selectedProperty.title}</h2>
              <button className={styles.modalCloseBtn} onClick={closeModal}>×</button>
            </div>

            {/* Modal Body */}
            <div className={styles.modalBody}>
              {/* Main Image */}
              {selectedProperty.mainImageUrl && (
                <div className={styles.mainImageContainer}>
                  <img 
                    src={selectedProperty.mainImageUrl} 
                    alt={selectedProperty.title} 
                    className={styles.mainImage}
                    onClick={() => handleImageClick(selectedProperty.mainImageUrl)}
                  />
                </div>
              )}

              {/* Property Details Grid */}
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Price:</span>
                  <span className={styles.detailValue}>₦{selectedProperty.price.toLocaleString()}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Status:</span>
                  <span className={`${styles.statusBadge} ${
                    selectedProperty.status === 'Available' ? styles.statusAvailable : styles.statusSold
                  }`}>
                    {selectedProperty.status}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Type:</span>
                  <span className={styles.detailValue}>{selectedProperty.propertyType}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Location:</span>
                  <span className={styles.detailValue}>{selectedProperty.location}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Bedrooms:</span>
                  <span className={styles.detailValue}>{selectedProperty.beds}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Bathrooms:</span>
                  <span className={styles.detailValue}>{selectedProperty.baths}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Listed By:</span>
                  <span className={styles.detailValue}>{selectedProperty.userName}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Listed On:</span>
                  <span className={styles.detailValue}>{selectedProperty.createdAt}</span>
                </div>
              </div>

              {/* Description */}
              <div className={styles.descriptionSection}>
                <h4 className={styles.sectionTitle}>Description</h4>
                <p className={styles.description}>{selectedProperty.description}</p>
              </div>

              {/* Additional Images */}
              {selectedProperty.additionalImageUrls && selectedProperty.additionalImageUrls.length > 0 && (
                <div className={styles.additionalImagesSection}>
                  <h4 className={styles.sectionTitle}>Additional Images</h4>
                  <div className={styles.additionalImages}>
                    {selectedProperty.additionalImageUrls.map((imageUrl, index) => (
                      <img 
                        key={index} 
                        src={imageUrl} 
                        alt={`Additional ${index + 1}`}
                        onClick={() => handleImageClick(imageUrl)}
                        className={styles.additionalImage}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className={styles.modalFooter}>
              <button className={styles.modalActionBtn} onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div className={styles.imageModalOverlay} onClick={closeImageModal}>
          <div className={styles.imageModalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.closeImageButton} onClick={closeImageModal}>×</button>
            <img src={selectedImage} alt="Full size" className={styles.fullSizeImage} />
          </div>
        </div>
      )}
    </div>
  );
}

export default PropertyTracking;