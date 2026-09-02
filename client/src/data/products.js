export const products = [
  {
    slug: "iphone-16-pro",
    name: "iPhone 16 Pro",
    brand: "Apple",
    image: "/images/iphone-16-pro.jpg",
    mrp: 134900,
    price: 127900,
    variants: [
      {
        label: "Color",
        options: [
          { name: "Desert Titanium", hex: "#BFA98D" },
          { name: "Natural Titanium", hex: "#9A9A9A" },
          { name: "Black Titanium", hex: "#3C3C3C" },
          { name: "White Titanium", hex: "#F5F5F0" },
        ],
      },
      {
        label: "Storage",
        options: [
          { name: "128 GB" },
          { name: "256 GB" },
          { name: "512 GB" },
          { name: "1 TB" },
        ],
      },
    ],
    emiPlans: [
      { id: 1, tenure: 3, monthly: 42634, interest: 0, cashback: null },
      { id: 2, tenure: 6, monthly: 22317, interest: 5, cashback: "₹500 cashback" },
      { id: 3, tenure: 9, monthly: 15456, interest: 8, cashback: null },
      { id: 4, tenure: 12, monthly: 11917, interest: 12, cashback: "₹1,000 cashback" },
      { id: 5, tenure: 24, monthly: 6450, interest: 14, cashback: null },
    ],
  },
  {
    slug: "samsung-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    image: "/images/samsung-s24-ultra.jpg",
    mrp: 139999,
    price: 129999,
    variants: [
      {
        label: "Color",
        options: [
          { name: "Titanium Gray", hex: "#8B8D8E" },
          { name: "Titanium Violet", hex: "#9B8AA5" },
          { name: "Titanium Yellow", hex: "#E5D68A" },
        ],
      },
      {
        label: "Storage",
        options: [
          { name: "256 GB" },
          { name: "512 GB" },
          { name: "1 TB" },
        ],
      },
    ],
    emiPlans: [
      { id: 1, tenure: 3, monthly: 43333, interest: 0, cashback: null },
      { id: 2, tenure: 6, monthly: 22750, interest: 5, cashback: null },
      { id: 3, tenure: 12, monthly: 11917, interest: 10, cashback: "₹750 cashback" },
      { id: 4, tenure: 18, monthly: 8333, interest: 12, cashback: "₹1,500 cashback" },
    ],
  },
  {
    slug: "google-pixel-9-pro",
    name: "Google Pixel 9 Pro",
    brand: "Google",
    image: "/images/google-pixel-9-pro.jpg",
    mrp: 109999,
    price: 101999,
    variants: [
      {
        label: "Color",
        options: [
          { name: "Obsidian", hex: "#3B3B3B" },
          { name: "Porcelain", hex: "#F5F0E8" },
          { name: "Hazel", hex: "#A8B5A0" },
        ],
      },
      {
        label: "Storage",
        options: [
          { name: "128 GB" },
          { name: "256 GB" },
          { name: "512 GB" },
        ],
      },
    ],
    emiPlans: [
      { id: 1, tenure: 3, monthly: 34000, interest: 0, cashback: null },
      { id: 2, tenure: 6, monthly: 17833, interest: 5, cashback: "₹500 cashback" },
      { id: 3, tenure: 9, monthly: 12222, interest: 8, cashback: null },
      { id: 4, tenure: 12, monthly: 9350, interest: 10, cashback: "₹1,000 cashback" },
    ],
  },
];
