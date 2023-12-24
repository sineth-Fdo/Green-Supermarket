import React, { useState, useEffect } from 'react';
import '../Pages/Page Styles/PayOrder.css';
import { useNavigate, useParams } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2';

const PayOrder = () => {
  const { CID } = useParams();
  const [orders, setOrders] = useState([]);
  const [customerEmail, setCustomerEmail] = useState('');
  const navigate = useNavigate();



  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const customerResponse = await fetch(`http://localhost:8080/api/customer/get/${CID}`);
        if (!customerResponse.ok) {
          throw new Error('Failed to fetch customer data');
        }
        const customerData = await customerResponse.json();
        setCustomerEmail(customerData.email);
      } catch (error) {
        console.error('Error fetching customer data:', error.message);
      }
    };

    fetchCustomerData();
  }, [CID]);

  

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
      await updatePaymentStatus(orderId, 'Paid');
      const customerId = CID;
  
      const updatedOrders = orders.map((order) =>
        order.orderId === orderId ? { ...order, paymentStatus: 'Paid' } : order
      );
      setOrders(updatedOrders);
  
      // Use the 'order' directly from the map function
      const updatedOrder = updatedOrders.find((o) => o.orderId === orderId);
  
      sendEmail({
        to: customerEmail,
        message: `Thank you for your order! Your payment of Rs. ${updatedOrder.orderAmount} has been received.`,
        subject: 'Green Supermarket',
      });
  
      alert('Transaction completed by ' + details.payer.name.given_name);
      await deleteCartItemsByCustomerId(customerId);
      console.log(details, data);
    } catch (error) {
      console.error('Error updating payment status:', error.message);
    }
  };
  

  // delete order by id
  const deleteOrder = async (orderId) => {
    try {
      
      const response = await fetch(`http://localhost:8080/api/order/delete/${orderId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
      
        fetchOrders();
      } else {
        console.error('Error deleting order:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };
  
  

  const handleCancel = async (data) => {
    alert('Payment canceled');
  
    

  };


  const handleCancelBtn = async (data) => {
    const orderId = orders[0].orderId;
    alert('Payment canceled');
    const customerId = CID;
    await deleteCartItemsByCustomerId(customerId);
    deleteOrder(orderId)
    navigate(`/shop/vegetables`, { state:  { customerId: `${CID}` }  })



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


  const sendEmail = async ({ to, subject, message }) => {
    try {
      const emailData = {
        to,
        message,
        subject,
      };
  
      const response = await fetch('http://localhost:8080/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });
  
      if (!response.ok) {
        console.error('Failed to send email:', response.statusText);
        console.error('Failed to send email:', emailData);
      } else {
        console.log('Email sent successfully:', emailData);
      }
    } catch (error) {
      console.error('Error sending email:', error.message);
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
            <button className='cancel-pay-btn' onClick={handleCancelBtn}>
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
