// import React, { useEffect, useState } from 'react';
// import styles from './Agent.module.css';
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { db } from '../../../config';
// import DataTable from 'react-data-table-component';

// function Agent({ isSidebarVisible }) {
//     const [agents, setAgents] = useState([]);
//     const [totalUsers, setTotalUsers] = useState(0);
//     const [newUsersThisMonth, setNewUsersThisMonth] = useState(0);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedAgent, setSelectedAgent] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [statusFilter, setStatusFilter] = useState('All Agents');
//     const [filteredAgents, setFilteredAgents] = useState([]);

//     useEffect(() => {
//         const fetchAgents = async () => {
//             try {
//                 const agentsRef = collection(db, 'users');
//                 const querySnapshot = await getDocs(agentsRef);
//                 const agentList = querySnapshot.docs.map(doc => {
//                     const data = doc.data();
//                     return {
//                         id: doc.id,
//                         ...data,
//                         createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString() : 'N/A',
//                         propertyCount: 0,
//                     };
//                 });

//                 const updatedAgents = await Promise.all(
//                     agentList.map(async (agent) => {
//                         const propertiesRef = collection(db, 'properties');
//                         const propertyQuery = query(propertiesRef, where('user_id', '==', agent.id));
//                         const propertySnapshot = await getDocs(propertyQuery);
//                         return { ...agent, propertyCount: propertySnapshot.size };
//                     })
//                 );

//                 setAgents(updatedAgents);
//                 setFilteredAgents(updatedAgents);
//                 setTotalUsers(agentList.length);

//                 const currentMonth = new Date().getMonth();
//                 const currentYear = new Date().getFullYear();

//                 const newUsers = agentList.filter(agent => 
//                     agent.createdAt && 
//                     agent.createdAt.getMonth() === currentMonth &&
//                     agent.createdAt.getFullYear() === currentYear
//                 );
//                 setNewUsersThisMonth(newUsers.length);
//             } catch (error) {
//                 console.error('Error fetching agents:', error);
//             }
//         };

//         fetchAgents();
//     }, []);

//     useEffect(() => {
//         let filtered = agents;

//         if (searchTerm) {
//             filtered = filtered.filter(agent =>
//                 agent.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 agent.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 agent.phoneNumber?.includes(searchTerm)
//             );
//         }

//         if (statusFilter !== 'All Agents') {
//             filtered = filtered.filter(agent => agent.status === statusFilter);
//         }

//         setFilteredAgents(filtered);
//     }, [searchTerm, statusFilter, agents]);

//     const containerStyle = {
//         width: isSidebarVisible ? 'calc(95% - 240px)' : '100%',
//         transition: 'width 0.3s',
//         marginLeft: isSidebarVisible ? '0px' : '0px',
//         paddingLeft: isSidebarVisible ? '0px' : '60px',
//         marginTop: '100px',
//         '@media (max-width: 768px)': {
//             marginLeft: '0px',
//             paddingLeft: '15px',
//             paddingRight: '15px',
//             marginTop: '80px',
//         },
//         '@media (max-width: 480px)': {
//             paddingLeft: '10px',
//             paddingRight: '10px',
//             marginTop: '60px',
//         }
//     };

//     const columns = [
//         {
//             name: 'Name',
//             selector: row => row.name,
//             sortable: true,
//             minWidth: '150px',
//             wrap: true,
//         },
//         {
//             name: 'Email',
//             selector: row => row.email,
//             sortable: true,
//             minWidth: '200px',
//             wrap: true,
//             omit: window.innerWidth < 768,
//         },
//         {
//             name: 'Phone',
//             selector: row => row.phoneNumber,
//             sortable: false,
//             minWidth: '130px',
//             wrap: true,
//             omit: window.innerWidth < 640,
//         },
//         {
//             name: 'Properties',
//             selector: row => row.propertyCount,
//             sortable: true,
//             minWidth: '100px',
//             center: true,
//         },
//         {
//             name: 'Status',
//             selector: row => row.status,
//             sortable: true,
//             minWidth: '100px',
//             cell: row => (
//                 <span className={`px-2 py-1 rounded-pill text-white ${row.status === 'Active' ? 'bg-success' : row.status === 'Inactive' ? 'bg-danger' : 'bg-secondary'}`}>
//                     {row.status || 'N/A'}
//                 </span>
//             ),
//         },
//         {
//             name: 'Join Date',
//             selector: row => row.createdAt,
//             sortable: true,
//             minWidth: '120px',
//             omit: window.innerWidth < 480,
//         },
//     ];

//     const customStyles = {
//         headCells: {
//             style: {
//                 backgroundColor: '#007bff',
//                 color: 'white',
//                 fontWeight: 'bold',
//                 textTransform: 'uppercase',
//                 fontSize: '12px',
//                 padding: '12px 8px',
//                 '@media (max-width: 768px)': {
//                     fontSize: '11px',
//                     padding: '10px 6px',
//                 },
//             },
//         },
//         cells: {
//             style: {
//                 fontSize: '13px',
//                 padding: '12px 8px',
//                 '@media (max-width: 768px)': {
//                     fontSize: '12px',
//                     padding: '10px 6px',
//                 },
//             },
//         },
//         rows: {
//             highlightOnHoverStyle: {
//                 backgroundColor: '#f2f2f2',
//             },
//             stripedStyle: {
//                 backgroundColor: '#f9f9f9',
//             },
//         },
//         responsiveWrapper: {
//             style: {
//                 minHeight: '200px',
//             },
//         },
//     };

//     const handleRowClicked = (row) => {
//         setSelectedAgent(row);
//         setIsModalOpen(true);
//     };

//     return (
//         <div style={containerStyle}>
//             <section className="">
//                 <div>
//                     <div className={`row gap-3 ${styles.bggray}`}>
//                         <div className='col bg-white'>
//                             <h5>Total Agent</h5>
//                             <p>{totalUsers}</p>
//                         </div>
                        
//                         <div className='col bg-white'>
//                             <h5>Active Agents</h5>
//                             <p>{agents.filter(agent => agent.status === 'Active').length}</p>
//                         </div>

//                         <div className='col bg-white'>
//                             <h5>InActive Agents</h5>
//                             <p>{agents.filter(agent => agent.status === 'Inactive').length}</p>
//                         </div>

//                         <div className='col bg-white'>
//                             <h5>New This Month</h5>
//                             <p>{newUsersThisMonth}</p>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             <section className={`pt-5 ${styles.sectionsearch}`}>
//                 <div className={`gap-3 align-items-center mb-3 ${styles.dflex}`}>
//                     <div className="position-relative">
//                         <input 
//                             className="form-control ps-4" 
//                             placeholder="Search agents..." 
//                             style={{ width: "400px" }}
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                     </div>
//                     <div className="w-auto">
//                         <select 
//                             className={`px-4 ${styles.sel}`} 
//                             style={{ width: "150px" }}
//                             value={statusFilter}
//                             onChange={(e) => setStatusFilter(e.target.value)}
//                         >
//                             <option>All Agents</option>
//                             <option>Active</option>
//                             <option>Inactive</option>
//                         </select>
//                     </div>
//                 </div>

//                 <DataTable
//                     columns={columns}
//                     data={filteredAgents}
//                     customStyles={customStyles}
//                     pagination
//                     paginationPerPage={10}
//                     paginationRowsPerPageOptions={[5, 10, 20, 50]}
//                     highlightOnHover
//                     striped
//                     responsive
//                     dense
//                     onRowClicked={handleRowClicked}
//                 />
//             </section>

//             {isModalOpen && selectedAgent && (
//                 <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
//                     <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
//                         <h2>Agent Details</h2>
//                         <p><strong>Name:</strong> {selectedAgent.name}</p>
//                         <p><strong>Email:</strong> {selectedAgent.email}</p>
//                         <p><strong>Phone Number:</strong> {selectedAgent.phoneNumber}</p>
//                         <p><strong>Properties:</strong> {selectedAgent.propertyCount}</p>
//                         <p><strong>Joined Date:</strong> {selectedAgent.createdAt}</p>
//                         <button onClick={() => setIsModalOpen(false)}>Close</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Agent;



import React, { useEffect, useState } from 'react';
import styles from './Agent.module.css';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../config';
import DataTable from 'react-data-table-component';

function Agent({ isSidebarVisible }) {
    const [agents, setAgents] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [newUsersThisMonth, setNewUsersThisMonth] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Agents');
    const [filteredAgents, setFilteredAgents] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Track window width for responsive behavior
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

    useEffect(() => {
        let filtered = agents;

        if (searchTerm) {
            filtered = filtered.filter(agent =>
                agent.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                agent.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                agent.phoneNumber?.includes(searchTerm)
            );
        }

        if (statusFilter !== 'All Agents') {
            filtered = filtered.filter(agent => agent.status === statusFilter);
        }

        setFilteredAgents(filtered);
    }, [searchTerm, statusFilter, agents]);

    // Dynamic container styles based on screen size and sidebar
    const getContainerStyle = () => {
        const baseStyle = {
            transition: 'all 0.3s ease',
            padding: '15px',
            // minHeight: '100vh',
            // marginTop: '500px'
        };

        if (windowWidth <= 480) {
            return {
                ...baseStyle,
                width: '100%',
                marginLeft: '0',
                marginTop: '600px !important',
                padding: '8px',
            };
        } else if (windowWidth <= 768) {
            return {
                ...baseStyle,
                width: '100%',
                marginLeft: '0',
                marginTop: '80px',
                padding: '12px',
            };
        } else if (windowWidth <= 1024) {
            return {
                ...baseStyle,
                width: isSidebarVisible ? 'calc(100% - 250px)' : '100%',
                marginLeft: isSidebarVisible ? '0px' : '0',
                marginTop: '90px',
                paddingLeft: isSidebarVisible ? '20px' : '70px',
            };
        } else {
            return {
                ...baseStyle,
                width: isSidebarVisible ? 'calc(100% - 240px)' : '100%',
                marginLeft: isSidebarVisible ? '0px' : '0',
                marginTop: '100px',
                paddingLeft: isSidebarVisible ? '20px' : '60px',
            };
        }
    };

    // Responsive column configuration
    const getColumns = () => {
        const baseColumns = [
            {
                name: 'Name',
                selector: row => row.name || 'N/A',
                sortable: true,
                minWidth: windowWidth <= 480 ? '120px' : '150px',
                maxWidth: windowWidth <= 768 ? '180px' : '200px',
                wrap: true,
                cell: row => (
                    <div style={{ 
                        fontSize: windowWidth <= 480 ? '12px' : '13px',
                        fontWeight: '500',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        {row.name || 'N/A'}
                    </div>
                )
            },
            {
                name: 'Properties',
                selector: row => row.propertyCount,
                sortable: true,
                minWidth: '80px',
                maxWidth: '100px',
                center: true,
                cell: row => (
                    <span style={{ 
                        backgroundColor: '#e3f2fd',
                        color: '#1976d2',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: windowWidth <= 480 ? '11px' : '12px',
                        fontWeight: '600'
                    }}>
                        {row.propertyCount}
                    </span>
                )
            },
            {
                name: 'Status',
                selector: row => row.status,
                sortable: true,
                minWidth: windowWidth <= 480 ? '80px' : '100px',
                cell: row => (
                    <span style={{
                        padding: '4px 8px',
                        borderRadius: '12px',
                        color: 'white',
                        fontSize: windowWidth <= 480 ? '10px' : '11px',
                        fontWeight: '600',
                        backgroundColor: row.status === 'Active' ? '#4caf50' : 
                                       row.status === 'Inactive' ? '#f44336' : '#9e9e9e'
                    }}>
                        {row.status || 'N/A'}
                    </span>
                ),
            }
        ];

        // Add email column for larger screens
        if (windowWidth > 640) {
            baseColumns.splice(1, 0, {
                name: 'Email',
                selector: row => row.email || 'N/A',
                sortable: true,
                minWidth: windowWidth <= 768 ? '180px' : '220px',
                wrap: true,
                cell: row => (
                    <div style={{ 
                        fontSize: windowWidth <= 768 ? '11px' : '12px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        {row.email || 'N/A'}
                    </div>
                )
            });
        }

        // Add phone column for medium+ screens
        if (windowWidth > 768) {
            baseColumns.splice(-2, 0, {
                name: 'Phone',
                selector: row => row.phoneNumber || 'N/A',
                sortable: false,
                minWidth: '130px',
                wrap: true,
                cell: row => (
                    <div style={{ fontSize: '12px' }}>
                        {row.phoneNumber || 'N/A'}
                    </div>
                )
            });
        }

        // Add join date for large screens
        if (windowWidth > 1024) {
            baseColumns.push({
                name: 'Join Date',
                selector: row => row.createdAt,
                sortable: true,
                minWidth: '120px',
                cell: row => (
                    <div style={{ fontSize: '12px' }}>
                        {row.createdAt}
                    </div>
                )
            });
        }

        return baseColumns;
    };

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#1976d2',
                color: 'white',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                fontSize: windowWidth <= 480 ? '10px' : windowWidth <= 768 ? '11px' : '12px',
                padding: windowWidth <= 480 ? '8px 4px' : windowWidth <= 768 ? '10px 6px' : '12px 8px',
                minHeight: windowWidth <= 480 ? '40px' : '48px',
            },
        },
        cells: {
            style: {
                fontSize: windowWidth <= 480 ? '11px' : windowWidth <= 768 ? '12px' : '13px',
                padding: windowWidth <= 480 ? '8px 4px' : windowWidth <= 768 ? '10px 6px' : '12px 8px',
                minHeight: windowWidth <= 480 ? '45px' : '52px',
            },
        },
        rows: {
            highlightOnHoverStyle: {
                backgroundColor: '#f5f5f5',
                cursor: 'pointer',
            },
            stripedStyle: {
                backgroundColor: '#fafafa',
            },
        },
        pagination: {
            style: {
                fontSize: windowWidth <= 480 ? '12px' : '14px',
                padding: windowWidth <= 480 ? '8px' : '12px',
            },
        },
        responsiveWrapper: {
            style: {
                minHeight: '200px',
                overflowX: 'auto',
            },
        },
    };

    const handleRowClicked = (row) => {
        setSelectedAgent(row);
        setIsModalOpen(true);
    };

    return (
        <div style={getContainerStyle()}>
            {/* Stats Cards Section */}
            <section className={styles.statsSection}>
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>👥</div>
                        <div className={styles.statContent}>
                            <h3>{totalUsers}</h3>
                            <p>Total Agents</p>
                        </div>
                    </div>
                    
                    <div className={styles.statCard}>
                        <div className={styles.statIcon} style={{backgroundColor: '#4caf50'}}>✓</div>
                        <div className={styles.statContent}>
                            <h3>{agents.filter(agent => agent.status === 'Active').length}</h3>
                            <p>Active Agents</p>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statIcon} style={{backgroundColor: '#f44336'}}>✗</div>
                        <div className={styles.statContent}>
                            <h3>{agents.filter(agent => agent.status === 'Inactive').length}</h3>
                            <p>Inactive Agents</p>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statIcon} style={{backgroundColor: '#ff9800'}}>📅</div>
                        <div className={styles.statContent}>
                            <h3>{newUsersThisMonth}</h3>
                            <p>New This Month</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Search and Filter Section */}
            <section className={styles.searchSection}>
                <div className={styles.searchContainer}>
                    <div className={styles.searchInputWrapper}>
                        <input 
                            className={styles.searchInput}
                            placeholder="Search agents..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <span className={styles.searchIcon}>🔍</span>
                    </div>
                    
                    <div className={styles.filterWrapper}>
                        <select 
                            className={styles.filterSelect}
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option>All Agents</option>
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                    </div>
                </div>

                {/* Data Table */}
                <div className={styles.tableWrapper}>
                    <DataTable
                        columns={getColumns()}
                        data={filteredAgents}
                        customStyles={customStyles}
                        pagination
                        paginationPerPage={windowWidth <= 480 ? 5 : windowWidth <= 768 ? 8 : 10}
                        paginationRowsPerPageOptions={windowWidth <= 480 ? [5, 10] : [5, 10, 20, 50]}
                        highlightOnHover
                        striped
                        responsive
                        dense={windowWidth <= 768}
                        onRowClicked={handleRowClicked}
                        noDataComponent={
                            <div className={styles.noData}>
                                <p>No agents found</p>
                            </div>
                        }
                    />
                </div>
            </section>

            {/* Modal */}
            {isModalOpen && selectedAgent && (
                <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>Agent Details</h2>
                            <button 
                                className={styles.modalCloseX}
                                onClick={() => setIsModalOpen(false)}
                            >
                                ×
                            </button>
                        </div>
                        
                        <div className={styles.modalBody}>
                            <div className={styles.modalField}>
                                <strong>Name:</strong>
                                <span>{selectedAgent.name || 'N/A'}</span>
                            </div>
                            <div className={styles.modalField}>
                                <strong>Email:</strong>
                                <span>{selectedAgent.email || 'N/A'}</span>
                            </div>
                            <div className={styles.modalField}>
                                <strong>Phone:</strong>
                                <span>{selectedAgent.phoneNumber || 'N/A'}</span>
                            </div>
                            <div className={styles.modalField}>
                                <strong>Properties:</strong>
                                <span>{selectedAgent.propertyCount}</span>
                            </div>
                            <div className={styles.modalField}>
                                <strong>Status:</strong>
                                <span className={`${styles.statusBadge} ${
                                    selectedAgent.status === 'Active' ? styles.active : 
                                    selectedAgent.status === 'Inactive' ? styles.inactive : styles.unknown
                                }`}>
                                    {selectedAgent.status || 'N/A'}
                                </span>
                            </div>
                            <div className={styles.modalField}>
                                <strong>Join Date:</strong>
                                <span>{selectedAgent.createdAt}</span>
                            </div>
                        </div>
                        
                        <div className={styles.modalFooter}>
                            <button 
                                className={styles.modalCloseBtn}
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