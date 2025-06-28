# 3-Tier DevSecOps Project

This repository contains a simple Node.js API and a React client used for a user management demo. Follow the steps below to get the project running locally.

## Setup

1. Install Node.js (version 18 or later is recommended).
2. Install dependencies for both the API and client:

   ```bash
   cd api && npm install
   cd ../client && npm install
   ```

3. Start the API server:

   ```bash
   cd api
   npm start
   ```

4. In a separate terminal, start the React client:

   ```bash
   cd client
   npm start
   ```

5. Open `http://localhost:3000` in your browser to use the application.

The client now displays an animated banner welcoming you to **DevOps Shack**.


Local Mysql setup using docker and commands to setup tables

docker run -d \
  --name mysql-container \
  --network backend-network \
  -e MYSQL_ROOT_PASSWORD=Aditya \
  -e MYSQL_DATABASE=crud_app \
  -e MYSQL_USER=root \
  -e MYSQL_PASSWORD=Aditya \
  -p 3306:3306 \
  mysql:latest

Connect to MySQL Container to Create Tables

docker exec -it mysql-container mysql -u root -pAditya crud_app
Then paste and execute the following SQL commands:

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'viewer') NOT NULL DEFAULT 'viewer',
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
