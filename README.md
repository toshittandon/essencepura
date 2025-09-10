# Essence Pura 🛍️

A modern, full‑stack e‑commerce web application designed to deliver a seamless and responsive shopping experience. Built with **React**, **Express.js**, **Stripe**, and **Tailwind CSS**, the platform features product browsing, cart management, authentication, and secure checkout.

---

## ✨ Features

* **Product Catalog** – Browse detailed product listings with descriptions, benefits, and images.
* **User Authentication** – Login, logout, and profile management with session persistence.
* **Shopping Cart** – Add, update, or remove items with real‑time total calculation and saved state via localStorage.
* **Secure Payments** – Integrated with **Stripe** for safe checkout using payment intents and webhooks.
* **Order Management** – Confirmation and history tracking for user orders.
* **Modern UI/UX** – Responsive and accessible design powered by Tailwind CSS and Shadcn/UI.

---

## 🛠️ Tech Stack

**Frontend:**

* React 18 (with Hooks & Context API)
* React Router
* Tailwind CSS + Shadcn/UI
* Lucide React (icons)

**Backend:**

* Express.js
* Stripe SDK
* CORS Middleware

**Dev Tools & Deployment:**

* Vite (frontend build tool)
* Node.js + npm
* Environment variables with `.env`
* Deployable on Vercel/Netlify (frontend) & Railway/Heroku (backend)

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v16 or later)
* npm or yarn
* Stripe account & API keys

### Installation

```bash
# Clone the repository
git clone https://github.com/toshittandon/essencepura.git
cd essencepura

# Install dependencies for frontend and backend
cd client && npm install
cd ../server && npm install
```

### Running the App

```bash
# Start backend server
cd server
npm run dev

# Start frontend
cd client
npm run dev
```

The app will be available at `http://localhost:5173` (frontend) and `http://localhost:5000` (backend).

---

## 🔑 Environment Variables

Create a `.env` file in the `server` directory and add:

```env
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:5173
```

---

## 📦 Deployment

* **Frontend:** Vercel / Netlify
* **Backend:** Railway / Heroku
* Ensure environment variables are configured in the hosting platform.

---

## 📸 Screenshots

*(Add screenshots of the homepage, product page, cart, and checkout here)*

---

## 📖 Roadmap

* [ ] Add product search & filtering
* [ ] Integrate user reviews & ratings
* [ ] Implement order tracking system
* [ ] Expand admin dashboard for inventory management

---

## 🤝 Contributing

Contributions are welcome! Please fork this repo and submit a pull request.

---

## 📄 License

This project is licensed under the **MIT License**.

---

### 👨‍💻 Author

Developed by [Toshit Tandon](https://github.com/toshittandon)
