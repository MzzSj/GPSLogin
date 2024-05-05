// InTimePage.js
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set } from 'firebase/database';

const InTimePage = () => {
  const [name, setName] = useState('');
  const [inTime, setInTime] = useState('');
  const [date, setDate] = useState('');
  const [inLocation, setInLocation] = useState(null);
  const [db, setDb] = useState(null);
  const [isDbInitialized, setIsDbInitialized] = useState(false);
  const [inTimePlace, setInTimePlace] = useState('');

  useEffect(() => {
    const currentTime = new Date().toLocaleTimeString();
    setInTime(currentTime);
    setDate(new Date().toLocaleDateString());
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
    if (isDbInitialized && db && inTime) {
      try {
        await Promise.all([inLocation].filter(loc => loc));

        const dataRef = ref(db, 'users/' + name);
        const userData = {
          name,
          date,
          inTime,
          inTimePlace,
          inLocation: inLocation ? {
            latitude: inLocation.latitude,
            longitude: inLocation.longitude
          } : null,
        };

        await set(dataRef, userData);
        console.log('Data added successfully!');
        setName('');
        setInTime('');
        setInTimePlace('');
        setInLocation(null);
      } catch (error) {
        console.error('Error adding data: ', error);
      }
    } else {
      console.error('Time data is missing or database is not initialized.');
    }
  };

  return (
    <div>
      {/* Your JSX for the InTimePage */}
    </div>
  );
};

export default InTimePage;
