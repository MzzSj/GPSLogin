import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx'; // Import XLSX library
import './styles.css';

const ViewDataPage = () => {



    useEffect(() => {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log('View loaded in:', loadTime, 'milliseconds');
      }, []);


    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [usernameFilter, setUsernameFilter] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [filter, setFilter] = useState('');

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const database = getDatabase();
            const usersRef = ref(database, 'users');

            const unsubscribe = onValue(usersRef, (snapshot) => {
                const usersData = snapshot.val();
                const usersArray = [];

                for (let userName in usersData) {
                    for (let entryKey in usersData[userName]) {
                        const entryData = usersData[userName][entryKey];
                        usersArray.push({ id: entryKey, name: userName, ...entryData });
                    }
                }

                setData(usersArray);
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

    const applyFilter = () => {
        const filterValue = filter.trim().toLowerCase();
    
        if (!filterValue) {
            setFilteredData([]);
            return;
        }
    
        const filteredData = data.filter(user => {
            const matchesUsername = user.name.toLowerCase().includes(filterValue);
            const matchesInTime = user.inTime && user.inTime.toLowerCase().includes(filterValue);
            const matchesOutTime = user.outTime && user.outTime.toLowerCase().includes(filterValue);
    
            return matchesUsername || matchesInTime || matchesOutTime;
        });
    
        setFilteredData(filteredData);
    
        if (filteredData.length === 0) {
            setError("No matching users found.");
        } else {
            setError(null);
        }
    };
    
    const filterByInTime = () => {
        const inTimeFilteredData = data.filter(user => user.inTime);
        setFilteredData(inTimeFilteredData);
    };
    
    const filterByOutTime = () => {
        const outTimeFilteredData = data.filter(user => user.outTime);
        setFilteredData(outTimeFilteredData);
    };

    const openGoogleMap = (location) => {
        if (!location) {
            // No location available
            return;
        }
        const { latitude, longitude } = location;
        window.open(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`);
    };

    const downloadExcel = () => {
        let dataToDownload = filteredData.length > 0 ? filteredData : data; // Use filtered data if available
    
        // Modify data structure to include latitude and longitude for both In and Out Locations
        dataToDownload = dataToDownload.map(entry => ({
            id: entry.id,
            name: entry.name,
            date: entry.date,
            inTime: entry.inTime,
            inTimePlace: entry.inTimePlace,
            'In Location Latitude': entry.inLocation?.latitude,
            'In Location Longitude': entry.inLocation?.longitude,
            outTime: entry.outTime,
            outTimePlace: entry.outTimePlace,
            'Out Location Latitude': entry.outLocation?.latitude,
            'Out Location Longitude': entry.outLocation?.longitude,
        }));
    
        const ws = XLSX.utils.json_to_sheet(dataToDownload, {
            header: [
                "id",
                "name",
                "date",
                "inTime",
                "inTimePlace",
                "In Location Latitude",
                "In Location Longitude",
                "outTime",
                "outTimePlace",
                "Out Location Latitude",
                "Out Location Longitude",
            ]
        });
    
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'UserData');
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, 'user_data.xlsx');
    };

    return (

        <>

<div class="header">
        <h3>Navigate Your World with Precision Explore</h3>
         <h1>Orange Entry</h1> 
        <p>We are Keep <b>Locate</b> Your Foot Print</p>
      </div>
 
<div class="navbar">
    <a href="/">Home</a>
    <a href="/viewdata">User Entry</a>
    <a href="/register"> Registration</a> 
 
</div>

        <div className="containerE" >

                    
                <div class="contentE1">
               
                {loading && <p>Loading...</p>}
                {error && <p className="error">{error}</p>}
                
                     {(filteredData.length > 0 ? filteredData : data).map((entry) => (
                        <div key={entry.id} className="item">
                            <p>User: {entry.name}</p>
                            {entry.inTime && <p>In Time: {entry.inTime}</p>}
                            {entry.inTimePlace && <p>In Time Place: {entry.inTimePlace}</p>}
                            {entry.outTime && <p>Out Time: {entry.outTime}</p>}
                            {entry.outTimePlace && <p>Out Time Place: {entry.outTimePlace}</p>}
                            {entry.inLocation && (
                                <p>
                                     Latitude: {entry.inLocation.latitude}, Longitude: {entry.inLocation.longitude}
                                    <button className="button" onClick={() => openGoogleMap(entry.inLocation)}>Map</button>
                                </p>
                            )}
                            {entry.outLocation && (
                                <p>
                                     Latitude: {entry.outLocation.latitude}, Longitude: {entry.outLocation.longitude}
                                    <button className="button" onClick={() => openGoogleMap(entry.outLocation)}>Map</button>
                                </p>
                            )}
                        </div>
                    ))}
            </div>  

            <div className="contentE2">
                    <input
                        type="text"
                        placeholder="Filter by Username, In Time, or Out Time"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="input1"
                    /> 
                    
                    <div className="btn">
                    <button className="button" onClick={applyFilter}>Filter</button>
                    <button className="button" onClick={filterByInTime}>In</button>
                    <button className="button" onClick={filterByOutTime}>Out</button>
                    <button className="button" onClick={downloadExcel}>Download</button></div>
                </div>

            
     
        </div>

        
        <div class="footer">
  <h2>Orange Entry</h2>
  <p className="text1" >Welcome to OrangeEntry, where we redefine location-based experiences. <br />
  Harnessing the power of cutting-edge technology, our platform seamlessly 
  integrates GPS data, real-time timestamps, and vivid imagery to provide you <br />
  with unparalleled insights into your surroundings.
    </p>
    <h3>© 2024 Powered by MzzSj  </h3>
</div>

        </>
        
        
    );
};

export default ViewDataPage;
