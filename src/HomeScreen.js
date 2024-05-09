// HomeScreen.js
import React from 'react';
import { Link } from 'react-router-dom';
 
import './styles.css'; // Import your stylesheet

const HomeScreen = () => {
    return (
        <div className="container">
             
            <div className="content">
                <h1 className="heading">GPS Login</h1>
                <div className="buttonContainer">
                    <Link to="/Admin" className="button">
                        Admin
                    </Link>
                    <Link to="/login" className="button">
                        User
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default HomeScreen;
