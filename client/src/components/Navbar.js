// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// const Navbar = () => {
//   const { auth, logout } = useContext(AuthContext);

//   return (
//     <nav className="bg-blue-600 p-4 flex justify-between items-center">
//       <div className="text-white font-bold text-xl">
//         <Link to="/">Dental Office</Link>
//       </div>
//       <div>
//         {auth.token ? (
//           <>
//             <button
//               onClick={logout}
//               className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
//             >
//               Logout
//             </button>
//             <Link
//               to="/dashboard"
//               className="ml-4 bg-green-500 px-3 py-1 rounded text-white hover:bg-green-600"
//             >
//               Dashboard
//             </Link>
//           </>
//         ) : (
//           <>
//             <Link
//               to="/login"
//               className="bg-green-500 px-3 py-1 rounded text-white hover:bg-green-600"
//             >
//               Login
//             </Link>
//             <Link
//               to="/register"
//               className="ml-2 bg-yellow-500 px-3 py-1 rounded text-white hover:bg-yellow-600"
//             >
//               Register
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// const Navbar = () => {
//   const { auth, logout } = useContext(AuthContext);
//   console.log(auth.token);
//   const commonButtons = () => {
//     if (!auth.token) {
//       return (
//         <>
//           <Link to="/" className="px-3 py-2 hover:bg-gray-100 rounded">Home</Link>
//           <Link to="/login" className="px-3 py-2 hover:bg-gray-100 rounded">Login</Link>
//           <Link to="/register" className="px-3 py-2 hover:bg-gray-100 rounded">Register</Link>
//         </>
//       );
//     }

//     // Logged in
//     const role = auth.user?.role;
//     if (role === 'user') {
//       return (
//         <>
//           <Link to="/" className="px-3 py-2 hover:bg-gray-100 rounded">Home</Link>
//           <Link to="/user" className="px-3 py-2 hover:bg-gray-100 rounded">Dashboard</Link>
//           <Link to="/profile" className="px-3 py-2 hover:bg-gray-100 rounded">Profile</Link>
//           <button onClick={logout} className="px-3 py-2 hover:bg-gray-100 rounded">Logout</button>
//         </>
//       );
//     }
//     if (role === 'dentist') {
//       return (
//         <>
//           <Link to="/" className="px-3 py-2 hover:bg-gray-100 rounded">Home</Link>
//           <Link to="/dentist" className="px-3 py-2 hover:bg-gray-100 rounded">Appointments</Link>
//           <Link to="/profile" className="px-3 py-2 hover:bg-gray-100 rounded">Profile</Link>
//           <button onClick={logout} className="px-3 py-2 hover:bg-gray-100 rounded">Logout</button>
//         </>
//       );
//     }
//     if (role === 'admin') {
//       return (
//         <>
//           <Link to="/" className="px-3 py-2 hover:bg-gray-100 rounded">Home</Link>
//           <Link to="/admin" className="px-3 py-2 hover:bg-gray-100 rounded">Dashboard</Link>
//           <Link to="/admin/dentists" className="px-3 py-2 hover:bg-gray-100 rounded">Dentists</Link>
//           <Link to="/admin/users" className="px-3 py-2 hover:bg-gray-100 rounded">Users</Link>
//           <button onClick={logout} className="px-3 py-2 hover:bg-gray-100 rounded">Logout</button>
//         </>
//       );
//     }
//   };

//   return (
//     <nav className="bg-blue-900 text-white p-4 flex justify-between items-center">
//       <div className="font-bold text-xl">Dental Clinic</div>
//       <div className="flex space-x-2">{commonButtons()}</div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-900 text-white p-4 flex justify-between items-center">
      <div className="font-bold text-xl">Smile Dental Clinic</div>
      <div className="flex space-x-3">
        {!auth.token ? (
          <>
            <Link to="/" className="px-3 py-2 hover:bg-gray-100 rounded">Home</Link>
            <Link to="/login" className="px-3 py-2 hover:bg-gray-100 rounded">Login</Link>
            <Link to="/register" className="px-3 py-2 hover:bg-gray-100 rounded">Register</Link>
          </>
        ) : (
          <>
            {auth.role === 'user' && (
              <>
                <Link to="/user" className="px-3 py-2 hover:bg-gray-100 rounded">Dashboard</Link> 
                <Link href="/booking" className="px-3 py-2 hover:bg-gray-100 rounded">Book</Link>
              </>
            )}
            {auth.role === 'dentist' && (
              <>
                <Link to="/dentist" className="px-3 py-2 hover:bg-gray-100 rounded">Appointments</Link> 
              </>
            )}
            {auth.role === 'admin' && (
              <>
                <Link to="/admin" className="px-3 py-2 hover:bg-gray-100 rounded">Dashboard</Link> 
              </>
            )}
            <button onClick={logout} className="px-3 py-2 hover:bg-gray-100 rounded">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;