import React, { useState } from 'react';
import Properties from '../../Components/Properties/Properties';
import searchImg from '../../Assets/Images/search.png';
import { Link } from 'react-router-dom';
import downArrow from '../../Assets/Images/down-arrow.png';
import find from '../../Assets/Images/find.png';
import classes from './Find.module.css';

const Home = () => {
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  // New state for filter criteria
  const [filterCriteria, setFilterCriteria] = useState({
    search: '',
    propertyType: '',
    minPrice: 0,
    maxPrice: Infinity,
  });

  const handleOptionChange = (event) => {
    setPropertyType(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPriceRange(event.target.value);
    switch (event.target.value) {
      case 'lessThan150':
        setMinPrice(0);
        setMaxPrice(150000);
        break;
      case '150-300':
        setMinPrice(150000);
        setMaxPrice(300000);
        break;
      case '300-500':
        setMinPrice(300000);
        setMaxPrice(500000);
        break;
      case '500-1000':
        setMinPrice(500000);
        setMaxPrice(1000000);
        break;
      case 'above1000':
        setMinPrice(1000000);
        setMaxPrice(Infinity);
        break;
      default:
        setMinPrice(0);
        setMaxPrice(Infinity);
        break;
    }
  };

  const handleSearch = () => {
    // Set the filter criteria only when the search button is clicked
    setFilterCriteria({
      search: search,
      propertyType: propertyType,
      minPrice: minPrice,
      maxPrice: maxPrice,
    });
  };

  return (
    <div className={classes.div}>
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
                  onChange={(e) => setSearch(e.target.value)}
                  className={classes.regionII}
                />
              </div>
              <select value={propertyType} onChange={handleOptionChange} className={classes.property}>
                <option value="">Property Type</option>
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
              </select>
              <select value={priceRange} onChange={handlePriceChange} className={classes.price}>
                <option value="">Price Range</option>
                <option value="lessThan150">Less than 150,000₦</option>
                <option value="150-300">150,000₦ - 300,000₦</option>
                <option value="300-500">300,000₦ - 500,000₦</option>
                <option value="500-1000">500,000₦ - 1,000,000₦</option>
                <option value="above1000">Above 1,000,000₦</option>
              </select>
              <button onClick={handleSearch}>
                <img src={searchImg} alt="search" className={classes.searchimg} />
              </button>
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

      {/* Pass the filterCriteria as props to the Properties component */}
      <Properties 
        search={filterCriteria.search}
        propertyType={filterCriteria.propertyType}
        minPrice={filterCriteria.minPrice}
        maxPrice={filterCriteria.maxPrice}
      />
    </div>
  );
};

export default Home;
