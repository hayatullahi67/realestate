import React, { useEffect, useState } from 'react';
import styles from './Agent.module.css'
import { collection , getDocs ,query ,where } from 'firebase/firestore';
import { db } from '../../../config';

function Agent({isSidebarVisible}) {
    const [agents, setAgents] = useState([]); // State for storing agents data
    const [totalUsers, setTotalUsers] = useState(0);
    const [newUsersThisMonth, setNewUsersThisMonth] = useState(0);
  
  

    //  useEffect(() => {
    //     const fetchAgents = async () => {
    //       try {
    //         const agentsRef = collection(db, 'users'); // Adjust the collection name as per Firestore
    //         const querySnapshot = await getDocs(agentsRef);
    //         // const agentList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //         const agentList = querySnapshot.docs.map(doc => {
    //           const data = doc.data();
    //           return {
    //             id: doc.id,
    //             ...data,
    //             createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString() : 'N/A'
    //           };
    //         });
    //         setAgents(agentList);
    //       } catch (error) {
    //         console.error('Error fetching agents:', error);
    //       } 
    //     };
    
    //     fetchAgents();
    //   }, []);

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
              propertyCount: 0, // Initialize property count
            };
          });
  
          // Fetch property counts
          const updatedAgents = await Promise.all(
            agentList.map(async (agent) => {
              const propertiesRef = collection(db, 'properties');
              const propertyQuery = query(propertiesRef, where('user_id', '==', agent.id));
              const propertySnapshot = await getDocs(propertyQuery);
              
              return { ...agent, propertyCount: propertySnapshot.size };
            })
          );
  
          setAgents(updatedAgents);
          setTotalUsers(agentList.length);

          const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        // Filter users who signed up in the current month
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
  
             
  const containerStyle = {
    width: isSidebarVisible ? 'calc(95% - 240px)' : '100%', // Adjust '250px' to your sidebar width
    transition: 'width 0.3s',
    marginLeft: isSidebarVisible ? '270px' : '0px',  
    paddingLeft: isSidebarVisible ? '0px' : '60px' ,
    // marginRight:'0',
    marginTop:'100px'

    
    
  };

  return (
      <div style={containerStyle} >
               <section className="">
                      {/* <div className="container-fluid">
                        
                        <div className='row '>
                  
                          <div className='col-lg-5 lg-width  '>
                            <div  className='bg-gray top-chart-earn '>
                                <div className='row '>
                                     <div className='col bg-white'>
                                      <div>
                                        <h5> Total Agents</h5>
                                        <p></p>
                                      </div>
                                     </div>
              
              
                                     <div className='col bg-white'>
                                      <div>
                                        <h5>  Active Agents </h5>
                                        <p></p>
                                      </div>
                                     </div>
              
              
              
                                     <div className='col bg-white'>
                                      <div>
                                        <h5>  InActive Agents </h5>
                                        <p></p>
                                      </div>
                                     </div>
              
                                     <div className='col bg-white'>
                                      <div>
                                        <h5> New This Month</h5>
                                        <p></p>
                                      </div>
                                     </div>
                                </div>
                            </div>
                            
                          </div>
                          
                        </div>
                      </div> */}
                      
                      
                       <div >
                          <div className={`row  gap-3  ${styles.bggray}`}>
                            
                             <div className='col bg-white'>
                                <h5>Total Agent </h5>
                                
                                <p>{totalUsers}</p>
                             </div>
                             
                             <div className='col bg-white'>
                                <h5>Active Agents</h5>
                                
                                <p>1000</p>
                             </div>




                             <div className='col bg-white'>
                                <h5>InActive Agents </h5>
                                
                                <p>1000</p>
                             </div>



                             <div className='col bg-white'>
                                <h5>New This Month </h5>
                                
                                <p>{newUsersThisMonth}</p>
                             </div>

                          </div>
                       </div>
                    </section>


                    {/* <section className='ps-5 pt-5'>
                    <div className="d-flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
        
          <input 
            className="pl-10"
            placeholder="Search agents..."
          />
        </div>
        <div className="">
         
          <select className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50">
            <option>All Agents</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>
                    </section> */}
                    <section className={` pt-5  ${styles.sectionsearch}`}>
  {/* <div className="d-flex gap-3 mb">
    <div className="position-relative  ">
      <input 
        className="form-control ps-4" 
        placeholder="Search agents..." 
      />
    </div>
    <div className=''>
      <select className={`px-4    ${styles.sel}`}>
        <option>All Agents</option>
        <option>Active</option>
        <option>InActive</option>
      </select>
    </div>
  </div> */}

<div className={` gap-3 align-items-center mb-3  ${styles.dflex}`}>
  
  <div className="position-relative ">
    <input 
      className="form-control ps-4" 
      placeholder="Search agents..." 
      style={{ width: "400px" }} 
    />
  </div>
  <div className="w-auto">
    <select className={`px-4 ${styles.sel}`} style={{ width: "150px" }}>
      <option>All Agents</option>
      <option>Active</option>
      <option>Inactive</option>
    </select>
  </div>
</div>

  
  
  
 {/* <table className=' mt-5'>
 <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 font-medium">Name</th>
                  <th className="text-left py-2 px-4 font-medium">Email</th>
                  <th className="text-left py-2 px-4 font-medium">Phone</th>
                  <th className="text-left py-2 px-4 font-medium">No: Properties</th>
                  <th className="text-left py-2 px-4 font-medium">Status</th>
                  <th className="text-left py-2 px-4 font-medium">Join Date</th>
                  <th className="text-left py-2 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              
              <tbody>
                {agents.map((agent) => (
                  <tr key={agent.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">{agent.name}</td>
                    <td className="py-4 px-4">{agent.email}</td>
                    <td className="py-4 px-4">{agent.phoneNumber}</td>
                    <td className="py-4 px-4">{agent.propertyCount}</td>
                    
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        {agent.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">{agent.createdAt}</td>
                    <td className="py-4 px-4">
                      <button className="text-blue-600 hover:text-blue-700">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
 </table> */}



<table className="table mt-5">
  <thead>
    <tr className="border-bottom">
      <th className="text-start py-2 px-4 fw-medium">Name</th>
      <th className="text-start py-2 px-4 fw-medium">Email</th>
      <th className="text-start py-2 px-4 fw-medium">Phone</th>
      <th className="text-start py-2 px-4 fw-medium">No: Properties</th>
      <th className="text-start py-2 px-4 fw-medium">Status</th>
      <th className="text-start py-2 px-4 fw-medium">Join Date</th>
      <th className="text-start py-2 px-4 fw-medium">Actions</th>
    </tr>
  </thead>

  <tbody>
    {agents.map((agent) => (
      <tr key={agent.id} className="border-bottom table-hover">
        <td className="py-4 px-4">{agent.name}</td>
        <td className="py-4 px-4">{agent.email}</td>
        <td className="py-4 px-4">{agent.phoneNumber}</td>
        <td className="py-4 px-4">{agent.propertyCount}</td>

        <td className="py-4 px-4">
          <span className={`px-2 py-1 rounded-pill text-white `}>
            {agent.status}
          </span>
        </td>

        <td className="py-4 px-4">{agent.createdAt}</td>
        <td className="py-4 px-4">
          <button className="text-primary border-0 bg-transparent">View</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

</section>


    </div>
  )
}

export default Agent





