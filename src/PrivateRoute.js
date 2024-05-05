import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Assuming you have an AuthContext for managing authentication state

const PrivateRoute = ({ element, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  // Check if user is logged in and has the required role
  if (!user || !allowedRoles.includes(user.role)) {
    // Redirect to login page if user is not logged in
    return <Navigate to="/login" />;
  }

  // Render the route if user is logged in and has the required role
  return <Route element={element} />;
};

export default PrivateRoute;
