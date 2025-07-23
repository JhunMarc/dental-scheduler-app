// import React from 'react';

// const Home = () => (
//   <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4 text-center">
//     <h1 className="text-4xl font-bold text-blue-800 mb-4">Welcome to Our Dental Clinic</h1>
//     <p className="text-lg mb-4 text-gray-700">Providing quality dental care for your smile.</p>
//     <a
//       href="/booking"
//       className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white font-semibold"
//     >
//       Book Appointment
//     </a>
//   </div>
// );

// export default Home;

import React from 'react';

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 font-sans">
    {/* Header */}
    <header className="text-center mb-8">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
        Welcome to Smile Dental Clinic
      </h1>
      <p className="text-lg md:text-xl text-gray-700 mb-6">
        Committed to giving you a healthier, brighter smile with top-quality dental care.
      </p>
      <a
        href="/booking"
        className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg text-white font-semibold text-lg transition duration-300"
      >
        Book Appointment
      </a>
    </header>

    {/* Services Section */}
    <section className="w-full max-w-6xl mb-10 px-4">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8 text-gray-800">
        Our Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Service 1 */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
          <img
            src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-4.0.8&auto=format&fit=crop&w=800&q=80"
            alt="Teeth Cleaning"
            className="w-full h-48 object-cover rounded mb-4"
          />
          <h3 className="text-xl font-semibold mb-2 text-blue-700">Teeth Cleaning</h3>
          <p className="text-gray-600 text-sm">
            Gentle and thorough cleaning to keep your teeth healthy and bright.
          </p>
        </div>
        {/* Service 2 */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
          <img
            src="https://images.unsplash.com/photo-1593022356769-11f762e25ed9?ixlib=rb-4.0.8&auto=format&fit=crop&w=800&q=80"
            alt="Dental Implants"
            className="w-full h-48 object-cover rounded mb-4"
          />
          <h3 className="text-xl font-semibold mb-2 text-blue-700">Dental Implants</h3>
          <p className="text-gray-600 text-sm">
            Restore your smile with durable and natural-looking dental implants.
          </p>
        </div>
        {/* Service 3 */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
          <img
            src="https://images.unsplash.com/photo-1620775997780-a01e050a9db4?ixlib=rb-4.0.8&auto=format&fit=crop&w=800&q=80"
            alt="Braces & Orthodontics"
            className="w-full h-48 object-cover rounded mb-4"
          />
          <h3 className="text-xl font-semibold mb-2 text-blue-700">Braces & Orthodontics</h3>
          <p className="text-gray-600 text-sm">
            Straighten your teeth and improve your bite with our orthodontic solutions.
          </p>
        </div>
      </div>
    </section>

    {/* About / Text Section */}
    <section className="w-full max-w-4xl px-4 mb-10 text-center">
      <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-800">
        Your Smile, Our Priority
      </h2>
      <p className="text-gray-700 text-lg mb-6">
        At our dental clinic, we combine expert care with state-of-the-art technology to ensure
        every patient leaves with a healthier and more confident smile. Schedule your appointment today and experience the difference!
      </p>
    </section>
  </div>
);

export default Home;