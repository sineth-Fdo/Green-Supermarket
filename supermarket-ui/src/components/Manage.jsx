import React from 'react'
import './styles/Manage.css'

export const Manage = () => {
  return (
    <div className='container'>
        <div className='center'>
            <dic className='man-cont'>
                <h1>Manage Products</h1>
                <div className="buttons">
                    <button onClick={()=>{window.location="/addProduct"}} className='btn1' >Add a new product</button>
                    <button onClick={()=>{window.location="/manaCat"}} className='btn1' >Manage Category</button>
                </div>  
            </dic>
        </div>
    </div>
  )
}
