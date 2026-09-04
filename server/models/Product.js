import mongoose from "mongoose";

const mutualFundSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
  },
  { _id: false }
);

const emiPlanSchema = new mongoose.Schema(
  {
    tenure: { type: Number, required: true, min: 1 },
    monthly: { type: Number, required: true, min: 0 },
    interest: { type: Number, required: true, min: 0 },
    cashback: { type: String, default: null },
    mutualFund: { type: mutualFundSchema, required: true },
  },
  { _id: false }
);

const variantSchema = new mongoose.Schema(
  {
    storage: { type: String, required: true },
    mrp: { type: Number, required: true, min: 0 },
    price: { type: Number, required: true, min: 0 },
    emiPlans: { type: [emiPlanSchema], required: true },
  },
  { _id: false }
);

const colorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    hex: { type: String, required: true },
    image: { type: String, required: true },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true },
    colors: { type: [colorSchema], required: true },
    variants: { type: [variantSchema], required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
