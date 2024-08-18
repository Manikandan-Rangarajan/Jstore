import React from 'react'
import Jokerbg from '../assets/Jokerbackground-modified.png'
import Navbar from './Navbar'
import Panda from '../assets/Panda.jpg'

function home() {

  console.log(Jokerbg)

  return (
    <>
     <Navbar/>
       <div style={{ backgroundImage: `url(${Panda})` }} className="bg-no-repeat bg-cover flex flex-col items-center justify-between min-h-screen bg-gray-50 text-center">
      <div className="flex flex-wrap gap-6 justify-center text-justify mt-20" >
      <div className="w-[650px] h-[400px] m-[20px] p-6 bg-white/10 backdrop-blur-3xl rounded-lg shadow-lg flex flex-wrap items-center justify-center text-lg text-orange-200 text-2xl transform hover:scale-105 hover:shadow-2xl hover:backdrop-blur-[40px] transition-all duration-300 ease-in-out border border-white/20">
          <ul className='opacity-100 font-bold text-2xl '>
            <li><p>Welcome to Jstore, your one-stop destination for affordable and innovative projects tailored to your academic needs. We specialize in providing high-quality mini-projects and full-scale projects
             that are crafted with precision and care. Whether you're looking to get 
            ahead in your coursework or seeking inspiration for your next big idea, Jstore has you covered.</p></li>
          </ul>
        </div>
        <div className="w-[650px] h-[400px] m-[20px] p-6 bg-white/10 backdrop-blur-3xl rounded-lg shadow-lg flex flex-wrap items-center justify-center text-lg text-orange-200 text-2xl transform hover:scale-105 hover:shadow-2xl hover:backdrop-blur-[40px] transition-all duration-300 ease-in-out border border-white/20">
        <ul className='opacity-100 font-bold text-2xl '>
            <li><p>At Jstore, we offer products tailored to academic needs. Our mini-projects, including code and documentation, are available for just 100 INR, ideal for quick, effective solutions. For more comprehensive projects, get full code and documentation at 350 INR. Each product is designed to meet and exceed academic standards, helping you excel in your studies.</p></li>
          </ul>
        </div>
        <div className="w-[650px] h-[400px] m-[20px] p-6 bg-white/10 backdrop-blur-3xl rounded-lg shadow-lg flex flex-wrap items-center justify-center text-lg text-orange-200 text-2xl transform hover:scale-105 hover:shadow-2xl hover:backdrop-blur-[40px] transition-all duration-300 ease-in-out border border-white/20">
        <ul className='opacity-100 font-bold text-2xl'>
          <li><p>
          Jstore is powered by JokerPanda, a creative team dedicated to pushing the boundaries of traditional education. Although our products aren't officially approved by college staff, we focus on delivering value and innovation to students eager to learn and grow. At Jstore, you’ll find the tools and resources to excel in your academic journey, all while keeping your budget in check.</p></li>
          </ul>
        </div>
      </div>
    </div>
   </>
  )
}

export default home
