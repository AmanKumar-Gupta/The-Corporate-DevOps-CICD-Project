import React from 'react';

function InfoPopup({ onClose }) {
  return (
    <div className="info-overlay animate__animated animate__fadeIn" onClick={onClose}>
      <div className="info-box animate__animated animate__zoomIn" onClick={e => e.stopPropagation()}>
        <div className="info-header">
          <h3><i className="fas fa-info-circle"></i> About This Project</h3>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="info-content">
          <p>This DevOps Project demonstrates a modern 3-tier architecture with:</p>
          <ul className="feature-list">
            <li><i className="fas fa-check"></i> React frontend with modern UI/UX</li>
            <li><i className="fas fa-check"></i> Node.js backend with Express</li>
            <li><i className="fas fa-check"></i> MySQL database integration</li>
            <li><i className="fas fa-check"></i> JWT authentication & authorization</li>
            <li><i className="fas fa-check"></i> Role-based access control</li>
          </ul>
          <div className="creator-info">
            <p><strong>Created by:</strong> Aman</p>
            <p><strong>Tech Stack:</strong> React, Node.js, MySQL, Express</p>
          </div>
        </div>
        <div className="info-actions">
          <button className="primary-btn" onClick={onClose}>
            <i className="fas fa-rocket"></i> Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default InfoPopup;