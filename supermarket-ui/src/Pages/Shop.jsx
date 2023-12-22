// Shop.js

import '../Pages/Page Styles/Shop.css';
import ProductCard from '../components/ProductCard';
import { useState, useEffect } from 'react';
import { getAllCategory } from '../services/CategoryService';
import { getProductsByCategory, getAllProducts } from '../services/ProductService';
import { useParams ,useLocation ,useNavigate } from 'react-router-dom';


const Shop = () => {
  const [allCategoryNames, setAllCategoryNames] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [quantityMap, setQuantityMap] = useState({});
  const [responses, setResponses] = useState(null);
  const { name } = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const customerId = location.state ? location.state.customerId : null;



  useEffect(() => {
    if (name) {

      setSelectedCategory(name);
      fetchProductsByCategory(name);
    } else {

      setSelectedCategory(null);
      fetchAllProducts();
    }

    fetchAllCategoryNames();
  }, [name]);

  // fetch all category names
  const fetchAllCategoryNames = () => {
    getAllCategory()
      .then((response) => {
        const categoryNames = response.data.map((category) => category.name);
        setAllCategoryNames(categoryNames);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // fetch all products
  const fetchAllProducts = () => {
    getAllProducts()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // fetch products by category
  const fetchProductsByCategory = (categoryName) => {
    getProductsByCategory(categoryName)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // handle category selection
  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    fetchProductsByCategory(categoryName);
  };

  // add product to cart
  const addProductToCart = async (productId, quantity) => {
    const apiUrl = 'http://localhost:8080/api/products/add-to-cart';

    const requestBody = {
      productId,
      customerId: customerId,
      quantity,
    };

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const responseData = await res.json();
      setResponses(responseData);
      alert('Product added to cart successfully!', responses);
    } catch (error) {
      console.error('Error adding to cart:', error.message);
    }

    fetchProductsByCategory(selectedCategory);
  };

  return (
    <div className="shop-big-container">
      <div className="shop-top-container">
        <div className="shop-top-image">
         <h1>{selectedCategory ? selectedCategory.toUpperCase() : 'ALL PRODUCTS'}</h1>
        </div>
        <p className="text-cart"onClick={() => {navigate(`/cart/${customerId}`);}}>View Cart{' >> '}</p>
      </div>
         
      <center>
        <br />
        <br />
        <h1>Shop By Category</h1>
        <p>customer id {customerId}</p>
        <p>{name}</p>
        <br />
        <br />
      </center>
      <div className="shop-container">
        <div className="sidebar-category">
          <h3 className="category-text-head">Categories</h3>
          <ul>
            {allCategoryNames.map((categoryName, index) => (
              <li key={index} onClick={() => handleCategoryClick(categoryName)}>
               <span style={{ marginRight: '10px' }}>{' > '}</span> 
               {categoryName}
              </li>
            ))}
          </ul>
        </div>

        <div className="shop-hero">
          {products.map((product) => (
              <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addProductToCart}
              quantityMap={quantityMap}
              setQuantityMap={setQuantityMap}
              customerId={customerId}
            />
    
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
