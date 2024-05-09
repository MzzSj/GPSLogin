import React, { useState } from 'react';
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
                if (uid === 'Lw7Rb77yebasOWUi6auwM6T7kRt2') {
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
        <div className="container">
                      <div className="content">
                <h2 className="heading">Login</h2>
                <form onSubmit={handleSubmit} className="form">
                    <div className="inputGroup">
                        <label htmlFor="email" className="label">Email</label>
                        <input type="text" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="input" />
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="password" className="label">Password</label>
                        <input type="password" id="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="input" />
                    </div>
                    <button type="submit" className="button">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Admin;
