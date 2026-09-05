# College Management System

A full-stack **MERN-based College Management System** designed to simplify and centralize the management of students, faculty, courses, academic resources, notices, and administrative activities.

The platform provides separate functionality for **Administrators, Faculty Members, and Students**, making it easier to manage and access academic information from a single system.

## 🚀 Key Features

### 👨‍💼 Administrator

* Create and manage faculty profiles
* Maintain faculty emergency contact information
* Register and manage student accounts
* Store student enrollment and academic details
* Create and manage academic branches
* Manage subjects and courses according to semester and branch
* Publish notices for students and faculty
* Upload and organize branch-wise and semester-wise timetables
* Update administrator profile information
* Change and manage account passwords

### 👨‍🏫 Faculty

* Manage personal and emergency contact details
* Upload study resources such as:

  * Notes
  * Assignments
  * Syllabus
* Filter learning materials by subject, semester, and resource type
* Upload and maintain branch-wise timetables
* Search student records using:

  * Enrollment number
  * Student name
  * Semester
* Read and respond to notices
* Update profile and account credentials
* Reset or change password

### 🎓 Student

* Access personal and academic information
* View study materials based on subject and resource type
* Access semester and branch-wise timetables
* Download available timetables
* View important notices and announcements
* Update profile information
* Change or reset account password

## 🛠️ Technology Used

| Category        | Technology           |
| --------------- | -------------------- |
| Frontend        | React.js             |
| Backend         | Node.js, Express.js  |
| Database        | MongoDB              |
| Authentication  | JSON Web Token (JWT) |
| Package Manager | npm                  |

## 📋 Prerequisites

Before running the project, make sure the following are installed:

* [Node.js](https://nodejs.org/)
* MongoDB
* npm

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd College-Management-System
```

### 2. Install Dependencies

Install the backend packages:

```bash
cd backend
npm install
```

Then install the frontend packages:

```bash
cd ../frontend
npm install
```

### 3. Configure Backend Environment Variables

A sample environment configuration is provided in the backend directory.

Create a `.env` file inside `backend/` and add:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/College-Management-System
PORT=4000
FRONTEND_API_LINK=http://localhost:3000
JWT_SECRET=THISISSECRET
NODEMAILER_EMAIL=
NODEMAILER_PASS=
```

### 4. Configure Frontend Environment Variables

Create a `.env` file inside `frontend/`:

```env
REACT_APP_APILINK=http://localhost:4000/api
REACT_APP_MEDIA_LINK=http://localhost:4000/media
```

> **Note:** Do not upload your actual `.env` files or sensitive credentials to GitHub. Use the provided sample environment files as a reference.

### 5. Run the Application

Start the backend:

```bash
cd backend
npm run dev
```

In another terminal, start the frontend:

```bash
cd frontend
npm start
```

The application should now be available locally.

## 🔐 Initial Admin Setup

To create the initial administrator account, run the backend seeder:

```bash
cd backend
npm run seed
```

The seeder creates a default administrator account:

| Field       | Value             |
| ----------- | ----------------- |
| Employee ID | `123456`          |
| Password    | `admin123`        |
| Email       | `admin@gmail.com` |

> **Security:** Change the default credentials after the first login, especially if the application is deployed publicly.

## 📁 Project Structure

```text
college-management-system/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   ├── media/
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── utils/
│   │
│   └── public/
│
└── README.md
```

## 🌟 Overview

The system brings together the major academic and administrative operations of a college into one platform. By providing role-based functionality for **Admin, Faculty, and Students**, it helps reduce manual management and makes academic resources easier to access and maintain.
