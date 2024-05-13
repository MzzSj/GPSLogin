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
                      {/* <span> ★ Customizable Solutions: Tailor our platform to suit your unique needs, whether it's for personal exploration or business optimization.</span><br />
                      <span> ★ User-Friendly Interface: Experience intuitive navigation and seamless functionality, designed with your convenience in mind.</span> */}
                      </p>
                  </div>
              </div>
  
              <div className="content3" style={{ 
                          backgroundColor: '#f0f0f0', 
                          padding: '20px',
                          backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/gsplogin-a5e22.appspot.com/o/OrangeEntry%2FDefault_The_cute_girl_look_like_traveler_her_hand_map_sheet_th_0%20(1).jpg?alt=media&token=47bce354-b009-4225-b145-a55e87256980')`,
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
