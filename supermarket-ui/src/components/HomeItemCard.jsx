import React, { useState, useEffect } from 'react';
import './styles/HomeItemCard.css';
import { useNavigate } from 'react-router-dom';


const HomeItemCard = (props) => {
  const [vegetableProducts, setVegetableProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch vegetable category products
    fetchVegetableProducts();
  }, []);

  const fetchVegetableProducts = async () => {
    try {
      
      const response = await fetch('http://localhost:8080/api/products/category/vegetables');
      if (!response.ok) {
        throw new Error('Failed to fetch vegetable products');
      }
      const data = await response.json();
      setVegetableProducts(data);
    } catch (error) {
      console.error('Error fetching vegetable products:', error.message);
    }
  };

  return (
    <div className="cards">
      <div className="card-container">
        <div className="text-cont">
          <h2>Popular Vegetables</h2>
        </div>
        <div className="prop-card">
          {vegetableProducts.map((product) => (
            <div key={product.id} onClick={() => { navigate(`/viewproduct/${product.id}`, { state: { customerId: props.customerId } }) }}>
                {
                    product.id === 1 || product.id === 2 || product.id === 23  || product.id === 25 || product.id === 28?  (
                        <>
                            <div className="card">
                                <img src={`../public/images/${product.image}`}  alt={product.name} />
                                <h3>{product.name}</h3>
                                <p>{`Rs. ${product.price} per g`}</p>
                            </div>
                        </>
                    ):(null)
                }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeItemCard;
