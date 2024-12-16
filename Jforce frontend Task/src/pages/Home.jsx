import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../component/Navbar'
function Home() {
  return (
    <>
    <Navbar/>
    <div className='bg-slate-400 p-10 font-mono'>
      <div className='bg-white rounded-lg'>
        <h1 className='text-center sm:text-xl text-base md:text-3xl pt-10 m-9  text-green-600'>Welcome to Expense tracker</h1>
        <div className='text-center pb-8'>
        <Link to="/show" className="px-3 py-2  hover:text-pink-600 text-red-700">All Expenses</Link>
        <Link to="/addexpense" className="px-3 py-2  hover:text-pink-600 text text-red-700">ADD Expenses</Link>
        </div>
        <h1 className='pl-6 pb-5 text-xs font-mono sm:text-lg md:text-2xl '> Track and manage your expenses effectively</h1>
        <div className='flex items-center justify-center '>
          <img src="https://static.vecteezy.com/system/resources/previews/003/602/588/non_2x/expense-tracker-app-rgb-color-icon-vector.jpg" className='w-1/3' alt="" />
        </div>
      </div>

    </div>
    </>
    
  )
}

export default Home