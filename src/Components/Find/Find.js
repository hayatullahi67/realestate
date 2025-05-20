// import React,  { useState }  from 'react'
// import classes from './Find.module.css'
// import search from '../../Assets/Images/search.png'
// import { Link } from 'react-router-dom'
// import downArrow from '../../Assets/Images/down-arrow.png'
// import find from '../../Assets/Images/find.png'

// const Find = ({ setSearchs }) => {
//     const [selectedOption, setSelectedOption] = useState('none');
//     const handleOptionChange = (event) => {
//         setSelectedOption(event.target.value);
//     };

    
//     // const [serch, setSearch] = useState(""); // how do i pass this search as a prop so i can use it  in another file
//   return (
//     <div className={classes.container}>
//         <div className={classes.imgBackground}>
//             <div className={classes.text}>
//                 <h2>Find your future home</h2>
//             </div>
//             <div className={classes.buyRent}>
//                 <div className={classes.btns}>
//                     <Link to = "/buy"><button>Buy</button></Link>
//                     <Link to = "/rent"><button>Rent</button></Link>
//                 </div>
//                 <div className={classes.searchSection}>
//                       <div className={classes.region}>
                         
//                           <img src={find} alt="find" className={classes.findImg}/>
//                           <input
//                 type="text"
//                 placeholder="Region or L.G.A or Community"
//                 onChange={setSearchs((e)=> e.target.value)}
//                 className={classes.regionII}
//               />
                          
                       
//                     </div>
//                     <select value={selectedOption} onChange={handleOptionChange} className={classes.property}>
//                         <option value="">Property Type</option>
//                         <option value="option1">Self Contain</option>
//                         <option value="option2">Duplex</option>
//                         <option value="option3">Hotel Apartment</option>
//                         <option value="option4">Bungalow</option>
//                         <option value="option5">Room & Palour</option>
//                         <option value="option6">Penthouse</option>
//                         <option value="option7">Flat</option>
//                         <option value="option8">Full Floor</option>
//                         <option value="option9">Compound</option>
//                     </select>
//                     <select value={selectedOption} onChange={handleOptionChange} className={classes.price}>
//                         <option value="">Price</option>
//                     </select>
//                     <img src={search} alt="search" className={classes.searchimg}/>
//                 </div>
//                 <div className={classes.lowerSection}>
//                     <input type="checkbox" placeholder="Show Commercial Properties" className={classes.checkbox}/>
//                     <span className={classes.showComm}>Show commercial properties</span>
//                     <span className={classes.showMore}>Show more search options  <img src={downArrow} alt="downArrow"/></span>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }


// export default Find


import React, { useState } from 'react';
import classes from './Find.module.css';
import search from '../../Assets/Images/search.png';
import { Link } from 'react-router-dom';
import downArrow from '../../Assets/Images/down-arrow.png';
import find from '../../Assets/Images/find.png';

const Find = ({ setSearchs }) => {
  const [selectedOption, setSelectedOption] = useState('none');
  
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className={classes.container}>
      <div className={classes.imgBackground}>
        <div className={classes.text}>
          <h2>Find your future home</h2>
        </div>
        <div className={classes.buyRent}>
          <div className={classes.btns}>
            <Link to="/buy"><button>Buy</button></Link>
            <Link to="/rent"><button>Rent</button></Link>
          </div>
          <div className={classes.searchSection}>
            <div className={classes.region}>
              <img src={find} alt="find" className={classes.findImg} />
              <input
                type="text"
                placeholder="Region or L.G.A or Community"
                onChange={(e) => setSearchs(e.target.value)}  // Corrected onChange handler
                className={classes.regionII}
              />
            </div>
            <select value={selectedOption} onChange={handleOptionChange} className={classes.property}>
              <option value="">Property Type</option>
              <option value="option1">Self Contain</option>
              <option value="option2">Duplex</option>
              <option value="option3">Hotel Apartment</option>
              <option value="option4">Bungalow</option>
              <option value="option5">Room & Palour</option>
              <option value="option6">Penthouse</option>
              <option value="option7">Flat</option>
              <option value="option8">Full Floor</option>
              <option value="option9">Compound</option>
            </select>
            <select value={selectedOption} onChange={handleOptionChange} className={classes.price}>
              <option value="">Price</option>
            </select>
            <img src={search} alt="search" className={classes.searchimg} />
          </div>
          <div className={classes.lowerSection}>
            <input type="checkbox" className={classes.checkbox} />
            <span className={classes.showComm}>Show commercial properties</span>
            <span className={classes.showMore}>
              Show more search options <img src={downArrow} alt="downArrow" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Find;
