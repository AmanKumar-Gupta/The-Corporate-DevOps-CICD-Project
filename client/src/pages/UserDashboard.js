import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from '../axios';
import UserForm from '../components/UserForm';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const formRef = useRef(null);

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchUsers();
    }
  }, [user, navigate]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('/api/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Fetch Error:', err);
      if (err.response?.status === 401) logout();
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (userData) => {
    try {
      await axios.post('/api/users', userData);
      await fetchUsers();
      setEditingUser(null);
    } catch (err) {
      console.error('Create Error:', err);
      throw err;
    }
  };

  const handleUpdate = async (id, userData) => {
    if (user?.role !== 'admin') return;
    try {
      await axios.put(`/api/users/${id}`, userData);
      await fetchUsers();
      setEditingUser(null);
    } catch (err) {
      console.error('Update Error:', err);
      throw err;
    }
  };

  const handleDelete = async (id) => {
    if (user?.role !== 'admin') return;
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/api/users/${id}`);
        await fetchUsers();
      } catch (err) {
        console.error('Delete Error:', err);
      }
    }
  };

  const handleEditClick = (selectedUser) => {
    if (user?.role === 'admin') {
      setEditingUser(selectedUser);
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredUsers = users.filter(userData =>
    userData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    userData.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-title">
            <h1><i className="fas fa-users"></i> User Management Dashboard</h1>
            <p className="header-subtitle">DevOps Project - React + Node.js + MySQL</p>
          </div>
          <div className="user-info">
            <div className="user-avatar">
              <i className="fas fa-user-circle"></i>
            </div>
            <div className="user-details">
              <span className="user-name">{user?.name}</span>
              <span className={`user-role ${user?.role}`}>
                <i className={`fas ${user?.role === 'admin' ? 'fa-crown' : 'fa-eye'}`}></i>
                {user?.role}
              </span>
            </div>
            <button className="logout-btn" onClick={logout} title="Logout">
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="content-grid">
          <div className="form-section">
            <div ref={formRef}>
              {(user?.role === 'admin' || user?.role === 'viewer') && (
                <UserForm
                  onSubmit={
                    editingUser && user?.role === 'admin'
                      ? (data) => handleUpdate(editingUser.id, data)
                      : handleCreate
                  }
                  user={editingUser && user?.role === 'admin' ? editingUser : null}
                  onCancel={() => setEditingUser(null)}
                />
              )}
            </div>
          </div>

          <div className="table-section">
            <div className="table-header">
              <div className="table-title">
                <h3><i className="fas fa-list"></i> Users ({filteredUsers.length})</h3>
              </div>
              <div className="table-controls">
                <div className="search-box">
                  <i className="fas fa-search"></i>
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="loading-container">
                <div className="loading-spinner">
                  <i className="fas fa-spinner fa-spin"></i>
                </div>
                <p>Loading users...</p>
              </div>
            ) : (
              <div className="table-container">
                <table className="modern-table">
                  <thead>
                    <tr>
                      <th><i className="fas fa-hashtag"></i> ID</th>
                      <th><i className="fas fa-user"></i> Name</th>
                      <th><i className="fas fa-envelope"></i> Email</th>
                      <th><i className="fas fa-cogs"></i> Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="no-data">
                          <i className="fas fa-users-slash"></i>
                          <p>No users found</p>
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map(userData => (
                        <tr key={userData.id} className={editingUser?.id === userData.id ? 'editing' : ''}>
                          <td data-label="ID">
                            <span className="id-badge">{userData.id}</span>
                          </td>
                          <td data-label="Name">
                            <div className="user-cell">
                              <i className="fas fa-user-circle user-icon"></i>
                              {userData.name}
                            </div>
                          </td>
                          <td data-label="Email">
                            <div className="email-cell">
                              <i className="fas fa-envelope"></i>
                              {userData.email}
                            </div>
                          </td>
                          <td data-label="Actions">
                            {user?.role === 'admin' ? (
                              <div className="action-buttons">
                                <button 
                                  className="action-btn edit-btn" 
                                  onClick={() => handleEditClick(userData)}
                                  title="Edit user"
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button 
                                  className="action-btn delete-btn" 
                                  onClick={() => handleDelete(userData.id)}
                                  title="Delete user"
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              </div>
                            ) : (
                              <span className="no-access">
                                <i className="fas fa-lock"></i>
                                Admin Only
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        className="fab"
        onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
        title="Add new user"
      >
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
}

export default UserDashboard;