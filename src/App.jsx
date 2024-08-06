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

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      
      <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 text-xl'>
         <Navbar/>
        <Register className="justify-center items-center"/>
       </div>
       <Home />
       <AboutUs />
       <Pricing />
       <Projects />
       <Routes>

          <Route path="/home" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/" element={<Logout />} />
                {/* redirects unmatched path to home
                <Route path="*" element={<Navigate to="/" />} />  */}
        </Routes>
    </Router>
  )
}

export default App
