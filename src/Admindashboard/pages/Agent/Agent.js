// import React, { useEffect, useState } from 'react';
// import styles from './Agent.module.css'
// import { collection , getDocs ,query ,where } from 'firebase/firestore';
// import { db } from '../../../config';
// import DataTable from 'react-data-table-component';

// function Agent({isSidebarVisible}) {
//     const [agents, setAgents] = useState([]); // State for storing agents data
//     const [totalUsers, setTotalUsers] = useState(0);
//     const [newUsersThisMonth, setNewUsersThisMonth] = useState(0);
//     const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
//     const [selectedAgent, setSelectedAgent] = useState(null); // State for the selected agent's data
  
  

//     //  useEffect(() => {
//     //     const fetchAgents = async () => {
//     //       try {
//     //         const agentsRef = collection(db, 'users'); // Adjust the collection name as per Firestore
//     //         const querySnapshot = await getDocs(agentsRef);
//     //         // const agentList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     //         const agentList = querySnapshot.docs.map(doc => {
//     //           const data = doc.data();
//     //           return {
//     //             id: doc.id,
//     //             ...data,
//     //             createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString() : 'N/A'
//     //           };
//     //         });
//     //         setAgents(agentList);
//     //       } catch (error) {
//     //         console.error('Error fetching agents:', error);
//     //       } 
//     //     };
    
//     //     fetchAgents();
//     //   }, []);

//     useEffect(() => {
//       const fetchAgents = async () => {
//         try {
//           const agentsRef = collection(db, 'users');
//           const querySnapshot = await getDocs(agentsRef);
//           const agentList = querySnapshot.docs.map(doc => {
//             const data = doc.data();
//             return {
//               id: doc.id,
//               ...data,
//               createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString() : 'N/A',
//               propertyCount: 0, // Initialize property count
//             };
//           });
  
//           // Fetch property counts
//           const updatedAgents = await Promise.all(
//             agentList.map(async (agent) => {
//               const propertiesRef = collection(db, 'properties');
//               const propertyQuery = query(propertiesRef, where('user_id', '==', agent.id));
//               const propertySnapshot = await getDocs(propertyQuery);
              
//               return { ...agent, propertyCount: propertySnapshot.size };
//             })
//           );
  
//           setAgents(updatedAgents);
//           setTotalUsers(agentList.length);

//           const currentMonth = new Date().getMonth();
//         const currentYear = new Date().getFullYear();

//         // Filter users who signed up in the current month
//         const newUsers = agentList.filter(agent => 
//           agent.createdAt && 
//           agent.createdAt.getMonth() === currentMonth &&
//           agent.createdAt.getFullYear() === currentYear
//         );
//         setNewUsersThisMonth(newUsers.length);
//         } catch (error) {
//           console.error('Error fetching agents:', error);
//         }
//       };
  
//       fetchAgents();
//     }, []);
  
             
//   const containerStyle = {
//     width: isSidebarVisible ? 'calc(95% - 240px)' : '100%', // Adjust '250px' to your sidebar width
//     transition: 'width 0.3s',
//     marginLeft: isSidebarVisible ? '270px' : '0px',  
//     paddingLeft: isSidebarVisible ? '0px' : '60px' ,
//     // marginRight:'0',
//     marginTop:'100px'

    
    
//   };

//   const columns = [
//     {
//       name: 'Name',
//       selector: row => row.name,
//       sortable: true,
//     },
//     {
//       name: 'Email',
//       selector: row => row.email,
//       sortable: true,
//     },
//     {
//       name: 'Phone',
//       selector: row => row.phoneNumber,
//       sortable: false,
//     },
//     {
//       name: 'No: Properties',
//       selector: row => row.propertyCount,
//       sortable: true,
//     },
//     {
//       name: 'Status',
//       selector: row => row.status,
//       sortable: true,
//       cell: row => (
//         <span className={`px-2 py-1 rounded-pill text-white ${row.status === 'Active' ? 'bg-success' : row.status === 'Inactive' ? 'bg-danger' : 'bg-secondary'}`}>
//           {row.status || 'N/A'}
//         </span>
//       ),
//     },
//     {
//       name: 'Join Date',
//       selector: row => row.createdAt,
//       sortable: true,
//     },
//   ];

//   const customStyles = {
//     headCells: {
//       style: {
//         backgroundColor: '#007bff', // Blue header background
//         color: 'white', // White header text
//         fontWeight: 'bold',
//         textTransform: 'uppercase',
//         fontSize: '14px',
//       },
//     },
//     cells: {
//       style: {
//         fontSize: '14px',
//       },
//     },
//     rows: {
//       highlightOnHoverStyle: {
//         backgroundColor: '#f2f2f2', // Light grey hover
//       },
//       stripedStyle: {
//         backgroundColor: '#f9f9f9', // Alternate row color
//       },
//     },
//     pagination: {
//       style: {
//         // Add pagination styles if needed
//       },
//     },
//   };

//   const handleRowClicked = (row) => {
//     setSelectedAgent(row);
//     setIsModalOpen(true);
//   };

//   return (
//       <div style={containerStyle} >
//                <section className="">
//                       {/* <div className="container-fluid">
                        
//                         <div className='row '>
                  
//                           <div className='col-lg-5 lg-width  '>
//                             <div  className='bg-gray top-chart-earn '>
//                                 <div className='row '>
//                                      <div className='col bg-white'>
//                                       <div>
//                                         <h5> Total Agents</h5>
//                                         <p></p>
//                                       </div>
//                                      </div>
              
              
//                                      <div className='col bg-white'>
//                                       <div>
//                                         <h5>  Active Agents </h5>
//                                         <p></p>
//                                       </div>
//                                      </div>
              
              
              
//                                      <div className='col bg-white'>
//                                       <div>
//                                         <h5>  InActive Agents </h5>
//                                         <p></p>
//                                       </div>
//                                      </div>
              
//                                      <div className='col bg-white'>
//                                       <div>
//                                         <h5> New This Month</h5>
//                                         <p></p>
//                                       </div>
//                                      </div>
//                                 </div>
//                             </div>
                            
//                           </div>
                          
//                         </div>
//                       </div> */}
                      
                      
//                        <div >
//                           <div className={`row  gap-3  ${styles.bggray}`}>
                            
//                              <div className='col bg-white'>
//                                 <h5>Total Agent </h5>
                                
//                                 <p>{totalUsers}</p>
//                              </div>
                             
//                              <div className='col bg-white'>
//                                 <h5>Active Agents</h5>
                                
//                                 <p>1000</p>
//                              </div>




//                              <div className='col bg-white'>
//                                 <h5>InActive Agents </h5>
                                
//                                 <p>1000</p>
//                              </div>



//                              <div className='col bg-white'>
//                                 <h5>New This Month </h5>
                                
//                                 <p>{newUsersThisMonth}</p>
//                              </div>

//                           </div>
//                        </div>
//                     </section>


//                     {/* <section className='ps-5 pt-5'>
//                     <div className="d-flex flex-col md:flex-row gap-4 mb-6">
//         <div className="relative flex-grow">
        
//           <input 
//             className="pl-10"
//             placeholder="Search agents..."
//           />
//         </div>
//         <div className="">
         
//           <select className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50">
//             <option>All Agents</option>
//             <option>Active</option>
//             <option>Inactive</option>
//           </select>
//         </div>
//       </div>
//                     </section> */}
//                     <section className={` pt-5  ${styles.sectionsearch}`}>
//   {/* <div className="d-flex gap-3 mb">
//     <div className="position-relative  ">
//       <input 
//         className="form-control ps-4" 
//         placeholder="Search agents..." 
//       />
//     </div>
//     <div className=''>
//       <select className={`px-4    ${styles.sel}`}>
//         <option>All Agents</option>
//         <option>Active</option>
//         <option>InActive</option>
//       </select>
//     </div>
//   </div> */}

// <div className={` gap-3 align-items-center mb-3  ${styles.dflex}`}>
  
//   <div className="position-relative ">
//     <input 
//       className="form-control ps-4" 
//       placeholder="Search agents..." 
//       style={{ width: "400px" }} 
//     />
//   </div>
//   <div className="w-auto">
//     <select className={`px-4 ${styles.sel}`} style={{ width: "150px" }}>
//       <option>All Agents</option>
//       <option>Active</option>
//       <option>Inactive</option>
//     </select>
//   </div>
// </div>

  
  
  
//  {/* <table className=' mt-5'>
//  <thead>
//                 <tr className="border-b">
//                   <th className="text-left py-2 px-4 font-medium">Name</th>
//                   <th className="text-left py-2 px-4 font-medium">Email</th>
//                   <th className="text-left py-2 px-4 font-medium">Phone</th>
//                   <th className="text-left py-2 px-4 font-medium">No: Properties</th>
//                   <th className="text-left py-2 px-4 font-medium">Status</th>
//                   <th className="text-left py-2 px-4 font-medium">Join Date</th>
//                   <th className="text-left py-2 px-4 font-medium">Actions</th>
//                 </tr>
//               </thead>
              
//               <tbody>
//                 {agents.map((agent) => (
//                   <tr key={agent.id} className="border-b hover:bg-gray-50">
//                     <td className="py-4 px-4">{agent.name}</td>
//                     <td className="py-4 px-4">{agent.email}</td>
//                     <td className="py-4 px-4">{agent.phoneNumber}</td>
//                     <td className="py-4 px-4">{agent.propertyCount}</td>
                    
//                     <td className="py-4 px-4">
//                       <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
//                         {agent.status}
//                       </span>
//                     </td>
//                     <td className="py-4 px-4">{agent.createdAt}</td>
//                     <td className="py-4 px-4">
//                       <button className="text-blue-600 hover:text-blue-700">View</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//  </table> */}



// <DataTable
//   columns={columns}
//   data={agents}
//   customStyles={customStyles}
//   pagination
//   highlightOnHover
//   striped
//   responsive
//   dense
//   onRowClicked={handleRowClicked}
// />

// {/* Agent Details Modal */}
// {isModalOpen && selectedAgent && (
//   <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
//     <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
//       <h2>Agent Details</h2>
//       <p><strong>Name:</strong> {selectedAgent.name}</p>
//       <p><strong>Email:</strong> {selectedAgent.email}</p>
//       <p><strong>Phone Number:</strong> {selectedAgent.phoneNumber}</p>
//       <p><strong>Properties:</strong> {selectedAgent.propertyCount}</p>
//       <p><strong>Joined Date:</strong> {selectedAgent.createdAt}</p>
//       <button onClick={() => setIsModalOpen(false)}>Close</button>
//     </div>
//   </div>
// )}

// </section>


//     </div>
//   )
// }

// export default Agent







import React, { useEffect, useState } from 'react';
import styles from './Agnt.module.css'
import { collection , getDocs ,query ,where } from 'firebase/firestore';
import { db } from '../../../config';
import DataTable from 'react-data-table-component';

function Agent({isSidebarVisible}) {
    const [agents, setAgents] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [newUsersThisMonth, setNewUsersThisMonth] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Agents');
    const [filteredAgents, setFilteredAgents] = useState([]);

    useEffect(() => {
      const fetchAgents = async () => {
        try {
          const agentsRef = collection(db, 'users');
          const querySnapshot = await getDocs(agentsRef);
          const agentList = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString() : 'N/A',
              propertyCount: 0,
            };
          });

          const updatedAgents = await Promise.all(
            agentList.map(async (agent) => {
              const propertiesRef = collection(db, 'properties');
              const propertyQuery = query(propertiesRef, where('user_id', '==', agent.id));
              const propertySnapshot = await getDocs(propertyQuery);
              
              return { ...agent, propertyCount: propertySnapshot.size };
            })
          );

          setAgents(updatedAgents);
          setFilteredAgents(updatedAgents);
          setTotalUsers(agentList.length);

          const currentMonth = new Date().getMonth();
          const currentYear = new Date().getFullYear();

          const newUsers = agentList.filter(agent => 
            agent.createdAt && 
            agent.createdAt.getMonth() === currentMonth &&
            agent.createdAt.getFullYear() === currentYear
          );
          setNewUsersThisMonth(newUsers.length);
        } catch (error) {
          console.error('Error fetching agents:', error);
        }
      };

      fetchAgents();
    }, []);

    // Filter agents based on search and status
    useEffect(() => {
      let filtered = agents;

      // Filter by search term
      if (searchTerm) {
        filtered = filtered.filter(agent =>
          agent.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          agent.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          agent.phoneNumber?.includes(searchTerm)
        );
      }

      // Filter by status
      if (statusFilter !== 'All Agents') {
        filtered = filtered.filter(agent => agent.status === statusFilter);
      }

      setFilteredAgents(filtered);
    }, [searchTerm, statusFilter, agents]);

    const containerStyle = {
      width: '100%',
      transition: 'all 0.3s ease',
      marginLeft: isSidebarVisible ? '0px' : '0px',
      paddingLeft: isSidebarVisible ? '20px' : '60px',
      paddingRight: '20px',
      marginTop: '100px',
      // Responsive adjustments
      // '@media (max-width: 1024px)': {
      //   marginLeft: isSidebarVisible ? '250px' : '0px',
      //   paddingLeft: isSidebarVisible ? '15px' : '40px',
      // },
      '@media (max-width: 768px)': {
        marginLeft: '0px',
        paddingLeft: '15px',
        paddingRight: '15px',
        marginTop: '80px',
      },
      '@media (max-width: 480px)': {
        paddingLeft: '10px',
        paddingRight: '10px',
        marginTop: '60px',
      }
    };

    const columns = [
      {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
        minWidth: '150px',
        wrap: true,
      },
      {
        name: 'Email',
        selector: row => row.email,
        sortable: true,
        minWidth: '200px',
        wrap: true,
        omit: window.innerWidth < 768, // Hide on mobile
      },
      {
        name: 'Phone',
        selector: row => row.phoneNumber,
        sortable: false,
        minWidth: '130px',
        wrap: true,
        omit: window.innerWidth < 640, // Hide on small screens
      },
      {
        name: 'Properties',
        selector: row => row.propertyCount,
        sortable: true,
        minWidth: '100px',
        center: true,
      },
      {
        name: 'Status',
        selector: row => row.status,
        sortable: true,
        minWidth: '100px',
        cell: row => (
          <span className={`${styles.statusBadge} ${
            row.status === 'Active' ? styles.statusActive : 
            row.status === 'Inactive' ? styles.statusInactive : 
            styles.statusDefault
          }`}>
            {row.status || 'N/A'}
          </span>
        ),
      },
      {
        name: 'Join Date',
        selector: row => row.createdAt,
        sortable: true,
        minWidth: '120px',
        omit: window.innerWidth < 480, // Hide on very small screens
      },
    ];

    const customStyles = {
      headCells: {
        style: {
          backgroundColor: '#007bff',
          color: 'white',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          fontSize: '12px',
          padding: '12px 8px',
          '@media (max-width: 768px)': {
            fontSize: '11px',
            padding: '10px 6px',
          },
        },
      },
      cells: {
        style: {
          fontSize: '13px',
          padding: '12px 8px',
          '@media (max-width: 768px)': {
            fontSize: '12px',
            padding: '10px 6px',
          },
        },
      },
      rows: {
        highlightOnHoverStyle: {
          backgroundColor: '#f2f2f2',
        },
        stripedStyle: {
          backgroundColor: '#f9f9f9',
        },
      },
      responsiveWrapper: {
        style: {
          minHeight: '200px',
        },
      },
    };

    const handleRowClicked = (row) => {
      setSelectedAgent(row);
      setIsModalOpen(true);
    };

    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };

    const handleStatusFilterChange = (e) => {
      setStatusFilter(e.target.value);
    };

    return (
      <div style={containerStyle} className={styles.responsiveContainer}>
        {/* Stats Cards Section */}
        <section className={styles.statsSection}>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <h5 className={styles.statTitle}>Total Agents</h5>
              <p className={styles.statValue}>{totalUsers}</p>
            </div>
            
            <div className={styles.statCard}>
              <h5 className={styles.statTitle}>Active Agents</h5>
              <p className={styles.statValue}>
                {agents.filter(agent => agent.status === 'Active').length}
              </p>
            </div>

            <div className={styles.statCard}>
              <h5 className={styles.statTitle}>Inactive Agents</h5>
              <p className={styles.statValue}>
                {agents.filter(agent => agent.status === 'Inactive').length}
              </p>
            </div>

            <div className={styles.statCard}>
              <h5 className={styles.statTitle}>New This Month</h5>
              <p className={styles.statValue}>{newUsersThisMonth}</p>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className={styles.searchSection}>
          <div className={styles.searchContainer}>
            <div className={styles.searchInputWrapper}>
              <input 
                type="text"
                className={styles.searchInput}
                placeholder="Search agents..." 
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
                <option>All Agents</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </section>

        {/* Data Table Section */}
        <section className={styles.tableSection}>
          <DataTable
            columns={columns}
            data={filteredAgents}
            customStyles={customStyles}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[5, 10, 20, 50]}
            highlightOnHover
            striped
            responsive
            dense
            onRowClicked={handleRowClicked}
            noDataComponent={
              <div className={styles.noData}>
                No agents found matching your criteria
              </div>
            }
          />
        </section>

        {/* Agent Details Modal */}
        {isModalOpen && selectedAgent && (
          <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>Agent Details</h2>
                <button 
                  className={styles.modalCloseBtn}
                  onClick={() => setIsModalOpen(false)}
                >
                  ×
                </button>
              </div>
              
              <div className={styles.modalBody}>
                <div className={styles.modalField}>
                  <strong>Name:</strong> {selectedAgent.name}
                </div>
                <div className={styles.modalField}>
                  <strong>Email:</strong> {selectedAgent.email}
                </div>
                <div className={styles.modalField}>
                  <strong>Phone:</strong> {selectedAgent.phoneNumber}
                </div>
                <div className={styles.modalField}>
                  <strong>Properties:</strong> {selectedAgent.propertyCount}
                </div>
                <div className={styles.modalField}>
                  <strong>Status:</strong> 
                  <span className={`${styles.statusBadge} ${styles.modalStatusBadge} ${
                    selectedAgent.status === 'Active' ? styles.statusActive : 
                    selectedAgent.status === 'Inactive' ? styles.statusInactive : 
                    styles.statusDefault
                  }`}>
                    {selectedAgent.status || 'N/A'}
                  </span>
                </div>
                <div className={styles.modalField}>
                  <strong>Joined:</strong> {selectedAgent.createdAt}
                </div>
              </div>
              
              <div className={styles.modalFooter}>
                <button 
                  className={styles.modalActionBtn}
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}

export default Agent;