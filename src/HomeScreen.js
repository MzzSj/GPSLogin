// HomeScreen.js
import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from './bgimg.jpg'; // Import your background image
import backgroundVideo from './Bgv.mp4'; // Import your background video
import './styles.css'; // Import your stylesheet

const HomeScreen = () => {
    return (
        <div className="container">
            <video autoPlay muted loop className="videoBackground">
                <source src={backgroundVideo} type="video/mp4" />
                <img src={backgroundImage} alt="Background" className="imageFallback" />
            </video>
            <div className="content">
                <h1 className="heading">GPS Login</h1>
                <div className="buttonContainer">
                    <Link to="/Admin" className="button">
                        Admin
                    </Link>
                    <Link to="/login" className="button">
                        User
                    </Link>
                    <Link to="/time-in" className="button"> {/* Link to Time In page */}
                        Time In
                    </Link>
                    <Link to="/time-out" className="button"> {/* Link to Time Out page */}
                        Time Out
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;
