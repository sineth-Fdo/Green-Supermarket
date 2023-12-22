import React, { useState, useEffect } from 'react';
import '../Pages/Page Styles/PayOrder.css';
import { useParams } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2';

const PayOrder = () => {
  const { CID } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/order/${CID}`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error.message);
      }
    };

    fetchOrders();
  }, [CID]);

  const buttonStyle = {
    width: '50%',
    color: 'white',
    background: '#007bff',
    padding: '10px 20px',
    borderRadius: '20px',
    cursor: 'pointer',
  };

  const handleSuccess = (details, data) => {
    alert('Transaction completed by ' + details.payer.name.given_name);
    console.log(details, data);
  };

  const handleCancel = async (data) => {
    alert('Payment canceled');
    console.log(data);

    // Call the function to cancel the order and delete cart items
    await cancelOrderAndDeleteCartItems();
  };

  const cancelOrderById = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/order/${orderId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Order canceled successfully');
        // Optionally, you can update the UI or navigate the user to a confirmation page
      } else {
        console.error('Failed to cancel order');
      }
    } catch (error) {
      console.error('Error canceling order:', error.message);
    }
  };

  const deleteCartItemsByCustomerId = async (customerId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/cart/deleteCartItems/${customerId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Cart items deleted successfully');
   
      } else {
        console.error('Failed to delete cart items');
      }
    } catch (error) {
      console.error('Error deleting cart items:', error.message);
    }
  };

  const cancelOrderAndDeleteCartItems = async () => {
    try {
      const customerId = CID;
      await deleteCartItemsByCustomerId(customerId);

 
      if (orders.length > 0) {
        const orderIdToCancel = orders[0].orderId;
        await cancelOrderById(orderIdToCancel);
      }
    } catch (error) {
      console.error('Error canceling order and deleting cart items:', error.message);
    }
  };

  return (
    <div className='pay-container'>
      <center>
        <br />
        <br />
        <h1>Your Order is successfully Placed</h1>
        <br /><br />
      </center>

      {orders.map((order) => (
        <div key={order.orderId} className="order-container">
          <div className="cart-right-containers">
            <div className="top-heros">
              <div className='total-ups'>
                <p>Subtotal</p>
                <p>Rs. {order.orderAmount}</p>
              </div>
              <div className='total-ups'>
                <p>Payment Status</p>
                <p>{order.paymentStatus}</p>
              </div>
              <div className='total-ups'>
                <p>Billing Address</p>
                <p>{order.billingAddress}</p>
              </div>
            </div>
            <div className="bottom-hero">
              <div className='total-up'>
                <h1>Total</h1>
                <h2>Rs. {order.orderAmount} </h2>
              </div>
              <div className="paypal-container">
                <PayPalButton
                  options={{
                    clientId: 'AZ4Ynd7aORMUpAlxIQwxCGPS8EZp63V5svixPDIK-UiAMpbf7GqsxVB12IJ_NOY-wDu15akylqRtzKvj',
                    currency: 'USD',
                  }}
                  amount="100.00"
                  onSuccess={handleSuccess}
                  onCancel={handleCancel}
                  style={buttonStyle}
                />
              </div>
            </div>
            <button className='cancel-pay-btn' onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PayOrder;
