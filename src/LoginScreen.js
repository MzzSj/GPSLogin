import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import './styles.css'; // Import your stylesheet

const firebaseConfig = {
  apiKey: "AIzaSyB-5KRgZzAQesxeJSHoXrMP5Z2gIiaV8fM",
  authDomain: "gsplogin-a5e22.firebaseapp.com",
  databaseURL: "https://gsplogin-a5e22-default-rtdb.firebaseio.com",
  projectId: "gsplogin-a5e22",
  storageBucket: "gsplogin-a5e22.appspot.com",
  messagingSenderId: "720658647445",
  appId: "1:720658647445:web:0b07afa515b881f9f54e9c"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

function Admin() {

    useEffect(() => {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log('Login loaded in:', loadTime, 'milliseconds');
      }, []);


    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Sign in user with email and password
            const auth = getAuth(app);
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            
            // Check if the user is an admin
            if (userCredential.user) {
                const { uid } = userCredential.user;
                if (uid === '6n4eSlwp8QelpUjKyoTtTQ6LNf32') {
                    // Redirect admin user to register page
                    navigate('/Adminmid');
                } else {
                    // Redirect regular user to crud page
                    navigate('/crud');
                }
            }
        } catch (error) {
            // Handle login error
            console.error('Error logging in:', error.message);
        }
    };

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

        <div className="containerC">
             <div className="contentD1" style={{ 
                        backgroundColor: '#f0f0f0', 
                        padding: '20px',
                        backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/gsplogin-a5e22.appspot.com/o/OrangeEntry%2FDefault_key_girl_hand_nature_heaven_entrance_0.jpg?alt=media&token=0da3c6fd-df5a-447f-9c89-286b5de00bcd')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}  >
                     
                    <div className="buttonContainer">
                                 </div>
            </div>


                      <div className="contentD2">
                <h2 className="heading">Login</h2>
                <form onSubmit={handleSubmit} className="form">
                    <div className="inputGroup">
                        <label htmlFor="email" className="label">Email  </label>
                        <input type="text" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="input" />
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="password" className="label">Password  </label>
                        <input type="password" id="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="input" />
                    </div>
                    <button type="submit" className="button">Login</button>
                </form>
            </div>
        </div>

        
        <div class="footer">
  <h2>Orange Entry</h2>
  <p>Welcome to OrangeEntry, where we redefine location-based experiences. Harnessing the power of cutting-edge technology, our platform seamlessly integrates GPS data, real-time timestamps, and vivid imagery to provide you with unparalleled insights into your surroundings.
    </p>
    <h3>© 2024 Powered by MzzSj  </h3>
</div>
        </>
    );
}


export default Admin;
