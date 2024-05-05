import React from 'react';
import ReactDOM from 'react-dom/client'; // Change the import to react-dom/client
import './index.css';
import App from './App';
import { AuthProvider } from './AuthContext';
 
const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot instead of render
root.render(
  <AuthProvider>
  <App />
</AuthProvider>
);
 


