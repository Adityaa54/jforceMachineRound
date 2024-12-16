import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Show() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [toTal, setTotal] = useState(0);
  const userId = localStorage.getItem("userId");
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


    useEffect(() => {
      const calculatedTotal = expenses.reduce(
        (acc, expense) => acc + expense.amount,
        0
      );
      setTotal(calculatedTotal);
    }, [expenses]);



  const removeExpenses = async(exp)=>{
    console.log("hits")
    try {
      const response = await fetch(`http://localhost:3000/expenses/${exp}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete the blog");
      }
   
      
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense._id !== exp)
      );
    } catch (error) {
      console.error("Error deleting Expenses:", error);
    }
  }

  const sortExpenses = (i) => {
    if(i==0){
    const sortedExpenses = [...expenses].sort((a, b) => a.amount - b.amount);
    setExpenses(sortedExpenses); 
    }else{
      const sortedExpenses = [...expenses].sort((b, a) => a.amount - b.amount);
    setExpenses(sortedExpenses); 
    }
  };
  
  return (
    <>
      <Navbar />
      {expenses.length==0 ? (
        <div className="h-screen font-mono flex items-center justify-center text-center">
          <div className="text-3xl">No data found</div></div>
      ) : (
        <div className="bg-slate-300 font-mono h-screen p-10 ">
          <button onClick={()=>{ sortExpenses(0) }} className="w-20 h-5 bg-red-500 hover:bg-red-800 mb-5 text-sm text-center rounded-lg text-white mr-4">L to H</button>
          <button onClick={()=>{ sortExpenses(1) }} className="w-20 h-5 bg-red-500 hover:bg-red-800 mb-5 text-sm text-center rounded-lg text-white ">L to H</button>
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
                    <button onClick={()=>{removeExpenses(exp._id)}} className="rounded-full w-6 h-6  bg-red-700 font-bold text-white text-center absolute right-7 top-2 inline-block">X</button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-5"> Total: {toTal}</div>
        </div>
      )}
    </>
  );
}

export default Show;
