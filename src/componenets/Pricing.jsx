// src/components/UPIPaymentPage.jsx

import React, { useState,useEffect } from 'react';
import QRCode from 'qrcode.react';
import Navbar from './Navbar'
import Panda from '../assets/Panda.jpg'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Pricing = () => {

  const [price, setPrice] = useState([])

  const upiID = 'username270904-1@okaxis'; // Replace with actual UPI ID
  const payeeName = 'Manikandan Rangarajan'; // Replace with actual Payee Name
  const amount = 100; // Replace with actual amount
  const message = 'Payment for test'; // Optional payment message
  const userId = localStorage.getItem('userId');
  console.log(userId)
  const navigate = useNavigate();
  


  // const handlemoney = async (name) => {
  //   try {

  //     // Send a POST request to save the chosen Sname and Description
  //     const response = await axios.post('http://localhost:5000/pricing/api', {
  //       Sname: name.Sname,
  //       description: name.description,
  //       price:name.price,
  //       User:userId,
  //     });

  //     console.log('Data sent successfully:', response.data);

  //     // Navigate to the pricing page
  //     navigate('/pricing');
  //   } catch (error) {
  //     console.error('Error occurred during data submission:', error.response ? error.response.data : error.message);
  //   }
  // };
  // const deleteDb = async (pr)=>{
  //   try {

  //     console.log('Sending data:', {
  //       User: pr.User // Ensure the key matches what the backend expects
  //   });
  //     // Send a POST request to save the chosen Sname and Description
  //     const response = await axios.post('http://localhost:5000/pricing/usr', {
  //       User: pr._id,
  //     });

  //     console.log('Data sent successfully:', response.data);

  //     // Navigate to the pricing page
  //     navigate('/about-us');
  //   } catch (error) {
  //     console.error('Error occurred during data submission:', error.response ? error.response.data : error.message);
  //   }
  // }
  

  useEffect(() => {
    // Fetch data from the API
    axios.get('/pricing/api/money')
    .then(response => {
        console.log('API Response:', response.data); // Check the structure of the response
        setPrice(response.data);
    })
    .catch(error => {
        console.error('There was an error fetching the data!', error);
    });

}, []);


  const upiLink = `upi://pay?pa=${upiID}&pn=${payeeName}&am=${price}&tn=${message}`;


  return (
    <>
    <Navbar/>
    <div  style={{ backgroundImage: `url(${Panda})` }} className="min-h-screen w-full bg-no-repeat bg-cover overflow-hidden flex flex-wrap gap-10 items-center justify-center bg-gray-100 p-4">
    <div className={`w-full h-[100px] m-[20px] backdrop-blur-xxl bg-gray-800 rounded-lg shadow-lg flex flex-wrap items-center justify-center text-orange-200 transform hover:rotate-x-12 hover:rotate-y-12 transition-transform duration-300`}>
      <ul className = 'opacity-100 font-bold text-xl flex flex-col flex-wrap justify-start items-center'>
        <li className = 'text-2xl'>NOTE</li>
        <li>Please Update the payment details in the gform by clicking in the Paid button</li>
        <li>Delete the current Payment Qr code to add new Project's Qr code.</li>
      </ul>
    </div>
    {Array.isArray(price) ? (
      price.map((pr) => (
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-4">Pay with UPI</h1>
        <QRCode value={upiLink} size={200} />
        <div className="mt-4">
          <p className="text-lg font-semibold">{payeeName}</p>
          <p className="text-gray-700">{upiID}</p>
          <p className="text-lg font-semibold">{pr.User}</p>
          <p className="text-gray-700">Amount: ₹{pr.price}</p>
          <p className="text-gray-700">Description {pr.description}</p>
          <p className="text-gray-700">Subject {pr.Sname}</p>
          {message && <p className="text-gray-500 italic">Message: {message}</p>}
        </div>
        <button className='text-white bg-black rounded-lg w-[100px] h-[50px] m-[10px] hover:text-orange-200 hover:bg-white'>Delete</button>
        <button className='text-white bg-black rounded-lg w-[100px] h-[50px] m-[10px] hover:text-orange-200 hover:bg-white'>Paid</button>
      </div>
      
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </>
  );
};

export default Pricing;
