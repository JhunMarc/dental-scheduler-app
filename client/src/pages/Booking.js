import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

const Booking = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [dentists, setDentists] = useState([]);
  const [date, setDate] = useState('');
  const [selectedDentist, setSelectedDentist] = useState('');
  const [message, setMessage] = useState('');
  const [existingAppointments, setExistingAppointments] = useState([]);

  // Today's date at 00:00 as min date
  const getMinDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}T00:00`;
  };

  const minDateTime = getMinDate();

  // Clinic hours: 8am to 6pm
  const clinicStartHour = 8;
  const clinicEndHour = 18;

  // Fetch dentists
  useEffect(() => {
    api.get('/dentists')
      .then(res => setDentists(res.data))
      .catch(() => setMessage('Failed to load dentists.'));
  }, []);

  // Fetching existing appointments for selected dentist and date
  useEffect(() => {
    if (selectedDentist && date) {
      // Get only date part
      const dateOnly = new Date(date).toISOString().split('T')[0];
      api.get(`/appointments?dentist=${selectedDentist}&date=${dateOnly}`) 
        .then(res => {
          setExistingAppointments(res.data);
        })
        .catch(() => {
          setMessage('Failed to load existing appointments.');
        });
    } else {
      setExistingAppointments([]);
    }
  }, [selectedDentist, date]);
  console.log(existingAppointments);
  const handleBooking = (e) => {
    e.preventDefault();

    if (!selectedDentist || !date) {
      setMessage('Please select a dentist and date.');
      return;
    }

    const selectedDate = new Date(date);
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    // Validation for date 
    if (selectedDate < todayStart) {
      setMessage('Please select a date from today onwards.');
      return;
    }

    const hours = selectedDate.getHours();
    const minutes = selectedDate.getMinutes();

    // Validate within clinic hours
    if (hours < clinicStartHour || hours >= clinicEndHour || (hours === clinicEndHour && minutes > 0)) {
      setMessage(`Please select a time between ${clinicStartHour}:00 and ${clinicEndHour}:00.`);
      return;
    }

    // Validate minutes only 00 or 30
    if (minutes !== 0 && minutes !== 30) {
      setMessage('Minutes must be 00 or 30.');
      return;
    }

    // Checking if the selected slot is already booked
    const isBooked = existingAppointments.some(appointment => {
      const apptDate = new Date(appointment.date);
      return (
        apptDate.getFullYear() === selectedDate.getFullYear() &&
        apptDate.getMonth() === selectedDate.getMonth() &&
        apptDate.getDate() === selectedDate.getDate() &&
        apptDate.getHours() === hours &&
        apptDate.getMinutes() === minutes
      );
    });
    if (isBooked) {
      setMessage('Selected time slot is already booked. Please choose another time.');
      return;
    }

    api.post('/appointments', {
      dentistId: selectedDentist,
      date,
    })
      .then(() => {
        setMessage('Appointment booked successfully!');
        setTimeout(() => {
          navigate('/user');
        }, 1500);
      })
      .catch(() => setMessage('Failed to book appointment. Selected time may have already been reserved'));
  };

  if (!auth.token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Book an Appointment</h2>
      {message && <div className="mb-4 text-red-600">{message}</div>}
      <form onSubmit={handleBooking} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block mb-1 font-semibold">Select Dentist</label>
          <select
            className="w-full border p-2 rounded"
            value={selectedDentist}
            onChange={(e) => setSelectedDentist(e.target.value)}
            required
          >
            <option value="">--Choose a dentist--</option>
            {dentists.map((d) => (
              <option key={d._id} value={d._id}>{d.name} ({d.specialization})</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Select Date & Time</label>
          <input
            type="datetime-local"
            className="w-full border p-2 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            min={minDateTime}
            step={1800}
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default Booking;