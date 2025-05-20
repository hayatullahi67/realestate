// import React, {useState} from 'react'
// import { BrowserRouter as Router,  Route ,Routes  } from 'react-router-dom'
// import Home from './pages/Home'
// import Users from './pages/Users'
// import Contact from './pages/Contact'
// import Header from './Components/Header'
// import './App.css'

// function Adminroute() {
//   const [isSidebarVisible, setIsSidebarVisible] = useState(true);

//   const toggleSidebar = () => {
//     setIsSidebarVisible(!isSidebarVisible);
//   };
//   return (
//     <div>
      
//         <Header toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible}/>
        
//         <switch>
//           <Routes>
//           <Route
//            path='/'
//             element={<Home isSidebarVisible={isSidebarVisible} />}
//           />
//           <Route path="/users" element={<Users />} />
//             <Route path='/contact' Component={Contact} />
                        

//           </Routes>
//           </switch>

      
//     </div>
//   )
// }

// export default Adminroute



import React, { useState , useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, UNSAFE_RouteContext } from 'react-router-dom';
import Home from './pages/Home';
import Users from './pages/Agent/Agent';
import Header from './Components/Header';
import PropertyTracking from './pages/PropertyTracker/PropertyTracker';

import './App.css';
import CheckUserActivity from '../checkUserActivity/CheckUserActivity'

function Adminroute() {
  
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  

  return (
    <div>
      
      {/* <Header toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />
      <Routes>
        <Route path="/" element={<Home isSidebarVisible={isSidebarVisible} />} />x
        <Route path="/users" element={<Users />} />
        
        <Route path="/contact" element={<Contact />} /> 
      </Routes> */}
       <Header toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />
      <Routes>
        <Route   path='/' element={<Home isSidebarVisible={isSidebarVisible} />} />
        <Route path="/agent" element={<Users isSidebarVisible={isSidebarVisible} />} />
        <Route path="/propertytracking" element={<PropertyTracking isSidebarVisible={isSidebarVisible} />} />
        
        
      </Routes>
      

    </div>
  );
}

export default Adminroute;

