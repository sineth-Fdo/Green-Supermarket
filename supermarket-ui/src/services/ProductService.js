import axios from "axios";
// npm install axios --save

const BASE_REST_API_URL = "http://localhost:8080/api/products";

export const getAllProducts = () => axios.get(BASE_REST_API_URL);


export const addProduct = (product) => axios.post(`${BASE_REST_API_URL}/add`, product);

export const deleteProduct = (id) => axios.delete(`${BASE_REST_API_URL}/delete/${id}`);

export const updateProduct = (id, updatedProductData) => axios.put(`${BASE_REST_API_URL}/update/${id}`, updatedProductData);

export const getProductsByCategory = (categoryName) => {
  return axios.get(`${BASE_REST_API_URL}/category/${categoryName}`);
};

export const getProductById = (id) => axios.get(`${BASE_REST_API_URL}/${id}`);

export const uploadProductImage = (id, file) => {
  // Create FormData object to send file data
  const formData = new FormData();
  formData.append("file", file);

  // Make a POST request with the FormData
  return axios.post(`${BASE_REST_API_URL}/imagePid/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
