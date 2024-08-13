// src/components/UPIPaymentPage.jsx

import React, { useState,useEffect } from 'react';
import QRCode from 'qrcode.react';
import Navbar from './Navbar'
import Panda from '../assets/Panda.jpg'
import axios from 'axios'

const Pricing = () => {

  const [price, setPrice] = useState([])

  const upiID = 'username270904-1@okaxis'; // Replace with actual UPI ID
  const payeeName = 'Manikandan Rangarajan'; // Replace with actual Payee Name
  const amount = 100; // Replace with actual amount
  const message = 'Payment for test'; // Optional payment message

  

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
    {Array.isArray(price) ? (
      price.map((pr) => (
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-4">Pay with UPI</h1>
        <QRCode value={upiLink} size={200} />
        <div className="mt-4">
          <p className="text-lg font-semibold">{payeeName}</p>
          <p className="text-gray-700">{upiID}</p>
          <p className="text-gray-700">Amount: ₹{pr.price}</p>
          <p className="text-gray-700">Description {pr.description}</p>
          <p className="text-gray-700">Subject {pr.Sname}</p>
          {message && <p className="text-gray-500 italic">Message: {message}</p>}
        </div>
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
