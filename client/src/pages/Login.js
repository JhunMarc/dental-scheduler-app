import React, { useState, useContext } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      login(res.data.token);
      const decoded = JSON.parse(atob(res.data.token.split('.')[1]));
      if (decoded.role === 'admin') navigate('/admin');
      else if (decoded.role === 'dentist') navigate('/dentist');
      else navigate('/user');
    } catch (err) {
      setError('Invalid login credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">Login</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border p-2 rounded"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full border p-2 rounded"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;