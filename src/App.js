
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import routes from './index.js';
import Agentroute from './Agentroute/Agentroute.js';
import Adminroute from './Admindashboard/Adminroute.js';
import PrivateRoute from './Pages/PrivateRoute/PrivateRoute.js';
import PrivateAdmin from './Admindashboard/PrivateAdmin.js';
import CheckUserActivity from './checkUserActivity/CheckUserActivity.js';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // const [serch, setSearch] = useState("");
  
 

  return (
    <div className="App">
         <CheckUserActivity />
      
      
       <BrowserRouter>
       <Routes>
       {/* <Route  path="*" element={<Agentroute/>} /> */}

       {/* <Route path="/Adminroute" element={<Adminroute />} /> */}
       {/* <Route path="/Admin" element={<Adminroute/>}  /> */}
       {/* <Route path="/Admin" element={<PrivateAdmin element={Adminroute} />} /> */}
    
       <Route path="/admin/*" element={<Adminroute />} />
       <Route path="/*" element={<Agentroute />} />
       </Routes>
       </BrowserRouter>
        
       
    
    </div>
  );
}


export default App;



