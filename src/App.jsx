import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link  } from 'react-router-dom'
import './App.css'
import Register from './components/Register'
import Projects from './components/Projects'
import Navbar from './components/Navbar'
import Pricing from './components/Pricing'
import AboutUs from './components/AboutUs'
import Home from './components/Home'
import Logout from './components/Logout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      
      <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 text-xl overflow-y-hidden'>
         <Navbar/>
        <Register className="justify-center items-center"/>
        <Home />
        
       <AboutUs />
       <Pricing />
       <Projects />
       </div>
       <Routes>
       
          <Route path="/" element={<Logout />} /> 
          <Route path="/home" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/projects" element={<Projects/>} />
          <Route path="/register" element={<Register />} />
                {/* redirects unmatched path to home
                <Route path="*" element={<Navigate to="/" />} />  */}
        </Routes>
    </Router>
  )
}

export default App
