# 🛍️ Modern E-Commerce Platform

Welcome to the **Modern E-Commerce Platform**—a premium, fully integrated full-stack application consisting of a responsive customer storefront, a powerful administrative analytics dashboard, and a secure Node.js/Express backend API. 

Designed with modern typography, smooth user experiences, glassmorphic accents, and rich interactivity, this platform leverages industry-standard tools to deliver a robust retail solution.

---

## 🖥️ Platform Showcase

Below is a preview of the actual **E-Commerce Storefront Showcase**, representing the real visual branding and front-end interface layout of the application:

![E-Commerce Storefront Showcase](project_hero.png)

---

## 🛠️ Technology Stack

| Component | Core Technology | Primary Libraries & Frameworks |
| :--- | :--- | :--- |
| **Frontend Storefront** | React 19, Vite, Tailwind CSS | React Router DOM v7, Axios, React Toastify, JWT Decode |
| **Admin Dashboard** | React 19, Vite, Tailwind CSS v4 | Cloudinary React SDK, Axios, React Toastify |
| **Backend API** | Node.js, Express.js | Mongoose (MongoDB), Multer, Bcrypt, JWT, Stripe SDK, Cloudinary SDK |
| **Database** | MongoDB Atlas | Cloud-hosted NoSQL Document Store |
| **Media Hosting** | Cloudinary | High-performance image storage, optimization, and CDN |
| **Payments** | Stripe | Secure credit card processing and status verification |

---

## ✨ Features

### 🛒 Frontend Customer Storefront
* **Product Catalog & Discovery:** Dynamic search, filter by category/subcategory, and responsive product grids.
* **Product Interaction:** Multi-image carousels, size selection, detailed descriptions, and breadcrumbs.
* **Cart Management:** Persistent user cart synced to the cloud database on login/update.
* **Secure Checkout:** Choice between cash-on-delivery (COD) and secure Stripe Credit Card checkout.
* **Customer Profile:** View comprehensive order history, delivery status, and order cancelation.

### 📊 Admin Management Panel
* **Product Inventory Management:** 
  * Add new products with support for up to 4 images (auto-uploaded to Cloudinary).
  * Update product details, prices, sizes, and active images.
  * Delete/remove outdated products seamlessly.
* **Order Orchestration:** View incoming orders across all payment methods, track payments, and update fulfillment status (e.g., *Order Placed*, *Shipped*, *Delivered*).
* **Robust Auth:** Dedicated administrative login gateway with secure token verification.

### 🛡️ Secure Backend API
* **Security & Auth:** Password hashing via `bcrypt`, JSON Web Tokens (JWT) for customer/admin route guards.
* **Transactional integrity:** Automated stock and payment status validation.
* **Dynamic File Uploads:** Dual-stage file handling utilizing `multer` (temporary disk storage) and `cloudinary` (permanent cloud assets).

---

## 📁 Repository Structure

```hl
ecommerce-app/
├── backend/            # Express.js Server
│   ├── config/         # DB & Cloudinary configs
│   ├── controllers/    # API Request Controllers (cart, order, product, user)
│   ├── middleware/     # JWT & Admin Authorization gates
│   ├── models/         # MongoDB Mongoose Schemas (user, product, order)
│   ├── routes/         # Express Router Handlers
│   ├── server.js       # Main server entrypoint
│   └── vercel.json     # Vercel serverless deployment config
├── frontend/           # Customer React App
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Views (Home, Cart, Product, Checkout, Orders)
│   │   └── context/    # Global State Context (Shop Context)
│   └── package.json
└── admin/              # Store Management React App
    ├── src/
    │   ├── components/ # Admin navigation, sidebar, and headers
    │   └── pages/      # Administration views (Add, List, Orders)
    └── package.json
```

---

## 🚀 Setup & Installation

Follow these steps to set up and run the entire platform locally.

### 1️⃣ Prerequisite Configuration
Ensure you have **Node.js (v18+)** and **MongoDB** installed or accessible via cloud connection.

### 2️⃣ Clone the Repository & Install Dependencies
First, open your terminal and install dependencies for each component.

```bash
# Install root package.json if present
npm install

# Install Frontend dependencies
cd frontend
npm install

# Install Admin dependencies
cd ../admin
npm install

# Install Backend dependencies
cd ../backend
npm install
```

### 3️⃣ Set Up Environment Variables
Create `.env` files in both the `backend` and `admin` directories.

#### 📝 Backend Configuration (`backend/.env`)
```ini
MONGODB_URI=your_mongodb_atlas_connection_string
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
CLOUDINARY_NAME=your_cloudinary_cloud_name
JWT_SECRET=your_jwt_signing_secret
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=your_secure_admin_password
STRIPE_SECRET_KEY=your_stripe_secret_key
```

> [!WARNING]
> Ensure all Cloudinary credentials and Stripe keys are correct. Incorrect credentials will cause product image uploads and checkout routes to throw 500 errors.

#### 📝 Admin Configuration (`admin/.env`)
```ini
VITE_BACKEND_URL=http://localhost:4000
```

---

## 🟢 Running the Application

For the best local experience, spin up all three servers simultaneously in separate terminals:

### Start the Backend Server (Port `4000`)
```bash
cd backend
npm run server
```

### Start the Frontend Customer Store (Port `5173`)
```bash
cd frontend
npm run dev
```

### Start the Admin Dashboard (Port `5174`)
```bash
cd admin
npm run dev
```

---

## 🔌 API Reference Guide

### 🔑 Authentication & Users
| Method | Endpoint | Auth | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/api/user/register` | 🔓 | Register a new customer |
| `POST` | `/api/user/login` | 🔓 | Login customer and return JWT |
| `POST` | `/api/user/admin` | 🔓 | Authenticate administrator credentials |

### 👕 Product Catalog
| Method | Endpoint | Auth | Description |
| :--- | :--- | :---: | :--- |
| `GET` | `/api/product/list` | 🔓 | Fetch all active products |
| `POST` | `/api/product/single` | 🔓 | Retrieve a single product details |
| `POST` | `/api/product/add` | 🛡️ Admin | Create product (supports up to 4 file uploads) |
| `POST` | `/api/product/update` | 🛡️ Admin | Modify details and images of a product |
| `POST` | `/api/product/remove` | 🛡️ Admin | Delete a product from inventory |

### 🛒 Shopping Cart
| Method | Endpoint | Auth | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/api/cart/get` | 🔑 User | Fetch the user's active shopping cart |
| `POST` | `/api/cart/add` | 🔑 User | Add item with selected size to cart |
| `POST` | `/api/cart/update` | 🔑 User | Update quantities within the cart |
| `POST` | `/api/cart/remove` | 🔑 User | Remove an item from the cart |

### 💳 Order Management & Payments
| Method | Endpoint | Auth | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/api/order/place` | 🔑 User | Create a COD (Cash on Delivery) order |
| `POST` | `/api/order/stripe` | 🔑 User | Initiate Stripe checkout session |
| `POST` | `/api/order/verifyStripe` | 🔑 User | Verify success/failure of Stripe checkout session |
| `POST` | `/api/order/userorders` | 🔑 User | Retrieve all orders associated with customer |
| `POST` | `/api/order/cancel` | 🔑 User | Cancel an unfulfilled user order |
| `POST` | `/api/order/list` | 🛡️ Admin | List all orders on the platform |
| `POST` | `/api/order/status` | 🛡️ Admin | Update order status (Shipped, Delivered, etc.) |

---

## 🔒 Security Best Practices
* **Environment Isolation:** Never commit `.env` files to git. A pre-configured `.gitignore` is provided in all directories.
* **Token Expiration:** JWTs are signed securely and verified on the server-side to prevent unauthorized client access.
* **Admin Verification:** The admin token is parsed separately with a strict cryptographic signature check in the `adminAuth` middleware.

---

⭐ *If you find this project helpful, please consider giving it a star!*
