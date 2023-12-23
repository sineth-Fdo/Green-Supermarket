import React, { useEffect, useState } from 'react';
import './Page Styles/AddProducts.css';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [productName, setProductName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [savedProductName, setSavedProductName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch('http://localhost:8080/api/category')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  };

  const handleSave = () => {
    // Check if required fields are filled
    if (!productName || !selectedCategory || !productQuantity || !productPrice) {
      alert('Please fill in all fields');
      return;
    }

    const newProduct = {
      name: productName,
      category: {
        name: selectedCategory,
      },
      quantity: productQuantity,
      price: productPrice,
      // Add other necessary fields as needed
    };

    // Make an API call to add the product
    fetch('http://localhost:8080/api/products/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Product added successfully:', data);
        // Optionally, you can clear the form or perform any other actions
        setProductName('');
        setSelectedCategory('');
        setProductQuantity('');
        setProductPrice('');
        // Save the entered product name to display
        setSavedProductName(productName);
        // Upload the image if an image is selected
        if (selectedImage) {
          uploadImage(productName);
        }
      })
      .catch(error => console.error('Error adding product:', error));
  };

  const uploadImage = (productName) => {
    const formData = new FormData();
    formData.append('file', selectedImage);

    // Make an API call to upload the image
    fetch(`http://localhost:8080/api/products/images/${productName}`, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
          alert('Image uploaded successfully:', data);
          navigate('/manage');
        
      })
      .catch(error => console.error('Error uploading image:', error));

  };

  const handleImageUpload = () => {
 
    if (selectedImage) {
      uploadImage(savedProductName);
     
    } else {
      alert('Please select an image to upload.');
      
 
    }

  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

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
              <input type="text" className='text-inputs' placeholder='Enter Product Name' value={productName} onChange={(e) => setProductName(e.target.value)} />
            </div>
            <div className='text-input-sections'>
              <label className='text-labels'>Categories</label>
              <select name="categories" id="categories" className='select-section' value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="">-- Select Category --</option>
                {categories.map(category => (
                  <option key={category.id} value={category.name}>{category.name}</option>
                ))}
              </select>
            </div>
            <div className='text-input-sections'>
              <label className='text-labels'>Products Quantity</label>
              <input type="text" className='text-inputs' placeholder='Enter Products Quantity' value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} />
            </div>
            <div className='text-input-sections'>
              <label className='text-labels'>Product Unit Price</label>
              <input type="text" className='text-inputs' placeholder='Enter Product Price' value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
            </div>
            <div className='text-input-sections'>
              <button className='save-btn btn-style' onClick={handleSave}>Save</button>
            </div>
            {savedProductName && (
              <div className='text-input-sections'>
                <p>Upload the image to: {savedProductName}</p>
              </div>
            )}
            <div className='text-input-sections'>
              <label className='text-labels'>Insert Product Image</label>
              <input type="file" className='file-inputs' onChange={handleImageChange} />
            </div>
            <div className='text-input-sections'>
              <button className='submit-btn btn-style' onClick={handleImageUpload}>Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
