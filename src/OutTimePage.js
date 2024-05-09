
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, set } from 'firebase/database';
  import './styles.css';
import { useNavigate } from 'react-router-dom';

const Outtimee = () => {
  const [name, setName] = useState('');
  const [outTime, setOutTime] = useState('');
  const [date, setDate] = useState('');
  const [outLocation, setOutLocation] = useState(null);
  const [db, setDb] = useState(null);
  const [isDbInitialized, setIsDbInitialized] = useState(false);
  const [showOutTime, setShowOutTime] = useState(false);
  const [outTimePlace, setOutTimePlace] = useState('');
 
  const navigate = useNavigate(); // Use useNavigate directly inside the component

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

  return (
    <div className="container">
        <div className="content">
        <h2 className="heading">Day Today Entry</h2>
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
        </div>
      </div>
    </div>
  );
};

export default Outtimee;

