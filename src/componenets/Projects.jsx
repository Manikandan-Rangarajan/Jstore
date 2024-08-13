import React from 'react'
import './projects.css'
import { useState,useEffect } from 'react'
import new_collections from '../assets/P_assets/new_collections.js'
import Navbar from './Navbar'
import Panda from '../assets/Panda.jpg'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Projects() {

  const [names, setNames] = useState([]);
  const navigate = useNavigate();
  
  const handleprice = async (name) => {
    try {
      // Send a POST request to save the chosen Sname and Description
      const response = await axios.post('http://localhost:5000/pricing/api', {
        Sname: name.Sname,
        description: name.description,
        price:name.price,
      });

      console.log('Data sent successfully:', response.data);

      // Navigate to the pricing page
      navigate('/pricing');
    } catch (error) {
      console.error('Error occurred during data submission:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
      // Fetch data from the API
      axios.get('/projects/api')
      .then(response => {
          console.log('API Response:', response.data); // Check the structure of the response
          setNames(response.data);
      })
      .catch(error => {
          console.error('There was an error fetching the data!', error);
      });
  
  }, []);



  return (
    <div style={{ backgroundImage: `url(${Panda})` }} className="min-h-screen w-full bg-no-repeat bg-cover">
      <Navbar />
      <div className="product-grid">
        {Array.isArray(names) ? (
          names.map((name) => (
            <div className="product-card bg-orange-200 flex flex-col justify-center items-center" key={name._id}>
              <h3 className='font-extrabold text-2xl font-mono'>{name.Sname}</h3>
              <p>{name.description}</p>
              <p className='font-bold'>Price: {name.price} Rs</p>
              <button onClick={() => handleprice(name)} className='text-white bg-black rounded-lg w-[100px] h-[50px] hover:text-orange-200 hover:bg-white'>Select</button>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
}


export default Projects
