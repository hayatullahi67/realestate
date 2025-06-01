import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../config';
import DataTable from 'react-data-table-component';
import styles from './Notification.module.css';

const Notification = ({ isSidebarVisible }) => {
    const [notifications, setNotifications] = useState([]);
    const [filteredNotifications, setFilteredNotifications] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            setIsLoading(true);
            try {
                const notificationsRef = collection(db, "notifications");
                const querySnapshot = await getDocs(notificationsRef);
                
                const notificationList = await Promise.all(
                    querySnapshot.docs.map(async (docSnap) => {
                        const data = docSnap.data();
                        const timestamp = data.timestamp?.toDate
                            ? data.timestamp.toDate().toLocaleDateString()
                            : "N/A";

                        // Fetch agent details
                        let agentName = "Unknown";
                        if (data.agentId) {
                            try {
                                const userRef = doc(db, "users", data.agentId);
                                const userSnap = await getDoc(userRef);
                                if (userSnap.exists()) {
                                    agentName = userSnap.data().name || "Unknown";
                                }
                            } catch (error) {
                                console.error("Error fetching agent:", error);
                            }
                        }

                        return {
                            id: docSnap.id,
                            agentId: data.agentId,
                            agentName,
                            clientDetails: data.clientDetails || {},
                            message: data.message,
                            notSerious: data.notSerious,
                            propertyId: data.propertId,
                            timestamp,
                            treated: data.treated
                        };
                    })
                );

                setNotifications(notificationList);
                setFilteredNotifications(notificationList);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    // Filter notifications based on search and status
    useEffect(() => {
        let filtered = notifications;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(notification =>
                notification.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                notification.clientDetails?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                notification.clientDetails?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                notification.agentName?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by status
        if (statusFilter !== 'All') {
            filtered = filtered.filter(notification => 
                statusFilter === 'Treated' ? notification.treated : !notification.treated
            );
        }

        setFilteredNotifications(filtered);
    }, [searchTerm, statusFilter, notifications]);

    const handleRowClick = (row) => {
        setSelectedNotification(row);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedNotification(null);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleStatusFilterChange = (e) => {
        setStatusFilter(e.target.value);
    };

    const columns = [
        {
            name: 'Client Name',
            selector: row => `${row.clientDetails.firstName} ${row.clientDetails.lastName}`,
            sortable: true,
            minWidth: '200px',
            wrap: true,
        },
        {
            name: 'Message',
            selector: row => row.message,
            sortable: true,
            minWidth: '250px',
            wrap: true,
        },
        {
            name: 'Agent',
            selector: row => row.agentName,
            sortable: true,
            minWidth: '150px',
            wrap: true,
        },
        {
            name: 'Date',
            selector: row => row.timestamp,
            sortable: true,
            minWidth: '120px',
        },
        {
            name: 'Status',
            selector: row => row.treated ? 'Treated' : 'Pending',
            sortable: true,
            minWidth: '100px',
            cell: row => (
                <span className={`${styles.statusBadge} ${
                    row.treated ? styles.statusTreated : styles.statusPending
                }`}>
                    {row.treated ? 'Treated' : 'Pending'}
                </span>
            ),
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
        total: notifications.length,
        treated: notifications.filter(n => n.treated).length,
        pending: notifications.filter(n => !n.treated).length,
    };

    if (isLoading) {
        return (
            <div style={containerStyle} className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Loading notifications...</p>
            </div>
        );
    }

    return (
        <div style={containerStyle} className={styles.responsiveContainer}>
            {/* Header Section */}
            <div className={styles.headerSection}>
                <h2 className={styles.pageTitle}>Notifications Dashboard</h2>
                <p className={styles.pageSubtitle}>Manage and track all client inquiries</p>
            </div>

            {/* Stats Cards */}
            <div className={styles.statsSection}>
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>{stats.total}</div>
                        <div className={styles.statLabel}>Total Notifications</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>{stats.treated}</div>
                        <div className={styles.statLabel}>Treated</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>{stats.pending}</div>
                        <div className={styles.statLabel}>Pending</div>
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
                            placeholder="Search notifications, clients, or agents..."
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
                            <option value="Treated">Treated</option>
                            <option value="Pending">Pending</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Data Table Section */}
            <div className={styles.tableSection}>
                <DataTable
                    columns={columns}
                    data={filteredNotifications}
                    pagination
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[5, 10, 20, 50]}
                    highlightOnHover
                    responsive
                    customStyles={customStyles}
                    onRowClicked={handleRowClick}
                    noDataComponent={
                        <div className={styles.noData}>
                            <p>No notifications found matching your criteria</p>
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

            {/* Notification Details Modal */}
            {isModalOpen && selectedNotification && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        {/* Modal Header */}
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>Notification Details</h2>
                            <button className={styles.modalCloseBtn} onClick={closeModal}>×</button>
                        </div>

                        {/* Modal Body */}
                        <div className={styles.modalBody}>
                            {/* Client Details */}
                            <div className={styles.detailsGrid}>
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>Client Name:</span>
                                    <span className={styles.detailValue}>
                                        {selectedNotification.clientDetails.firstName} {selectedNotification.clientDetails.lastName}
                                    </span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>Email:</span>
                                    <span className={styles.detailValue}>{selectedNotification.clientDetails.email}</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>Phone:</span>
                                    <span className={styles.detailValue}>{selectedNotification.clientDetails.phoneNumber}</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>Status:</span>
                                    <span className={`${styles.statusBadge} ${
                                        selectedNotification.treated ? styles.statusTreated : styles.statusPending
                                    }`}>
                                        {selectedNotification.treated ? 'Treated' : 'Pending'}
                                    </span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>Agent:</span>
                                    <span className={styles.detailValue}>{selectedNotification.agentName}</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>Date:</span>
                                    <span className={styles.detailValue}>{selectedNotification.timestamp}</span>
                                </div>
                            </div>

                            {/* Message Section */}
                            <div className={styles.descriptionSection}>
                                <h4 className={styles.sectionTitle}>Message</h4>
                                <p className={styles.description}>{selectedNotification.message}</p>
                            </div>

                            {/* Additional Info */}
                            <div className={styles.descriptionSection}>
                                <h4 className={styles.sectionTitle}>Additional Information</h4>
                                <p className={styles.description}>
                                    <strong>Not Serious:</strong> {selectedNotification.notSerious ? 'Yes' : 'No'}<br />
                                    <strong>Property ID:</strong> {selectedNotification.propertyId}
                                </p>
                            </div>
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

export default Notification; 