import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, set } from 'firebase/database';
import './styles.css';
import { useNavigate } from 'react-router-dom';

const Outtimee = () => {
  useEffect(() => {
    const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
    console.log('Out loaded in:', loadTime, 'milliseconds');
  }, []);
  
  const [name, setName] = useState('');
  const [outTime, setOutTime] = useState('');
  const [date, setDate] = useState('');
  const [outLocation, setOutLocation] = useState(null);
  const [db, setDb] = useState(null);
  const [isDbInitialized, setIsDbInitialized] = useState(false);
  const [showOutTime, setShowOutTime] = useState(false);
  const [outTimePlace, setOutTimePlace] = useState('');
 
  const navigate = useNavigate();

  useEffect(() => {
    const currentTime = new Date().toLocaleTimeString();
    setOutTime(currentTime);
    setDate(new Date().toLocaleDateString());
  }, []);

  useEffect(() => {
    const database = getDatabase();
    setDb(database);
    setIsDbInitialized(true);
  }, []);

  const handleSetTime = () => {
    setShowOutTime(true);
    getLocation();
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          console.log("Location received:", position.coords);
          const { latitude, longitude } = position.coords;
          setOutLocation({ latitude, longitude });
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
          outLocation: outLocation ? { latitude: outLocation.latitude, longitude: outLocation.longitude } : null,
          outTime,
          outTimePlace
        };
  
        const newDataRef = push(ref(db, 'users/' + name));
        const newId = newDataRef.key;
  
        await set(ref(db, `users/${name}/${newId}`), userData);
  
        console.log('Data added successfully!');
        setName('');
        setOutTime('');
        setOutTimePlace('');
        setOutLocation(null);

        navigate('/');
      } catch (error) {
        console.error('Error adding data: ', error);
      }
    } else {
      console.error('Database is not initialized or name is empty.');
    }
  };

  const openGoogleMap = () => {
    if (outLocation) {
      const { latitude, longitude } = outLocation;
      window.open(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`);
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
        <a href="/time-in">In Time</a>
        <a href="/time-out">Out Time</a>
      </div>

      <div className="containerC">
        <div className="contentD2">
          <h2 className="heading">Out Time Entry</h2>
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
            {showOutTime && (
              <div>
                <input
                  type="text"
                  placeholder="Out Time"
                  value={outTime}
                  readOnly
                  className="input"
                />
                <input
                  type="text"
                  placeholder="Out Time Place"
                  value={outTimePlace}
                  onChange={(e) => setOutTimePlace(e.target.value)}
                  className="input"
                />
                {outLocation && (
                  <div className="mapContainer">
                    <p className="mapText">Out Location:</p>
                    <p>{JSON.stringify(outLocation)}</p>
                  </div>
                )}
              </div>
            )}
            <button onClick={handleSetTime} className="button">Set Out Time</button>
            <button onClick={insertData} className="button">Add Data</button>
            {outLocation && (
              <button onClick={openGoogleMap} className="button">View Map</button>
            )}
          </div>
        </div>
      </div>

      <div className="footer">
        <h2>Orange Entry</h2>
        <p>Welcome to OrangeEntry, where we redefine location-based experiences. Harnessing the power of cutting-edge technology, our platform seamlessly integrates GPS data, real-time timestamps, and vivid imagery to provide you with unparalleled insights into your surroundings.</p>
        <h3>© 2024 Powered by MzzSj</h3>
      </div>
    </>
  );
};

export default Outtimee;
