import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const firstVariant = product.variants[0];
  const discount = Math.round(
    ((firstVariant.mrp - firstVariant.price) / firstVariant.mrp) * 100
  );

  return (
    <Link
      to={`/products/${product.slug}`}
      className="block bg-white border border-gray-200 hover:border-gray-300 transition-colors"
    >
      <div className="aspect-square bg-gray-50 flex items-center justify-center p-6">
        <img
          src={product.images[0]}
          alt={product.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <div className="p-4 border-t border-gray-100">
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          {product.brand}
        </p>
        <h2 className="text-sm font-semibold text-gray-900 mt-1">
          {product.name}
        </h2>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-base font-bold text-gray-900">
            ₹{firstVariant.price.toLocaleString("en-IN")}
          </span>
          {firstVariant.mrp > firstVariant.price && (
            <>
              <span className="text-xs text-gray-400 line-through">
                ₹{firstVariant.mrp.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-green-600 font-medium">
                {discount}% off
              </span>
            </>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          EMI from{" "}
          <span className="font-medium text-gray-700">
            ₹{product.lowestEmi.toLocaleString("en-IN")}/mo
          </span>
        </p>
      </div>
    </Link>
  );
}
