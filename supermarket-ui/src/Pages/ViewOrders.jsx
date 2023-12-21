import React from 'react'
import './Page Styles/ViewOrders.css'

const ViewOrders = () => {
  return (
    <div className='v-order-big-container'>
       <br /><br /> <h2>Check Orders</h2> <br /><br />
        <div className="v-order-container">
            <div className="v-order-table">
            <ul class="responsive-table">
                          <li class="table-header">
                            <div class="col col-1">Id</div>
                            <div class="col col-2">Customer Name</div>
                            <div class="col col-3">Payment Status</div>
                            <div class="col col-4">Price(LKR)</div>
                            <div class="col col-5">Image</div>
                            <div class="col col-6">Edit</div>
                            <div class="col col-7">Remove</div>
                          </li>
                          <li class="table-row">
                            <div class="col col-1" data-label="Job Id">1</div>
                            <div class="col col-2" data-label="Customer Name">Tomato</div>
                            <div class="col col-3" data-label="Amount">Vegetables</div>
                            <div class="col col-4" data-label="Payment Status">150</div>
                            <div class="col col-5"><img width='100px' src="public/tomato.png"></img></div>
                            <div class="col col-6"><button class="btn3">Edit</button></div>
                            <div class="col col-7"><button class="btn3">Remove</button></div>
                          
                          </li>
                      
            
             </ul>
            </div>
        </div>
    </div>
  )
}

export default ViewOrders
