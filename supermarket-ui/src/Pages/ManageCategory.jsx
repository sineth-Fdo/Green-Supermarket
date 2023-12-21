import React from 'react'
import './Page Styles/ManageCategory.css'

const ManageCategory = () => {
  return (
    <div className='category-page'>
      <h3 className='back-manage'>{"<< Back"}</h3>
      <div className='category-ui'>
        <h1>ManageCategory</h1>
            <div className="btn-cat">
              <input type="text" className='text-box' placeholder='Enter New Category Name'/>
              <button className='button1'>Add</button>
            </div>
          <div class="table-manage">
            <ul class="responsive-table">
              <li class="table-header">
                <div class="col col-1">Id</div>
                <div class="col col-2">Name</div>
              </li>
              <li class="table-row">
                <div class="col col-1" data-label="Job Id">1</div>
                <div class="col col-2" data-label="Customer Name">Tomato</div>
              </li>
              <li class="table-row">
                <div class="col col-1" data-label="Job Id">1</div>
                <div class="col col-2" data-label="Customer Name">Tomato</div>
              </li>
              <li class="table-row">
                <div class="col col-1" data-label="Job Id">1</div>
                <div class="col col-2" data-label="Customer Name">Tomato</div>
              </li>
            </ul>
          </div>
      </div>
    </div>
  )
}

export default ManageCategory