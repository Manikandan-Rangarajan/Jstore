import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link  } from 'react-router-dom'
import './App.css'
import Register from './componenets/Register'
import Navbar from './componenets/Navbar'
import AboutUs from './componenets/AboutUs'
import Pricing from './componenets/Pricing'
import Projects from './componenets/Projects'
import Logout from './componenets/Logout'
import Home from './componenets/Home'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      
      <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 text-xl'>
         <Navbar/>
        <Register className="justify-center items-center"/>
       </div>
       <Routes>
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/" element={<Home />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
    </Router>
  )
}

export default App
