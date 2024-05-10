import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const HomeScreen = () => {
  return (
    <>
      <div class="header">
        <h3>Navigate Your World with Precision Explore</h3>
         <h1>Orange Entry</h1> 
        <p>We are Keep <b>Locate</b> Your Foot Print</p>
      </div>


      <div class="navbar">
        <a href="/Admin">Admin</a>
        <a href="/login">User</a> 
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


         <div className="container">

         <div className="content3" style={{ 
                        backgroundColor: '#f0f0f0', 
                        padding: '20px',
                        backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/gsplogin-a5e22.appspot.com/o/OrangeEntry%2FDefault_paper_map_route_0.jpg?alt=media&token=eb1c7486-47aa-4b8e-9325-4b88cc6543e1')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }} >
 
                    <div className="buttonContainer">
                         
                </div>
            </div>


            <div className="content2">
                    <h1 className="heading">Why Choose Us</h1>
                    <div className="text1">
                    <p>
                    <span> ★ At Orange Entry, we're committed to delivering excellence in location-based services..</span><br />
                    <span> ★ Our team of experts is dedicated to pushing the boundaries of innovation, ensuring you always receive the highest quality experience. </span><br />
                    <span> ★ Join us on a journey of discovery and exploration, where every moment is an opportunity to uncover something new.</span><br />
                    </p>
                </div>
            </div>



         </div>

         <div className="container">
            <div className="content2">
                    <h1 className="heading">Ready to Explore?</h1>
                    <div className="text1">
                    <p>
                    <span> ★ Embark on a journey of discovery with [Your Business Name] today. </span><br />
                    <span> ★ Whether you're an avid traveler, a business owner seeking optimization, or simply someone who values precision and convenience, </span><br />
                    <span> ★ our platform has something for you. Experience the future of location-based services – experience [Your Business Name].</span><br />
                    </p>
                </div>
            </div>

            <div className="content3" style={{ 
                        backgroundColor: '#f0f0f0', 
                        padding: '20px',
                        backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/gsplogin-a5e22.appspot.com/o/OrangeEntry%2FDefault_Cute_girl_nature_with_boy_and_us_pet_0.jpg?alt=media&token=e90001cf-65b3-46b4-b0af-802a7a42dcdc')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}  >
 
                    <div className="buttonContainer">   
                        
                </div>
            </div>
         </div>

            <div class="footer">
  <h2>Orange Entry</h2>
  <p>Feel free to customize the headline, description, and features to better align with your specific business goals and target audience.
    <br/> The key is to convey the unique value proposition of your website in a compelling and engaging manner.</p>
</div>

    </>
  );
};

export default HomeScreen;
