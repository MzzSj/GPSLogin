// HomeScreen.js
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; // Import your stylesheet

const Crud = () => {
    return (
        <div className="container">
                        <div className="content">
                <h1 className="heading">GPS Login</h1>
                <div className="buttonContainer">
                    <Link to="/time-in" className="button">
                        In Time
                    </Link>
                    <Link to="/time-out" className="button">
                        Out Time
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default Crud;
