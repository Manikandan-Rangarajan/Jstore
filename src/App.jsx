import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link  } from 'react-router-dom'
import './App.css'
import Register from './componenets/Register'
import Projects from './componenets/Projects'
import Navbar from './componenets/Navbar'
import Pricing from './componenets/Pricing'
import AboutUs from './componenets/AboutUs'
import Home from './componenets/Home'
import Logout from './componenets/Logout'
import React from 'react';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      
         {/* <Navbar/> */}
      <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 text-xl overflow-y-hidden'>
       <Routes>
       
          <Route path="/logout" element={<Logout />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/" element={<Register />} />
                {/* redirects unmatched path to home
                <Route path="*" element={<Navigate to="/" />} />  */}
        </Routes>
       </div>
    </Router>
  )
}

export default App
