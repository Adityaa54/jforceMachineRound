import { useState, useCallback } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Show from './pages/Show'
import Update from './pages/Update'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom';
import AddExpenses from './pages/AddExpenses'
import Footer from './component/Footer'
function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/show" element={<Show/>} />
        <Route path="/update/:id/:exp/:amoun/:des" element={<Update />} />
        <Route path="/addexpense" element={<AddExpenses />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
