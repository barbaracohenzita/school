<!--
  <<< Author notes: Step 0 >>>
  Welcome to the course! We're excited to have you here.
  This course will help you get started with GitHub Copilot and show you how to use it to enhance your coding experience.
-->

## Welcome to the GitHub Copilot Course!

We're excited to have you here. This course will help you get started with GitHub Copilot and show you how to use it to enhance your coding experience.

### What is GitHub Copilot?

GitHub Copilot is an AI pair programmer that helps you write code faster and with less work. It draws context from comments and code to suggest individual lines and whole functions instantly. GitHub Copilot is powered by OpenAI Codex, a generative pretrained language model created by OpenAI.

### Course Overview

In this course, you will learn how to:

- Enable GitHub Copilot in a Codespace
- Use GitHub Copilot to accept suggested code
- View multiple suggestions in the GitHub Copilot hub
- Generate code from comments using GitHub Copilot

By the end of this course, you'll have a solid understanding of how to use GitHub Copilot to enhance your coding experience.

### Let's Get Started!

To get started, follow the instructions in the next step to enable GitHub Copilot in a Codespace.

## Instructions to run the Student Organization Study App

### Prerequisites

- Node.js (v14.x or later)
- MongoDB
- PostgreSQL
- MySQL

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/barbaracohenzita/school.git
   cd school/student-app
   ```

2. Install dependencies for the backend:

   ```bash
   cd backend
   npm install
   ```

3. Set up environment variables for the backend:

   Create a `.env` file in the `backend` directory with the following content:

   ```env
   MONGODB_URI=mongodb://localhost:27017/student-app
   PG_USER=your_pg_user
   PG_PASSWORD=your_pg_password
   PG_HOST=localhost
   PG_PORT=5432
   PG_DATABASE=student-app
   MYSQL_USER=your_mysql_user
   MYSQL_PASSWORD=your_mysql_password
   MYSQL_HOST=localhost
   MYSQL_PORT=3306
   MYSQL_DATABASE=student-app
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

   The backend server should now be running at `http://localhost:3000`.

5. Open a new terminal and navigate to the `frontend` directory:

   ```bash
   cd ../frontend
   ```

6. Open the `index.html` file in your preferred web browser to view the frontend of the app.

### New Features and Improvements

- User authentication using JWT
- User login and registration
- CRUD operations for user data
- Study materials management
- Event management
- Notifications
- Messaging
- Task management
- Calendar integration
- Analytics

### Backend Server Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the server:

   ```bash
   npm start
   ```

   The server should now be running at `http://localhost:3000`.
