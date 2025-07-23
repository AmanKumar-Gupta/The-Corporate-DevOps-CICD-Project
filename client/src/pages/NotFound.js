import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';

function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-container animate__animated animate__fadeInUp">
        <div className="not-found-header">
          <div className="logo-container">
            <img src={logo} alt="DevOps Project logo" className="logo" />
            <div className="logo-glow"></div>
          </div>
          <div className="error-code">404</div>
          <h1>Page Not Found</h1>
          <p className="error-description">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="not-found-actions">
          <Link to="/login" className="primary-btn">
            <i className="fas fa-home"></i>
            Go to Login
          </Link>
          <Link to="/dashboard" className="secondary-btn">
            <i className="fas fa-tachometer-alt"></i>
            Dashboard
          </Link>
        </div>

        <div className="not-found-footer">
          <p>DevOps Project - Created by Aman</p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;