import React from 'react'

function home() {
  return (
    <>
       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-5xl font-bold mb-8 text-gray-800">Jstore</h1>
      <div className="flex flex-wrap gap-6 justify-center">
        <div className="w-48 h-48 bg-red-300 rounded-lg shadow-lg flex items-center justify-center text-lg text-gray-700 transform hover:rotate-x-12 hover:rotate-y-12 transition-transform duration-300">
          Section 1
        </div>
        <div className="w-48 h-48 bg-yellow-300 rounded-lg shadow-lg flex items-center justify-center text-lg text-gray-700 transform hover:rotate-x-12 hover:rotate-y-12 transition-transform duration-300">
          Section 2
        </div>
        <div className="w-48 h-48 bg-green-300 rounded-lg shadow-lg flex items-center justify-center text-lg text-gray-700 transform hover:rotate-x-12 hover:rotate-y-12 transition-transform duration-300">
          Section 3
        </div>
        <div className="w-48 h-48 bg-teal-300 rounded-lg shadow-lg flex items-center justify-center text-lg text-gray-700 transform hover:rotate-x-12 hover:rotate-y-12 transition-transform duration-300">
          Section 4
        </div>
      </div>
    </div>
   </>
  )
}

export default home
