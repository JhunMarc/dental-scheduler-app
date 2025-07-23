import React, { useEffect, useState, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const DentistPage = () => {
  const { auth } = useContext(AuthContext);
  const dentistId = auth.userId; // Logged-in dentist's ID
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    api.get('/appointments/all').then((res) => {
      const filtered = res.data.filter((a) => a.dentist._id === dentistId);
      setAppointments(filtered);
    });
  }, [dentistId]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Your Appointments</h2>
      {appointments.length === 0 ? (
        <p>No scheduled appointments.</p>
      ) : (
        <table className="w-full border border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Patient</th>
              <th className="border px-3 py-2">Date</th>
              <th className="border px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a._id}>
                <td className="border px-3 py-2">{a.user.name}</td>
                <td className="border px-3 py-2">{new Date(a.date).toLocaleString()}</td>
                <td className="border px-3 py-2">{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DentistPage;