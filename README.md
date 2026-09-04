1Fi-intern-assesement — Product EMI Web Application

A full-stack product browsing and EMI selection web application built for the internship assessment. Users can browse products, select storage and color variants, view pricing and available EMI plans, and proceed with a selected EMI plan.

Features

Dynamic product listing from the backend API

Product detail pages with unique URLs using /products/:slug

Multiple products with multiple storage and color variants

Dynamic product images served from product/variant data

MRP and selling-price display

Multiple EMI plans for each product variant

EMI details including monthly payment, tenure, interest rate, cashback, and mutual-fund backing information

Single EMI plan selection before proceeding

Selection confirmation modal

Responsive UI

Loading and error states

MongoDB-backed product and EMI data

REST API integration between React frontend and Express backend

Tech Stack

Frontend

React 19

Vite 8

Tailwind CSS 4

React Router 7

Backend

Node.js

Express 5

CORS

Database

MongoDB

Mongoose 9

Other

dotenv

REST APIs

Git/GitHub

Project Structure

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

Database Schema

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

Each EMI plan contains mutual-fund backing information. The seed data currently uses funds such as HDFC Liquid Fund, SBI Magnum Gilt Fund, ICICI Prudential Liquid Fund, and Axis Liquid Fund.

Seed Data

The database seed currently contains:

Product

Example storage variants

iPhone 17 Pro

128GB, 256GB, 512GB

Samsung Galaxy S25 Ultra

256GB, 512GB

Google Pixel 9 Pro

128GB, 256GB

OnePlus 12

128GB, 256GB

Samsung Galaxy Z Fold 7

256GB, 512GB

iPhone 15 Pro Max

256GB, 512GB

The seed script upserts products by slug, so running the seed command updates existing seeded products instead of creating duplicate records.

API Documentation

Get all products

GET /api/products

Returns product information, images, colors, variants, pricing, and lowest EMI information.

Example:

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

Get a product by slug

GET /api/products/:slug

Example:

GET /api/products/iphone-17-pro

Returns the complete product including variants and EMI plans.

Example:

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

Error Responses

404 Not Found

Returned when the requested product does not exist.

400 Bad Request

Returned for invalid requests where applicable.

Frontend-Backend Integration

Product information is loaded from the backend API rather than being hardcoded in the frontend.

The frontend requests:

GET /api/products
GET /api/products/:slug

Product images, colors, variants, prices, EMI plans, and mutual-fund information are supplied by the API/database.

Local Setup

Requirements

Node.js 18+

MongoDB

npm

Clone and install

git clone https://github.com/Rhythem2005/ASSESEMENT-INTERN.git
cd ASSESEMENT-INTERN

cd client
npm install

cd ../server
npm install

Configure environment variables

Create a .env file inside server based on .env.example.

MONGODB_URI=your_mongodb_connection_string
PORT=5001

Seed the database

From server:

npm run seed

Start the backend

npm run dev

Backend:

http://localhost:5001

Start the frontend

In another terminal:

cd client
npm run dev

Frontend:

http://localhost:5173

The Vite development server proxies /api requests to the backend.

Application Flow

Open the home page.

Browse available products.

Select a product.

Open its unique product URL.

Select the required color and storage variant.

Review the available EMI plans.

Select one EMI plan.

Review the selected plan in the confirmation modal.

Confirm the selection.

Assessment Requirements Covered

Dynamic product listing

Unique product detail URLs

At least 3 products and at least 2 variants per product

Product name, variant, MRP, selling price, and image

Multiple selectable EMI plans

Monthly payment, tenure, interest rate, and cashback information

EMI plans represented with mutual-fund backing information

Proceed flow for the selected EMI plan

Backend API integration

MongoDB database and seed script

Responsive frontend

Loading and error handling

Notes

The project implements the EMI-plan and mutual-fund backing representation required for the assessment. It does not implement real financial transactions, mutual-fund investments, KYC, payment processing, or live NAV calculations.

License

This project was created for an internship assessment.