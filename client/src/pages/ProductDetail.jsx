import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);

  const [selectedVariants, setSelectedVariants] = useState(() => {
    if (!product) return {};
    const initial = {};
    product.variants.forEach((v) => {
      initial[v.label] = v.options[0].name;
    });
    return initial;
  });

  const [selectedPlan, setSelectedPlan] = useState(null);

  if (!product) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h1 className="text-xl font-bold text-gray-900">Product not found</h1>
        <Link to="/" className="text-blue-600 text-sm mt-4 inline-block">
          ← Back to products
        </Link>
      </div>
    );
  }

  const discount = Math.round(
    ((product.mrp - product.price) / product.mrp) * 100
  );

  function handleVariantChange(label, value) {
    setSelectedVariants((prev) => ({ ...prev, [label]: value }));
  }

  function handleProceed() {
    if (!selectedPlan) return;
    const plan = product.emiPlans.find((p) => p.id === selectedPlan);
    alert(
      `Proceeding with ${product.name}\n` +
        `Plan: ₹${plan.monthly.toLocaleString("en-IN")}/mo × ${plan.tenure} months\n` +
        `Variants: ${Object.entries(selectedVariants)
          .map(([k, v]) => `${k}: ${v}`)
          .join(", ")}`
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
        ← Back to products
      </Link>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div className="bg-white border border-gray-200 flex items-center justify-center p-8 aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Details */}
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            {product.brand}
          </p>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">
            {product.name}
          </h1>

          {/* Pricing */}
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-bold text-gray-900">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.mrp > product.price && (
              <>
                <span className="text-sm text-gray-400 line-through">
                  ₹{product.mrp.toLocaleString("en-IN")}
                </span>
                <span className="text-sm font-medium text-green-600">
                  {discount}% off
                </span>
              </>
            )}
          </div>

          {/* Variants */}
          {product.variants.map((variant) => (
            <div key={variant.label} className="mt-6">
              <p className="text-sm text-gray-600 mb-2">
                {variant.label}:{" "}
                <span className="font-medium text-gray-900">
                  {selectedVariants[variant.label]}
                </span>
              </p>
              <div className="flex gap-2 flex-wrap">
                {variant.options.map((option) => {
                  const selected =
                    selectedVariants[variant.label] === option.name;

                  // Color swatch
                  if (option.hex) {
                    return (
                      <button
                        key={option.name}
                        onClick={() =>
                          handleVariantChange(variant.label, option.name)
                        }
                        title={option.name}
                        className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
                          selected
                            ? "border-gray-900 ring-2 ring-gray-300"
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: option.hex }}
                      />
                    );
                  }

                  // Text option (storage, etc.)
                  return (
                    <button
                      key={option.name}
                      onClick={() =>
                        handleVariantChange(variant.label, option.name)
                      }
                      className={`px-3 py-1.5 text-sm border cursor-pointer ${
                        selected
                          ? "border-gray-900 bg-gray-900 text-white font-medium"
                          : "border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {option.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* EMI Plans */}
          <div className="mt-8">
            <p className="text-sm font-medium text-gray-900 mb-3">
              Available EMI Plans
            </p>
            <div className="space-y-2">
              {product.emiPlans.map((plan) => {
                const selected = selectedPlan === plan.id;
                return (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full text-left px-4 py-3 border flex items-start gap-3 cursor-pointer ${
                      selected
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {/* Radio indicator */}
                    <div
                      className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                        selected ? "border-blue-600" : "border-gray-400"
                      }`}
                    >
                      {selected && (
                        <div className="w-2 h-2 rounded-full bg-blue-600" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          ₹{plan.monthly.toLocaleString("en-IN")}/mo ×{" "}
                          {plan.tenure} months
                        </p>
                        {plan.interest === 0 && (
                          <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5">
                            No Cost
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {plan.interest === 0
                          ? "No-cost EMI"
                          : `${plan.interest}% p.a.`}
                        {plan.cashback && ` · ${plan.cashback}`}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Proceed */}
          <button
            onClick={handleProceed}
            disabled={!selectedPlan}
            className={`mt-6 w-full py-3 text-sm font-medium cursor-pointer ${
              selectedPlan
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Proceed with EMI Plan
          </button>
        </div>
      </div>
    </div>
  );
}
