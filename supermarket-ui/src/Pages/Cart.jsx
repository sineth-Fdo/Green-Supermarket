import React, { useEffect, useState } from 'react';
import '../Pages/Page Styles/Cart.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [billingAddress, setBillingAddress] = useState('');
  const [cartId, setCartId] = useState(null);
  const { CID } = useParams();
  const navigate = useNavigate();
  const [customerEmail, setCustomerEmail] = useState('');

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    const getCartId = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/cart/get-cart-id/${CID}`);
        setCartId(response.data);
      } catch (error) {
        console.error('Error fetching cart ID:', error.message);
        // Handle error as needed
      }
    };

    getCartId();
  }, [CID]);

  // fetch cart items by customer id
  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/cart-items/get-all-by-customer/${CID}`);
      if (response.status === 200) {
        setCartItems(response.data);
      } else {
        console.error('Failed to fetch cart items');
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCartItem = async (cartItemId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/cart-items/delete/${cartItemId}`);
      if (response.status === 200) {
        // Remove the deleted item from the state
        setCartItems((prevCartItems) => prevCartItems.filter(item => item.id !== cartItemId));
        console.log('CartItem deleted successfully');
      } else {
        console.error('Failed to delete cart item');
      }
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  // Fetch customer details by ID
  const fetchCustomerDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/customer/get/${CID}`);
      if (response.status === 200) {
        setCustomerEmail(response.data.email);
      } else {
        console.error('Failed to fetch customer details');
      }
    } catch (error) {
      console.error('Error fetching customer details:', error);
    }
  };

  useEffect(() => {
    // Call fetchCustomerDetails when CID changes
    fetchCustomerDetails();
  }, [CID]);


  // Place order
  const handlePlaceOrder = async () => {
    try {
      
      const orderData = {
        orderAddress: billingAddress,
        cartId: cartId,
        email: customerEmail,
      };

      const response = await axios.post('http://localhost:8080/api/order/create', orderData);

      if (response.status === 500) {
        // Order created successfully, show an alert
        alert('Order placed successfully!');
       

        // Optionally, you can navigate the user to a confirmation page or update the UI accordingly
      } else {
        console.error('Failed to create order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }

    navigate(`/pay/${CID}`);
  };

  // Calculate the total price
  const totalAmount = cartItems.reduce((acc, cartItem) => acc + cartItem.totalPrice, 0);

 

  return (
    <div className='cart-big-container'>
      <p className="back-text-shop" onClick={() => { navigate(`/shop/fruits`, { state: { customerId: `${CID}` } }) }}>{'<< '}Back to Shop</p>
      <center>
        <br /><br />
        <h1>Manage Cart</h1>
        <p>{cartId}</p>
        <p>{customerEmail}</p>
        <br />
      </center>
      <div className="cart-container">
        <div className="cart-left-container">
          <ul className="responsive-table">
            <li class="table-header" className='tb1'>
              <div className="col col-5"></div>
              <div className="col col-2">Product Name</div>
              <div className="col col-3">Price</div>
              <div className="col col-4">Quantity</div>
              <div className="col col-5">Total</div>
        
            </li>

            {cartItems.map((cartItem) => (
              <li key={cartItem.id} className="table-row">
                <div className="col col-5">
                  <img className="cart-item-image" src={`../public/images/${cartItem.product.image}`} alt={cartItem.product.name} />
                </div>
                <div className="col col-2" data-label="Product Name">{cartItem.product.name}</div>
                <div className="col col-3" data-label="Price">Rs. {cartItem.product.price}</div>
                <div className="col col-4" data-label="Quantity">{cartItem.quantity}</div>
                <div className="col col-5" data-label="Total">Rs. {cartItem.totalPrice}</div>
                <div class="col col-6" className='delete-cross' onClick={() => handleDeleteCartItem(cartItem.id)}>X</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="cart-right-container">
          <div className="top-hero">
            <div className='total-up'>
              <p>Subtotal</p>
              <p>Rs. {totalAmount}</p>
            </div>
            <div className='total-up'>
              <p>Delivery Charges</p>
              <p>00.00</p>
            </div>
            <div className='total-up'>
              <p>Taxes</p>
              <p>00.00</p>
            </div>
          </div>
          <div className="bottom-hero">
            <div className='total-up'>
              <h1>Total</h1>
              <h2>Rs. {totalAmount}</h2>
            </div>
            <div>
              <div className='cart-address'>
                <label htmlFor="BA">Billing Address</label>
                <input
                  type="text"
                  placeholder='Enter billing address'
                  required
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                />
              </div>
              <center>
                {/* Update onClick to call handlePlaceOrder */}
                <button className='checkout-btn' onClick={handlePlaceOrder}>Place Order</button>
              </center>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Cart;
