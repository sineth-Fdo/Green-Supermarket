import "./Page Styles/AddProducts.css"

const AddProduct = () => {
  return (
    <div className="add-product-div">
      <div className='product-add-sec'>
        <div className='form-div'>
          <div className='product-form'>
              <center>
                <h1 className='form-title'>Add Product</h1>
              </center>
              <div className='text-input-sections'>
                <label className='text-labels'>Product Name</label>
                <input type="text" className='text-inputs' placeholder='Enter Product Name'/>
              </div>
              <div className='text-input-sections'>
                <label className='text-labels'>Categories</label>
                <select name="categories" id="" className='select-section'>
                <option value="meat">--</option>
                  <option value="meat">Meat</option>
                  <option value="fish">Fish</option>
                  <option value="vegetables">Vegetables</option>
                </select>
              </div>
              <div className='text-input-sections'>
                <label className='text-labels'>Products Quantity</label>
                <input type="text" className='text-inputs' placeholder='Enter Products Quantity'/>
              </div>
              <div className='text-input-sections'>
                <label className='text-labels'>Product Unit Price</label>
                <input type="text" className='text-inputs' placeholder='Enter Product Price'/>
              </div>
              <div className='text-input-sections'>
                <button className='save-btn btn-style'>Save</button>
              </div>
              <div className='text-input-sections'>
                <label className='text-labels'>Insert Product Image</label>
                <input type="file" className='file-inputs'/>
              </div>
              <div className='text-input-sections'>
                <button className='submit-btn btn-style'>Submit</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProduct;
