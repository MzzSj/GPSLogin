// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; // Import your stylesheet

const Crud = () => {


  useEffect(() => {
    const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
    console.log('curd loaded in:', loadTime, 'milliseconds');
  }, []);

    return (

        <>
        <div className="header">
          <h3>Navigate Your World with Precision Explore</h3>
           <h1>Orange Entry</h1> 
          <p>We are Keep <b>Locate</b> Your Foot Print</p>
        </div>
  
  
        <div className="navbar">
        <a href="/">Home</a>
          <a href="/time-in">In Time</a>
          <a href="/time-out">Out Time</a> 
        </div>
  
          <div className="container"  >
              <div className="content2"  >
                      <h1 className="heading">Engaging Features</h1>
                      <div className="text1">
                      <p>
                      <span> ★ Pinpoint Accuracy: Discover your exact location with pinpoint accuracy, ensuring you never lose your way again.</span><br />
                      <span> ★ Timely Insights: Stay informed with real-time timestamps, empowering you to make informed decisions based on the latest data. </span><br />
                      <span> ★ Capture the Moment: Capture the beauty of your journey with high-quality images, preserving memories that last a lifetime.</span><br />
                      </p>
                      <div className="buttonContainer">

                        <Link to="/time-in" className="button">
                        In Time
                        </Link>

                        <Link to="/time-out" className="button">
                        Out Time
                        </Link>

                        </div>
                    
                  </div>
              </div>
  
              <div className="content3" style={{ 
                          backgroundColor: '#f0f0f0', 
                          padding: '20px',
                          backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/gsplogin-a5e22.appspot.com/o/OrangeEntry%2FDefault_one_man_start_work_0.jpg?alt=media&token=1576cc2d-c83e-4c9a-a0a6-4ed2ee20540d')`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                      }}  >
                       
                      <div className="buttonContainer">
                        
                                   </div>
              </div>
           </div>
  
    
              <div className="footer">
    <h2>Orange Entry</h2>
    <p>Welcome to OrangeEntry, where we redefine location-based experiences. Harnessing the power of cutting-edge technology, our platform seamlessly integrates GPS data, real-time timestamps, and vivid imagery to provide you with unparalleled insights into your surroundings.
      </p>
      <h3>© 2024 Powered by MzzSj  </h3>
  </div>
  
      </>
    );
};

export default Crud;
