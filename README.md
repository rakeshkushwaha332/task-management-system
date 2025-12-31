Markdown# Task Management App

A modern, full-stack **Task Management Application** with role-based access control (Admin & User). Designed for efficient task creation, assignment, tracking, and productivity management.

![Task Management Preview](https://via.placeholder.com/1200x600/3b82f6/ffffff?text=Task+Management+App+-+Modern+Blue+Theme)  
*(Replace with actual screenshot after deployment)*

## ✨ Features

### Authentication
- Secure login and registration
- Role-based access: **Admin** and **User**
- JWT token stored in localStorage for session persistence
- Protected routes based on user role

### Admin Dashboard
- Create, view, edit, and delete tasks
- Assign tasks to any registered user
- Set due dates and priority levels (High, Medium, Low)
- Inline status and priority updates
- Task list with pagination (5 tasks per page)
- Priority-based sorting (High → Medium → Low)
- Visual priority indicators:
  - Full title cell background color
  - Bold colored text
  - Left border accent
- Task detail modal with rich information
- Responsive table layout

### User Experience
- Clean, modern, consistent blue-themed UI
- Loading states with spinners
- Form validation and user feedback
- Smooth hover effects and transitions
- Mobile-responsive design

### UI Highlights
- Gradient blue headers on all major pages
- Card-based layouts with soft shadows
- Custom dropdowns with icons
- Priority color coding: Red (High), Amber (Medium), Green (Low)
- Status badges with semantic colors

## 🛠️ Tech Stack

### Frontend
- **React** (v18+)
- **React Router DOM** (v6) – Client-side routing
- **Vite** – Fast development and build tool
- **Axios** – API requests
- **Vanilla CSS** – Modular, component-specific styling (no frameworks)

### Backend (Inferred from API usage)
- Node.js + Express
- MongoDB + Mongoose
- JWT-based authentication
- RESTful API

## 📁 Folder Structure
src/
├── components/
│   └── TaskDetails.jsx          # Task detail view/modal
├── pages/ (or components/)
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Dashboard.jsx            # Admin task list
│   ├── CreateTask.jsx
│   ├── EditTask.jsx
│   └── ...
├── services/
│   └── api.js                   # Axios instance with base URL & interceptors
├── style/
│   ├── Login.css
│   ├── Signup.css
│   ├── Dashboard.css
│   ├── CreateTask.css
│   ├── EditTask.css
│   ├── TaskDetail.css
│   └── ...
├── App.jsx                      # Main routing component
├── main.jsx                     # Vite entry point
└── index.css                    # Global resets (optional)
public/
└── vite.svg
text## 🚪 Routes

| Route                | Component      | Access      | Description                          |
|----------------------|----------------|-------------|--------------------------------------|
| `/`                  | Login          | Public      | Login page                           |
| `/register`          | Signup         | Public      | User registration                    |
| `/admin-dashboard`   | Dashboard      | Admin only  | Full task management                 |
| `/user-dashboard`    | (Ready)        | User only   | View assigned tasks (extendable)     |
| `/create-task`       | CreateTask     | Admin       | Create new task                      |
| `/task/edit/:id`     | EditTask       | Admin       | Edit existing task                   |

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/task-management-app.git
   cd task-management-app

Install dependenciesBashnpm install
Start the development serverBashnpm run dev
Open http://localhost:5173 in your browser

Environment (Optional)
Create .env in root for API base URL:
textVITE_API_BASE_URL=http://localhost:5000/api
🎨 Design System

Primary Color: #2563eb (Blue)
Gradient: #3b82f6 → #2563eb
Priority Colors:
High: #ef4444 / #991b1b
Medium: #f59e0b / #92400e
Low: #22c55e / #166534

Consistent card shadows, rounded corners, and spacing

🤝 Contributing
Contributions are welcome! Please:

Open an issue first for major changes
Fork and submit pull requests
Follow existing code style

📝 License
This project is open source and available under the MIT License.

Made with ❤️ for better task organization and team productivity
Built on December 31, 2025