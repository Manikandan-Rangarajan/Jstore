import React from 'react'

function home() {
  return (
    <>
       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-5xl font-bold mb-8 text-gray-800">Jstore</h1>
      <div className="flex flex-col flex-wrap gap-6 justify-center">
        <div className="w-[650px] h-[300px] m-[20px] bg-red-300 rounded-lg shadow-lg flex flex-col items-center justify-center text-lg text-gray-700 transform hover:rotate-x-12 hover:rotate-y-12 transition-transform duration-300">
          <ul>
            <li><p>Welcome to Jstore, your one-stop destination for affordable and innovative projects tailored to your academic needs. We specialize in providing high-quality mini-projects and full-scale projects
             that are crafted with precision and care. Whether you're looking to get 
            ahead in your coursework or seeking inspiration for your next big idea, Jstore has you covered.</p></li>
          </ul>
        </div>
        <div className="w-[650px] h-[300px] m-[20px] bg-yellow-300 rounded-lg shadow-lg flex items-center justify-center text-lg text-gray-700 transform hover:rotate-x-12 hover:rotate-y-12 transition-transform duration-300">
        <ul>
            <li><p>At Jstore, we understand the value of practical experience in education. That's why we offer a range of products that cater to different academic requirements. Our mini-projects, priced at just 50 INR,
             are perfect for students looking for quick, impactful solutions. For those in need of more comprehensive projects, we offer full projects at an unbeatable price of 300 INR. Each product
             is designed to not only meet but exceed academic standards, ensuring that you stand out in your studies.</p></li>
          </ul>
        </div>
        <div className="w-[650px] h-[300px] m-[20px] bg-green-300 rounded-lg shadow-lg flex items-center justify-center text-lg text-gray-700 transform hover:rotate-x-12 hover:rotate-y-12 transition-transform duration-300">
        <ul>
          <li><p>
           Behind Jstore is the creative force of JokerPanda, a group dedicated to pushing the boundaries of conventional education. Despite our products not being officially approved by college staff, our focus remains on delivering value and innovation to students who are eager to learn and grow. At Jstore, you’ll
           find the tools and resources you need to excel in your academic journey, all while keeping your budget in check.</p></li>
          </ul>
        </div>
      </div>
    </div>
   </>
  )
}

export default home
