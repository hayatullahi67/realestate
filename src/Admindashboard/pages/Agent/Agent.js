import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../config';
import DataTable from 'react-data-table-component';
import styles from './Agent.module.css';

const Agent = ({ isSidebarVisible }) => {
    const [agents, setAgents] = useState([]);
    const [filteredAgents, setFilteredAgents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [isLoading, setIsLoading] = useState(true);
    const [totalProperties, setTotalProperties] = useState(0);

    useEffect(() => {
        const fetchAgents = async () => {
            setIsLoading(true);
            try {
                const agentsRef = collection(db, "users");
                const propertiesRef = collection(db, "properties");
                const [agentsSnapshot, propertiesSnapshot] = await Promise.all([
                    getDocs(agentsRef),
                    getDocs(propertiesRef)
                ]);
                
                // Create a map of user_id to property count
                const userPropertiesCount = {};
                propertiesSnapshot.forEach(doc => {
                    const propertyData = doc.data();
                    const userId = propertyData.user_id;
                    if (userId) {
                        userPropertiesCount[userId] = (userPropertiesCount[userId] || 0) + 1;
                    }
                });
                
                const agentList = agentsSnapshot.docs.map(docSnap => {
                    const data = docSnap.data();
                    const joinDate = data.joinDate?.toDate
                        ? data.joinDate.toDate().toLocaleDateString()
                        : data.createdAt?.toDate
                        ? data.createdAt.toDate().toLocaleDateString()
                        : "N/A";

                    // Get the actual count of properties for this user
                    const userPropertyCount = userPropertiesCount[docSnap.id] || 0;

                    return {
                        id: docSnap.id,
                        name: data.name || 'Unknown',
                        email: data.email || 'N/A',
                        phone: data.phoneNumber || 'N/A',
                        status: data.status || 'Active',
                        joinDate,
                        properties: userPropertyCount, // Use the actual count from properties collection
                        clients: data.clients || 0,
                        address: data.address || 'N/A',
                        profileImage: data.profileImage || '',
                        bio: data.bio || 'No bio available',
                        specialization: data.specialization || 'General Real Estate'
                    };
                });

                setAgents(agentList);
                setFilteredAgents(agentList);
                setTotalProperties(propertiesSnapshot.size);
            } catch (error) {
                console.error("Error fetching agents:", error);
            } finally {
                setIsLoading(false);
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
                agent.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                agent.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (statusFilter !== 'All') {
            filtered = filtered.filter(agent => 
                agent.status === statusFilter
            );
        }

        setFilteredAgents(filtered);
    }, [searchTerm, statusFilter, agents]);

    const handleRowClick = (row) => {
        setSelectedAgent(row);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedAgent(null);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleStatusFilterChange = (e) => {
        setStatusFilter(e.target.value);
    };

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            minWidth: '200px',
            wrap: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
            minWidth: '250px',
            wrap: true,
            omit: window.innerWidth < 768,
        },
        {
            name: 'Phone',
            selector: row => row.phone,
            sortable: true,
            minWidth: '150px',
            wrap: true,
            omit: window.innerWidth < 640,
        },
        {
            name: 'Properties',
            selector: row => row.properties,
            sortable: true,
            minWidth: '100px',
            right: true,
            omit: window.innerWidth < 480,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
            minWidth: '100px',
            cell: row => (
                <span className={`${styles.statusBadge} ${
                    row.status === 'Active' ? styles.statusActive : styles.statusInactive
                }`}>
                    {row.status}
                </span>
            ),
        },
        {
            name: 'Join Date',
            selector: row => row.joinDate,
            sortable: true,
            minWidth: '120px',
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
        paddingLeft: isSidebarVisible ? '20px' : '20px',
        paddingRight: '20px',
        marginTop: '100px',
        boxSizing: 'border-box',
    };

    const stats = {
        total: agents.length,
        active: agents.filter(a => a.status === 'Active').length,
        inactive: agents.filter(a => a.status === 'Inactive').length,
        totalProperties: totalProperties,
    };

    if (isLoading) {
        return (
            <div style={containerStyle} className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Loading agents...</p>
            </div>
        );
    }

    return (
        <div style={containerStyle} className={styles.responsiveContainer}>
            {/* Header Section */}
            <div className={styles.headerSection}>
                <h2 className={styles.pageTitle}>Agents Dashboard</h2>
                <p className={styles.pageSubtitle}>Manage and track all real estate agents</p>
            </div>

            {/* Stats Cards */}
            <div className={styles.statsSection}>
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>{stats.total}</div>
                        <div className={styles.statLabel}>Total Agents</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>{stats.active}</div>
                        <div className={styles.statLabel}>Active</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>{stats.inactive}</div>
                        <div className={styles.statLabel}>Inactive</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>{stats.totalProperties}</div>
                        <div className={styles.statLabel}>Total Properties</div>
                    </div>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className={styles.searchSection}>
                <div className={styles.searchContainer}>
                    <div className={styles.searchInputWrapper}>
                        <input
                            type="text"
                            className={styles.searchInput}
                            placeholder="Search agents, email, phone, or specialization..."
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
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Data Table Section */}
            <div className={styles.tableSection}>
                <DataTable
                    columns={columns}
                    data={filteredAgents}
                    pagination
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[5, 10, 20, 50]}
                    highlightOnHover
                    responsive
                    customStyles={customStyles}
                    onRowClicked={handleRowClick}
                    noDataComponent={
                        <div className={styles.noData}>
                            <p>No agents found matching your criteria</p>
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

            {/* Agent Details Modal */}
            {isModalOpen && selectedAgent && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        {/* Modal Header */}
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>{selectedAgent.name}</h2>
                            <button className={styles.modalCloseBtn} onClick={closeModal}>×</button>
                        </div>

                        {/* Modal Body */}
                        <div className={styles.modalBody}>
                            {/* Profile Image */}
                            {selectedAgent.profileImage && (
                                <div className={styles.mainImageContainer}>
                                    <img 
                                        src={selectedAgent.profileImage} 
                                        alt={selectedAgent.name} 
                                        className={styles.mainImage}
                                    />
                                </div>
                            )}

                            {/* Agent Details Grid */}
                            <div className={styles.detailsGrid}>
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>Name:</span>
                                    <span className={styles.detailValue}>{selectedAgent.name}</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>Status:</span>
                                    <span className={`${styles.statusBadge} ${
                                        selectedAgent.status === 'Active' ? styles.statusActive : styles.statusInactive
                                    }`}>
                                        {selectedAgent.status}
                                    </span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>Email:</span>
                                    <span className={styles.detailValue}>{selectedAgent.email}</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>Phone:</span>
                                    <span className={styles.detailValue}>{selectedAgent.phone}</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>Properties:</span>
                                    <span className={styles.detailValue}>{selectedAgent.properties}</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>Clients:</span>
                                    <span className={styles.detailValue}>{selectedAgent.clients}</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>Specialization:</span>
                                    <span className={styles.detailValue}>{selectedAgent.specialization}</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>Join Date:</span>
                                    <span className={styles.detailValue}>{selectedAgent.joinDate}</span>
                                </div>
                            </div>

                            {/* Bio Section */}
                            <div className={styles.descriptionSection}>
                                <h4 className={styles.sectionTitle}>Bio</h4>
                                <p className={styles.description}>{selectedAgent.bio}</p>
                            </div>

                            {/* Address Section */}
                            {selectedAgent.address && selectedAgent.address !== 'N/A' && (
                                <div className={styles.descriptionSection}>
                                    <h4 className={styles.sectionTitle}>Address</h4>
                                    <p className={styles.description}>{selectedAgent.address}</p>
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
        </div>
    );
};

export default Agent;