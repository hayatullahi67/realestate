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

    const containerStyle = {
        width: isSidebarVisible ? 'calc(95% - 240px)' : '100%',
        transition: 'width 0.3s',
        marginLeft: isSidebarVisible ? '0px' : '0px',
        paddingLeft: isSidebarVisible ? '0px' : '60px',
        marginTop: '100px',
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
            omit: window.innerWidth < 768,
        },
        {
            name: 'Phone',
            selector: row => row.phoneNumber,
            sortable: false,
            minWidth: '130px',
            wrap: true,
            omit: window.innerWidth < 640,
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
                <span className={`px-2 py-1 rounded-pill text-white ${row.status === 'Active' ? 'bg-success' : row.status === 'Inactive' ? 'bg-danger' : 'bg-secondary'}`}>
                    {row.status || 'N/A'}
                </span>
            ),
        },
        {
            name: 'Join Date',
            selector: row => row.createdAt,
            sortable: true,
            minWidth: '120px',
            omit: window.innerWidth < 480,
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

    return (
        <div style={containerStyle}>
            <section className="">
                <div>
                    <div className={`row gap-3 ${styles.bggray}`}>
                        <div className='col bg-white'>
                            <h5>Total Agent</h5>
                            <p>{totalUsers}</p>
                        </div>
                        
                        <div className='col bg-white'>
                            <h5>Active Agents</h5>
                            <p>{agents.filter(agent => agent.status === 'Active').length}</p>
                        </div>

                        <div className='col bg-white'>
                            <h5>InActive Agents</h5>
                            <p>{agents.filter(agent => agent.status === 'Inactive').length}</p>
                        </div>

                        <div className='col bg-white'>
                            <h5>New This Month</h5>
                            <p>{newUsersThisMonth}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={`pt-5 ${styles.sectionsearch}`}>
                <div className={`gap-3 align-items-center mb-3 ${styles.dflex}`}>
                    <div className="position-relative">
                        <input 
                            className="form-control ps-4" 
                            placeholder="Search agents..." 
                            style={{ width: "400px" }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="w-auto">
                        <select 
                            className={`px-4 ${styles.sel}`} 
                            style={{ width: "150px" }}
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option>All Agents</option>
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                    </div>
                </div>

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
                />
            </section>

            {isModalOpen && selectedAgent && (
                <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h2>Agent Details</h2>
                        <p><strong>Name:</strong> {selectedAgent.name}</p>
                        <p><strong>Email:</strong> {selectedAgent.email}</p>
                        <p><strong>Phone Number:</strong> {selectedAgent.phoneNumber}</p>
                        <p><strong>Properties:</strong> {selectedAgent.propertyCount}</p>
                        <p><strong>Joined Date:</strong> {selectedAgent.createdAt}</p>
                        <button onClick={() => setIsModalOpen(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Agent;