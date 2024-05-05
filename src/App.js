// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './HomeScreen';
import ViewDataPage from './ViewDataPage';
import Crud from './Crud';
import LoginScreen from './LoginScreen';
import RegistrationScreen from './RegistrationScreen';
import Admin from './Admin';
import NotFoundPage from './NotFoundPage'; // Import your 404 page component
import InTimePage from './InTimePage'; // Import your InTimePage component
import OutTimePage from './OutTimePage'; // Import your OutTimePage component

const App = () => {
  return (
    <Router>
      <Routes basename="HomeScreen">
        <Route path="/" element={<HomeScreen />} />
        <Route path="/view-data" element={<ViewDataPage />} />
        <Route path="/crud" element={<Crud />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegistrationScreen />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/time-in" element={<InTimePage />} /> {/* Route for Time In page */}
        <Route path="/time-out" element={<OutTimePage />} /> {/* Route for Time Out page */}
        {/* Add a catch-all route for 404 page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
