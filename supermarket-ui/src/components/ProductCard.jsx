import React from 'react'
import '../components/styles/ProductCard.css'

const ProductCard = () => {
  return (
  
        <div className='card-hero'>
            <div className="card-hero-img">
                <img className='p-image' src="public\tomato.png" alt="cabbage"/>
            </div>
            <div className="card-hero-dis">
                <div className='p-name-wrap'>
                    <h1 className="p-name">Tomato</h1>
                    <span className="p-weight">100g</span>
                </div>
                <span className="p-price">RS 100</span>
                <button className='p-addcart'>add to cart</button>
            </div>
        </div>




  )
}

export default ProductCard
