# 💬 ChatGuruV1

ChatGuruV1 is a modern full-stack real-time chat application built with a focus on speed, simplicity, and clean user experience. It allows users to communicate instantly with secure authentication, live messaging, and a responsive interface.

---

## 🚀 Features

- 🔐 User Authentication (Signup/Login)
- 💬 Real-time messaging with Socket.IO
- 🧑‍🤝‍🧑 Contact & chat management
- 🔔 Toast notifications for actions
- 🎨 Clean and responsive UI
- ⚡ Lightweight state management with Zustand
- 🌐 API handling with Axios

---

## 🛠️ Tech Stack

### Frontend
- React
- Zustand
- Axios
- Tailwind CSS (or custom styling)

### Backend
- Node.js
- Express.js
- Socket.IO

### Database
- MongoDB (Mongoose)

---

## 📂 Project Structure

ChatGuruV1/
│── frontend/
│   ├── components/
│   ├── pages/
│   ├── store/
│   └── lib/
│
│── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── socket/
│
│── package.json
│── README.md

---

## ⚙️ Installation & Setup

### 1. Clone the repository

git clone https://github.com/ZAWAD1/ChatGuruV1.git
cd ChatGuruV1

---

### 2. Install dependencies

npm install
cd frontend && npm install
cd ../backend && npm install

---

### 3. Environment Variables

Create a `.env` file inside the backend src folder:

PORT=3000
MONGO_URI=your_mongo_uri_here
NODE_ENV=development
JWT_SECRET=your_jwt_secret
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=your_email_from_address
EMAIL_FROM_NAME=your_email_from_name
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development

---

### 4. Run the Application

#### Start Backend
cd backend
npm install
npm run dev

#### Start Frontend
cd frontend
npm install
npm run dev

---

## 🌍 Deployment

- Frontend: Render
- Backend: Render 
- Database: MongoDB Atlas  

---

## 📸 Screenshots

![image alt](https://github.com/ZAWAD1/ChatGuruV1/blob/50e6b0bb50ada20abdada8bc04e1afa54d2f3e9c/Images-of-app/SignupPage.png)

![image alt](https://github.com/ZAWAD1/ChatGuruV1/blob/50e6b0bb50ada20abdada8bc04e1afa54d2f3e9c/Images-of-app/LoginPage.png)

![image alt](https://github.com/ZAWAD1/ChatGuruV1/blob/50e6b0bb50ada20abdada8bc04e1afa54d2f3e9c/Images-of-app/ChatPage.png)

---

## 📜 License

Copyright <2026> <COPYRIGHT zawad>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


