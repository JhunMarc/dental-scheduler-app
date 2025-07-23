import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, dentists: 0, appointments: 0 });
  const [dentists, setDentists] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/stats/users/count').then((res) => {
      setStats((prev) => ({ ...prev, users: res.data.count }));
    });
    api.get('/stats/dentists/count').then((res) => {
      setStats((prev) => ({ ...prev, dentists: res.data.count }));
    });
    api.get('/stats/appointments/count').then((res) => {
      setStats((prev) => ({ ...prev, appointments: res.data.count }));
    });
    api.get('/dentists').then((res) => setDentists(res.data));
    api.get('/users').then((res) => setUsers(res.data));
  }, []);

  const handleAddDentist = () => {
    const name = prompt('Dentist Name:');
    const specialization = prompt('Specialization:');
    const password = prompt('Password for Dentist:');
    if (name && password) {
      api.post('/dentists', { name, specialization, password }).then(() => {
        api.get('/dentists').then((res) => setDentists(res.data));
      });
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto space-y-4">
      <h2 className="text-3xl font-bold mb-4 text-blue-900">Admin Dashboard</h2>
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        <div className="bg-gray-800 text-white p-4 rounded shadow text-center">
          <h3 className="text-2xl">{stats.users}</h3>
          <p>Users</p>
        </div>
        <div className="bg-gray-800 text-white p-4 rounded shadow text-center">
          <h3 className="text-2xl">{stats.dentists}</h3>
          <p>Dentists</p>
        </div>
        <div className="bg-gray-800 text-white p-4 rounded shadow text-center">
          <h3 className="text-2xl">{stats.appointments}</h3>
          <p>Appointments</p>
        </div>
      </div>
      <button
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white mb-4"
        onClick={handleAddDentist}
      >
        Add Dentist
      </button>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Dentists</h3>
          {dentists.map((d) => (
            <div key={d._id} className="border-b py-2">
              {d.name} ({d.specialization})
            </div>
          ))}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Users</h3>
          {users.map((u) => (
            <div key={u._id} className="border-b py-2">
              {u.name} ({u.email})
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;