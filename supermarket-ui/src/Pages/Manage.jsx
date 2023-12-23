import React, { useEffect, useState } from 'react';
import './Page Styles/Manage.css';
import { useNavigate } from 'react-router-dom';
import { getAllProducts, deleteProduct } from '../services/ProductService';

export const Manage = () => {

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Fetch all products
  const fetchAllProducts = () => {
    getAllProducts()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handle product removal
  const handleRemoveProduct = (productId) => {
    deleteProduct(productId)
      .then(() => {
        // Update the product list after successful deletion
        fetchAllProducts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className='container-mp'>
        <div className='center'>
          <div className='man-cont'>
            <h1>Manage Products</h1>
            <div className="buttons">
              <button onClick={() => { navigate('/addProduct') }} className='btn1' >Add a new product</button>
              <div className="btn-right">
                <button onClick={() => { navigate('/order') }} className='btn1' >View Orders</button>
                <button onClick={() => { navigate('/managecategory') }} className='btn2' >Manage Category</button>
              </div>
            </div>
            <div className="table-manage">
              <ul className="responsive-table">
                <li className="table-header">
                  <div className="col col-1">Id</div>
                  <div className="col col-2">Name</div>
                  <div className="col col-3">Category</div>
                  <div className="col col-4">Price(LKR)</div>
                  <div className="col col-5">Image</div>
                  <div className="col col-6">Edit</div>
                  <div className="col col-7">Remove</div>
                </li>

                {products.map((product) => (
                  <li className="table-row" key={product.id}>
                    <div className="col col-1" data-label="Id">{product.id}</div>
                    <div className="col col-2" data-label="Name">{product.name}</div>
                    <div className="col col-3" data-label="Category">{product.category.name}</div>
                    <div className="col col-4" data-label="Price(LKR)">{product.price}</div>
                    <div className="col col-5" data-label="Image"><img width='100px' src={`../public/images/${product.image}`} alt={product.name} /></div>
                    <div className="col col-6" data-label="Edit" onClick={() => {navigate(`/updateProduct/${product.id}`)}}><button className="btn3">Edit</button></div>
                    <div className="col col-7" data-label="Remove">
                      <button className="btn4" onClick={() => handleRemoveProduct(product.id)}>Remove</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
