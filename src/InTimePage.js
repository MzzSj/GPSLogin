import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, set } from 'firebase/database';
 
import './styles.css';
import { useNavigate } from 'react-router-dom'; 

const Intimee = () => {

  useEffect(() => {
    const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
    console.log(' in loaded in:', loadTime, 'milliseconds');
  }, []);


  const [name, setName] = useState('');
  const [inTime, setInTime] = useState('');
  const [date, setDate] = useState('');
  const [inLocation, setInLocation] = useState(null);
  const [db, setDb] = useState(null);
  const [isDbInitialized, setIsDbInitialized] = useState(false);
  const [showInTime, setShowInTime] = useState(false);
  const [inTimePlace, setInTimePlace] = useState('');

  const navigate = useNavigate(); // Use useNavigate directly inside the component


  useEffect(() => {
    const currentTime = new Date().toLocaleTimeString();
    setInTime(currentTime);
    setDate(new Date().toLocaleDateString());
  }, []);

  useEffect(() => {
    const database = getDatabase();
    setDb(database);
    setIsDbInitialized(true);
  }, []);

  const handleSetTime = () => {
    setShowInTime(true);
    getLocation();
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          console.log("Location received:", position.coords);
          const { latitude, longitude } = position.coords;
          setInLocation({ latitude, longitude });
        },
        error => {
          console.error('Error getting location:', error);
          if (error.code === error.PERMISSION_DENIED) {
            alert('Please enable GPS to use this feature.');
          }
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const insertData = async () => {
    if (isDbInitialized && db && name.trim() !== '') {
      try {
        const userData = {
          name,
          date,
          inLocation: inLocation ? { latitude: inLocation.latitude, longitude: inLocation.longitude } : null,
          inTime,
          inTimePlace
        };
  
        const newDataRef = push(ref(db, 'users/' + name));
        const newId = newDataRef.key;
  
        await set(ref(db, `users/${name}/${newId}`), userData);
  
        console.log('Data added successfully!');
        setName('');
        setInTime('');
        setInTimePlace('');
        setInLocation(null);
        navigate('/');
      } catch (error) {
        console.error('Error adding data: ', error);
      }
    } else {
      console.error('Database is not initialized or name is empty.');
    }
  };
  
  return (

    <>

<div className="header">
          <h3>Navigate Your World  with Precision Explore</h3>
           <h1>Orange Entry</h1> 
          <p>We are Keep <b>Locate</b> Your Foot Print</p>
        </div>
  
  
        <div className="navbar">
        <a href="/">Home</a>
          <a href="/time-in">In Time</a>
          <a href="/time-out">Out Time</a> 
        </div>


    <div className="containerC">

    <div className="contentD1" style={{ 
                          backgroundColor: '#f0f0f0', 
                          padding: '20px',
                          backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/gsplogin-a5e22.appspot.com/o/OrangeEntry%2FDefault_one_man_horse_riding_enter_in_city_of_nature_0.jpg?alt=media&token=434dca65-8d89-4de2-9fd5-43caf6364ee2')`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                      }}  >
                       
                      <div className="buttonContainer">
                        
                                   </div>
              </div>
   
      <div className="contentD2">
        <h2 className="heading">In Today Entry</h2>
        <div className="form">
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={handleChangeName}
            className="input"
          />
          <input
            type="text"
            placeholder="Date"
            value={date}
            readOnly
            className="input"
          />

          {showInTime && (
            <div>
              <input
                type="text"
                placeholder="In Time"
                value={inTime}
                readOnly
                className="input"
              />
              <input
                type="text"
                placeholder="In Time Place"
                value={inTimePlace}
                onChange={(e) => setInTimePlace(e.target.value)}
                className="input"
              />
              {inLocation && (
                <div className="mapContainer">
                  <p className="mapText">In Location:</p>
                  <p>{JSON.stringify(inLocation)}</p>
                </div>
              )}
            </div>
          )}

          <button onClick={handleSetTime} className="button">Set In Time</button>
          <button onClick={insertData} className="button">Add Data</button>
        </div>
      </div>
    </div>

                <div className="footer">
                <h2>Orange Entry</h2>
                  <p>Welcome to OrangeEntry, where we redefine location-based experiences. Harnessing the power of cutting-edge technology, our platform seamlessly integrates GPS data, real-time timestamps, and vivid imagery to provide you with unparalleled insights into your surroundings.</p>
                    <h3>© 2024 Powered by MzzSj  </h3>
                      </div>

    </>
  );
};

export default Intimee;
