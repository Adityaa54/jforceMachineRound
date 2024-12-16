import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Show() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    const fetchExpenses = async () => {
      const res = await fetch(
        `http://localhost:3000/expenses/${localStorage.getItem("userId")}`
      );
      if (res.ok) {
        const Expenses = await res.json();
        console.log(Expenses);
        setExpenses(Expenses);
      } else {
        navigate("/login");
      }
    };
    fetchExpenses();
  }, []);
  return (
    <>
      <Navbar />

      {expenses.length==0 ? (
        <div className="h-screen font-mono flex items-center justify-center text-center">
          <div className="text-3xl">No data found</div></div>
      ) : (
        <div className="bg-slate-300 font-mono h-screen p-10">
          <div className="bg-white rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-5">
            {expenses.map((exp, index) => {
              return (
                <div key={index}>
                  <div className="pb-5 relative">
                    <span className="text-base text-green-500 bg-slate-200 p-1 rounded-lg ">
                      {exp.expensename}
                    </span>
                    <br />
                    <span className="text-red-700">Price:{exp.amount}</span>
                    <br />
                    <span>Date:---   {exp.date.slice(0, 10)}</span><br/>
                    <span>Time:---   {exp.date.slice(11,19)}</span>
                    <br />
                    <Link
                      to={`/update/${exp._id}/${exp.expensename}/${exp.amount}/${exp.description}`}
                      className="hover:text-pink-600 text-blue-700"
                    >
                      Click herre to update
                    </Link>
                    {/* <div className="rounded-full w-6 h-6  bg-red-700 font-bold text-white text-center absolute right-7 top-2 inline-block">X</div> */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Show;
