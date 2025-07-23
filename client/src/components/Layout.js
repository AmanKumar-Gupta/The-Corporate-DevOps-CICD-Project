import React, { useState } from 'react';
import logo from '../logo.svg';
import InfoPopup from './InfoPopup';
import AnimatedBanner from './AnimatedBanner';

function Layout({ children }) {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div className="app-layout">
      <header className="app-header slide-down">
        <div className="brand">
          <div className="logo-container">
            <img src={logo} alt="DevOps Project logo" className="logo" />
            <div className="logo-glow"></div>
          </div>
          <div className="brand-info">
            <h1 className="brand-title">DevOps Project</h1>
            <p className="nav-subtitle">User Management System</p>
            <p className="creator-tag">Created by Aman</p>
          </div>
        </div>
        <div className="header-actions">
          <button 
            className="info-btn-header"
            onClick={() => setShowInfo(true)}
            aria-label="Information"
          >
            <i className="fas fa-info-circle"></i>
          </button>
        </div>
      </header>
      
      <AnimatedBanner message="Welcome to DevOps Project 🚀 Built with Modern Tech Stack" />
      
      <div className="app-body">
        <aside className="sidebar slide-in-left">
          <div className="sidebar-header">
            <h3><i className="fas fa-link"></i> Connect</h3>
          </div>
          <ul className="social-links">
            <li>
              <a className="sidebar-btn linkedin" href="https://www.linkedin.com/in/amankg1/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
                <span>LinkedIn</span>
              </a>
            </li>
            <li>
              <a className="sidebar-btn youtube" href="https://www.amankg.tech/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube"></i>
                <span>YouTube</span>
              </a>
            </li>
            <li>
              <a className="sidebar-btn instagram" href="https://www.instagram.com/amanguptaji1" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
                <span>Instagram</span>
              </a>
            </li>
          </ul>
          
          <div className="sidebar-footer">
            <div className="tech-stack">
              <h4><i className="fas fa-code"></i> Tech Stack</h4>
              <div className="tech-badges">
                <span className="tech-badge react">React</span>
                <span className="tech-badge node">Node.js</span>
                <span className="tech-badge mysql">MySQL</span>
              </div>
            </div>
          </div>
        </aside>
        
        <main className="main-content fade-in">
          {children}
        </main>
      </div>
      
      <footer className="app-footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} DevOps Project. Created by Aman. All rights reserved.</p>
          <div className="footer-links">
            <span className="footer-link">Privacy</span>
            <span className="footer-link">Terms</span>
            <span className="footer-link">Support</span>
          </div>
        </div>
      </footer>

      {showInfo && <InfoPopup onClose={() => setShowInfo(false)} />}

      <div className="background-effects">
        <div className="bubble-container">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bubble" />
          ))}
        </div>
        <div className="star-container">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="star" />
          ))}
        </div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
    </div>
  );
}

export default Layout;