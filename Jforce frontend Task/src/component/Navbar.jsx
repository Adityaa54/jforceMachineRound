import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    const user = localStorage.getItem('userId');
    if (user) {
      setLogin(true);
    }
  }, []);

  const LogOut = () => {
    localStorage.removeItem('userId'); 
    setLogin(false); 
    navigate('/login'); 
  };

  return (
    <div className="flex font-mono flex-wrap items-center justify-between p-4 bg-black border-b border-b-green-50">
      <div className="text-white font-medium text-lg hidden md:block">
        Expense Tracker
      </div>

      <div className="flex flex-wrap space-x-4 text-xs sm:text-base md:text-lg">
        {login ? (
          <>
            <Link to="/" className="px-1 py-2 text-white hover:text-pink-600">Home</Link>
            <Link to="/addexpense" className="px-1 py-2 text-white hover:text-pink-600">Add Expenses</Link>
            <Link to="/show" className="px-1 py-2 text-white hover:text-pink-600">All Expenses</Link>
          </>
        ) : (
          <>
            
          </>
        )}
      </div>

  
      <div className="flex space-x-4 text-xs sm:text-sm">
        {login ? (
          <div onClick={LogOut} className="px-3 py-2 text-white hover:text-pink-600">Logout</div>
        ) : (
          <>
            <Link to="/login" className="px-3 py-2 text-white hover:text-pink-600">Login</Link>
            <Link to="/register" className="px-3 py-2 text-white hover:text-pink-600">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;