import React, { useEffect, useState } from 'react';
import api from '../utils/api';
// import { AuthContext } from '../context/AuthContext';

const UserDashboard = () => {
  // const { auth } = useContext(AuthContext);
  // const userId = auth.userId;

  const [appointments, setAppointments] = useState([]);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: '', email: '' });

  useEffect(() => {
    api.get('/appointments').then((res) => {
      setAppointments(res.data);
      setLoading(false);
    });
    api.get('/users/me').then((res) => {
      setProfile(res.data);
      setForm({ name: res.data.name, email: res.data.email, password: res.data.password });
    });
  }, []);

  const handleCancel = async (id) => {
    if (window.confirm('Cancel this appointment?')) {
      try {
        await api.delete(`/appointments/${id}`);  
        setAppointments(appointments.filter((a) => a._id !== id));
         alert('Cancelled Successfully');
      } catch {
        alert('Failed to cancel');
      }
    }
  };

  const handleUpdateProfile = async () => {
    await api.put('/users/me', form);
    setProfile({ ...profile, ...form });
    setEditMode(false);
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-6">
      {/* Profile */}
      <h2 className="text-3xl font-bold mb-4 text-blue-700">My Profile</h2>
      {!editMode ? (
        <div className="bg-white p-4 rounded shadow">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <button className="mt-2 bg-green-500 px-4 py-2 rounded text-white" onClick={() => setEditMode(true)}>
            Edit Profile
          </button>
        </div>
      ) : (
        <div className="bg-white p-4 rounded shadow space-y-2">
          <input
            className="w-full border p-2 rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Name"
          />
          <input
            className="w-full border p-2 rounded"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
          />
           <input
            className="w-full border p-2 rounded"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Password"
          />
          <div className="flex space-x-2 mt-2">
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white" onClick={handleUpdateProfile}>Save</button>
            <button className="bg-gray-400 hover:bg-gray-500 px-4 py-2 rounded" onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        </div>
      )}
      <a href="/booking" className="block w-3/12 bg-blue-400 hover:bg-blue-600 px-4 py-2 rounded text-white font-semibold mb-4">Book Appointment</a>
      
      <h2 className="text-3xl font-bold mb-4 text-blue-700">My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments scheduled.</p>
      ) : (
        <table className="w-full border border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Dentist</th>
              <th className="border px-3 py-2">Date</th>
              <th className="border px-3 py-2">Status</th>
              <th className="border px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a._id}>
                <td className="border px-3 py-2">{a.dentist.name}</td>
                <td className="border px-3 py-2">{new Date(a.date).toLocaleString()}</td>
                <td className="border px-3 py-2">{a.status}</td>
                <td className="border px-3 py-2 space-x-2">
                  <button
                    className="bg-yellow-400 hover:bg-yellow-500 px-2 py-1 rounded"
                    onClick={() => {
                      const newDate = prompt('Reschedule to (YYYY-MM-DD):', a.date.slice(0, 10));
                      if (newDate) {
                        api.put(`/appointments/${a._id}`, { date: newDate }).then(() => {
                          setAppointments(appointments.map((ap) => (ap._id === a._id ? { ...ap, date: new Date(newDate).toISOString() } : ap)));
                        });
                      }
                    }}
                  >
                    Reschedule
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 px-2 py-1 rounded text-white" onClick={() => handleCancel(a._id)}>Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserDashboard;