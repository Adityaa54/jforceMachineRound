import React from "react";
import Navbar from "../component/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function AddExpenses() {
  const navigate = useNavigate();
  const [expensename, setexpensename] = useState("");
  const [amount, setamount] = useState("");
  const [description, setdescription] = useState("");
  const [userId, setuserId] = useState(localStorage.getItem("userId"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expensename, amount, description, userId }),
      });

      if (!res.ok) {
        alert("not added");
      } else {
        alert("added succsesfully");
        navigate("/show");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      {!userId ? (
        <>
          <Navbar />
          <div className="flex bg-slate-200 font-mono flex-col items-center justify-center h-screen text-red-600 text-3xl font-bold">
              <img
                src="https://cdn0.iconfinder.com/data/icons/avatar-basic-colors-doodle-1/91/Avatar__Basic_Doodle_C-05-512.png"
                alt=""
                className="w-1/5"
              />
            
            <div className="text-xs sm:text-base md:text-5xl">Please Log in first</div>
          </div>
        </>
      ) : (
        <>
          <Navbar />
          <div className="flex font-mono justify-center items-center h-screen bg-gray-200">
            <div className="w-80 p-6 bg-white rounded shadow">
              <h2 className="text-xl text-center mb-4">Add Expense</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  expensename
                  <input
                    type="expensename"
                    id="expensename"
                    value={expensename}
                    onChange={(e) => setexpensename(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  amount
                  <input
                    type="amount"
                    id="amount"
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
                    id="description"
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-500 text-white rounded"
                >
                  AddExpense
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AddExpenses;
