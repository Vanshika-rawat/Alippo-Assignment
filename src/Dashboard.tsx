import React, { useState, useEffect } from 'react';
import { FaUser, FaEdit, FaTrash } from 'react-icons/fa';
import './App.css';

interface IDataItem {
  id: number;
  name: string;
  age: number;
  city: string;
  pinCode: string;
}

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="left-menu">
        <h1 className="alippo">alippo</h1>
      </div>
      <div className="right-menu">
        <ul>
          <li><a href="#">Categories</a></li>
          <li><a href="#">Blogs</a></li>
          <li><a href="#">Alippo</a></li>
          <li><a href="#">Enterpreneurs</a></li>
          <li><a href="#">Beyond Women's Day</a></li>
          <li><a href="#">Refer and Earn</a></li>
          <li><a href="#"><FaUser /></a></li>
        </ul>
      </div>
    </nav>
  );
};

const Dashboard: React.FC = () => {
  const [data, setData] = useState<IDataItem[]>([]);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<IDataItem | null>(null);
  const [editedValue, setEditedValue] = useState<string>('');
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<IDataItem | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://assets.alippo.com/catalog/static/data.json');
      const jsonData = await response.json();
      const dataWithIds = jsonData.map((item: any, index: number) => ({ ...item, id: index + 1 }));
      setData(dataWithIds);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEditClick = (item: IDataItem) => {
    setEditItem(item);
    setEditedValue(item.name); // Set the edited value to the name of the item
    setEditModalOpen(true);
  };

  const handleDeleteClick = (item: IDataItem) => {
    setSelectedRow(item);
    setDeleteModalOpen(true);
  };

  const handleSaveEdit = () => {
    const updatedData = data.map((item) => {
      if (item === editItem) {
        return { ...item, name: editedValue }; // Update the 'name' column specifically
      }
      return item;
    });
    setData(updatedData);
    setEditModalOpen(false);
  };
  
  const handleSaveDelete = () => {
    const filteredData = data.filter((entry) => entry !== selectedRow);
    setData(filteredData);
    setDeleteModalOpen(false);
  };

  return (
    <div className="dashboard">
      <Navbar />
      <div className="page">
        <div className="left-section">
          
        </div>
        <div className="right-section">
          <div className="right-portion">
          {error && <p>{error}</p>}
          {editModalOpen && (
            <div className="edit-modal">
              <p>Editing column {'1'}</p>
              <input
                type="text"
                value={editedValue}
                onChange={(e) => setEditedValue(e.target.value)}
              />
              <button onClick={handleSaveEdit}>Save</button>
              <button onClick={() => setEditModalOpen(false)}>Cancel</button>
            </div>
          )}

          {/* Render Delete Modal */}
          {deleteModalOpen && (
            <div className="delete-modal">
              <p>Are you sure you want to delete this item?</p>
              <button onClick={handleSaveDelete}>Yes</button>
              <button onClick={() => setDeleteModalOpen(false)}>No</button>
            </div>
          )}

          {/* Render User Cards */}
          <div className="user-cards">
            {data.map((item) => (
              <div className="user-card" key={item.id}>
                <h2>{item.name}</h2>
                <p>Age: {item.age}</p>
                <p>City: {item.city}</p>
                <p>Pin Code: {item.pinCode}</p>
                <div className="actions">
                  <button onClick={() => handleEditClick(item)}><FaEdit /> Edit</button>
                  <button onClick={() => handleDeleteClick(item)}><FaTrash /> Delete</button>
                </div>
              </div>
            ))}
          </div>
          </div>  
        </div>
      </div>
        <div className="left-box">
          <div className="circle">
            <h2 className="alippo">alippo</h2>
          </div>
          <div className="content">
            <h3>A new way for women to learn & grow</h3>
            <p>Our mission is to provide women with affordable, high-quality courses that empower them. Explore your passions while meeting like-minded people & being part of an active community.</p>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;
