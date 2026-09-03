import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const firstVariant = product.variants[0];
  const discount = Math.round(
    ((firstVariant.mrp - firstVariant.price) / firstVariant.mrp) * 100
  );

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group block bg-white rounded-lg border border-[#E4E2DC] hover:border-[#C7C4BC] transition-colors overflow-hidden"
    >
      <div className="aspect-square bg-[#F3F2EE] flex items-center justify-center p-10 relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="max-h-full max-w-full object-contain"
        />
        {firstVariant.mrp > firstVariant.price && (
          <div className="absolute top-3 left-3 bg-white text-[#1B7A43] text-[12px] font-semibold px-2 py-1 rounded border border-[#E4E2DC]">
            {discount}% off
          </div>
        )}
      </div>
      <div className="p-5">
        <p className="text-[12px] text-[#8A8F99] font-medium mb-1">
          {product.brand}
        </p>
        <h2 className="text-[15px] font-semibold text-[#14181F] leading-snug mb-3 line-clamp-1">
          {product.name}
        </h2>

        <div className="flex items-baseline gap-2">
          <span className="text-[20px] font-semibold tracking-tight">
            ₹{firstVariant.price.toLocaleString("en-IN")}
          </span>
          {firstVariant.mrp > firstVariant.price && (
            <span className="text-[13px] text-[#8A8F99] line-through">
              ₹{firstVariant.mrp.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        <div className="mt-3 pt-3 border-t border-[#E4E2DC] flex items-baseline gap-1.5">
          <span className="text-[12px] text-[#8A8F99]">EMI from</span>
          <span className="text-[14px] font-semibold text-[#2B3A67]">
            ₹{product.lowestEmi.toLocaleString("en-IN")}/mo
          </span>
        </div>
      </div>
    </Link>
  );
}