# 💻 CipherSchool IDE (MERN Full Stack Project)

CipherSchool IDE is a **web-based code editor and project management tool** that allows users to register, log in, create projects, manage files, edit code, and view live previews — all inside a browser.

This project is built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) with **JWT authentication** and a modern responsive UI built using **Tailwind CSS**.

---

## 🚀 Features

### 🧠 User Authentication
- Secure **JWT-based login & registration**
- Session persistence with localStorage
- User-specific project management

### 🧰 IDE Features
- Create, edit, delete projects
- Add and edit multiple files
- Save project data to MongoDB
- Live code preview using Sandpack
- Modern file explorer interface

### ⚙️ Backend Features
- RESTful APIs using Express.js
- MongoDB for data persistence
- Middleware-based authentication
- Error-handling and logging via Morgan

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React.js, Vite, Tailwind CSS, Axios, Sandpack |
| Backend | Node.js, Express.js, MongoDB, Mongoose |
| Auth | JSON Web Token (JWT) |
| Dev Tools | Nodemon, Morgan, dotenv, CORS |

---

## 📁 Folder Structure

CipherSchool-IDE/
│
├── backend/
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ │ ├── userController.js
│ │ ├── projectController.js
│ │ └── fileController.js
│ ├── middleware/
│ │ └── authMiddleware.js
│ ├── models/
│ │ ├── User.js
│ │ ├── Project.js
│ │ └── File.js
│ ├── routes/
│ │ ├── userRoutes.js
│ │ ├── projectRoutes.js
│ │ └── fileRoutes.js
│ ├── server.js
│ └── .env
│
└── frontend/
├── src/
│ ├── context/
│ │ └── UserContext.jsx
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── IDE.jsx
│ │ ├── Login.jsx
│ │ └── Register.jsx
│ ├── ui/
│ │ ├── NavbarIDE.jsx
│ │ ├── FileExplorer.jsx
│ │ ├── EditorPanel.jsx
│ │ └── PreviewPanel.jsx
│ ├── utils/
│ │ └── api.js
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
├── vite.config.js
└── package.json

yaml
Copy code

---

## ⚙️ Installation Guide

### 🔹 1. Clone Repository
```bash
git clone https://github.com/your-username/CipherSchool-IDE.git
cd CipherSchool-IDE
🧩 Backend Setup (Node + Express + MongoDB)
Step 1: Navigate to backend
bash
Copy code
cd backend
Step 2: Install dependencies
bash
Copy code
npm install
Step 3: Create .env file
ini
Copy code
PORT=5000
MONGO_URI=mongodb://localhost:27017/cipherschool
JWT_SECRET=your_jwt_secret
TOKEN_EXPIRES_IN=7d
NODE_ENV=development
Step 4: Run server
bash
Copy code
npm run dev
Server runs at ➡️ http://localhost:5000

💻 Frontend Setup (React + Vite + Tailwind)
Step 1: Navigate to frontend
bash
Copy code
cd frontend
Step 2: Install dependencies
bash
Copy code
npm install
Step 3: Start development server
bash
Copy code
npm run dev
Frontend runs at ➡️ http://localhost:5173

🔗 Connecting Frontend & Backend
In the file:
frontend/src/utils/api.js

js
Copy code
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (!err.response) alert("⚠️ Backend not reachable!");
    else if (err.response.status === 401) {
      localStorage.clear();
      alert("Session expired. Please login again.");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);
🔑 API Endpoints Summary
Method	Endpoint	Description	Auth
POST	/api/users/register	Register new user	❌
POST	/api/users/login	Login user	❌
GET	/api/users/profile	Get user profile	✅
POST	/api/projects/save	Create or update project	✅
GET	/api/projects/user/:userId	Get user’s projects	✅
GET	/api/projects/:id	Get project by ID	✅
DELETE	/api/projects/:id	Delete project	✅
POST	/api/files	Create file	✅
GET	/api/files/:projectId	Get all files of a project	✅
PUT	/api/files/:id	Update file	✅
DELETE	/api/files/:id	Delete file	✅

🧠 Authentication Workflow
User registers or logs in

Backend returns a JWT token

Frontend stores it in localStorage

Every request adds Authorization: Bearer <token>

Backend verifies token using authMiddleware.js

🧩 Frontend Pages
Page	Path	Description
Home	/	Landing Page
IDE	/ide/:projectId?	Code Editor and Project Workspace
Login	/login	User Login
Register	/register	New User Signup

🧰 Build for Production
Frontend:

bash
Copy code
npm run build
Output → frontend/dist/

Backend:
Runs automatically with:

bash
Copy code
node server.js
🧑‍💻 Author
Surendra Pal
🎓 B.Tech CSE, Lovely Professional University
💼 Full Stack Developer
🌐 Passionate about building scalable web apps

📜 License
This project is open-source under the MIT License.

🌟 Summary
✅ MERN Full Stack Application
✅ Authentication + File Management
✅ Code Editor + Preview (Sandpack)
✅ Clean Modular Architecture
✅ Easy to Deploy & Extend

