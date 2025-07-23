import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import DentistDashboard from './pages/DentistDashboard.js';
import Booking from './pages/Booking';
import ProtectedRoute from './components/ProtectedRoute';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
     <AuthProvider>
      <Router>
        <Navbar />
        <div className="p-4 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
  
            <Route element={<PrivateRoute roles={['user']} />}>
              <Route path="/user" element={<UserDashboard />} />
              <Route path="/booking" element={<Booking />} />
            </Route>
  
            <Route element={<PrivateRoute roles={['admin']} />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
  
            <Route element={<PrivateRoute roles={['dentist']} />}>
              <Route path="/dentist" element={<DentistDashboard />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
    
  );
}

export default App;