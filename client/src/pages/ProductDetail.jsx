import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/products/${slug}`)
      .then((res) => {
        if (res.status === 404) throw new Error("not_found");
        if (!res.ok) throw new Error("Failed to load product");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setSelectedColor(data.colors[0]?.name || null);
        setSelectedVariantIdx(0);
        setSelectedPlan(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (!showModal) return;
    modalRef.current?.focus();
    function onKey(e) {
      if (e.key === "Escape") setShowModal(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showModal]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center text-gray-500">
        Loading product...
      </div>
    );
  }

  if (error === "not_found") {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h1 className="text-xl font-bold text-gray-900">Product not found</h1>
        <Link to="/" className="text-blue-600 text-sm mt-4 inline-block">
          ← Back to products
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center text-red-600">
        {error}
      </div>
    );
  }

  const variant = product.variants[selectedVariantIdx];
  const discount = Math.round(
    ((variant.mrp - variant.price) / variant.mrp) * 100
  );

  function handleProceed() {
    if (selectedPlan == null) return;
    setShowModal(true);
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
            src={product.images[0]}
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

          {/* Pricing — updates with selected variant */}
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-bold text-gray-900">
              ₹{variant.price.toLocaleString("en-IN")}
            </span>
            {variant.mrp > variant.price && (
              <>
                <span className="text-sm text-gray-400 line-through">
                  ₹{variant.mrp.toLocaleString("en-IN")}
                </span>
                <span className="text-sm font-medium text-green-600">
                  {discount}% off
                </span>
              </>
            )}
          </div>

          {/* Color selector */}
          <div className="mt-6">
            <p className="text-sm text-gray-600 mb-2">
              Color:{" "}
              <span className="font-medium text-gray-900">{selectedColor}</span>
            </p>
            <div className="flex gap-2 flex-wrap">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  title={color.name}
                  className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
                    selectedColor === color.name
                      ? "border-gray-900 ring-2 ring-gray-300"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </div>

          {/* Storage selector */}
          <div className="mt-6">
            <p className="text-sm text-gray-600 mb-2">
              Storage:{" "}
              <span className="font-medium text-gray-900">
                {variant.storage}
              </span>
            </p>
            <div className="flex gap-2 flex-wrap">
              {product.variants.map((v, i) => (
                <button
                  key={v.storage}
                  onClick={() => {
                    setSelectedVariantIdx(i);
                    setSelectedPlan(null);
                  }}
                  className={`px-3 py-1.5 text-sm border cursor-pointer ${
                    i === selectedVariantIdx
                      ? "border-gray-900 bg-gray-900 text-white font-medium"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {v.storage}
                </button>
              ))}
            </div>
          </div>

          {/* EMI Plans — updates with selected variant */}
          <div className="mt-8">
            <p className="text-sm font-medium text-gray-900 mb-3">
              Available EMI Plans
            </p>
            <div className="space-y-2">
              {variant.emiPlans.map((plan, idx) => {
                const selected = selectedPlan === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedPlan(idx)}
                    className={`w-full text-left px-4 py-3 border flex items-start gap-3 cursor-pointer ${
                      selected
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
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
            disabled={selectedPlan == null}
            className={`mt-6 w-full py-3 text-sm font-medium cursor-pointer ${
              selectedPlan != null
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Proceed with EMI Plan
          </button>
        </div>
      </div>
      {/* Confirmation Modal */}
      {showModal && selectedPlan != null && (() => {
        const plan = variant.emiPlans[selectedPlan];
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
            onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
          >
            <div
              ref={modalRef}
              tabIndex={-1}
              className="bg-white w-full max-w-md border border-gray-200 outline-none"
            >
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-base font-bold text-gray-900">Confirm EMI Plan</h2>
              </div>
              <div className="px-6 py-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Product</span>
                  <span className="text-gray-900 font-medium">{product.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Color</span>
                  <span className="text-gray-900">{selectedColor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Storage</span>
                  <span className="text-gray-900">{variant.storage}</span>
                </div>
                <hr className="border-gray-100" />
                <div className="flex justify-between">
                  <span className="text-gray-500">Monthly EMI</span>
                  <span className="text-gray-900 font-medium">₹{plan.monthly.toLocaleString("en-IN")}/mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tenure</span>
                  <span className="text-gray-900">{plan.tenure} months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Interest Rate</span>
                  <span className="text-gray-900">{plan.interest === 0 ? "No cost" : `${plan.interest}% p.a.`}</span>
                </div>
                {plan.cashback && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Cashback</span>
                    <span className="text-green-600 font-medium">{plan.cashback}</span>
                  </div>
                )}
              </div>
              <div className="px-6 py-4 border-t border-gray-200 flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
