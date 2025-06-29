import React, { useState, useEffect } from 'react';

function UserForm({ user, onSubmit, onCancel }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({ name: user.name, email: user.email, password: '' });
    } else {
      setForm({ name: '', email: '', password: '' });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      name: form.name,
      email: form.email,
    };

    if (!user) {
      payload.password = form.password;
    }

    try {
      await onSubmit(payload);
      if (!user) {
        setForm({ name: '', email: '', password: '' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="user-form-container">
      <div className="form-header">
        <h3>
          <i className={`fas ${user ? 'fa-edit' : 'fa-user-plus'}`}></i>
          {user ? 'Edit User' : 'Add New User'}
        </h3>
        {user && (
          <button className="cancel-btn" onClick={onCancel} aria-label="Cancel">
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
      
      <form className="user-form modern-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">
            <i className="fas fa-user"></i>
            Full Name
          </label>
          <input
            id="name"
            className="form-field"
            type="text"
            name="name"
            placeholder="Enter full name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">
            <i className="fas fa-envelope"></i>
            Email Address
          </label>
          <input
            id="email"
            className="form-field"
            type="email"
            name="email"
            placeholder="Enter email address"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        {!user && (
          <div className="form-group">
            <label htmlFor="password">
              <i className="fas fa-lock"></i>
              Password
            </label>
            <input
              id="password"
              className="form-field"
              type="password"
              name="password"
              placeholder="Enter secure password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="button-group">
          <button 
            type="submit" 
            className={`primary-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Processing...
              </>
            ) : (
              <>
                <i className={`fas ${user ? 'fa-save' : 'fa-plus'}`}></i>
                {user ? 'Update User' : 'Add User'}
              </>
            )}
          </button>
          
          {user && (
            <button type="button" className="secondary-btn" onClick={onCancel}>
              <i className="fas fa-times"></i>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default UserForm;