# Personal Task Management System

A full-stack web application that allows users to register, login, and manage their personal tasks securely with a modern glassmorphism UI.

## Project Overview

This is a complete task management system built from scratch with user authentication and CRUD operations. Users can create accounts, log in securely, and manage their personal to-do lists with an intuitive interface featuring glassmorphism design effects.

## Features

- **User Authentication** - Secure registration and login with JWT tokens
- **Task Management** - Create, read, update, and delete tasks
- **Personal Data** - Each user sees only their own tasks
- **Modern UI** - Glassmorphism design with blue theme and blur effects
- **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

**Frontend:**
- React 18
- Tailwind CSS (for styling)
- Axios (for API calls)

**Backend:**
- Node.js with Express.js
- MongoDB (database)
- Mongoose (ODM)
- JWT (JSON Web Tokens for authentication)
- bcryptjs (password hashing)

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (local or MongoDB Atlas)

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_secret_key_here
```

Start backend:
```bash
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The app will open at `http://localhost:3000`

## How It Works

1. **Register** - Create a new account with username, email, and password
2. **Login** - Access your account securely
3. **Add Tasks** - Create new tasks with title and optional description
4. **Manage Tasks** - Mark tasks as complete, edit, or delete them
5. **Track Progress** - View stats showing total, completed, and pending tasks

## Security

- Passwords are hashed using bcrypt before storing
- JWT tokens authenticate and authorize users
- Protected routes ensure users can only access their own data
- Input validation on both frontend and backend

## Screenshots

- Clean login/register interface with glassmorphism effects
- Dashboard showing task statistics
- Task list with edit and delete options
- Responsive design for mobile devices

## Design Features

- Glassmorphism UI with backdrop blur effects
- Blue gradient color scheme
- Smooth animations and transitions
- Floating background elements
- Clean, modern interface

## API Endpoints

**Auth Routes:**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

**Task Routes (Protected):**
- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Tech Stack

**Frontend:**
- React 18
- Tailwind CSS
- Axios for API calls

**Backend:**
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT for authentication
- bcrypt for password hashing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd task-manager
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

**Note:** If using MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string.

Start the backend server:

```bash
npm start
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

Start the frontend:

```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Usage

1. Open `http://localhost:3000` in your browser
2. Register a new account
3. Log in with your credentials
4. Start managing your tasks!

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Tasks (Protected Routes)
- `GET /api/tasks` - Get all tasks for logged-in user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Project Structure

```
task-manager/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth.jsx
│   │   │   ├── TaskList.jsx
│   │   │   └── TaskForm.jsx
│   │   ├── App.jsx
│   │   └── index.js
│   ├── package.json
│   └── public/
└── README.md
```

## Security Features

- Passwords are hashed using bcrypt
- JWT tokens for secure authentication
- Protected API routes
- Token stored in localStorage (consider httpOnly cookies for production)

## Deployment

### Backend Deployment : https://ardentix-task.onrender.com

### Frontend Deployment : https://ardentix-task-1.onrender.com
