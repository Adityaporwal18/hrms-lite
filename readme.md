# HRMS Lite – Full Stack Application

## Project Overview
HRMS Lite is a lightweight Human Resource Management System designed for internal HR use.  
The application allows an admin to manage employee records and track daily attendance.

The focus of this project is to demonstrate clean full-stack development with a usable UI, RESTful APIs, database persistence, and production deployment.

---

## Features
- Add new employees
- View all employees
- Delete an employee
- Mark daily attendance (Present / Absent)
- View attendance records per employee

---

## Tech Stack Used

### Frontend
- React (Vite)
- JavaScript
- Axios

### Backend
- FastAPI (Python)
- SQLAlchemy ORM

### Database
- SQLite

### Deployment
- Frontend: Vercel
- Backend: Render

---

## Live Application
Frontend URL:  
https://<your-vercel-url>

Backend API URL:  
https://<your-render-backend-url>

Swagger API Documentation (if enabled):  
https://<your-render-backend-url>/docs

---

## Steps to Run the Project Locally

### 1. Clone the Repository
```bash
git clone https://github.com/Adityaporwal18/hrms-lite.git
cd hrms-lite
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn main:app --reload
## backend will run at:http://127.0.0.1:8000


cd frontend
npm install
npm run dev
##Frontend will run at: http://localhost:5173

Assumptions & Limitations

Single admin user (no authentication implemented)

SQLite is used for simplicity

Render free tier may reset data on service restart

Attendance UI is intentionally kept simple

Advanced HR features like payroll and leave management are out of scope