
// 2 calumn view 2 unic id  
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx'; // Import XLSX library
import backgroundImage from './bgimg.jpg';
import backgroundVideo from './Bgv.mp4';
import './styles.css';

const ViewDataPage = () => {
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
        <div className="container">
            <video autoPlay muted loop className="videoBackground">
                <source src={backgroundVideo} type="video/mp4" />
                <img src={backgroundImage} alt="Background" className="imageFallback" />
            </video>
            <div className="content">
                <h1 className="heading">User Data</h1>

                {loading && <p>Loading...</p>}
                {error && <p className="error">{error}</p>}
                <div className="filter-container">
                    <input
                        type="text"
                        placeholder="Filter by Username, In Time, or Out Time"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="input"
                    />
                    <button className="button" onClick={applyFilter}>Filter</button>
                    <button className="button" onClick={filterByInTime}>Filter by In Time</button>
                    <button className="button" onClick={filterByOutTime}>Filter by Out Time</button>
                    <button className="button" onClick={downloadExcel}>Download Excel</button>
                </div>
                <div className="list-container">
                    {(filteredData.length > 0 ? filteredData : data).map((entry) => (
                        <div key={entry.id} className="item">
                            <p>User: {entry.name}</p>
                            {entry.inTime && <p>In Time: {entry.inTime}</p>}
                            {entry.inTimePlace && <p>In Time Place: {entry.inTimePlace}</p>}
                            {entry.outTime && <p>Out Time: {entry.outTime}</p>}
                            {entry.outTimePlace && <p>Out Time Place: {entry.outTimePlace}</p>}
                            {entry.inLocation && (
                                <p>In Location: Latitude: {entry.inLocation.latitude}, Longitude: {entry.inLocation.longitude}</p>
                            )}
                            {entry.outLocation && (
                                <p>Out Location: Latitude: {entry.outLocation.latitude}, Longitude: {entry.outLocation.longitude}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewDataPage;



// one column view 2 uic id 
// import React, { useState, useEffect } from 'react';
// import { getDatabase, ref, onValue } from 'firebase/database';
// import backgroundImage from './bgimg.jpg';
// import backgroundVideo from './Bgv.mp4';
// import './styles.css';

// const ViewDataPage = () => {
//     const [userData, setUserData] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const fetchData = async () => {
//         setLoading(true);
//         setError(null);

//         try {
//             const database = getDatabase();
//             const usersRef = ref(database, 'users');

//             const unsubscribe = onValue(usersRef, (snapshot) => {
//                 const usersData = snapshot.val() || {};

//                 setUserData(usersData);
//                 setLoading(false);
//             });

//             return () => unsubscribe();
//         } catch (error) {
//             setError(error.message);
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     return (
//         <div className="container">
//             <video autoPlay muted loop className="videoBackground">
//                 <source src={backgroundVideo} type="video/mp4" />
//                 <img src={backgroundImage} alt="Background" className="imageFallback" />
//             </video>
//             <div className="content">
//                 <h1 className="heading">User Data</h1>

//                 {loading && <p>Loading...</p>}
//                 {error && <p className="error">{error}</p>}
//                 <div className="list-container">
//                     {Object.entries(userData).map(([userName, userData]) => (
//                         <div key={userName} className="item">
//                             {Object.entries(userData).map(([entryKey, entryData]) => (
//                                 <div key={entryKey}>
//                                     <p>User: {userName}</p>
//                                     {entryData.inTime && (
//                                         <>
//                                             <p>In Time: {entryData.inTime}</p>
//                                             <p>In Time Place: {entryData.inTimePlace}</p>
//                                             {entryData.inLocation && (
//                                                 <p>In Location: Latitude: {entryData.inLocation.latitude}, Longitude: {entryData.inLocation.longitude}</p>
//                                             )}
//                                         </>
//                                     )}
//                                     {entryData.outTime && (
//                                         <>
//                                             <p>Out Time: {entryData.outTime}</p>
//                                             <p>Out Time Place: {entryData.outTimePlace}</p>
//                                             {entryData.outLocation && (
//                                                 <p>Out Location: Latitude: {entryData.outLocation.latitude}, Longitude: {entryData.outLocation.longitude}</p>
//                                             )}
//                                         </>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ViewDataPage;
