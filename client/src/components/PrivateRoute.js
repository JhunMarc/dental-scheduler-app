import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ role }) => {
  const { auth, loading } = useContext(AuthContext);
  
  if (loading) return null;

  if (!auth.token) return <Navigate to="/login" />;
  if (role && auth.role !== role) return <Navigate to="/" />; // access control

  return <Outlet />;
};


export default PrivateRoute;