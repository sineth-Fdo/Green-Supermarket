import axios from "axios";


const BASE_REST_API_URL = "http://localhost:8080/api/category";

export const getAllCategory = () => axios.get(BASE_REST_API_URL);

export const deleteCategory = (id) => axios.delete(`${BASE_REST_API_URL}/delete/${id}`);

export const saveCategory = (category) => axios.post(`${BASE_REST_API_URL}/add`, category);

export const getCategoryById = (id) => axios.get(`${BASE_REST_API_URL}/get${id}`);

export const updateCategory = (category, id) => axios.put(`${BASE_REST_API_URL}/update/${id}`, category);