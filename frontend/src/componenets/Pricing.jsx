// src/components/UPIPaymentPage.jsx

import React from 'react';
import QRCode from 'qrcode.react';

const Pricing = () => {
  const upiID = 'username270904-1@okaxis'; // Replace with actual UPI ID
  const payeeName = 'Manikandan Rangarajan'; // Replace with actual Payee Name
  const amount = 100; // Replace with actual amount
  const message = 'Payment for test'; // Optional payment message

  const upiLink = `upi://pay?pa=${upiID}&pn=${payeeName}&am=${amount}&tn=${message}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-4">Pay with UPI</h1>
        <QRCode value={upiLink} size={200} />
        <div className="mt-4">
          <p className="text-lg font-semibold">{payeeName}</p>
          <p className="text-gray-700">{upiID}</p>
          <p className="text-gray-700">Amount: ₹{amount}</p>
          {message && <p className="text-gray-500 italic">Message: {message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
