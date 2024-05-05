import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from './bgimg.jpg'; // Import your background image
import backgroundVideo from './Bgv.mp4'; // Import your background video
import './styles.css'; // Import your stylesheet

const Admin = () => {
  return (
    <div className="container">
      {/* Use either video or image */}
      <video autoPlay muted loop className="videoBackground">
        <source src={backgroundVideo} type="video/mp4" />
        {/* Fallback image in case video is not loaded */}
        <img src={backgroundImage} alt="Background" className="imageFallback" />
      </video>
      <div className="content">
        <h1 className="heading">Admin</h1>
        <div className="buttonContainer">
          <Link to="/register" className="button">
            Register
          </Link>
          <Link to="/view-data" className="button">
            User Data
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Admin;
