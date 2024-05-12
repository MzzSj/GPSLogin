// HomeScreen.js
import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from './bgimg.jpg'; // Import your background image
import backgroundVideo from './Bgv.mp4'; // Import your background video
import './styles.css'; // Import your stylesheet

const Feedbk = () => {
    return (


        <>

<div class="header">
        <h3>Navigate Your World with Precision Explore</h3>
         <h1>Orange Entry</h1> 
        <p>We are Keep <b>Locate</b> Your Foot Print</p>
      </div>


      <div class="navbar">
        <a href="/">Home</a>
        <a href="/login">Admin</a>
        <a href="/login">User</a> 
      </div>

        <div className="container"  >
            <div className="content2"  >
            <h2 className="heading">Feedback</h2>
            <h3 className="heading">Testing and developing stages are crucial for refining and perfecting a website. If you encounter any issues or need assistance with testing or development tasks, feel free to ask. I'm here to help!</h3>
                    <div className="text1">
                    <p>
                    <span> ★ Pinpoint Accuracy: Discover your exact location with pinpoint accuracy, <br />ensuring you never lose your way again.</span><br />
                    <span> ★ Timely Insights: Stay informed with real-time timestamps, <br />empowering you to make informed decisions based on the latest data. </span><br />
                    <span> ★ Capture the Moment: Capture the beauty of your <br />journey with high-quality images, preserving memories that last a lifetime.</span><br />
                    {/* <span> ★ Customizable Solutions: Tailor our platform to suit your unique needs, whether it's for personal exploration or business optimization.</span><br />
                    <span> ★ User-Friendly Interface: Experience intuitive navigation and seamless functionality, designed with your convenience in mind.</span> */}
                    </p>
 
                <div className="buttonContainer">

                    <Link to="/register" className="button">
                    Registration
                    </Link>

                    <Link to="/viewdata" className="button">
                    User Entry 
                    </Link>
                    
                </div>
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

         
         <div class="footer">
  <h2>Orange Entry</h2>
  <p className="text1" >Welcome to OrangeEntry, where we redefine location-based experiences. <br />
  Harnessing the power of cutting-edge technology, our platform seamlessly 
  integrates GPS data, real-time timestamps, and vivid imagery to provide you <br />
  with unparalleled insights into your surroundings.
    </p>
    <h3>© 2024 Powered by MzzSj  </h3>
</div>



        </>
    );
};

export default Feedbk;
