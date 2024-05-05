// OutTimePage.js
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set } from 'firebase/database';

const OutTimePage = () => {
  const [name, setName] = useState('');
  const [outTime, setOutTime] = useState('');
  const [outLocation, setOutLocation] = useState(null);
  const [db, setDb] = useState(null);
  const [isDbInitialized, setIsDbInitialized] = useState(false);
  const [outTimePlace, setOutTimePlace] = useState('');

  useEffect(() => {
    const currentTime = new Date().toLocaleTimeString();
    setOutTime(currentTime);
    getLocation();
  }, []);

  useEffect(() => {
    const database = getDatabase();
    setDb(database);
    setIsDbInitialized(true);
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
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
    if (isDbInitialized && db && outTime) {
      try {
        await Promise.all([outLocation].filter(loc => loc));

        const dataRef = ref(db, 'users/' + name);
        const userData = {
          name,
          outTime,
          outTimePlace,
          outLocation: outLocation ? {
            latitude: outLocation.latitude,
            longitude: outLocation.longitude
          } : null,
        };

        await set(dataRef, userData);
        console.log('Data added successfully!');
        setName('');
        setOutTime('');
        setOutTimePlace('');
        setOutLocation(null);
      } catch (error) {
        console.error('Error adding data: ', error);
      }
    } else {
      console.error('Time data is missing or database is not initialized.');
    }
  };

  return (
    <div>
      {/* Your JSX for the OutTimePage */}
    </div>
  );
};

export default OutTimePage;
