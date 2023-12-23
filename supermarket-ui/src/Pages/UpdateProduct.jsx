import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProduct, uploadProductImage } from '../services/ProductService';
import '../Pages/Page Styles/UpdateProduct.css';

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { pid } = useParams();
  const [product, setProduct] = useState(null);
  const [file, setFile] = useState(null);

  const [updatedProduct, setUpdatedProduct] = useState({
    name: '',
    price: '',
    image: '',
    quantity: '',
    category: {
      name: '',
    },
  });

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await getProductById(pid);

        if (!response.data) {
          throw new Error(`Product not found with ID: ${pid}`);
        }

        const fetchedProduct = response.data;
        setProduct(fetchedProduct);

        setUpdatedProduct({
          name: fetchedProduct.name,
          price: fetchedProduct.price,
          image: fetchedProduct.image,
          quantity: fetchedProduct.quantity,
          category: {
            name: fetchedProduct.category ? fetchedProduct.category.name : '',
          },
        });
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [pid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      ...(name === 'categoryName'
        ? { category: { ...prevProduct.category, name: value } }
        : { [name]: value }),
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpdate = async () => {
    try {
      // Update the product details
      await updateProduct(pid, updatedProduct);

      // If a new image is selected, upload it
      if (file) {
        await uploadProductImage(pid, file);
        alert('Image uploaded successfully!');
      }

      alert('Product updated successfully!');
      navigate('/manage');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product. Please try again.');
    }
  };
  

  return (
    <div className="update-product-container">
      <h1 className="update-product-title">Update Product</h1>
      {product ? (
        <div className="update-product-details">
          
          <label htmlFor="name" className="update-label">
            Product Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={updatedProduct.name}
            onChange={handleInputChange}
            className="update-input"
          />
          <br />
          <label htmlFor="price" className="update-label">
            Product Price:
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={updatedProduct.price}
            onChange={handleInputChange}
            className="update-input"
          />
          <br />
  
          <br />
          <label htmlFor="image" className="update-label">
            Product Image:
          </label>
          <input type="file" name="image" id="image" onChange={handleFileChange} className="update-file-input" />
          <br />
          <label htmlFor="categoryName" className="update-label">
            Category Name:
            <span className='cat-span' htmlFor="">{updatedProduct.category.name}</span>
          </label>
          <br />
          <br />
          <button onClick={handleUpdate} className="update-button">
            Update Product
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UpdateProduct;
