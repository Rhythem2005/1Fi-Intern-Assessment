import { useState, useEffect, useRef, useMemo } from "react";
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
  const [showEmiModal, setShowEmiModal] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState(null);
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
        // Reset selections when loading a different product
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
  const currentVariant = product?.variants?.[selectedVariantIdx];

  // Group plans by fund so each section can be expanded independently.
  // Preserves original emiPlans index so selectedPlan maps back to the variant.
  const groupedPlans = useMemo(() => {
    if (!currentVariant || !currentVariant.emiPlans) return {};
    const groups = {};
    currentVariant.emiPlans.forEach((plan, idx) => {
      const fundName = plan.mutualFund?.name || "Other";
      if (!groups[fundName]) {
        groups[fundName] = {
          type: plan.mutualFund?.type || "",
          plans: []
        };
      }
      groups[fundName].plans.push({ plan, idx });
    });
    return groups;
  }, [currentVariant]);


  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex justify-center">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 font-medium">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error === "not_found") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          We couldn't find the product you're looking for. It might have been removed or the URL is incorrect.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          We couldn't find the product you're looking for. It might have been removed or the URL is incorrect.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const productColors = product.colors || [];
  const currentImage = productColors.find(c => c.name === selectedColor)?.image || product.images[0];

  const variant = product.variants[selectedVariantIdx];
  const discount = Math.round(
    ((variant.mrp - variant.price) / variant.mrp) * 100
  );


  function handleProceed() {
    if (selectedPlan == null) return;
    setShowModal(true);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 bg-white min-h-screen">
      <Link
        to="/"
        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-8 group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-1.5 transition-transform group-hover:-translate-x-1"
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
        Back to all products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Column: Product Image */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-6 rounded-2xl bg-gray-50 border border-gray-100 p-8 sm:p-12 flex items-center justify-center min-h-[350px] sm:min-h-[500px]">
            <img
              src={currentImage}
              alt={product.name}
              className="max-h-full max-w-full object-contain mix-blend-multiply drop-shadow-sm"
            />
          </div>
        </div>

        {/* Right Column: Product Details */}
        <div className="lg:col-span-7 flex flex-col">
          {/* Header & Description */}
          <div className="mb-6">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">
              {product.brand}
            </h2>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
              {product.name}
            </h1>
            <p className="text-gray-600 text-base leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Pricing */}
          <div className="py-6 border-y border-gray-200">
            <div className="flex items-end gap-3 flex-wrap">
              <span className="text-4xl font-black text-gray-900 tracking-tight">
                ₹{variant.price.toLocaleString("en-IN")}
              </span>
              {variant.mrp > variant.price && (
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-lg text-gray-500 line-through font-medium">
                    MRP: ₹{variant.mrp.toLocaleString("en-IN")}
                  </span>
                  <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                    {discount}% OFF
                  </span>
                </div>
              )}
            </div>
            <p className="text-sm font-medium text-gray-500 mt-2">
              Inclusive of all taxes
            </p>
          </div>

          {/* Color Selection */}
          <div className="py-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                Color
              </h3>
              <span className="text-sm font-semibold text-gray-700">
                {selectedColor}
              </span>
            </div>
            <div className="flex gap-4 flex-wrap">
              {productColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  title={color.name}
                  className={`w-12 h-12 rounded-full cursor-pointer transition-all flex items-center justify-center ${selectedColor === color.name
                      ? "ring-2 ring-offset-4 ring-blue-600 scale-110"
                      : "ring-1 ring-gray-300 ring-offset-2 hover:scale-105"
                    }`}
                  style={{ backgroundColor: color.hex }}
                >
                  {selectedColor === color.name && (
                    <svg
                      className="w-5 h-5 text-white mix-blend-difference opacity-90"
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

          {/* Storage Selection */}
          <div className="py-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                Storage
              </h3>
            </div>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {product.variants.map((v, i) => (
                <button
                  key={v.storage}
                  onClick={() => {
                    setSelectedVariantIdx(i);
                    // Reset selected plan since prices and EMI terms differ across variants
                    setSelectedPlan(null);
                  }}
                  className={`flex-1 sm:flex-none px-6 py-3 text-sm rounded-xl border-2 transition-all cursor-pointer font-bold ${i === selectedVariantIdx
                      ? "border-blue-600 text-blue-700 bg-blue-50/50 shadow-sm"
                      : "border-gray-200 text-gray-700 bg-white hover:border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  {v.storage}
                </button>
              ))}
            </div>
          </div>

          {/* EMI Plans Trigger */}
          <div className="py-8 mb-20 sm:mb-0">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-extrabold text-gray-900">
                EMI Options
              </h3>
              <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                Required
              </span>
            </div>
            <button
              onClick={() => setShowEmiModal(true)}
              className="w-full text-left p-5 rounded-2xl border-2 border-gray-200 flex justify-between items-center hover:border-blue-500 hover:shadow-sm transition-all bg-white cursor-pointer"
            >
              <div>
                <span className="block font-bold text-gray-900 text-lg">
                  {selectedPlan != null ? `Selected: ₹${variant.emiPlans[selectedPlan].monthly.toLocaleString('en-IN')}/mo for ${variant.emiPlans[selectedPlan].tenure} mos` : "View and Select EMI Plans"}
                </span>
                <span className="block text-sm text-gray-500 mt-1">
                  Multiple plans available backed by Mutual Funds
                </span>
              </div>
              <span className="text-blue-600 font-bold ml-4">Change &gt;</span>
            </button>
          </div>

          {/* Proceed CTA (Sticky on Mobile, Static on Desktop) */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 sm:relative sm:p-0 sm:bg-transparent sm:border-t-0 sm:mt-6 z-40 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)] sm:shadow-none">
            <button
              onClick={handleProceed}
              disabled={selectedPlan == null}
              className={`w-full py-4 px-8 rounded-xl text-lg font-bold transition-all ${selectedPlan != null
                  ? "bg-amber-400 hover:bg-amber-500 text-gray-900 shadow-sm cursor-pointer hover:shadow-md transform hover:-translate-y-0.5"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
            >
              {selectedPlan != null
                ? "Proceed with Selected Plan"
                : "Select an EMI Plan to Proceed"}
            </button>
            {selectedPlan != null && (
              <p className="text-center text-xs font-bold text-gray-400 mt-4 uppercase tracking-widest hidden sm:block">
                Demo checkout
              </p>
            )}
          </div>
        </div>
      </div>

      {/* EMI Selection Modal */}
      {showEmiModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm px-4 py-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowEmiModal(false);
          }}
        >
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden outline-none flex flex-col max-h-full animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 flex-shrink-0">
              <h2 className="text-lg font-bold text-gray-900">
                EMI Options
              </h2>
              <button
                onClick={() => setShowEmiModal(false)}
                className="text-gray-400 hover:text-gray-700 hover:bg-gray-200 cursor-pointer p-1.5 rounded-full transition-colors"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-gray-50/30">
              {Object.entries(groupedPlans).map(([fundName, group]) => (
                <div key={fundName} className="mb-4 border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
                  <button
                    onClick={() => setExpandedGroup(expandedGroup === fundName ? null : fundName)}
                    className="w-full px-5 py-4 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="text-left">
                      <h4 className="font-bold text-gray-900">{fundName}</h4>
                      {group.type && <span className="text-xs font-semibold text-gray-500 mt-0.5 block">{group.type} Fund</span>}
                    </div>
                    <svg
                      className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${expandedGroup === fundName ? 'rotate-180' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedGroup === fundName && (
                    <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50/50 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {group.plans.map(({ plan, idx }) => {
                        const selected = selectedPlan === idx;
                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              setSelectedPlan(idx);
                              setShowEmiModal(false);
                            }}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between relative ${selected
                                ? "border-blue-600 bg-blue-50/60 shadow-sm ring-1 ring-blue-600"
                                : "border-gray-200 bg-white hover:border-blue-400 hover:shadow-sm"
                              }`}
                          >
                            {selected && (
                              <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                                SELECTED
                              </div>
                            )}
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <span className="block text-xl font-black text-gray-900 tracking-tight">
                                  ₹{plan.monthly.toLocaleString("en-IN")}
                                </span>
                                <span className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mt-0.5">
                                  / month
                                </span>
                              </div>
                              <div className="bg-gray-100 text-gray-800 text-[11px] font-bold px-2 py-1 rounded-md border border-gray-200">
                                {plan.tenure} mos
                              </div>
                            </div>
                            <div className="space-y-1.5 mt-2">
                              <div className="text-sm">
                                <span className={plan.interest === 0 ? "font-bold text-green-600" : "font-semibold text-gray-600"}>
                                  {plan.interest === 0 ? "No Cost EMI" : `${plan.interest}% p.a. interest`}
                                </span>
                              </div>
                              {plan.cashback && (
                                <div className="text-sm font-bold text-amber-600">
                                  {plan.cashback}
                                </div>
                              )}
                              <div className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded border border-blue-100 inline-block mt-1">
                                Backed by {fundName}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showModal &&
        selectedPlan != null &&
        (() => {
          // Scoped IIFE avoids repeating variant.emiPlans[selectedPlan] lookups
          const plan = variant.emiPlans[selectedPlan];
          return (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm px-4"
              onClick={(e) => {
                if (e.target === e.currentTarget) setShowModal(false);
              }}
            >
              <div
                ref={modalRef}
                tabIndex={-1}
                className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden outline-none animate-in fade-in zoom-in-95 duration-200"
              >
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                  <h2 className="text-lg font-bold text-gray-900">
                    Order Summary
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-700 hover:bg-gray-200 cursor-pointer p-1.5 rounded-full transition-colors"
                    aria-label="Close"
                  >
                    <svg
                      className="w-5 h-5"
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
                  {/* Product Snapshot */}
                  <div className="flex items-center gap-5 pb-6 border-b border-gray-100">
                    <div className="w-20 h-20 bg-gray-50 rounded-xl p-2 border border-gray-100 flex-shrink-0 flex items-center justify-center">
                      <img
                        src={currentImage}
                        alt={product.name}
                        className="max-w-full max-h-full object-contain mix-blend-multiply"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-extrabold text-base text-gray-900 leading-snug mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm font-medium text-gray-500">
                        {variant.storage} • {selectedColor}
                      </p>
                    </div>
                  </div>

                  {/* Plan Breakdown */}
                  <div className="pt-6 space-y-4">
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-semibold text-gray-600">
                        Monthly Payment
                      </span>
                      <span className="font-black text-2xl text-gray-900">
                        ₹{plan.monthly.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">
                        Tenure
                      </span>
                      <span className="font-bold text-gray-900">
                        {plan.tenure} months
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">
                        Interest Rate
                      </span>
                      <span
                        className={`font-bold ${plan.interest === 0 ? "text-green-600" : "text-gray-900"
                          }`}
                      >
                        {plan.interest === 0
                          ? "No Cost EMI"
                          : `${plan.interest}% p.a.`}
                      </span>
                    </div>
                    {plan.cashback && (
                      <div className="flex justify-between items-center pt-3 mt-1 border-t border-dashed border-gray-200">
                        <span className="text-sm font-bold text-gray-600">
                          Cashback Applied
                        </span>
                        <span className="font-extrabold text-amber-600">
                          {plan.cashback}
                        </span>
                      </div>
                    )}
                    {plan.mutualFund && (
                      <div className="flex justify-between items-center pt-3 mt-1 border-t border-dashed border-gray-200">
                        <span className="text-sm font-bold text-gray-600">
                          Backed By
                        </span>
                        <span className="font-bold text-blue-700">
                          {plan.mutualFund.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-6 py-5 bg-gray-50 border-t border-gray-100 flex gap-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-3 text-sm font-bold rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      alert("EMI Plan Selected Successfully! (Demo)");
                      setShowModal(false);
                    }}
                    className="flex-1 py-3 text-sm font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-sm hover:shadow cursor-pointer"
                  >
                    Confirm Selection
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
    </div>
  );
}