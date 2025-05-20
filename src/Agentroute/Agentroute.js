
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../App.css';
import Header from '../Components/Header/Header';
import Home from '../Pages/Home/Home';
import SignUp from '../Pages/SignUp/SignUp';
import LogIn from '../Pages/LogIn/LogIn';
import Buy from '../Pages/Buy/Buy';
import Rent from '../Pages/Rent/Rent';
import Footer from '../Components/Footer/Footer';
import Favorites from '../Pages/Favorites/Favorites';
import Profile from '../Pages/Profile/Profile';
import Settings from '../Pages/Settings/Settings';
import Notifications from '../Pages/Notifications/Notifications';
import Property from '../Components/property/property';
import Addproperty from '../Components/addproperty/addproperty'
import PrivateRoute from '../Pages/PrivateRoute/PrivateRoute'
import Properties from '../Components/Properties/Properties';
import AdditionalProperties from '../Components/Properties/additionalproperties';
import Find from '../Components/Find/Find';
import FindAgent from '../Pages/FindAgent/FindAgent';
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewListing from '../Pages/FindAgent/ViewListing';
function Agentroute() {
  // const [serch, setSearch] = useState("");
  
  

  return (
    <div className="App">
      
      {/* <BrowserRouter> */}
        <Header />
        <div>
          <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/rent" element={<Rent />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<PrivateRoute element={Profile} />} />
             
            <Route path="/settings" element={<Settings />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path='/find-agent' element={<FindAgent />} />
            <Route path='/view-listing/:agentId' element={<ViewListing />} />
            <Route path="/property" element={<PrivateRoute element={Property} />} />
            <Route path="/addproperty" element={<PrivateRoute element={Addproperty} />} />
            {/* <Route path="/property/:propertyId/images" element={<PrivateRoute element={AdditionalImages} />} /> */}

            
            {/* <Route path="/find"  element={<Find  serch={serch} />}  />
            <Route path="/properties" element={<Properties  setSearch={setSearch} />}  /> */}
            <Route path="/find" element={<Find   />} />
            <Route path="/properties" element={<Properties   />} />
            <Route path="/view-details/:propertyId" element={<AdditionalProperties />} />
          </Routes>
        </div>
        <Footer />
      {/* </BrowserRouter> */}
    </div>
  );
}

export default Agentroute;
