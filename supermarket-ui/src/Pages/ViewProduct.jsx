import { useEffect, useState } from "react";
import "./Page Styles/ViewProduct.css"
import { useLocation, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const ViewProduct = () => {

    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantityMap, setQuantityMap] = useState({});
    const navigate = useNavigate();

    const location = useLocation();
    const customerId = location.state ? location.state.customerId : null;
  
    useEffect(() => {
      fetchProduct();
    }, [id]);
  
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/products/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const productData = await response.json();
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error.message);
      }
    };
  
    const addProductToCart = async () => {
      const apiUrl = 'http://localhost:8080/api/products/add-to-cart';
  
      const requestBody = {
        productId: id,
        customerId: customerId,
        quantity: quantityMap[id] || 1,
      };
  
      try {
        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
  
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
  
        const responseData = await res.json();
       alert('Product added to cart successfully!', responseData);
      } catch (error) {
        console.error('Error adding to cart:', error.message);
      }
  

      fetchProduct();
    };
  
    if (!product) {
      return <p>Loading...</p>;
    }

    return(
        <div className="viewproduct-div">
            <div className="product-div">
            <p className="back-text-shop" onClick={() => {navigate(`/shop/${product.category.name}`, { state:  { customerId: `${customerId}` }  })}}>{'<< '}Back to Shop</p>
                     <p className="text-cart"onClick={() => {navigate(`/cart/${customerId}`);}}>View Cart{' >> '}</p>
                <div className="upper-div">
                    <h1>Product Details</h1>
                    <p>Product ID: {id}</p>
                    <p> customer id {customerId}</p>
                </div>
                <div className="lower-div">
                    <div className="left-div">
                        <div className="product-image">
                            <img src={`../public/images/${product.image}`} alt="" className="pro-image"/>
                        </div>

                        <div className="product-info">
                            <h2 className="pro-name">{product.name}</h2>
                            <h4 className="pro-price">Rs. {product.price}</h4>
                            <div className="weight-info">
                                <p className="pro-weight">1 kg</p>
                            </div>

                            <div className="pro-qty-add-n-sub">
                                <div className="qty-selector">
                                <button className="sub selector" onClick={() => setQuantityMap(prevQtyMap => ({
                                    ...prevQtyMap,
                                    [id]: Math.max((prevQtyMap[id] || 1) - 1, 1),
                                }))}>-</button>
                                {quantityMap[id] || 1}
                                <button className="add selector" onClick={() => setQuantityMap(prevQtyMap => ({
                                    ...prevQtyMap,
                                    [id]: (prevQtyMap[id] || 1) + 1,
                                }))}>+</button>
                                </div>
                    <div className="add-cart-btn-div">
                        <button  className="add-cart-btn" onClick={addProductToCart}>
            Add to Cart
          </button>
        </div>
      </div>

                        </div>

                    </div>

                    <div className="right-div">
                        <div className="right-upper">
                            <div className="upper-card">
                                <div className="card-img">
                                    <img src="../public/money.png" alt="" />
                                </div>
                                <div className="card-text">
                                    <p className="card-title">Free Delivery</p>
                                    <p className="card-des">For all orders</p>

                                </div>
                            </div>
                            <div className="upper-card">
                                <div className="card-img">
                                    <img src="../public/delivery.png" alt="" />
                                </div>
                                <div className="card-text">
                                    <p className="card-title">100% Money Back</p>
                                    <p className="card-des">Guaranteed Product Warranty</p>
                                </div>
                            </div>
                            <div className="upper-card">
                                <div className="card-img">
                                    <img src="../public/safety.png" alt="" />
                                </div>
                                <div className="card-text">
                                    <p className="card-title">Safety & Secure</p>
                                    <p className="card-des">Contact Us Anytime</p>
                                </div>
                            </div>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProduct;