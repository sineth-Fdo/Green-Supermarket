import React from 'react'
import '../Pages/Page Styles/Cart.css'
import { PayPalButton } from 'react-paypal-button-v2';

const Cart = () => {


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

  const handleCancel = (data) => {
    alert('Payment canceled');
    console.log(data);
  };
  
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
                            <p>Rs. 4500.00</p>
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
                <form>
                  
                            <div className='cart-address'>
                              <label htmlFor="BA">Billing Address</label>
                              <input type="text" placeholder='address' required />
                            </div>
             
                        <center>
                            <button className='checkout-btn'>Place Order</button>
                        </center>
                </form>
                    </div>
                </div>
            </div>

{/* order container */}

            <div className="order-container">
            <div className="cart-right-container">
                    <div className="top-hero">

                        <div className='total-up'>
                            <p>Subtotal</p>
                            <p>Rs. 4500.00</p>
                        </div>
                        <div className='total-up'>
                            <p>Delivery Charges</p>
                            <p>Free</p>
                        </div>
                        <div className='total-up'>
                            <p>Billing Address</p>
                            <p>312,podiweekubura,ragama</p>
                        </div>


                    </div>
                    <div className="bottom-hero">
                        <div className='total-up'>
                            <h1>Total</h1>
                            <h2>Rs. 4500.00</h2>
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
                </div>
            </div>
    </div>
  )
}

export default Cart
