import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log({ email, password });

    try {
        
        const res = await fetch("http://localhost:3000/login",{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email,password})
        })
        const result = await res.json();
        console.log("hello aditya",result.data._id);
        localStorage.setItem('userId',result.data._id)
        if(!res.ok){
            alert("please check the credentials");
        }
        if(res.ok){
            alert("login succsess fully");
            navigate('/')
        }
        
    } catch (error) {
        alert("Credentials wrong please check your your credentials");
    }
  };

  return (

    <>
    <Navbar/>
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="w-80 p-6 bg-white rounded shadow">
        <h2 className="text-xl text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
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
              onChange={(e) =>{
                console.log(email," ", password);
                setPassword(e.target.value)
              }}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
    </>
    
  );
}

export default Login;