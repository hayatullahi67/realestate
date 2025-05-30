import React, { useState, useEffect } from 'react';
import { Chart as ChartJs, defaults } from 'chart.js/auto'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import { db } from '../../config';
import { doc , collection,getDocs , query,where} from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
defaults.maintainAspectRatio = false;

function Home({ isSidebarVisible }) {
  const [toggle, setToggle] = useState(1);
  const [sidebar, setSideBar] = useState(true);
  const toggletab = (index) => {
    setToggle(index)
  }
  const [totalProperties, setTotalProperties] = useState(0);
  const [soldProperties, setSoldProperties] = useState(0);
  const [rentProperties, setRentProperties] = useState(0);
  const [saleProperties, setSaleProperties] = useState(0);
  const [weeklyPropertyData, setWeeklyPropertyData] = useState({
    total: [0, 0, 0, 0, 0, 0, 0],
    sold: [0, 0, 0, 0, 0, 0, 0],
    rent: [0, 0, 0, 0, 0, 0, 0],
    sale: [0, 0, 0, 0, 0, 0, 0]
  });
  const [chartLabels, setChartLabels] = useState([]);
  const [users, setUsers] = useState([]); // State to store users

  // useEffect(() => {
  //   const fetchPropertyData = async () => {
  //     try {
  //       // Reference to the properties collection
  //       const propertiesRef = collection(db, "properties");

  //       // Fetch all properties
  //       const totalQuerySnapshot = await getDocs(propertiesRef);
  //       setTotalProperties(totalQuerySnapshot.size);

  //       // Fetch sold properties
  //       const soldQuery = query(propertiesRef, where("sold", "==", true));
  //       const soldQuerySnapshot = await getDocs(soldQuery);
  //       setSoldProperties(soldQuerySnapshot.size);

  //       // Fetch properties for rent
  //       const rentQuery = query(propertiesRef, where("propertyType", "==", "rent"));
  //       const rentQuerySnapshot = await getDocs(rentQuery);
  //       setRentProperties(rentQuerySnapshot.size);

  //       // Fetch properties for sale
  //       const saleQuery = query(propertiesRef, where("propertyType", "==", "buy"));
  //       const saleQuerySnapshot = await getDocs(saleQuery);
  //       setSaleProperties(saleQuerySnapshot.size);

  //       // Get today's date and calculate the start of the week
  //       const today = new Date();
  //       const dayOfWeek = today.getDay(); // 0 is Sunday, 1 is Monday, etc.
  //       const startOfWeek = new Date(today);
  //       startOfWeek.setDate(today.getDate() - dayOfWeek + 1); // Set to Monday
        
  //       // Generate labels for the last 7 days
  //       const labels = [];
  //       for (let i = 0; i < 7; i++) {
  //         const date = new Date(startOfWeek);
  //         date.setDate(startOfWeek.getDate() + i);
  //         labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
  //       }

  //       const weeklyData = {
  //         total: [0, 0, 0, 0, 0, 0, 0],
  //         sold: [0, 0, 0, 0, 0, 0, 0],
  //         rent: [0, 0, 0, 0, 0, 0, 0],
  //         sale: [0, 0, 0, 0, 0, 0, 0]
  //       };

  //       const allProperties = await getDocs(propertiesRef);
  //       allProperties.forEach((doc) => {
  //         const property = doc.data();
  //         const propertyDate = property.createdAt?.toDate() || new Date();
          
  //         if (propertyDate >= startOfWeek) {
  //           const dayIndex = Math.floor((propertyDate - startOfWeek) / (24 * 60 * 60 * 1000));
  //           if (dayIndex >= 0 && dayIndex < 7) {
  //             weeklyData.total[dayIndex]++;
  //             if (property.sold) weeklyData.sold[dayIndex]++;
  //             if (property.propertyType === "rent") weeklyData.rent[dayIndex]++;
  //             if (property.propertyType === "buy") weeklyData.sale[dayIndex]++;
  //           }
  //         }
  //       });

  //       setWeeklyPropertyData(weeklyData);
  //       setChartLabels(labels);
  //     } catch (error) {
  //       console.error("Error fetching property data: ", error);
  //     }
  //   };

  //   fetchPropertyData();
  // }, [totalProperties]);
  
  // const containerStyle = {
  //   width: isSidebarVisible ? 'calc(100% - 240px)' : '100%', // Adjust '250px' to your sidebar width
  //   transition: 'width 0.3s',
  //   marginLeft: isSidebarVisible ? '240px' : '0px',  
  //   marginTop:'100px'
  // };

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        console.log("Fetching property data..."); // Debug log
        
        // Reference to the properties collection
        const propertiesRef = collection(db, "properties");
  
        // Fetch all properties
        const totalQuerySnapshot = await getDocs(propertiesRef);
        const totalCount = totalQuerySnapshot.size;
        setTotalProperties(totalCount);
        console.log("Total properties:", totalCount); // Debug log
  
        // Fetch sold properties
        const soldQuery = query(propertiesRef, where("sold", "==", true));
        const soldQuerySnapshot = await getDocs(soldQuery);
        setSoldProperties(soldQuerySnapshot.size);
  
        // Fetch properties for rent
        const rentQuery = query(propertiesRef, where("propertyType", "==", "rent"));
        const rentQuerySnapshot = await getDocs(rentQuery);
        setRentProperties(rentQuerySnapshot.size);
  
        // Fetch properties for sale
        const saleQuery = query(propertiesRef, where("propertyType", "==", "buy"));
        const saleQuerySnapshot = await getDocs(saleQuery);
        setSaleProperties(saleQuerySnapshot.size);
  
        // Get today's date and calculate the start of the week (Monday)
        const today = new Date();
        const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const startOfWeek = new Date(today);
        
        // Calculate days to subtract to get to Monday
        const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        startOfWeek.setDate(today.getDate() - daysToSubtract);
        startOfWeek.setHours(0, 0, 0, 0); // Set to start of day
        
        console.log("Start of week:", startOfWeek); // Debug log
        
        // Generate labels for the current week (Mon-Sun)
        const labels = [];
        for (let i = 0; i < 7; i++) {
          const date = new Date(startOfWeek);
          date.setDate(startOfWeek.getDate() + i);
          labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
        }
        setChartLabels(labels);
  
        // Initialize weekly data arrays
        const weeklyData = {
          total: [0, 0, 0, 0, 0, 0, 0],
          sold: [0, 0, 0, 0, 0, 0, 0],
          rent: [0, 0, 0, 0, 0, 0, 0],
          sale: [0, 0, 0, 0, 0, 0, 0]
        };
  
        // Process all properties for weekly data
        const allProperties = await getDocs(propertiesRef);
        console.log("Processing", allProperties.size, "properties for weekly data"); // Debug log
        
        allProperties.forEach((doc) => {
          const property = doc.data();
          
          // Get property creation date
          let propertyDate;
          if (property.createdAt) {
            // Handle Firestore timestamp
            propertyDate = property.createdAt.toDate ? property.createdAt.toDate() : new Date(property.createdAt);
          } else {
            // Fallback to current date if no createdAt field
            propertyDate = new Date();
          }
          
          console.log("Property date:", propertyDate); // Debug log
          
          // Check if property was created this week
          if (propertyDate >= startOfWeek) {
            // Calculate which day of the week (0 = Monday, 6 = Sunday)
            const daysDiff = Math.floor((propertyDate - startOfWeek) / (24 * 60 * 60 * 1000));
            
            if (daysDiff >= 0 && daysDiff < 7) {
              console.log("Adding property to day", daysDiff); // Debug log
              
              // Add to total for that day
              weeklyData.total[daysDiff]++;
              
              // Add to specific categories
              if (property.sold === true) {
                weeklyData.sold[daysDiff]++;
              }
              if (property.propertyType === "rent") {
                weeklyData.rent[daysDiff]++;
              }
              if (property.propertyType === "buy") {
                weeklyData.sale[daysDiff]++;
              }
            }
          }
        });
  
        console.log("Weekly data:", weeklyData); // Debug log
        setWeeklyPropertyData(weeklyData);
        
      } catch (error) {
        console.error("Error fetching property data: ", error);
      }
    };
  
    fetchPropertyData();
  }, []); // Empty dependency array - only run once on mount
  
  
  // If you want the chart to update when you add new properties, 
  // you can create a separate function to refresh the data:
  
  const refreshData = async () => {
    // Same fetchPropertyData logic here
    // Call this function after adding a new property
  };
  
  // Or if you want to poll for updates every few seconds:
  useEffect(() => {
    const interval = setInterval(async () => {
      console.log("Polling for updates...");
      // Re-fetch data every 30 seconds
      const fetchPropertyData = async () => {
        // Same logic as above
      };
      await fetchPropertyData();
    }, 30000); // 30 seconds
  
    return () => clearInterval(interval);
  }, []);
  
  
  // Alternative: Use Firestore real-time listener (recommended)
  useEffect(() => {
    const propertiesRef = collection(db, "properties");

    // Set up real-time listener for properties (existing logic)
    const unsubscribeProperties = onSnapshot(propertiesRef, (snapshot) => {
      console.log("Properties changed, updating charts...");

      // Recalculate all your data here
      const totalCount = snapshot.size;
      setTotalProperties(totalCount);

      // Process the snapshot for weekly data
      const today = new Date();
      const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const startOfWeek = new Date(today);

      const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      startOfWeek.setDate(today.getDate() - daysToSubtract);
      startOfWeek.setHours(0, 0, 0, 0);

      const weeklyData = {
        total: [0, 0, 0, 0, 0, 0, 0],
        sold: [0, 0, 0, 0, 0, 0, 0],
        rent: [0, 0, 0, 0, 0, 0, 0],
        sale: [0, 0, 0, 0, 0, 0, 0]
      };

      snapshot.docs.forEach((doc) => {
        const property = doc.data();
        let propertyDate;
        if (property.createdAt) {
          propertyDate = property.createdAt.toDate ? property.createdAt.toDate() : new Date(property.createdAt);
        } else {
          propertyDate = new Date();
        }

        if (propertyDate >= startOfWeek) {
          const daysDiff = Math.floor((propertyDate - startOfWeek) / (24 * 60 * 60 * 1000));

          if (daysDiff >= 0 && daysDiff < 7) {
            weeklyData.total[daysDiff]++;
            if (property.sold === true) {
              weeklyData.sold[daysDiff]++;
            }
            if (property.propertyType === "rent") {
              weeklyData.rent[daysDiff]++;
            }
            if (property.propertyType === "buy") {
              weeklyData.sale[daysDiff]++;
            }
          }
        }
      });

      setWeeklyPropertyData(weeklyData);

      // Update other property counts from the same snapshot
      setSoldProperties(snapshot.docs.filter(doc => doc.data().sold === true).length);
      setRentProperties(snapshot.docs.filter(doc => doc.data().propertyType === "rent").length);
      setSaleProperties(snapshot.docs.filter(doc => doc.data().propertyType === "buy").length);
    });

    // Set up real-time listener for users
    const usersRef = collection(db, "users");
    const unsubscribeUsers = onSnapshot(usersRef, (snapshot) => {
      console.log("Users changed, updating list...");
      const usersList = snapshot.docs.map(doc => {
        const userData = doc.data();
        return {
          id: doc.id,
          name: userData.name || 'Unknown User', // Default name if missing
          profileImage: userData.profileImage || null, // Use null if missing
        };
      });
      setUsers(usersList);
    });

    // Cleanup listeners on component unmount
    return () => {
      unsubscribeProperties();
      unsubscribeUsers();
    };
  }, []); // Empty dependency array to run once on mount and clean up on unmount
  const containerStyle = {
    width: isSidebarVisible && window.innerWidth > 600 ? 'calc(100% - 240px)' : '100%',
    transition: 'width 0.3s',
    marginLeft: isSidebarVisible && window.innerWidth > 600 ? '240px' : '0px',
    marginTop: '100px',
  };
  


  const data = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [
      {
        label: 'Demo Chart',
        data: [28, 50, 36, 60, 38, 52, 38],
        fill: true, // fill area under the line
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // area fill color
        borderColor: 'rgb(75, 192, 192)', // line color
        tension: 0.3, // line curve
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: false, // hide x-axis
      },
      y: {
        display: false, // hide y-axis
      },
    },
    plugins: {
      legend: {
        display: false, // hide legend
      },
      tooltip: {
        enabled: true,// hide tooltip
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 10,
        bottom: 0,
      },

    },
    responsive: true,
    maintainAspectRatio: false,
  };


  return (
    <div className="content-wrapper" style={containerStyle}>
      <style>
        {`
          .admin-image-placeholder {
            width: 40px; /* Adjust size as needed */
            height: 40px; /* Adjust size as needed */
            border-radius: 50%;
            background-color: #007bff; /* Example blue background */
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 18px; /* Adjust font size as needed */
            font-weight: bold;
            margin-right: 10px; /* Space between image/placeholder and details */
          }
            .admin-image-placeholderi{
             width: 40px; /* Adjust size as needed */
            height: 40px; /* Adjust size as needed */
            border-radius: 50%;
            overflow:hidden;
            }

          .admin-li {
            display: flex;
            align-items: center; /* Vertically align items */
            margin-bottom: 10px; /* Space between list items */
            /* Add any other desired list item styles */
          }

          .admin-image {
             width: 40px; /* Match placeholder size */
             height: 40px; /* Match placeholder size */
             border-radius: 50% !important;
             margin-right: 10px; /* Space between image and details */
          }

          .adminac-details {
            flex-grow: 1; /* Allows details to take up remaining space */
            /* Add any other desired details container styles */
          }

           .admin-name {
            margin: 0; /* Remove default paragraph margin */
            font-weight: bold;
           }

           .activaty-text {
             margin: 0; /* Remove default paragraph margin */
             font-size: 0.9em;
             color: #666; /* Example muted color */
           }
        `}
      </style>
      <section className="dashboard-top-sec">
        <div className="container-fluid">
          
          <div className='row'>
            <div className={`col-lg-6 ${!isSidebarVisible ? 'col-lg-6' : 'lg-width'}`}>
              <div  className='bg-gray top-chart-earn '>
                  <div className='row '>
                       <div className={`col-lg-4 bg-white ${!isSidebarVisible ? 'card-width' : 'col-lg-4'}`}>
                        <div>
                          <h5> No: of All Properties </h5>
                          <p>{totalProperties}</p>
                        </div>
                       </div>


                       <div className={`col-lg-4 bg-white ${!isSidebarVisible ? 'card-width' : 'col-lg-4'}`}>
                        <div>
                          <h5>  Sold Properties </h5>
                          <p>{soldProperties}</p>
                        </div>
                       </div>



                       <div className={`col-lg-4 bg-white ${!isSidebarVisible ? 'card-width' : 'col-lg-4'}`}>
                        <div>
                          <h5>  Properties for Rent </h5>
                          <p>{rentProperties}</p>
                        </div>
                       </div>

                       <div className={`col-lg-4 bg-white ${!isSidebarVisible ? 'card-width' : 'col-lg-4'}`}>
                        <div>
                          <h5>  Properties for sale  </h5>
                          <p>{saleProperties}</p>
                        </div>
                       </div>
                  </div>
              </div>
              
            </div>
            <div className={`col-lg-6 ${!isSidebarVisible ? 'col-lg-6' : 'lg-width'} pt-4`}>
              
              <div className='bg-gray  top-chart-earn'>
              <div id="weekly-chart">
                                <Bar
                                  data={{
                                    labels: chartLabels,
                                    datasets: [
                                      {
                                        borderRadius: 10,
                                        backgroundColor: "#1a73e8",
                                        label: "Total Properties",
                                        data: weeklyPropertyData.total
                                      },
                                      {
                                        borderRadius: 10,
                                        backgroundColor: "#4285f4",
                                        label: 'Sold Properties',
                                        data: weeklyPropertyData.sold
                                      },
                                      {
                                        borderRadius: 10,
                                        backgroundColor: "#5f9cea",
                                        label: 'Rent Properties',
                                        data: weeklyPropertyData.rent
                                      },
                                      {
                                        borderRadius: 10,
                                        backgroundColor: "#8ab4f8",
                                        label: 'Sale Properties',
                                        data: weeklyPropertyData.sale
                                      }
                                    ]
                                  }}
                                  options={{
                                    responsive: true,
                                    plugins: {
                                      legend: {
                                        position: 'top',
                                      },
                                      title: {
                                        display: true,
                                        text: 'Weekly Property Statistics'
                                      }
                                    }
                                  }}
                                />
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======== */}
     

      {/* ========================= */}
      <section>
        <div className="all-admin my-5">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4 col-sm-6">
                <div className="admin-list">
                  <p className="admin-ac-title">All Admin</p>
                  <ul className="admin-ul">
                    {users.map(user => (
                      <li key={user.id} className="admin-li">
                        {user.profileImage ? (
                          <div className='admin-image-placeholderi'> <img src={user.profileImage} alt={user.name} className="admin-image" /> </div>
                        ) : (
                          <div className="admin-image-placeholder">
                            {user.name ? user.name.charAt(0).toUpperCase() : ''}
                          </div>
                        )}
                        <div className="adminac-details">
                          <div>
                            <p className="admin-name">{user.name}</p>
                            {/* Status removed as it's not in the current data schema */}
                          </div>
                          {/* Status indicator removed */}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* <div className="col-md-8 col-sm-6">
                <div className="admin-lst">
                  <div className="order-list">
                    <p className="admin-ac-title">Order Status</p>

                    <div className="data-table-section table-responsive">
                      <table id="example" className="table table-striped" style={{ width: "100%" }}>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Office</th>
                            <th>Age</th>
                            <th>Start date</th>
                            <th>Salary</th>
                          </tr>
                        </thead>
                        <tbody className="order-view-tb">
                          <tr className="odd">
                            <td>Tiger Nixon</td>
                            <td>System Architect</td>
                            <td>Edinburgh</td>
                            <td>61</td>
                            <td>2011-04-25</td>
                            <td>$320,800</td>
                          </tr>
                          <tr>
                            <td>Garrett Winters</td>
                            <td>Accountant</td>
                            <td>Tokyo</td>
                            <td>63</td>
                            <td>2011-07-25</td>
                            <td>$170,750</td>
                          </tr>
                          <tr className="odd">
                            <td>Ashton Cox</td>
                            <td>Junior Technical Author</td>
                            <td>San Francisco</td>
                            <td>66</td>
                            <td>2009-01-12</td>
                            <td>$86,000</td>
                          </tr>
                          <tr>
                            <td>Ashton Cox</td>
                            <td>Junior Technical Author</td>
                            <td>San Francisco</td>
                            <td>66</td>
                            <td>2009-01-12</td>
                            <td>$86,000</td>
                          </tr>
                          <tr className="odd">
                            <td>Ashton Cox</td>
                            <td>Junior Technical Author</td>
                            <td>San Francisco</td>
                            <td>66</td>
                            <td>2009-01-12</td>
                            <td>$86,000</td>
                          </tr>
                          <tr>
                            <td>Ashton Cox</td>
                            <td>Junior Technical Author</td>
                            <td>San Francisco</td>
                            <td>66</td>
                            <td>2009-01-12</td>
                            <td>$86,000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
