import React, { useEffect, useState } from 'react';
import './Page Styles/ViewOrders.css';
import { useNavigate } from 'react-router-dom';

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    fetch('http://localhost:8080/api/order/all')
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(error => console.error('Error fetching orders:', error));
  };

  const deleteOrder = async (orderId) => {
    try {
      // Make a DELETE request to delete the order
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

  return (
    <div className='v-order-big-container'>
      <p className="back-text-shop" onClick={() => {navigate('/manage')}}>{'<< '}Back</p>
      <br /><br /><h2>Check Orders</h2><br />
      <div className="v-order-container">
        <div className="v-order-table">
          <ul className="responsive-table">
            <li className="table-header">
              <div className="col col-1">Id</div>
              <div className="col col-2">Customer Name</div>
              <div className="col col-3">Payment Status</div>
              <div className="col col-4">Total Price(Rs)</div>
              <div className="col col-1">Actions</div>
            </li>
            {orders.map(order => (
              <li className="table-row" key={order.orderId}>
                <div className="col col-1" data-label="Id">{order.orderId}</div>
                <div className="col col-2" data-label="Customer Name">{order.customer.name}</div>
                <div className="col col-3" data-label="Payment Status">{order.paymentStatus}</div>
                <div className="col col-4" data-label="Total Price(Rs)">Rs. {order.orderAmount}</div>
                <div className="col col-1 cross-order" data-label="Actions" onClick={() => deleteOrder(order.orderId)}>X</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ViewOrders;
