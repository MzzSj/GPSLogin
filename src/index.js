import React from 'react';
import ReactDOM from 'react-dom/client'; // Change the import to react-dom/client
import App from './App';
import { AuthProvider } from './AuthContext';
 
const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot instead of render
root.render(
  <AuthProvider>
  <App />
</AuthProvider>
);
 


// const https = require('https');
// const fs = require('fs');
// const express = require('express');

// const app = express();

// // Load SSL certificate and key
// const privateKey = fs.readFileSync('/path/to/private-key.pem', 'utf8');
// const certificate = fs.readFileSync('/path/to/certificate.pem', 'utf8');
// const ca = fs.readFileSync('/path/to/ca.pem', 'utf8'); // Optional: Certificate Authority chain

// const credentials = {
//     key: privateKey,
//     cert: certificate,
//     ca: ca // Optional
// };

// // Create HTTPS server
// const httpsServer = https.createServer(credentials, app);

// // Start server
// httpsServer.listen(443, () => {
//     console.log('Server running on port 443');
// });
