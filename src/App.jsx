import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link  } from 'react-router-dom'
import './App.css'
import Register from './componenets/Register'
import Projects from './componenets/Projects'
import Navbar from './componenets/Navbar'
import Pricing from './componenets/Pricing'
import MyProjects from './componenets/MyProjects'
import Home from './componenets/Home'
import Logout from './componenets/Logout'
import React from 'react';
import SignIn from './componenets/SignIn'
import Dummy from './componenets/Dummy'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      
         {/* <Navbar/> */}
      <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 text-xl overflow-y-hidden'>
       <Routes>
       
          <Route path="/logout" element={<Logout />} />
          <Route path="/home" element={<Home />} />
          <Route path="/MyProjects" element={<MyProjects />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/" element={<Register />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/api/names" element={<Dummy />} />
                {/* redirects unmatched path to home
                <Route path="*" element={<Navigate to="/" />} />  */}
        </Routes>
       </div>
    </Router>
  )
}

export default App
