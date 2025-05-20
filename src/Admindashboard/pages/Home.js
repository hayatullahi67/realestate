import React, { useState, useEffect } from 'react';
import { Chart as ChartJs, defaults } from 'chart.js/auto'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import { db } from '../../config';
import { doc , collection,getDocs , query,where} from 'firebase/firestore';
defaults.maintainAspectRatio = false;

function Home({ isSidebarVisible }) {
  const [toggle, setToggle] = useState(1);
  const [sidebar, setSideBar] = useState(true);
  const toggletab = (index) => {
    setToggle(index)
  }
  const [totalProperties, setTotalProperties] = useState(0);
  const [soldProperties, setSoldProperties] = useState(0);
  const [rentProperties, setRentProperties] = useState(0);
  const [saleProperties, setSaleProperties] = useState(0);



  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        // Reference to the properties collection
        const propertiesRef = collection(db, "properties");

        // Fetch all properties
        const totalQuerySnapshot = await getDocs(propertiesRef);
        setTotalProperties(totalQuerySnapshot.size);

        // Fetch sold properties
        const soldQuery = query(propertiesRef, where("sold", "==", true));
        const soldQuerySnapshot = await getDocs(soldQuery);
        setSoldProperties(soldQuerySnapshot.size);

        // Fetch properties for rent
        const rentQuery = query(propertiesRef, where("propertyType", "==", "rent"));
        const rentQuerySnapshot = await getDocs(rentQuery);
        setRentProperties(rentQuerySnapshot.size);

        // Fetch properties for sale
        const saleQuery = query(propertiesRef, where("propertyType", "==", "buy"));
        const saleQuerySnapshot = await getDocs(saleQuery);
        setSaleProperties(saleQuerySnapshot.size);
      } catch (error) {
        console.error("Error fetching property data: ", error);
      }
    };

    fetchPropertyData();
  }, []);
  
  // const containerStyle = {
  //   width: isSidebarVisible ? 'calc(100% - 240px)' : '100%', // Adjust '250px' to your sidebar width
  //   transition: 'width 0.3s',
  //   marginLeft: isSidebarVisible ? '240px' : '0px',  
  //   marginTop:'100px'
  // };


  const containerStyle = {
    width: isSidebarVisible && window.innerWidth > 600 ? 'calc(100% - 240px)' : '100%',
    transition: 'width 0.3s',
    marginLeft: isSidebarVisible && window.innerWidth > 600 ? '240px' : '0px',
    marginTop: '100px',
  };
  


  const data = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [
      {
        label: 'Demo Chart',
        data: [28, 50, 36, 60, 38, 52, 38],
        fill: true, // fill area under the line
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // area fill color
        borderColor: 'rgb(75, 192, 192)', // line color
        tension: 0.3, // line curve
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: false, // hide x-axis
      },
      y: {
        display: false, // hide y-axis
      },
    },
    plugins: {
      legend: {
        display: false, // hide legend
      },
      tooltip: {
        enabled: true,// hide tooltip
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 10,
        bottom: 0,
      },

    },
    responsive: true,
    maintainAspectRatio: false,
  };


  return (
    <div className="content-wrapper" style={containerStyle}>
      <section className="dashboard-top-sec">
        <div className="container-fluid">
          {/* <div className="row">
            <div className="col-lg-8">
              <div className="bg-white top-chart-earn py-3">
                <div className="row">
                  <div className="col-sm-4 my-2 pe-0">
                    <div className="last-month">
                      <h5>Dashboard</h5>
                      <p>Overview of Latest Month</p>

                      <div className="earn">
                        <h2>3367.98</h2>
                        <p>Current Month Sales</p>
                      </div>
                      <div className="sale mb-5">
                        <h2>95</h2>
                        <p>Current Month Sales</p>
                      </div>
                      <a href="#" className="di-btn purple-gradient">Last Month Summary</a>
                    </div>
                  </div>

                  <div className="col-sm-8 my-2 ps-0">
                    <div className="classic-tabs">
                      <div className="tabs-wrapper">
                        <ul className="nav nav-pills chart-header-tab mb-3" id="pills-tab" role="tablist">
                          <li className="nav-item">
                            <a href="#" className={toggle === 1 ? 'nav-link chart-nav active' : 'nav-link chart-nav '} onClick={() => toggletab(1)} id="pills-home-tab" data-bs-toggle="pill"
                              data-bs-target="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Week</a>
                          </li>
                          <li className="nav-item">
                            <a href="#" className={toggle === 2 ? 'nav-link chart-nav active' : 'nav-link chart-nav '} onClick={() => toggletab(2)} id="pills-profile-tab" data-bs-toggle="pill"
                              data-bs-target="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Month</a>
                          </li>
                          <li className="nav-item">
                            <a href="#"
                              className={toggle === 3 ? 'nav-link chart-nav active' : 'nav-link chart-nav '} onClick={() => toggletab(3)} id="pills-contact-tab" data-bs-toggle="pill"
                              data-bs-target="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Years</a>
                          </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                          <div
                            className={toggle === 1 ? 'tab-pane fade show active' : 'tab-pane fade show  '}
                            id="pills-home" role="tabpanel"
                            aria-labelledby="pills-home-tab">
                            <div className="widget-content">
                              <div id="weekly-chart">
                                <Bar
                                  data={{
                                    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                                    datasets: [
                                      {
                                        borderRadius: 10,
                                        backgroundColor: "#fc8edf",
                                        label: "Direct",
                                        data: [58, 44, 55, 57, 56, 61, 58]
                                      },
                                      {
                                        borderRadius: 10,
                                        backgroundColor: "rgb(231, 28, 62)",
                                        label: 'Organic',
                                        data: [91, 76, 85, 101, 98, 87, 105]
                                      }

                                    ]
                                  }}
                                /></div>
                            </div>
                          </div>
                          <div className={toggle === 2 ? 'tab-pane fade show active' : 'tab-pane fade show  '} id="pills-profile" role="tabpanel"
                            aria-labelledby="pills-profile-tab">
                            <div className="widget-content">
                              <div id="monthly-chart">
                                <Bar
                                  data={{
                                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                                    datasets: [
                                      {
                                        borderRadius: 10,
                                        backgroundColor: "#fc8edf",

                                        data: [58, 44, 55, 57, 56, 61, 58, 59, 66, 76, 96, 56]
                                        , label: "Direct",
                                      },
                                      {
                                        borderRadius: 10,
                                        backgroundColor: "rgb(231, 28, 62)",
                                        data: [91, 76, 85, 101, 98, 87, 105, 56, 86, 76, 88, 107]
                                        , label: 'Organic',

                                      }

                                    ]
                                  }} />
                              </div>
                            </div>
                          </div>
                          <div className={toggle === 3 ? 'tab-pane fade show active' : 'tab-pane fade show  '} id="pills-contact" role="tabpanel"
                            aria-labelledby="pills-contact-tab">
                            <div className="widget-content">
                              <div id="yearly-chart"> <Bar
                                data={{
                                  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                                  datasets: [
                                    {
                                      borderRadius: 10,
                                      backgroundColor: "#fc8edf",

                                      data: [58, 44, 55, 57, 56, 61, 58, 59, 66, 76, 96, 56]
                                      , label: "Direct",
                                    },
                                    {
                                      borderRadius: 10,
                                      backgroundColor: "rgb(231, 28, 62)",
                                      data: [91, 76, 85, 101, 98, 87, 105, 56, 86, 76, 88, 107]
                                      , label: 'Organic',

                                    }

                                  ]
                                }} /></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="wre-sec">
                  <div className="row">
                    <div className="col-md-3 col-sm-3 col-6 my-1 bdr-cls">
                      <div className="earn-view">
                        <span className="fas fa-crown earn-icon wallet"></span>
                        <div className="earn-view-text">
                          <p className="naame-text">Wallet Balance</p>
                          <h6 className="ballance-text">$1684.54</h6>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-3 col-sm-3 col-6 my-1 bdr-cls">
                      <div className="earn-view">
                        <span className="fas fa-heart earn-icon referral"></span>
                        <div className="earn-view-text">
                          <p className="naame-text">Referral Earning</p>
                          <h6 className="ballance-text">$1204.54</h6>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-3 col-sm-3 col-6 my-1 bdr-cls">
                      <div className="earn-view">
                        <span className="fab fa-salesforce earn-icon sales"></span>
                        <div className="earn-view-text">
                          <p className="naame-text">Estimated Sales</p>
                          <h6 className="ballance-text">$184.54</h6>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-3 col-sm-3 col-6 my-1 bdr-cls">
                      <div className="earn-view">
                        <span className="fas fa-chart-line earn-icon earning"></span>
                        <div className="earn-view-text">
                          <p className="naame-text">Earning</p>
                          <h6 className="ballance-text">$16984.54</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 ">
              <div className="bg-white top-chart-earn">
                <div className="traffice-tittle">
                  <p>Traffice</p>
                </div>
                <div className="traffice">
                  <div id="chart-2" className='align-items-center'> <Doughnut
                    data={{
                      labels: ["Organic", "Referal", "Direct"],
                      colors: ["blue", "red", "rgb(210, 105, 50)"],
                      datasets: [

                        {
                          data: [58, 91, 30]
                          , label: 'Organic',

                        }

                      ]
                    }} style={{ height: '300px' }} /></div>
                </div>
              </div>
            </div>
          </div> */}
          <div className='row'>
            <div className='col-lg-6 lg-width  '>
              <div  className='bg-gray top-chart-earn '>
                  <div className='row '>
                       <div className=' col-lg-4 bg-white'>
                        <div>
                          <h5> No: of All Properties </h5>
                          <p>{totalProperties}</p>
                        </div>
                       </div>


                       <div className=' col-lg-4 bg-white'>
                        <div>
                          <h5>  Sold Properties </h5>
                          <p>{soldProperties}</p>
                        </div>
                       </div>



                       <div className='col-lg-4 bg-white'>
                        <div>
                          <h5>  Properties for Rent </h5>
                          <p>{rentProperties}</p>
                        </div>
                       </div>

                       <div className='col-lg-4 bg-white'>
                        <div>
                          <h5>  Properties for sale  </h5>
                          <p>{saleProperties}</p>
                        </div>
                       </div>
                  </div>
              </div>
              
            </div>
            <div className='col-lg-6 lg-width pt-4'>
              
              <div className='bg-gray  top-chart-earn'>
              <div id="weekly-chart">
                                <Bar
                                  data={{
                                    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                                    datasets: [
                                      {
                                        borderRadius: 10,
                                        backgroundColor: "#fc8edf",
                                        label: "Direct",
                                        data: [58, 44, 55, 57, 56, 61, 58]
                                      },
                                      {
                                        borderRadius: 10,
                                        backgroundColor: "rgb(231, 28, 62)",
                                        label: 'Organic',
                                        data: [91, 76, 85, 101, 98, 87, 105]
                                      }

                                    ]
                                  }}
                                />
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======== */}
      <section>
        <div className="sm-chart-sec my-5">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-6 my-2">
                <div className="revinue revinue-one_hybrid">
                  <div className="revinue-hedding">
                    <div className="w-title">
                      <div className="w-icon">
                        <span className="fas fa-users"></span>
                      </div>
                      <div className="sm-chart-text">
                        <p className="w-value">31.9k</p>
                        <h5>Followers</h5>
                      </div>
                    </div>
                  </div>
                  <div className="revinue-content">
                    <div id="hybrid_followers" style={{ height: '70px' }} >
                      <Line data={data} options={options} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 my-2">
                <div className="revinue page-one_hybrid">
                  <div className="revinue-hedding">
                    <div className="w-title">
                      <div className="sm-chart-text">
                        <p className="w-value">654K</p>
                        <h5>Page views</h5>
                      </div>
                    </div>
                  </div>
                  <div className="revinue-content">
                    <div id="hybrid_follower" style={{ height: '70px' }}>
                      {/* Content for hybrid_follower */}
                      <Line data={data} options={options} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 my-2">
                <div className="revinue bonuce-one_hybrid">
                  <div className="revinue-hedding">
                    <div className="w-title">
                      <div className="sm-chart-text">
                        <p className="w-value">$432</p>
                        <h5>Bounce Rate</h5>
                      </div>
                    </div>
                  </div>
                  <div className="revinue-content">
                    <div id="hybrid_bounce" style={{ height: '70px' }}>
                      {/* Content for hybrid_bounce */}
                      <Line data={data} options={options} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 my-2">
                <div className="revinue rv-status-one_hybrid">
                  <div className="revinue-hedding">
                    <div className="w-title">
                      <div className="sm-chart-text">
                        <p className="w-value">$765 <small>Jan 01 - Jan 19</small></p>
                        <h5>Revenue Status</h5>
                      </div>
                    </div>
                  </div>
                  <div className="revinue-content">
                    <div id="hybrid_status" style={{ height: '70px' }}>
                      {/* Content for hybrid_status */}
                      <Line data={data} options={options} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= */}
      <section>
        <div className="all-admin my-5">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4 col-sm-6">
                <div className="admin-list">
                  <p className="admin-ac-title">All Admin</p>
                  <ul className="admin-ul">
                    <li className="admin-li">
                      <img src="asset/images/download (1).jpeg" alt="" className="admin-image" />
                      <div className="adminac-details">
                        <div>
                          <p className="admin-name">Helal Uddin</p>
                          <p className="activaty-text">Active Now</p>
                        </div>
                        <div className="status bg-success"></div>
                      </div>
                    </li>

                    <li className="admin-li">
                      <img src="asset/images/download (2).jpeg" alt="" className="admin-image" />
                      <div className="adminac-details">
                        <div>
                          <p className="admin-name">Rocky Islam</p>
                          <p className="activaty-text">Active 15 min ago</p>
                        </div>
                        <div className="status bg-primary"></div>
                      </div>
                    </li>
                    <li className="admin-li">
                      <img src="asset/images/download (3).jpeg" alt="" className="admin-image" />
                      <div className="adminac-details">
                        <div>
                          <p className="admin-name">Jewel Khan</p>
                          <p className="activaty-text">Active 20 min ago</p>
                        </div>
                        <div className="status bg-warning"></div>
                      </div>
                    </li>
                    <li className="admin-li">
                      <img src="asset/images/download (4).jpeg" alt="" className="admin-image" />
                      <div className="adminac-details">
                        <div>
                          <p className="admin-name">Afjal Sohel</p>
                          <p className="activaty-text">Active 2 Days ago</p>
                        </div>
                        <div className="status bg-danger"></div>
                      </div>
                    </li>
                    <li className="admin-li">
                      <img src="asset/images/download (5).jpeg" alt="" className="admin-image" />
                      <div className="adminac-details">
                        <div>
                          <p className="admin-name">Devigine</p>
                          <p className="activaty-text">Active 12 min ago</p>
                        </div>
                        <div className="status bg-success"></div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-md-8 col-sm-6">
                <div className="admin-lst">
                  <div className="order-list">
                    <p className="admin-ac-title">Order Status</p>

                    <div className="data-table-section table-responsive">
                      <table id="example" className="table table-striped" style={{ width: "100%" }}>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Office</th>
                            <th>Age</th>
                            <th>Start date</th>
                            <th>Salary</th>
                          </tr>
                        </thead>
                        <tbody className="order-view-tb">
                          <tr className="odd">
                            <td>Tiger Nixon</td>
                            <td>System Architect</td>
                            <td>Edinburgh</td>
                            <td>61</td>
                            <td>2011-04-25</td>
                            <td>$320,800</td>
                          </tr>
                          <tr>
                            <td>Garrett Winters</td>
                            <td>Accountant</td>
                            <td>Tokyo</td>
                            <td>63</td>
                            <td>2011-07-25</td>
                            <td>$170,750</td>
                          </tr>
                          <tr className="odd">
                            <td>Ashton Cox</td>
                            <td>Junior Technical Author</td>
                            <td>San Francisco</td>
                            <td>66</td>
                            <td>2009-01-12</td>
                            <td>$86,000</td>
                          </tr>
                          <tr>
                            <td>Ashton Cox</td>
                            <td>Junior Technical Author</td>
                            <td>San Francisco</td>
                            <td>66</td>
                            <td>2009-01-12</td>
                            <td>$86,000</td>
                          </tr>
                          <tr className="odd">
                            <td>Ashton Cox</td>
                            <td>Junior Technical Author</td>
                            <td>San Francisco</td>
                            <td>66</td>
                            <td>2009-01-12</td>
                            <td>$86,000</td>
                          </tr>
                          <tr>
                            <td>Ashton Cox</td>
                            <td>Junior Technical Author</td>
                            <td>San Francisco</td>
                            <td>66</td>
                            <td>2009-01-12</td>
                            <td>$86,000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
