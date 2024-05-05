import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import backgroundImage from './bgimg.jpg'; // Import your background image
import backgroundVideo from './Bgv.mp4'; // Import your background video
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
    <div className="container">
      <video autoPlay muted loop className="videoBackground">
        <source src={backgroundVideo} type="video/mp4" />
        {/* Fallback image in case video is not loaded */}
        <img src={backgroundImage} alt="Background" className="imageFallback" />
      </video>
      <div className="content">
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
  );
}

export default Register;
