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
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-24 text-center text-[#5B6270] text-sm">
        Loading product...
      </div>
    );
  }

  if (error === "not_found") {
    return (
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-24 text-center">
        <h1 className="text-xl font-semibold mb-2">Product not found</h1>
        <p className="text-[#5B6270] text-sm mb-6">
          We couldn't find the product you're looking for.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-md text-white bg-[#2B3A67] hover:bg-[#22305A] transition-colors"
        >
          Browse all products
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-24 text-center">
        <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
        <p className="text-[#5B6270] text-sm">{error}</p>
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
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 md:py-12">
      <Link
        to="/"
        className="inline-flex items-center text-[13px] font-medium text-[#5B6270] hover:text-[#14181F] transition-colors mb-6 md:mb-8"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3.5 w-3.5 mr-1.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20">
        {/* Image */}
        <div className="bg-[#F3F2EE] rounded-lg flex items-center justify-center p-10 sm:p-14 aspect-square md:sticky md:top-24 md:self-start">
          <img
            src={product.images[0]}
            alt={product.name}
            className="max-h-full max-w-full object-contain mix-blend-multiply"
          />
        </div>

        {/* Details */}
        <div>
          <p className="text-[12px] text-[#8A8F99] font-medium mb-1.5">
            {product.brand}
          </p>
          <h1 className="text-[26px] sm:text-[28px] font-semibold tracking-tight leading-tight">
            {product.name}
          </h1>

          {/* Pricing */}
          <div className="mt-6 py-5 border-y border-[#E4E2DC]">
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-[32px] sm:text-[34px] font-semibold tracking-tight">
                ₹{variant.price.toLocaleString("en-IN")}
              </span>
              {variant.mrp > variant.price && (
                <>
                  <span className="text-[15px] text-[#8A8F99] line-through">
                    ₹{variant.mrp.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[13px] font-semibold text-[#1B7A43]">
                    {discount}% off
                  </span>
                </>
              )}
            </div>
            <p className="text-[13px] text-[#8A8F99] mt-1.5">
              Inclusive of all taxes
            </p>
          </div>

          {/* Color selector */}
          <div className="mt-7">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[13px] font-semibold">Color</p>
              <span className="text-[13px] text-[#5B6270]">
                {selectedColor}
              </span>
            </div>
            <div className="flex gap-3 flex-wrap">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  title={color.name}
                  className={`w-10 h-10 rounded-full cursor-pointer transition-shadow flex items-center justify-center ${
                    selectedColor === color.name
                      ? "ring-2 ring-offset-2 ring-[#14181F]"
                      : "ring-1 ring-[#E4E2DC] ring-offset-2"
                  }`}
                  style={{ backgroundColor: color.hex }}
                >
                  {selectedColor === color.name && (
                    <svg
                      className="w-4 h-4 text-white mix-blend-difference"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Storage selector */}
          <div className="mt-7">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[13px] font-semibold">Storage</p>
              <span className="text-[13px] text-[#5B6270]">
                {variant.storage}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {product.variants.map((v, i) => (
                <button
                  key={v.storage}
                  onClick={() => {
                    setSelectedVariantIdx(i);
                    setSelectedPlan(null);
                  }}
                  className={`px-4 py-2.5 text-[14px] rounded-md border transition-colors cursor-pointer font-medium ${
                    i === selectedVariantIdx
                      ? "border-[#2B3A67] bg-[#2B3A67] text-white"
                      : "border-[#E4E2DC] text-[#14181F] bg-white hover:border-[#C7C4BC]"
                  }`}
                >
                  {v.storage}
                </button>
              ))}
            </div>
          </div>

          {/* EMI Plans */}
          <div className="mt-9">
            <h3 className="text-[15px] font-semibold mb-3">
              Select EMI plan
            </h3>
            <div className="space-y-2.5">
              {variant.emiPlans.map((plan, idx) => {
                const selected = selectedPlan === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedPlan(idx)}
                    className={`w-full text-left pl-4 pr-5 py-4 rounded-md border transition-colors flex items-start gap-3 cursor-pointer ${
                      selected
                        ? "border-[#2B3A67] border-l-[3px] bg-[#F5F6FA]"
                        : "border-[#E4E2DC] bg-white hover:border-[#C7C4BC]"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="text-[19px] font-semibold tracking-tight">
                          ₹{plan.monthly.toLocaleString("en-IN")}
                          <span className="text-[13px] font-normal text-[#8A8F99]">
                            {" "}
                            /mo
                          </span>
                        </p>
                        <p className="text-[13px] font-medium text-[#5B6270] whitespace-nowrap">
                          {plan.tenure} months
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-[12px]">
                        <span
                          className={
                            plan.interest === 0
                              ? "text-[#1B7A43] font-medium"
                              : "text-[#5B6270]"
                          }
                        >
                          {plan.interest === 0
                            ? "No cost EMI"
                            : `${plan.interest}% p.a.`}
                        </span>
                        {plan.cashback && (
                          <span className="text-[#9A6B00] font-medium">
                            {plan.cashback} cashback
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Proceed */}
          <div className="mt-8">
            <button
              onClick={handleProceed}
              disabled={selectedPlan == null}
              className={`w-full py-3.5 px-6 rounded-md text-[15px] font-semibold transition-colors ${
                selectedPlan != null
                  ? "bg-[#2B3A67] hover:bg-[#22305A] text-white cursor-pointer"
                  : "bg-[#F0EFEB] text-[#B3AFA5] cursor-not-allowed"
              }`}
            >
              {selectedPlan != null
                ? "Proceed with selected plan"
                : "Select an EMI plan to proceed"}
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal &&
        selectedPlan != null &&
        (() => {
          const plan = variant.emiPlans[selectedPlan];
          return (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-[#14181F]/50 px-4"
              onClick={(e) => {
                if (e.target === e.currentTarget) setShowModal(false);
              }}
            >
              <div
                ref={modalRef}
                tabIndex={-1}
                className="bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden outline-none"
              >
                <div className="px-6 py-5 border-b border-[#E4E2DC] flex items-center justify-between">
                  <h2 className="text-[16px] font-semibold">Order summary</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-[#8A8F99] hover:text-[#14181F] cursor-pointer p-1 -mr-1 rounded transition-colors"
                    aria-label="Close"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="px-6 py-6">
                  <div className="flex items-center gap-4 pb-5 border-b border-[#E4E2DC]">
                    <div className="w-14 h-14 bg-[#F3F2EE] rounded-md p-2 flex-shrink-0">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-[14px] leading-snug truncate">
                        {product.name}
                      </h3>
                      <p className="text-[13px] text-[#8A8F99] mt-0.5">
                        {variant.storage} · {selectedColor}
                      </p>
                    </div>
                  </div>

                  <div className="pt-5 space-y-2.5 text-[14px]">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[#5B6270]">Monthly payment</span>
                      <span className="font-semibold text-[17px]">
                        ₹{plan.monthly.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5B6270]">Tenure</span>
                      <span className="font-medium">{plan.tenure} months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5B6270]">Interest rate</span>
                      <span className="font-medium">
                        {plan.interest === 0
                          ? "No cost EMI"
                          : `${plan.interest}% p.a.`}
                      </span>
                    </div>
                    {plan.cashback && (
                      <div className="flex justify-between pt-2.5 mt-2.5 border-t border-[#E4E2DC]">
                        <span className="text-[#5B6270]">Cashback</span>
                        <span className="font-semibold text-[#9A6B00]">
                          {plan.cashback}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-6 py-5 border-t border-[#E4E2DC] flex gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-2.5 text-[14px] font-medium rounded-md border border-[#E4E2DC] text-[#14181F] hover:bg-[#F3F2EE] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      alert("Order placed successfully! (Demo)");
                      setShowModal(false);
                    }}
                    className="flex-1 py-2.5 text-[14px] font-semibold rounded-md bg-[#2B3A67] hover:bg-[#22305A] text-white transition-colors cursor-pointer"
                  >
                    Confirm & pay
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
    </div>
  );
}