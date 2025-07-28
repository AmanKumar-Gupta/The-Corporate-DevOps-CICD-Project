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

The client now displays an animated banner welcoming you to **DevOps Project**.

---

## Local MySQL Setup Using Docker

Run the following command to start a MySQL container:

```bash
docker run -d \
  --name mysql-container \
  -e MYSQL_ROOT_PASSWORD=Aditya \
  -e MYSQL_DATABASE=crud_app \
  -p 3306:3306 \
  mysql:latest
```

### Connect to MySQL Container to Create Tables

After a few seconds, run:

```bash
docker exec -it mysql-container mysql -u root -pAditya crud_app
```

Then paste and execute the following SQL commands:

```sql
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'viewer') NOT NULL DEFAULT 'viewer',
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

plugins

sonar scanner
docker pipeline
nodejs
kubernetes
stageview

conigure webhook in sonar server

configure webhook in github

install generic webhook plugin in jenkins

Step 3: Configure Post Parameters

1. In the Post Parameters section, add the following:

Variable: ref

Expression (JSON): $.ref

Step 4: Write a string as Token

Token = amankumargupta123
1. Write any keyword string as token that will be used in the webhook URL.

Step 5: Configure Optional Filter

1. In the Optional Filter section, configure the following:

Expression: refs/heads/branch_name (Replace branch_name with the name of your
branch)

Text: $ref
Step 6: Configure GitHub Webhook

1.
Go to your GitHub repository settings.

2. Navigate to Webhooks.