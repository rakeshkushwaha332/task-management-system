# Task Management System

## 📌 About the Project

This project is a **Simple Task Management System** developed as part of an assigned task to demonstrate full-stack development skills . The application focuses on task creation, assignment, prioritization, tracking, and secure access using user authentication.

The system allows **authorized users** to manage tasks efficiently, while supporting **role-based access control** where Admin users can manage all tasks and assign them to users, and normal users can view and update their assigned tasks only.

> 📅 Project Completion Date: December 31, 2025

---

## 🛠️ Tech Stack

### Frontend

* **React (v18+)** – Component-based UI development
* **Vite** – Fast development server and build tool
* **React Router DOM (v6)** – Client-side routing
* **Axios (AJAX)** – API communication
* **Vanilla CSS** – Custom, component-level styling

### Backend

* **Node.js**
* **Express.js** – REST API framework
* **MongoDB** – NoSQL database
* **Mongoose** – MongoDB object modeling
* **JWT (JSON Web Tokens)** – Secure authentication and authorization

---

## ✨ Features & Task Requirements Implementation

### 1️⃣ Task Creation

* Create tasks with **title, description, due date, and priority**
* Priority levels: **High, Medium, Low**
* Tasks are added to their respective priority lists

### 2️⃣ Task List with Pagination & AJAX

* Display all tasks using **AJAX (Axios)** without page reload
* Pagination implemented (5 tasks per page)
* Shows task **title, due date, and status (Pending / Completed)**

### 3️⃣ Task Details View

* Dedicated **Task Details page / modal**
* Displays task description, due date, priority, and status

### 4️⃣ Task Editing

* Edit task title, description, due date, and priority
* Pre-filled form with existing task data

### 5️⃣ Task Deletion

* Delete tasks with a **confirmation dialog** before removal
* Secure deletion for authorized users only

### 6️⃣ Task Status Update

* Mark tasks as **Completed** or update status dynamically
* Instant UI update using AJAX

### 7️⃣ User Authentication & Authorization

* Secure **Login & Signup** system
* JWT-based authentication
* Role-based access:

  * **Admin:** Create, edit, delete, assign tasks, manage users
  * **User:** View and update assigned tasks only
* Protected routes to prevent unauthorized access

### 8️⃣ Priority Management

* Move tasks between **High / Medium / Low** priority lists
* Priority-based task sorting

### 9️⃣ Visual Representation

* Color-coded priorities for quick identification:

  * 🔴 High – Red
  * 🟠 Medium – Amber
  * 🟢 Low – Green
* Visual indicators using colored text, backgrounds, and borders

### 10 Screenshots
Login Page 
<img width="1915" height="958" alt="image" src="https://github.com/user-attachments/assets/c4b1a3a6-a902-4e7e-aee7-1de7f4ca275c" />


Sign Up page
<img width="1898" height="1011" alt="image" src="https://github.com/user-attachments/assets/1e1ebb1d-adde-4ebb-9965-1bc9ba1e0364" />

Admin Pannel
<img width="1896" height="968" alt="image" src="https://github.com/user-attachments/assets/98fc0a14-2deb-4967-b876-548bbf1455a3" />



User Page 
<img width="1908" height="958" alt="image" src="https://github.com/user-attachments/assets/a9b36811-2fdc-4b24-8e56-68d411a376af" />



### 11 Demo Video
https://www.youtube.com/watch?v=ADP1bMgBUco

---

## 📁 Folder Structure

```text
Task-Management-System-main
│
├── README.md
│
├── frontend
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   ├── vite.config.js
│   │
│   ├── public
│   │   └── vite.svg
│   │
│   └── src
│       ├── App.css
│       ├── App.jsx
│       ├── index.css
│       ├── main.jsx
│       │
│       ├── assets
│       │   └── react.svg
│       │
│       ├── components
│       │   ├── CreateTask.jsx
│       │   ├── Pagination.jsx
│       │   └── PrivateRoute.jsx
│       │
│       ├── pages
│       │   ├── Dashboard.jsx
│       │   ├── EditTask.jsx
│       │   ├── Login.jsx
│       │   ├── Signup.jsx
│       │   ├── Signup.css
│       │   ├── TaskDetails.jsx
│       │   └── UserDashboard.jsx
│       │
│       ├── services
│       │   └── api.js
│       │
│       └── style
│           ├── CreateTask.css
│           ├── Dashboard.css
│           ├── EditTask.css
│           ├── Login.css
│           └── TaskDetail.css
│
└── server
    ├── .env
    ├── .gitignore
    ├── package.json
    ├── package-lock.json
    ├── server.js
    │
    ├── config
    │   └── db.js
    │
    ├── middleware
    │   ├── admin.js
    │   └── auth.js
    │
    ├── models
    │   ├── Task.js
    │   └── User.js
    │
    └── routes
        ├── auth.js
        └── tasks.js

```

---

## 🚪 Application Routes

| Route              | Access | Description               |
| ------------------ | ------ | ------------------------- |
| `/`                | Public | Login page                |
| `/register`        | Public | User registration         |
| `/admin-dashboard` | Admin  | Task management dashboard |
| `/user-dashboard`  | User   | View assigned tasks       |
| `/create-task`     | Admin  | Create new task           |
| `/task/edit/:id`   | Admin  | Edit existing task        |

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v16+)
* npm or yarn

### Installation

```bash
git clone https://github.com/yourusername/task-management-app.git
cd task-management-app
npm install
npm run dev
```

Open the application in browser:

```
http://localhost:5173
```

---

## ⚙️ Environment Variables (Optional)

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🎨 UI & Design System

* **Primary Color:** #2563eb (Blue)
* **Priority Colors:**

  * High: #ef4444
  * Medium: #f59e0b
  * Low: #22c55e
* Responsive layout with cards, shadows, and smooth transitions

---

## 📝 License

This project is open-source and available under the **MIT License**.

---

Made with ❤️ as part of a technical task submission to demonstrate task management, authentication, and frontend–backend integration.
