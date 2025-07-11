# 🩺 Medigo – Smart Healthcare Appointment & Consultation Platform

Medigo is a modern, responsive healthcare platform that enables patients to seamlessly **register, book appointments, and consult with doctors via secure real-time video calls**. With dedicated dashboards for patients, doctors, and administrators, Medigo bridges the gap between patients and healthcare providers digitally.

## ✨ Features

- 👤 **User Authentication** – Patient registration and secure login
- 📅 **Book Appointments** – Schedule time slots with verified doctors
- 📹 **Real-time Video Call** – Live consultations between patient and doctor
- 👨‍⚕️ **Doctor Dashboard** – Manage availability, appointments, and earnings
- 🛠️ **Admin Panel** – Manage doctors, appointments, and platform analytics
- 📱 **Responsive UI** – Fully mobile and desktop friendly

## 🚀 Tech Stack

| Frontend            | Backend          | Database | Authentication | Real-time |
|---------------------|------------------|----------|----------------|-----------|
| React + Tailwind CSS| Node.js + Express| MongoDB  | JWT, Bcrypt     | Socket.IO |


## 📸 Screenshots

| Home Page | Admin – Doctor List | Doctor Panel | Appointment Booking | My Appointments |
|-----------|---------------------|---------------|----------------------|------------------|
| ![Home Page](https://github.com/user-attachments/assets/64350d9f-dbfd-457b-96b4-f7846f993136) | ![Admin Panel](https://github.com/user-attachments/assets/9db98687-0cc4-4470-80c0-e9668cb23b83) | ![Doctor Panel](https://github.com/user-attachments/assets/ce5f88c4-9473-48cd-a995-b877a69d05bd) | ![Booking Page](https://github.com/user-attachments/assets/12b6d7cf-d084-4145-8df7-97051b848dda) | ![My Appointments](https://github.com/user-attachments/assets/751d064e-970a-4a32-a311-c0f1664fced6)|



## 🧭 Project Structure

medigo/
├── client/ # Frontend (React)
│ ├── components/ # Reusable UI components
│ ├── pages/ # Route-level views
│ └── App.jsx # Entry point for frontend
├── admin/ # Admin Panel frontend (if separate)
│ ├── components/
│ ├── pages/
│ └── App.jsx
├── server/ # Backend (Node.js + Express)
│ ├── controllers/ # Business logic
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API routes
│ ├── middleware/ # Auth, error handling, etc.
│ └── index.js / server.js
└── README.md


## 🛠️ Installation

### ✅ Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

---


### 💻 Setup Instructions

1. **Clone the Repository**

```bash
git clone https://github.com/Harsh14-prog/MEDIGO.git
cd MEDIGO
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```
3. **Frontend Setup**
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
4. **Admin Setup**
```bash
cd admin
npm install
cp .env.example .env
npm run dev
```
---

5. **Open App**
🌐 Frontend (User App): http://localhost:5173
🧑‍💼 Admin Panel: http://localhost:5174
🔧 Backend API: http://localhost:4000

---

## 🔐 Environment Variables (.env Setup)

Each folder requires its own `.env` file. Copy the structure below into `.env.example` files inside the respective folders.

---

### 📁 `backend/.env`

```env
PORT=4000
MONGODB_URI=your_mongo_connection_string
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
CURRENCY=INR
```

📁 client/.env
```env
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=your_razorpay_key
```

📁 admin/.env
```env
VITE_BACKEND_URL=http://localhost:4000
```

---

## 🤝 Contributing

Pull requests are welcome!  
If you'd like to contribute, please open an issue first to discuss what you'd like to change or improve.

### 💡 Ways to Contribute:
- Fix bugs
- Improve UI/UX
- Add features
- Improve documentation

---

## 📫 Contact

Developed with ❤️ by **Harshad Khambe**

- GitHub: [@Harsh14-prog](https://github.com/Harsh14-prog)
- Email: [medigo1234@gmail.com](mailto:medigo1234@gmail.com)

---

## 📝 License

This project is licensed under the **MIT License**.  
See the [LICENSE](./LICENSE) file for details.

---

Thank you for checking out this project! ⭐





