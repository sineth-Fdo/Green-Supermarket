import React, { useEffect, useState } from 'react';
import './Page Styles/ManageCategory.css';
import { useNavigate } from 'react-router-dom';

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
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

  const addCategory = () => {
    // Make a POST request to add the new category
    fetch('http://localhost:8080/api/category/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newCategoryName,
      }),
    })
      .then(response => response.json())
      .then(data => {
        // Update the categories with the new category
        setCategories([...categories, data]);
        // Clear the input field
        setNewCategoryName('');
      })
      .catch(error => console.error('Error adding category:', error));
  };

  const handleEditCategory = (categoryId) => {
    // Set the category being edited
    setEditingCategory(categoryId);
  };

  const handleSaveEdit = (editedCategory) => {
    // Make a PUT request to update the category
    fetch(`http://localhost:8080/api/category/update/${editedCategory.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: editedCategory.name,
      }),
    })
      .then(response => response.json())
      .then(data => {
        // Update the categories after successful edit
        setCategories(categories.map(category => (category.id === editedCategory.id ? data : category)));
        // Clear the editing state
        setEditingCategory(null);
      })
      .catch(error => console.error('Error updating category:', error));
  };

  const handleCancelEdit = () => {
    // Clear the editing state
    setEditingCategory(null);
  };

  const handleRemoveCategory = (categoryId) => {
    // Make a DELETE request to remove the category
    fetch(`http://localhost:8080/api/category/delete/${categoryId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        // Update the categories after deletion
        setCategories(categories.filter(category => category.id !== categoryId));
      })
      .catch(error => console.error('Error deleting category:', error));
  };

  return (
    <div className='category-page'>
      <h3 className='back-manage' onClick={() => { navigate('/manage') }}>{"<< Back"}</h3>
      <div className='category-ui'>
        <h1>ManageCategory</h1>
        <div className="btn-cat">
          <input
            type="text"
            className='text-box'
            placeholder='Enter New Category Name'
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <button className='button1' onClick={addCategory}>Add</button>
        </div>
        <div className="table-manage">
          <ul className="responsive-table">
            <li className="table-header">
              <div className="col col-1">Id</div>
              <div className="col col-2">Name</div>
              <div className="col col-2">Edit</div>
              <div className="col col-3"></div>
            </li>
            {categories.map(category => (
              <li className="table-row" key={category.id}>
                <div className="col col-1" data-label="Id">{category.id}</div>
                <div className="col col-2" data-label="Name">
                  {editingCategory === category.id ? (
                    <input
                    style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '6px 12px', width: '100%'}}
                      type="text"
                      value={category.name}
                      onChange={(e) => setCategories(categories.map(c => (c.id === category.id ? { ...c, name: e.target.value } : c)))}
                    />
                  ) : (
                    category.name
                  )}
                </div>
                <div className="col col-2" data-label="Edit">
                  {editingCategory === category.id ? (
                    <>
                      <button className="btn3" onClick={() => handleSaveEdit(category)}>Save</button>{' '}
                      <button className="btn3" onClick={handleCancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <button className="btn3" onClick={() => handleEditCategory(category.id)}>Edit</button>
                  )}
                </div>
                <div className="col col-3 cross-order" onClick={() => handleRemoveCategory(category.id)}>X</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManageCategory;
