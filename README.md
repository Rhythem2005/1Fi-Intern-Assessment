# 1Fi-intern-assesement — Product EMI Web Application

A full-stack web application where users can browse products, select variants (storage/color), view available EMI plans, and proceed with a selected plan. All product and EMI data is stored in MongoDB and served through a REST API.

## Features

- Dynamic product listing fetched from the database
- Individual product pages with unique URLs (`/products/:slug`)
- Product variants — storage and color selection
- MRP (struck through) and selling price display per variant
- Multiple EMI plans per variant with monthly payment, tenure, interest rate, and cashback
- Single EMI plan selection with visual radio-button behavior
- Proceed button with in-page confirmation modal showing order summary
- Responsive layout for mobile, tablet, and desktop
- Loading and error states for API calls

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite 8, Tailwind CSS 4, React Router 7 |
| Backend | Node.js, Express 5, CORS |
| Database | MongoDB, Mongoose 9 |
| Environment | dotenv |

## Project Structure

```
├── client/                     # React frontend
│   ├── public/images/          # Product images
│   ├── src/
│   │   ├── components/
│   │   │   └── ProductCard.jsx # Product card for listing page
│   │   ├── pages/
│   │   │   ├── Home.jsx        # Product listing page
│   │   │   └── ProductDetail.jsx # Product detail + EMI selection
│   │   ├── App.jsx             # Routes and layout
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Tailwind imports
│   └── vite.config.js          # Vite config with API proxy
│
├── server/                     # Express backend
│   ├── models/
│   │   └── Product.js          # Mongoose schema
│   ├── routes/
│   │   └── products.js         # Product API routes
│   ├── index.js                # Server entry point
│   ├── seed.js                 # Database seed script
│   └── .env.example            # Environment variable template
│
└── .gitignore
```

## Database Schema

The application uses a single `products` collection with embedded documents:

```
Product
├── name          (String, required)
├── slug          (String, required, unique)
├── brand         (String, required)
├── description   (String, required)
├── images        (Array of Strings)
├── colors[]
│   ├── name      (String) — e.g. "Desert Titanium"
│   └── hex       (String) — e.g. "#BFA98D"
└── variants[]    — one entry per storage option
    ├── storage   (String) — e.g. "128 GB"
    ├── mrp       (Number) — maximum retail price
    ├── price     (Number) — selling price
    └── emiPlans[]
        ├── tenure    (Number) — months
        ├── monthly   (Number) — monthly payment amount
        ├── interest  (Number) — annual interest rate
        └── cashback  (String or null)
```

Each product has multiple storage variants, and each variant has its own price and EMI plans. Colors are stored separately since they don't affect pricing.

## Seed Data

The seed script (`server/seed.js`) populates the database with 3 products:

| Product | Variants | EMI Plans |
|---------|----------|-----------|
| iPhone 16 Pro | 128 GB, 256 GB, 512 GB | 4 per variant |
| Samsung Galaxy S24 Ultra | 256 GB, 512 GB | 4 per variant |
| Google Pixel 9 Pro | 128 GB, 256 GB | 4 per variant |

The seed uses **upsert by slug** — running it multiple times safely updates existing products without deleting unrelated records.

```bash
cd server
npm run seed
```

## API Endpoints

### `GET /api/products`

Returns all products with summary data for the listing page. EMI plan arrays are excluded from variants; a computed `lowestEmi` field is included instead.

**Example response:**

```json
[
  {
    "_id": "...",
    "name": "iPhone 16 Pro",
    "slug": "iphone-16-pro",
    "brand": "Apple",
    "images": ["/images/iphone-16-pro.jpg"],
    "colors": [
      { "name": "Desert Titanium", "hex": "#BFA98D" }
    ],
    "variants": [
      { "storage": "128 GB", "mrp": 134900, "price": 127900 },
      { "storage": "256 GB", "mrp": 144900, "price": 137900 }
    ],
    "lowestEmi": 6450
  }
]
```

### `GET /api/products/:slug`

Returns a single product with full details including description and EMI plans for each variant.

**Example:** `GET /api/products/google-pixel-9-pro`

```json
{
  "_id": "...",
  "name": "Google Pixel 9 Pro",
  "slug": "google-pixel-9-pro",
  "brand": "Google",
  "description": "Google Pixel 9 Pro with Tensor G4 chip...",
  "images": ["/images/google-pixel-9-pro.jpg"],
  "colors": [
    { "name": "Obsidian", "hex": "#3B3B3B" },
    { "name": "Porcelain", "hex": "#F5F0E8" },
    { "name": "Hazel", "hex": "#A8B5A0" }
  ],
  "variants": [
    {
      "storage": "128 GB",
      "mrp": 109999,
      "price": 101999,
      "emiPlans": [
        { "tenure": 3, "monthly": 34000, "interest": 0, "cashback": null },
        { "tenure": 6, "monthly": 17833, "interest": 5, "cashback": "₹500 cashback" },
        { "tenure": 12, "monthly": 9350, "interest": 10, "cashback": "₹1,000 cashback" }
      ]
    }
  ]
}
```

**Error responses:**

| Status | Condition | Response |
|--------|-----------|----------|
| 404 | Product not found | `{ "error": "Product not found" }` |
| 400 | Invalid slug format | `{ "error": "Invalid product slug" }` |

## Setup & Installation

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/Rhythem2005/ASSESEMENT-INTERN.git
cd ASSESEMENT-INTERN
```

### 2. Install dependencies

```bash
cd client && npm install
cd ../server && npm install
```

### 3. Configure environment variables

```bash
cd server
cp .env.example .env
```

Edit `server/.env` and set your MongoDB connection string:

```
MONGODB_URI=mongodb://localhost:27017/1Fi-intern-assesement
```

### 4. Seed the database

```bash
cd server
npm run seed
```

### 5. Start the backend

```bash
cd server
npm run dev
```

### 6. Start the frontend

```bash
cd client
npm run dev
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/1Fi-intern-assesement` |

The `.env` file is gitignored. Use `.env.example` as a template.

## Running the Application

| Service | URL | Port |
|---------|-----|------|
| Frontend (Vite) | http://localhost:5173 | 5173 |
| Backend (Express) | http://localhost:5001 | 5001 |

The Vite dev server proxies `/api` requests to the backend automatically.

## Frontend–Backend Integration

All product and EMI data displayed in the UI is fetched from the Express API at runtime:

- **Home page** → `GET /api/products` → product listing
- **Product detail page** → `GET /api/products/:slug` → full product with variants and EMI plans

No product data is hardcoded in the frontend. The `client/src/data/` directory with mock data has been removed.

## Assignment Deliverables

| Requirement | Status |
|-------------|--------|
| Database-backed dynamic product data | ✅ MongoDB with Mongoose |
| At least 3 products | ✅ iPhone 16 Pro, Samsung Galaxy S24 Ultra, Google Pixel 9 Pro |
| At least 2 variants per product | ✅ 2–3 storage variants each |
| EMI plans with monthly, tenure, interest, cashback | ✅ 4 plans per variant |
| Dynamic product URLs (`/products/:slug`) | ✅ React Router |
| Backend REST API | ✅ Express with GET endpoints |
| Responsive UI | ✅ Tailwind CSS with sm/md/lg breakpoints |
| Seed script | ✅ Safe upsert-based seeding |
| Environment variables for secrets | ✅ dotenv with .env.example |
