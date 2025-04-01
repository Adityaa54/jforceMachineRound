import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
function Home() {
  const [showInput, setShowInput] = useState(false);
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
      <Navbar />
      <div className="bg-slate-400 p-10 font-mono relative flex items-center justify-center">
        <div className="bg-white rounded-lg">
          <h1 className="text-center sm:text-xl text-base md:text-3xl pt-10 m-9  text-green-600">
            Welcome to Expense tracker
          </h1>
          <div className="text-center pb-8">
            <Link
              to="/show"
              className="px-3 py-2  hover:text-pink-600 text-red-700"
            >
              All Expenses
            </Link>
            {/* <Link
              to="/addexpense"
              className="px-3 py-2  hover:text-pink-600 text text-red-700"
            >
              ADD Expenses
            </Link> */}
            <button
              onClick={() => {
                setShowInput((prev) => !prev);
              }}
              className="px-3 py-2  hover:text-pink-600 text text-red-700"
            >
              Add Expenses
            </button>
          </div>
          <h1 className="pl-6 pb-5 text-xs font-mono sm:text-lg md:text-2xl ">
            {" "}
            Track and manage your expenses effectively
          </h1>
          <div className="flex items-center justify-center ">
            <img
              src="https://static.vecteezy.com/system/resources/previews/003/602/588/non_2x/expense-tracker-app-rgb-color-icon-vector.jpg"
              className="w-1/3"
              alt=""
            />
          </div>
        </div>
        {/* ////////////////// */}

        {showInput && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
            <div className="bg-white p-6 rounded shadow-lg relative">
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
              <button onClick={()=>setShowInput((prev)=>!prev)} className="bg-red-700 rounded-full w-6 h-6 text-white absolute right-7 top-3 text-center">x</button>
             
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
