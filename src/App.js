import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './HomeScreen';
import ViewDataPage from './ViewDataPage';
import Crud from './Crud';
import LoginScreen from './LoginScreen';
import RegistrationScreen from './RegistrationScreen';
import NotFoundPage from './NotFoundPage';
import Adminmid from './Adminmid';
import OutTimePage from './OutTimePage';
import InTimePage from './InTimePage';

const App = () => {
  useEffect(() => {
    const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
    console.log('App loaded in:', loadTime, 'milliseconds');
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/viewdata" element={<ViewDataPage />} />
        <Route path="/crud" element={<Crud />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegistrationScreen />} />
        <Route path="/Adminmid" element={<Adminmid />} />
        <Route path="/time-out" element={<OutTimePage />} />
        <Route path="/time-in" element={<InTimePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
