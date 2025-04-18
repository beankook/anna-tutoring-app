# Anna University Tutoring App 💻📚

A full-stack MERN application built for Anna University students and teachers to connect, tutor, and match with one another!

> Think of it like "Tinder meets Coursera" but within your own campus ✨

---

## 🚀 Features
- 🗛️ Register as a student or teacher
- 💚 Swipe right to accept / 💔 Swipe left to reject
- 👩‍🏫 Teachers see students, students see teachers
- 🧾 Profile image uploads with ID
- 💸 Option for free or paid tutors
- 🔐 Login & secure authentication with JWT
- 🤝 View mutual matches

---

## 🧐 Tech Stack
- **Frontend**: React + TailwindCSS + React Router
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Extras**: Multer (for image upload), bcrypt, JWT, react-tinder-card

---

## 🧑‍💻 Getting Started (for contributors)

### 1. Prerequisites
Install the following if you don't have them already:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)
- [Git](https://git-scm.com/)

---

### 2. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/anna-tutoring-app.git
cd anna-tutoring-app
```

---

### 3. Install dependencies
#### Backend (root folder):
```bash
npm install
```

#### Frontend (inside /client folder):
```bash
cd client
npm install
```

#### ✅ What gets installed?
**Root folder** (`/`):
- express
- mongoose
- multer
- bcrypt
- jsonwebtoken
- dotenv

**Frontend** (`/client`):
- react
- tailwindcss
- react-router-dom
- axios
- react-tinder-card

---

### 4. MongoDB Setup
Make sure MongoDB is installed and running. You can start it with:
```bash
mongod
```

---

### 5. Environment Variables
Create a `.env` file in the root folder and add:
```env
MONGO_URI=mongodb://localhost:27017/tutoring-app
JWT_SECRET=supersecretkey
```

---

### 6. Run the App
#### Backend (in root folder):
```bash
node index.js
```

#### Frontend (in /client folder):
```bash
npm start
```

Your app will be running at `http://localhost:3000` 🌟

---

## 🤝 Contributors
Made by Srinidhi, Vedanth, Priya, Harinika, Sangeetha 💜