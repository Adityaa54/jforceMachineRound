import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
function Register() {
  const [username, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/register", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, phone, email, password })
      });
      
      if (!res.ok) {
        alert("User already exists");
      }else{
        alert("user succsecsfully register");
        navigate('/login');
      }

    } catch (error) {
      alert(error);
    }
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
    
//     console.log('Data to be sent:', { username, phone, email, password });
  
//     try {
//       const res = await fetch("http://localhost:3000/register", {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, phone, email, password }),
//       });
  
//       if (!res.ok) {
//         // const errorResponse = await res.json();  
//         // console.log('Error Response:', errorResponse);
//         alert('User already exists or invalid data');
//       } else {
//         // const responseData = await res.json();  
//         // console.log('Success Response:', responseData);
//         alert('Registration successful');
//       }
//     } catch (error) {
//       console.error('Request failed:', error);
//       alert('An error occurred during the request');
//     }
//   };

  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="w-80 p-6 bg-white rounded shadow">
        <h2 className="text-xl text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            Username
            <input
              type="name"
              id="name"
              value={username}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            Phone
            <input
              type="phone"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            Email
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            Password
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded"
          >
            Register
          </button>
        </form>
      </div>
    </div>
    </>
    
  );
}

export default Register;