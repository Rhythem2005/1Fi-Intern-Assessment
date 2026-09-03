import { Router } from "express";
import Product from "../models/Product.js";

const router = Router();

// GET /api/products — list all products (summary for listing page)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({}, {
      name: 1,
      slug: 1,
      brand: 1,
      images: 1,
      colors: 1,
      "variants.storage": 1,
      "variants.mrp": 1,
      "variants.price": 1,
      "variants.emiPlans.monthly": 1,
    }).lean();

    // Compute lowestEmi and strip emiPlans from the response
    const result = products.map((p) => {
      const lowestEmi = Math.min(
        ...p.variants.flatMap((v) => v.emiPlans.map((e) => e.monthly))
      );
      const variants = p.variants.map(({ emiPlans, ...rest }) => rest);
      return { ...p, variants, lowestEmi };
    });

    res.json(result);
  } catch (err) {
    console.error("Error fetching products:", err.message);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// GET /api/products/:slug — single product with all details
router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    if (!/^[a-z0-9-]+$/.test(slug)) {
      return res.status(400).json({ error: "Invalid product slug" });
    }

    const product = await Product.findOne({ slug }).lean();

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error("Error fetching product:", err.message);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

export default router;
