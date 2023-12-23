import React, { useState, useEffect } from 'react';
import '../Pages/Page Styles/PayOrder.css';
import { useNavigate, useParams } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2';

const PayOrder = () => {
  const { CID } = useParams();
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();


  

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

  const handleSuccess = async (details, data) => {
    try {
      const orderId = orders[0].orderId; 
      const customerId = CID;
      await updatePaymentStatus(orderId, 'paid');
  
     
      alert('Transaction completed by ' + details.payer.name.given_name);
      await deleteCartItemsByCustomerId(customerId);
      console.log(details, data);
  
  
      const updatedOrders = orders.map((order) =>
        order.orderId === orderId ? { ...order, paymentStatus: 'paid' } : order
      );
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error updating payment status:', error.message);
    }
  };
  
  

  const handleCancel = async (data) => {
    alert('Payment canceled');
    const customerId = CID;
    await deleteCartItemsByCustomerId(customerId);
    



  };

  const updatePaymentStatus = async (orderId, status) => {
    try {
      const response = await fetch(`http://localhost:8080/api/order/up/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentStatus: status }),
      });

      if (response.ok) {
        console.log('Payment status updated successfully');
      } else {
        console.error('Failed to update payment status');
      }
    } catch (error) {
      console.error('Error updating payment status:', error.message);
    }
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
    <div className='pay-big-container'>
      <center>
        <br />
        <br />
        <h1>Your Order is successfully Placed</h1>
        <br /><br />
      </center>
    <div className='pay-container'>

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

              {order.paymentStatus === 'pending'  && (
                <>

              <div className="paypal-container">
                <PayPalButton
                  options={{
                    clientId: 'AZ4Ynd7aORMUpAlxIQwxCGPS8EZp63V5svixPDIK-UiAMpbf7GqsxVB12IJ_NOY-wDu15akylqRtzKvj',
                    currency: 'USD',
                  }}
                  amount={order.orderAmount}
                  onSuccess={handleSuccess}
                  onCancel={handleCancel}
                  style={buttonStyle}
                />
              </div>
                </>
              )
              
              }
            </div>
            {order.paymentStatus === 'pending'? (
              <>
            <button className='cancel-pay-btn' onClick={handleCancel}>
              Cancel
            </button>
              </>
            ):(
              <>
               <button className='cancel-pay-btn' onClick={() => {navigate(`/shop/vegetables`, { state:  { customerId: `${CID}` }  })}}>
                  Shop
            </button>
              </>
            )}

          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default PayOrder;
