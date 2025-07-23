import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../logo.svg';

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container animate__animated animate__fadeInUp">
        <div className="login-header">
          <div className="logo-container">
            <img src={logo} alt="DevOps Project logo" className="logo" />
            <div className="logo-glow"></div>
          </div>
          <h1>DevOps Project</h1>
          <p className="subtitle">User Management System</p>
          <p className="creator">Created by Aman</p>
        </div>

        <div className="login-form-container">
          <h2><i className="fas fa-sign-in-alt"></i> Welcome Back</h2>
          
          {error && (
            <div className="error-message animate__animated animate__shakeX">
              <i className="fas fa-exclamation-triangle"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="modern-form">
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
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

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
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button 
              type="submit" 
              className={`primary-btn full-width ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Signing In...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt"></i>
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="login-footer">
            <div className="security-tip">
              <i className="fas fa-shield-alt"></i>
              <div>
                <strong>Security Tip:</strong> Use a strong password and never share your credentials. 
                For access requests, contact <a href="mailto:support@devopsproject.com">support</a>.
              </div>
            </div>
            
            <div className="auth-links">
              <p>Don't have an account? <Link to="/register" className="auth-link">Create Account</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;