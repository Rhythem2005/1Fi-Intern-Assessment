import mongoose from "mongoose";
import "dotenv/config";
import Product from "./models/Product.js";

const products = [
  {
    name: "iPhone 17 Pro",
    slug: "iphone-17-pro",
    brand: "Apple",
    description:
      "iPhone 17 Pro features a Grade 5 titanium design, A18 Pro chip, 48MP camera system with 5x optical zoom, and a 6.3-inch Super Retina XDR display with ProMotion.",
    images: ["/images/Iphone-17-pro.png"],
    colors: [
      { name: "Desert Titanium", hex: "#BFA98D" },
      { name: "Natural Titanium", hex: "#9A9A9A" },
      { name: "Black Titanium", hex: "#3C3C3C" },
      { name: "White Titanium", hex: "#F5F5F0" },
    ],
    variants: [
      {
        storage: "128 GB",
        mrp: 134900,
        price: 127900,
        emiPlans: [
          { tenure: 3, monthly: 42634, interest: 0, cashback: null },
          { tenure: 6, monthly: 22317, interest: 5, cashback: "₹500 cashback" },
          { tenure: 12, monthly: 11917, interest: 12, cashback: "₹1,000 cashback" },
          { tenure: 24, monthly: 6450, interest: 14, cashback: null },
        ],
      },
      {
        storage: "256 GB",
        mrp: 144900,
        price: 137900,
        emiPlans: [
          { tenure: 3, monthly: 45967, interest: 0, cashback: null },
          { tenure: 6, monthly: 24075, interest: 5, cashback: "₹500 cashback" },
          { tenure: 12, monthly: 12858, interest: 12, cashback: "₹1,500 cashback" },
          { tenure: 24, monthly: 6967, interest: 14, cashback: null },
        ],
      },
      {
        storage: "512 GB",
        mrp: 164900,
        price: 157900,
        emiPlans: [
          { tenure: 3, monthly: 52634, interest: 0, cashback: null },
          { tenure: 6, monthly: 27575, interest: 5, cashback: null },
          { tenure: 12, monthly: 14725, interest: 12, cashback: "₹2,000 cashback" },
          { tenure: 24, monthly: 7979, interest: 14, cashback: null },
        ],
      },
    ],
  },
  {
    name: "Samsung Galaxy S25 Ultra",
    slug: "samsung-galaxy-s25-ultra",
    brand: "Samsung",
    description:
      "Samsung Galaxy S25 Ultra with Snapdragon 8 Gen 3 processor, 200MP camera, built-in S Pen, 6.8-inch QHD+ Dynamic AMOLED display, and titanium frame.",
    images: ["/images/Samsung-S25-Ultra.png"],
    colors: [
      { name: "Titanium Gray", hex: "#8B8D8E" },
      { name: "Titanium Violet", hex: "#9B8AA5" },
      { name: "Titanium Yellow", hex: "#E5D68A" },
    ],
    variants: [
      {
        storage: "256 GB",
        mrp: 139999,
        price: 129999,
        emiPlans: [
          { tenure: 3, monthly: 43333, interest: 0, cashback: null },
          { tenure: 6, monthly: 22750, interest: 5, cashback: null },
          { tenure: 12, monthly: 11917, interest: 10, cashback: "₹750 cashback" },
          { tenure: 18, monthly: 8333, interest: 12, cashback: "₹1,500 cashback" },
        ],
      },
      {
        storage: "512 GB",
        mrp: 155999,
        price: 144999,
        emiPlans: [
          { tenure: 3, monthly: 48333, interest: 0, cashback: null },
          { tenure: 6, monthly: 25375, interest: 5, cashback: "₹500 cashback" },
          { tenure: 12, monthly: 13292, interest: 10, cashback: "₹1,000 cashback" },
          { tenure: 18, monthly: 9306, interest: 12, cashback: null },
        ],
      },
    ],
  },
  {
    name: "Google Pixel 9 Pro",
    slug: "google-pixel-9-pro",
    brand: "Google",
    description:
      "Google Pixel 9 Pro with Tensor G4 chip, 50MP triple camera system with 30x Super Res Zoom, 6.3-inch Super Actua display, and 7 years of OS updates.",
    images: ["/images/Google-Pixel-9Pro.png"],
    colors: [
      { name: "Obsidian", hex: "#3B3B3B" },
      { name: "Porcelain", hex: "#F5F0E8" },
      { name: "Hazel", hex: "#A8B5A0" },
    ],
    variants: [
      {
        storage: "128 GB",
        mrp: 109999,
        price: 101999,
        emiPlans: [
          { tenure: 3, monthly: 34000, interest: 0, cashback: null },
          { tenure: 6, monthly: 17833, interest: 5, cashback: "₹500 cashback" },
          { tenure: 9, monthly: 12222, interest: 8, cashback: null },
          { tenure: 12, monthly: 9350, interest: 10, cashback: "₹1,000 cashback" },
        ],
      },
      {
        storage: "256 GB",
        mrp: 119999,
        price: 111999,
        emiPlans: [
          { tenure: 3, monthly: 37333, interest: 0, cashback: null },
          { tenure: 6, monthly: 19600, interest: 5, cashback: null },
          { tenure: 9, monthly: 13444, interest: 8, cashback: "₹500 cashback" },
          { tenure: 12, monthly: 10267, interest: 10, cashback: "₹1,000 cashback" },
        ],
      },
    ],
  },
  {
    name: "OnePlus 12",
    slug: "oneplus-12",
    brand: "OnePlus",
    description: "OnePlus 12 features a Hasselblad Camera for Mobile, Snapdragon 8 Gen 3, and a stunning 120Hz ProXDR display.",
    images: ["/images/Oneplus-12.png"],
    colors: [
      { name: "Flowy Emerald", hex: "#4C6B61" },
      { name: "Silky Black", hex: "#1D1D1D" }
    ],
    variants: [
      {
        storage: "256 GB",
        mrp: 69999,
        price: 64999,
        emiPlans: [
          { tenure: 3, monthly: 21666, interest: 0, cashback: null },
          { tenure: 6, monthly: 11104, interest: 5, cashback: "₹500 cashback" },
          { tenure: 12, monthly: 5958, interest: 10, cashback: null }
        ]
      },
      {
        storage: "512 GB",
        mrp: 74999,
        price: 69999,
        emiPlans: [
          { tenure: 3, monthly: 23333, interest: 0, cashback: null },
          { tenure: 6, monthly: 11958, interest: 5, cashback: "₹1,000 cashback" },
          { tenure: 12, monthly: 6417, interest: 10, cashback: null }
        ]
      }
    ]
  },
  {
    name: "Samsung Galaxy Z Fold 7",
    slug: "samsung-galaxy-z-fold-7",
    brand: "Samsung",
    description: "The thinnest, lightest Galaxy Z Fold yet. Powered by Snapdragon 8 Gen 3 with Galaxy AI built-in.",
    images: ["/images/Samsung-Z-FOLD-7.png"],
    colors: [
      { name: "Silver Shadow", hex: "#C0C2C5" },
      { name: "Navy", hex: "#2A364F" },
      { name: "Pink", hex: "#E6B8C0" }
    ],
    variants: [
      {
        storage: "256 GB",
        mrp: 164999,
        price: 154999,
        emiPlans: [
          { tenure: 3, monthly: 51666, interest: 0, cashback: null },
          { tenure: 6, monthly: 26479, interest: 5, cashback: "₹1,000 cashback" },
          { tenure: 12, monthly: 14208, interest: 10, cashback: "₹2,000 cashback" }
        ]
      },
      {
        storage: "512 GB",
        mrp: 176999,
        price: 164999,
        emiPlans: [
          { tenure: 3, monthly: 55000, interest: 0, cashback: null },
          { tenure: 6, monthly: 28187, interest: 5, cashback: "₹1,000 cashback" },
          { tenure: 12, monthly: 15125, interest: 10, cashback: "₹2,500 cashback" }
        ]
      }
    ]
  },
  {
    name: "iPhone 15 Pro Max",
    slug: "iphone-15-pro-max",
    brand: "Apple",
    description: "iPhone 15 Pro Max forged in titanium, featuring the A17 Pro chip and a 5x Telephoto camera.",
    images: ["/images/Iphone-15-pro.png"],
    colors: [
      { name: "Natural Titanium", hex: "#9A9A9A" },
      { name: "Blue Titanium", hex: "#4B5664" },
      { name: "Black Titanium", hex: "#3C3C3C" }
    ],
    variants: [
      {
        storage: "256 GB",
        mrp: 159900,
        price: 148900,
        emiPlans: [
          { tenure: 3, monthly: 49633, interest: 0, cashback: null },
          { tenure: 6, monthly: 25437, interest: 5, cashback: null },
          { tenure: 12, monthly: 13897, interest: 12, cashback: "₹1,000 cashback" }
        ]
      },
      {
        storage: "512 GB",
        mrp: 179900,
        price: 168900,
        emiPlans: [
          { tenure: 3, monthly: 56300, interest: 0, cashback: null },
          { tenure: 6, monthly: 28854, interest: 5, cashback: null },
          { tenure: 12, monthly: 15764, interest: 12, cashback: "₹1,500 cashback" }
        ]
      }
    ]
  }
];
async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("Error: MONGODB_URI is not set. Add it to server/.env");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");

    for (const product of products) {
      await Product.findOneAndUpdate(
        { slug: product.slug },
        { $set: product },
        { upsert: true, returnDocument: "after" }
      );
      console.log(`Upserted: ${product.name}`);
    }

    await mongoose.disconnect();
    console.log("Done");
  } catch (err) {
    console.error("Seed failed:", err.message);
    process.exit(1);
  }
}

seed();
