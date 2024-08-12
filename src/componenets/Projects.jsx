import React from 'react'
import './projects.css'
import { useState,useEffect } from 'react'
import new_collections from '../assets/P_assets/new_collections.js'
import Navbar from './Navbar'
import Panda from '../assets/Panda.jpg'
import axios from 'axios'

function Projects() {

  const [names, setNames] = useState([]);

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
            <div className="product-card" key={name._id}>
              <h3>{name.Sname}</h3>
              <p>{name.description}</p>
              <p>Price: {name.price} Rs</p>
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
