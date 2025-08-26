﻿# rayhan-Apollo-Level2-Web-Dev-B5-Assignment-6
 git Link: https://github.com/Rayhan9966/rayhan-Apollo-Level2-Web-Dev-B5-Assignment-6
 Live Deployment Link : https://digitalwallet-8d3obt0c0-mohammed-rayhan-uddins-projects.vercel.app
 Video Link: https://drive.google.com/drive/folders/1k1udCEmXzQjhA7UJVJRPQXJBBq7lRg88?usp=drive_link



 # 💸 Digital Wallet API (Bkash/Nagad)

A secure, modular, role-based backend API for a digital wallet system built with **Express.js**, **Mongoose**, and **TypeScript**. Users can register, manage wallets, and perform financial operations like add money, withdraw, send money, and more.

---

## 🚀 Features

- 🔐 JWT Authentication with secure password hashing
- 🎭 Role-based Authorization (`admin`, `user`, `agent`)
- 💼 Wallet creation during registration with initial balance
- 💸 Add Money, Withdraw, Send Money (User)
- 🧾 Cash-In / Cash-Out (Agent)
- 🔒 Block/Unblock Wallets (Admin)
- 🧠 Transaction tracking and atomic operations
- 📦 Modular Project Structure
- 🧪 Tested with Postman



# 💳 Digital Wallet Frontend (React + Redux Toolkit + RTK Query)

A **secure, role-based, and responsive frontend application** for a **Digital Wallet System** (similar to bKash or Nagad) built with **React.js, Redux Toolkit, RTK Query, and Tailwind CSS**.

This app consumes a backend API to enable **Users**, **Agents**, and **Admins** to perform financial operations and manage wallets seamlessly.

---

## 🚀 Features

### 🔓 Public Section

* Responsive **Landing Page** with hero banner, sticky navbar & footer
* **About, Features, Pricing, FAQ, and Contact Pages**
* Smooth transitions & skeleton loading

### 🔑 Authentication

* JWT-based login & registration
* Role selection (**User** or **Agent**)
* Persisted authentication (auto-login after refresh)
* Logout functionality

### 👤 User Dashboard

* Wallet balance overview & quick actions
* Deposit, Withdraw & Send Money
* Transaction history with pagination & filters
* Profile update (name, phone, password)

### 🏦 Agent Dashboard

* Overview with cash-in/out summary
* Add/Withdraw money from users’ wallets
* Transaction & commission history
* Profile management

### 🛡️ Admin Dashboard

* Overview with total users, agents, transactions, and volume
* Manage users & agents (block/unblock, approve/suspend)
* Advanced filters & pagination for transactions
* System settings (fees/limits – optional)
* Profile management

### 🌟 General Features

* Role-based navigation menu
* Global error handling & loading indicators
* Form validation & advanced filtering
* Data visualization (cards, charts, tables)
* Toast notifications for feedback
* **Guided Tour (react-joyride)** with 5 steps
* Theme toggle (Light/Dark mode)
* Fully responsive & accessible UI

---

## 🛠️ Tech Stack

**Frontend:**

* React.js + TypeScript
* Redux Toolkit & RTK Query
* Tailwind CSS
* React Router
* react-joyride (guided tour)
* react-toastify (toast notifications)

**Backend (API):**

* Node.js + Express.js
* MongoDB + Mongoose
* JWT + bcrypt for authentication

---

## 📂 Project Structure

```
📦 digital-wallet-frontend
├── 📂 src
│   ├── 📂 app        # Redux store & API setup
│   ├── 📂 features   # Redux slices & RTK Query services
│   ├── 📂 components # Reusable UI components
│   ├── 📂 pages      # Landing + Dashboard pages
│   ├── 📂 layouts    # Role-based layouts
│   ├── 📂 hooks      # Custom hooks
│   ├── 📂 utils      # Helpers & constants
│   ├── main.tsx      # App entry
│   └── App.tsx       # Routes & layouts
├── .env              # API base URL & config
├── tailwind.config.js
├── package.json
└── README.md
```

---

## ⚡ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/digital-wallet-frontend.git
cd digital-wallet-frontend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root with:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

### 4️⃣ Run Development Server

```bash
npm run dev
```

### 5️⃣ Build for Production

```bash
npm run build
```

---

## 🔑 Demo Credentials

Use these for quick testing:

* **Admin:**
  `admin@wallet.com` | `admin123`

* **Agent:**
  `agent@wallet.com` | `agent123`

* **User:**
  `user@wallet.com` | `user123`

---


---



---

## 📌 Submission Checklist

* ✅ Clean & structured codebase
* ✅ Separate repos for frontend & backend
* ✅ Live deployment links
* ✅ Demo video walkthrough
* ✅ Test credentials provided












