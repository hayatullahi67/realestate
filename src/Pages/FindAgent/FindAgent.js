import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config';
import classes from './FindAgent.module.css';
import profile from '../../Assets/Images/profile.png'

function FindAgent() {
  const [agents, setAgents] = useState([]); // State for storing agents data
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const itemsPerPage = 8;

  // Fetch agents from Firestore
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const agentsRef = collection(db, 'users'); // Adjust the collection name as per Firestore
        const querySnapshot = await getDocs(agentsRef);
        const agentList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAgents(agentList);
      } catch (error) {
        console.error('Error fetching agents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  // Filtered agents based on search term
  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

    // Calculate paginated agents
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAgents = filteredAgents.slice(indexOfFirstItem, indexOfLastItem);
  
    // Pagination handlers
    const totalPages = Math.ceil(filteredAgents.length / itemsPerPage);
  
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(prevPage => prevPage + 1);
      }
    };


    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(prevPage => prevPage - 1);
      }
    };
  if (loading) return <p>Loading agents...</p>;

  return (
    <div className={classes.pageBg}>
      <div className={classes.container}>
        <div className={classes.innerContainer}>
          {/* <nav className={classes.breadcrumb + ' pb-4'}>
            <ul className={classes.list}>
              <li>
                <Link to="/" className={classes.home}>Home</Link>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right" style={{ fontSize: '16px' }} />
              </li>
              <li>
                <span>Sales Agents</span>
              </li>
            </ul>
          </nav> */}

          <h1 className={classes.heading + " mb-3"}>Sales Agents</h1>
          <p className={classes.subtitle + " mb-4"}>Real Estate Sales Agents licensed by Engr Agbeniga Ambali Authority in Nigeria...</p>

          {/* Search Input */}
          <div className={classes.searchBarWrap}>
            <div className={classes.searchdiv}>
              <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                name="search"
                placeholder="Search agents..."
                className={classes.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className={classes.searchbtn} tabIndex={-1} disabled>
                Search
              </button>
            </div>
          </div>

          {/* Agent List */}
          <div className={classes.agentGrid}>
            {currentAgents.map(agent => (
              <div key={agent.id} className={classes.agentCard}>
                <div className={classes.imglist}>
                  <img src={agent.profileImage || profile} alt="Agent" />
                </div>
                <div className={classes.agentInfo}>
                  <h3 className={classes.agentName}>{agent.name}</h3>
                  <p className={classes.agentRole}>{agent.position || "Rental & Sales Executive"}</p>
                  <div className={classes.mobileInfo}>
                    <div>
                      <span className={classes.label}>Mobile</span>
                      <span>{agent.phoneNumber || "N/A"}</span>
                    </div>
                    <div>
                      <span className={classes.label}>Email</span>
                      <span>{agent.email || "N/A"}</span>
                    </div>
                  </div>
                  <div className={classes.listingLinkWrap}>
                    <Link to={`/view-listing/${agent.id}`} className={classes.listingLink}>View Listing</Link>
                  </div>
                </div>
              </div>
            ))}
            {filteredAgents.length === 0 && <p className={classes.noAgents}>No agents found matching your search.</p>}
          </div>

          <div className={classes.pagination}>
            <button 
              onClick={handlePrevPage} 
              disabled={currentPage === 1}
              className={classes.pageButton}
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button 
              onClick={handleNextPage} 
              disabled={currentPage === totalPages}
              className={classes.pageButton}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindAgent;
