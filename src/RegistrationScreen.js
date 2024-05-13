    import React, { useState , useEffect } from 'react';
  
    import { useNavigate } from 'react-router-dom';
    import { initializeApp } from "firebase/app";
    import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
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

    function Register() {

      useEffect(() => {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log('Register loaded in:', loadTime, 'milliseconds');
      }, []);

      const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
      });

      const navigate = useNavigate();

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if any of the fields are empty
        if (!formData.username || !formData.email || !formData.password) {
          alert('Please fill in all fields');
          return;
        }

        try {
          // Create user with email and password
          const auth = getAuth(app);
          const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
          
          // Verify user object
          if (userCredential.user) {
            // Update user profile (optional)
            await updateProfile(userCredential.user, {
              displayName: formData.username
            });
      
            // Redirect to another page (optional)
            navigate('/');
          } else {
            console.error('Error registering user:', 'User object not found');
          }
        } catch (error) {
          // Handle error
          console.error('Error registering user:', error.message);
        }
      };
      
      return (

        <>

<div className="header">
        <h3>Navigate Your World with Precision Explore</h3>
         <h1>Orange Entry</h1> 
        <p>We are Keep <b>Locate</b> Your Foot Print</p>
      </div>

        <div className="navbar">
        <a href="/">Home</a>
    <a href="/viewdata">User Entry</a>
    <a href="/register"> Registration</a> 
      </div>

        <div className="containerC">
             <div className="contentD1" style={{ 
                        backgroundColor: '#f0f0f0', 
                        padding: '20px',
                        backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/gsplogin-a5e22.appspot.com/o/OrangeEntry%2FDefault_They_are_10_years_old_0.jpg?alt=media&token=47d6234c-f9ab-45a3-8031-cae1162bb42a')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}  >
                     
                    <div className="buttonContainer">
                      
                                 </div>
            </div>


                      <div className="contentD2">
            <h2 className="heading">Register</h2>
            <form onSubmit={handleSubmit} className="form">
              <div className="inputGroup">
                <label htmlFor="username" className="label">Username</label>
                <input type="text" id="username" name="username" placeholder="Enter your username" value={formData.username} onChange={handleChange} className="input" />
              </div>
              <div className="inputGroup">
                <label htmlFor="email" className="label">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} className="input" />
              </div>
              <div className="inputGroup">
                <label htmlFor="password" className="label">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} className="input" />
              </div>
              <button type="submit" className="button">Register</button> 
            </form>
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
    }

    export default Register;
