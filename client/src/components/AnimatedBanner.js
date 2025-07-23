import React, { useState, useEffect } from 'react';

function AnimatedBanner({ message }) {
  const [currentMessage, setCurrentMessage] = useState(0);
  const messages = [
    "Welcome to DevOps Project 🚀 Built with Modern Tech Stack",
    "Secure User Management System 🔐 Created by Aman",
    "React + Node.js + MySQL = Powerful Combination 💪",
    "Experience Modern Web Development 🌟"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="animated-banner">
      <div className="banner-content">
        <div className="banner-text animate__animated animate__fadeInUp">
          {messages[currentMessage]}
        </div>
        <div className="banner-indicators">
          {messages.map((_, index) => (
            <div 
              key={index} 
              className={`indicator ${index === currentMessage ? 'active' : ''}`}
              onClick={() => setCurrentMessage(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnimatedBanner;