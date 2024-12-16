import React from 'react'
import Navbar from '../component/Navbar'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
function Update() {
  const { id, exp, amoun, des } = useParams();
  const navigate = useNavigate();
  

  const [amount, setamount] = useState('');
  const [description, setdescription] = useState('');
  const [expensename, setexpensename] = useState('');

  
  useEffect(() => {
    if (exp && amoun && des) {
      setamount(amoun);
      setdescription(des);
      setexpensename(exp);
    }
  }, [exp, amoun, des]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(amount," ", description, " ", expensename)
    try {
      const res = await fetch(`http://localhost:3000/expenses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expensename, amount, description })
      });
      
      if (!res.ok) {
        alert("Something went wrong");
      }else{
        alert("Expenses suscessfully updated");
        navigate('/show');
      }

    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
    
    <Navbar/>
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="w-80 p-6 bg-white rounded shadow">
        <h2 className="text-xl text-center mb-4">Update Expense</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            amount
            <input
              type="number"
              value={amount}
              onChange={(e) => setamount(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
          description
            <input
              type="description"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
          expensename
            <input
              type="expensename"
              value={expensename}
              onChange={(e) => setexpensename(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded"
          >
            Update
          </button>
        </form>
      </div>
    </div></>
    
  )
}

export default Update