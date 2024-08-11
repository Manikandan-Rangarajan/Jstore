import React from 'react'
import './projects.css'
import new_collections from '../assets/P_assets/new_collections.js'
import Navbar from './Navbar'
import Panda from '../assets/Panda.jpg'

function Projects() {
  return (
    <div  style={{ backgroundImage: `url(${Panda})`}} className="min-h-screen w-full bg-no-repeat bg-cover" >
    <Navbar/>
    <div className="product-grid ">
      {new_collections.map((product) => (
        <div className="product-card" key={product.id}>
          <img src={product.image} alt={product.name} className="product-image" />
          <h2 className="product-name">{product.name}</h2>
          <p className="product-price">
            <span className="new-price">${product.new_price.toFixed(2)}</span>
            <span className="old-price">${product.old_price.toFixed(2)}</span>
          </p>
        </div>
      ))}
    </div>
    </div>
  );
};


export default Projects
