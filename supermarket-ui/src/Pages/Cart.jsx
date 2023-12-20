import React from 'react'
import '../Pages/Page Styles/Cart.css'

const Cart = () => {
  return (
    <div className='cart-big-container'>
        <center>
            <br /><br />
            <h1>Manage Cart</h1>
            <br />
        </center>
            <div className="cart-container">
                <div className="cart-left-container">
           
                        <ul class="responsive-table" >
                          <li class="table-header" className='tb1'>
                     
                          <div class="col col-5"></div>
                            <div class="col col-2">Product Name</div>
                            <div class="col col-3">Price</div>
                            <div class="col col-4">Quantity</div>
                            <div class="col col-5">Total</div>
                            <div class="col col-6">Action</div>
                         
                          </li>
                          <li class="table-row">
                            <div class="col col-5"><img className='cart-item-image' src="public/tomato.png"></img></div>
                            <div class="col col-2" data-label="Customer Name">Tomato</div>
                            <div class="col col-4" data-label="Payment Status">150</div>
                            <div class="col col-3" data-label="Amount">3</div>
                            <div class="col col-6">450</div>
                            <div class="col col-6">X</div>
                          </li>
                          <li class="table-row">
                            <div class="col col-5"><img className='cart-item-image' src="public/tomato.png"></img></div>
                            <div class="col col-2" data-label="Customer Name">Tomato</div>
                            <div class="col col-4" data-label="Payment Status">150</div>
                            <div class="col col-3" data-label="Amount">3</div>
                            <div class="col col-6">450</div>
                            <div class="col col-6">X</div>
                          </li>
                          <li class="table-row">
                            <div class="col col-5"><img className='cart-item-image' src="public/tomato.png"></img></div>
                            <div class="col col-2" data-label="Customer Name">Tomato</div>
                            <div class="col col-4" data-label="Payment Status">150</div>
                            <div class="col col-3" data-label="Amount">3</div>
                            <div class="col col-6">450</div>
                            <div class="col col-6">X</div>
                          </li>
                      
          
                        </ul>
                  
                  
                </div>
                <div className="cart-right-container">
                    <div className="top-hero">

                        <div className='total-up'>
                            <p>Subtotal</p>
                            <p>Rs. 4500</p>
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
                            <h2>Rs. 4500.00</h2>
                        </div>
                        <center>
                            <button className='checkout-btn'>Place Order</button>
                        </center>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Cart
