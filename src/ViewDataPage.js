import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import './styles.css'; // Import your stylesheet
import backgroundImage from './bgimg.jpg'; // Import your background image
import backgroundVideo from './Bgv.mp4'; // Import your background video

const ViewDataPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const database = getDatabase();
            const usersRef = ref(database, 'users');

            const unsubscribe = onValue(usersRef, (snapshot) => {
                const usersData = snapshot.val();
                setData(usersData ? Object.entries(usersData) : []);
                setLoading(false);
            });

            return () => unsubscribe();
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container">
            <video autoPlay muted loop className="videoBackground">
                <source src={backgroundVideo} type="video/mp4" />
                <img src={backgroundImage} alt="Background" className="imageFallback" />
            </video>
            <div className="content">
                <h1 className="heading">User Data</h1>
                
                {loading && <p>Loading...</p>}
                {error && <p className="error">{error}</p>}
                <div className="list-container">
                    {data.map((user) => (
                        <div key={user.id} className="item">
                            <p>ID: {user.id}</p>
                            <p>Username: {user.
inTime}</p>
                            <p>Full Name: {user.
inTimePlace}</p>
                            <p>Phone Number: {user.name}</p>
                            <p>Date of Birth: {user.dob}</p>
                            {user.location && (
                                <p>
                                    Location: Latitude: {user.location.latitude}, Longitude: {user.location.longitude}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewDataPage;
