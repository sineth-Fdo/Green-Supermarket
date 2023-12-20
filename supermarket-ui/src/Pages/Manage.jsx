import React from 'react'
import './Page Styles/Manage.css'

export const Manage = () => {
  return (
    <>
    <div className='container-mp'>
        <div className='center'>
            <div className='man-cont'>
                <h1>Manage Products</h1>
                <div className="buttons">
                    <button onClick={()=>{window.location="/addProduct"}} className='btn1' >Add a new product</button>
                    <div className="btn-right">
                    <button onClick={()=>{window.location="/manaCat"}} className='btn1' >View Orders</button>
                    <button onClick={()=>{window.location="/manaCat"}} className='btn2' >Manage Category</button>
                    </div>
                </div>
                    <div class="table-manage">
                        <ul class="responsive-table">
                          <li class="table-header">
                            <div class="col col-1">Id</div>
                            <div class="col col-2">Name</div>
                            <div class="col col-3">Category</div>
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
                            <div class="col col-5"><img src="https://images.pexels.com/photos/985"></img></div>
                            <div class="col col-6"><button class="btn3">Edit</button></div>
                            <div class="col col-6"><button class="btn3">Remove</button></div>
                          </li>
                          <li class="table-row">
                            <div class="col col-1" data-label="Job Id">1</div>
                            <div class="col col-2" data-label="Customer Name">Tomato</div>
                            <div class="col col-3" data-label="Amount">Vegetables</div>
                            <div class="col col-4" data-label="Payment Status">150</div>
                            <div class="col col-5"><img src="https://images.pexels.com/photos/985"></img></div>
                            <div class="col col-6"><button class="btn3">Edit</button></div>
                            <div class="col col-6"><button class="btn3">Remove</button></div>
                          </li>
                          <li class="table-row">
                            <div class="col col-1" data-label="Job Id">1</div>
                            <div class="col col-2" data-label="Customer Name">Tomato</div>
                            <div class="col col-3" data-label="Amount">Vegetables</div>
                            <div class="col col-4" data-label="Payment Status">150</div>
                            <div class="col col-5"><img src="https://images.pexels.com/photos/985"></img></div>
                            <div class="col col-6"><button class="btn3">Edit</button></div>
                            <div class="col col-6"><button class="btn3">Remove</button></div>
                          </li>
                          <li class="table-row">
                            <div class="col col-1" data-label="Job Id">1</div>
                            <div class="col col-2" data-label="Customer Name">Tomato</div>
                            <div class="col col-3" data-label="Amount">Vegetables</div>
                            <div class="col col-4" data-label="Payment Status">150</div>
                            <div class="col col-5"><img src="https://images.pexels.com/photos/985"></img></div>
                            <div class="col col-6"><button class="btn3">Edit</button></div>
                            <div class="col col-6"><button class="btn3">Remove</button></div>
                          </li>
                          <li class="table-row">
                            <div class="col col-1" data-label="Job Id">1</div>
                            <div class="col col-2" data-label="Customer Name">Tomato</div>
                            <div class="col col-3" data-label="Amount">Vegetables</div>
                            <div class="col col-4" data-label="Payment Status">150</div>
                            <div class="col col-5"><img src="https://images.pexels.com/photos/985"></img></div>
                            <div class="col col-6"><button class="btn3">Edit</button></div>
                            <div class="col col-6"><button class="btn3">Remove</button></div>
                          </li>
                        </ul>
                      </div>
            </div>
        </div>
    </div>
    </>
  )
}
