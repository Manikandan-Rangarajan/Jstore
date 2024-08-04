import { useState } from 'react'
import './App.css'
import Register from './componenets/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 text-xl'>
        <Register className="justify-center items-center"/>
       </div>
    </>
  )
}

export default App
