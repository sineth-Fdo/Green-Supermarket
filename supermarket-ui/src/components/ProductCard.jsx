import React, { useState } from 'react';
import '../components/styles/ProductCard.css';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart, quantityMap, setQuantityMap, customerId }) => {
  const [quantity, setQuantity] = useState(quantityMap[product.id] || 1);
  const navigate = useNavigate();

  const handleDecrease = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
    setQuantityMap((prevQtyMap) => ({
      ...prevQtyMap,
      [product.id]: Math.max((prevQtyMap[product.id] || 1) - 1, 1),
    }));
  };

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    setQuantityMap((prevQtyMap) => ({
      ...prevQtyMap,
      [product.id]: (prevQtyMap[product.id] || 1) + 1,
    }));
  };

  const handleAddToCart = () => {
    onAddToCart(product.id, quantity);
  };

  return (
    <div className="card-hero">
      <div className="card-hero-img" onClick={() => { navigate(`/viewproduct/${product.id}`, { state: { customerId } }) }}>
        <img className="p-image" src={`../public/images/${product.image}`} alt={product.name} />
      </div>
      <div className="card-hero-dis">
        <div className="p-name-wrap">
          <h1 className="p-name">{product.name}</h1>
          <p>{customerId}</p>
          <span className="p-weight">100 kg</span>
        </div>
        <span className="p-price">{`RS ${product.price}`}</span>
        <div className="cartadd-hero">
          <div className="cart-qty-count">
            <button onClick={handleDecrease}>-</button>
            <span className="p-quantity">{quantity}</span>
            <button onClick={handleIncrease}>+</button>
          </div>
          <button className="p-addcart" onClick={handleAddToCart}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
