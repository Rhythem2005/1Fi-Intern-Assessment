# 1Fi Intern Assessment — Product EMI Web Application

<p align="center">
  <img src="https://img.shields.io/badge/Status-Complete-brightgreen?style=for-the-badge" alt="Status"/>
  <img src="https://img.shields.io/badge/Frontend-React%2019-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/Backend-Express%205-black?style=for-the-badge&logo=express" alt="Express"/>
  <img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
</p>

A full-stack product browsing and EMI selection web application built for the internship assessment. Users browse products, pick storage/color variants, view pricing and EMI plans, and confirm a selected plan.

**🔗 Live Demo:** [1-fi-intern-assessment.vercel.app](https://1-fi-intern-assessment.vercel.app/)

---

## ✨ Features

- Dynamic product listing from the backend API
- Product detail pages with unique URLs (`/products/:slug`)
- Multiple products, each with multiple storage and color variants
- Dynamic product images served from product/variant data
- MRP and selling-price display
- Multiple EMI plans per product variant
- EMI details: monthly payment, tenure, interest rate, cashback, mutual-fund backing
- Single EMI plan selection with confirmation modal
- Responsive UI with loading and error states
- MongoDB-backed product and EMI data
- REST API integration between React frontend and Express backend

---

## 🧱 Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite 8, Tailwind CSS 4, React Router 7 |
| **Backend** | Node.js, Express 5, CORS |
| **Database** | MongoDB, Mongoose 9 |
| **Other** | dotenv, REST APIs, Git/GitHub |

---

## 📂 Project Structure

```
1Fi-intern-assesement/
├── client/
│   ├── public/
│   │   └── images/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── App.jsx
│       └── main.jsx
│   └── vite.config.js
│
├── server/
│   ├── models/
│   │   └── Product.js
│   ├── routes/
│   │   └── products.js
│   ├── index.js
│   ├── seed.js
│   └── .env.example
│
└── README.md
```

---

## 🗄️ Database Schema

```
Product
├── name
├── slug
├── brand
├── images[]
├── colors[]
│   ├── name
│   ├── hex
│   └── image
└── variants[]
    ├── storage
    ├── mrp
    ├── price
    └── emiPlans[]
        ├── tenure
        ├── monthly
        ├── interest
        ├── cashback
        └── mutualFund
            ├── name
            └── type
```

Each EMI plan carries mutual-fund backing information. Seed data currently uses funds such as HDFC Liquid Fund, SBI Magnum Gilt Fund, ICICI Prudential Liquid Fund, and Axis Liquid Fund.

---

## 🌱 Seed Data

| Product | Storage Variants |
|---|---|
| iPhone 17 Pro | 128GB, 256GB, 512GB |
| Samsung Galaxy S25 Ultra | 256GB, 512GB |
| Google Pixel 9 Pro | 128GB, 256GB |
| OnePlus 12 | 128GB, 256GB |
| Samsung Galaxy Z Fold 7 | 256GB, 512GB |
| iPhone 15 Pro Max | 256GB, 512GB |

> The seed script **upserts** products by slug — running `npm run seed` again updates existing records instead of creating duplicates.

---

## 📡 API Documentation

### Get all products

```
GET /api/products
```

Returns product info, images, colors, variants, pricing, and lowest EMI.

<details>
<summary>Example response</summary>

```json
[
  {
    "name": "iPhone 17 Pro",
    "slug": "iphone-17-pro",
    "brand": "Apple",
    "images": ["/images/iphone-17-pro.jpg"],
    "colors": [
      {
        "name": "Natural Titanium",
        "hex": "#8E8D8A",
        "image": "/images/iphone-17-pro-natural-titanium.jpg"
      }
    ],
    "variants": [
      {
        "storage": "128GB",
        "mrp": 134900,
        "price": 124900
      }
    ],
    "lowestEmi": 5199
  }
]
```

</details>

### Get a product by slug

```
GET /api/products/:slug
```

Example: `GET /api/products/iphone-17-pro`

Returns the complete product including variants and EMI plans.

<details>
<summary>Example response</summary>

```json
{
  "name": "iPhone 17 Pro",
  "slug": "iphone-17-pro",
  "brand": "Apple",
  "images": ["/images/iphone-17-pro.jpg"],
  "colors": [
    {
      "name": "Natural Titanium",
      "hex": "#8E8D8A",
      "image": "/images/iphone-17-pro-natural-titanium.jpg"
    }
  ],
  "variants": [
    {
      "storage": "128GB",
      "mrp": 134900,
      "price": 124900,
      "emiPlans": [
        {
          "tenure": 12,
          "monthly": 10999,
          "interest": 0,
          "cashback": "₹2,000",
          "mutualFund": {
            "name": "HDFC Liquid Fund",
            "type": "Debt"
          }
        }
      ]
    }
  ]
}
```

</details>

### Error responses

| Code | Meaning |
|---|---|
| `404 Not Found` | Requested product does not exist |
| `400 Bad Request` | Invalid request, where applicable |

---

## 🔗 Frontend–Backend Integration

Product information is loaded from the backend API rather than hardcoded in the frontend.

The frontend calls:

```
GET /api/products
GET /api/products/:slug
```

Images, colors, variants, prices, EMI plans, and mutual-fund info are all supplied by the API/database.

---

## 🚀 Local Setup

**Requirements:** Node.js 18+, MongoDB, npm

### Clone and install

```bash
git clone https://github.com/Rhythem2005/1Fi-Intern-Assessment.git
cd 1Fi-Intern-Assessment

cd client
npm install

cd ../server
npm install
```

### Configure environment variables

Create a `.env` file inside `server/` based on `.env.example`:

```
MONGODB_URI=your_mongodb_connection_string
PORT=5001
```

### Seed the database

From `server/`:

```bash
npm run seed
```

### Start the backend

```bash
npm run dev
```

Backend: `http://localhost:5001`

### Start the frontend

In another terminal:

```bash
cd client
npm run dev
```

Frontend: `http://localhost:5173`

> The Vite dev server proxies `/api` requests to the backend.

---

## 🧭 Application Flow

1. Open the home page
2. Browse available products
3. Select a product → open its unique product URL
4. Select the required color and storage variant
5. Review the available EMI plans
6. Select one EMI plan
7. Review the selected plan in the confirmation modal
8. Confirm the selection

---

## ✅ Assessment Requirements Covered

- [x] Dynamic product listing
- [x] Unique product detail URLs
- [x] At least 3 products, at least 2 variants per product
- [x] Product name, variant, MRP, selling price, and image
- [x] Multiple selectable EMI plans
- [x] Monthly payment, tenure, interest rate, and cashback info
- [x] EMI plans with mutual-fund backing information
- [x] Proceed flow for the selected EMI plan
- [x] Backend API integration
- [x] MongoDB database and seed script
- [x] Responsive frontend
- [x] Loading and error handling

---

## 📝 Notes

This project implements the EMI-plan and mutual-fund backing representation required for the assessment. It does **not** implement real financial transactions, mutual-fund investments, KYC, payment processing, or live NAV calculations.

---

## 📄 License

This project was created for an internship assessment.

<p align="center">
  <i>Built for the 1Fi internship assessment 🚀</i>
</p>
