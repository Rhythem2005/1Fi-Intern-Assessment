import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load products");
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-24 text-center">
        <div className="inline-block w-6 h-6 border-2 border-[#E4E2DC] border-t-[#2B3A67] rounded-full animate-spin mb-4"></div>
        <p className="text-[#5B6270] text-sm">Loading products</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-24 text-center">
        <h2 className="text-lg font-semibold mb-1">Something went wrong</h2>
        <p className="text-[#5B6270] text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <section className="border-b border-[#E4E2DC] bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 md:py-20">
          <div className="max-w-xl">
            <p className="text-[13px] font-semibold text-[#2B3A67] mb-3">
              No cost EMI available
            </p>
            <h1 className="text-[32px] sm:text-[40px] font-semibold tracking-tight leading-[1.1] mb-4">
              Get the device you want, pay a little every month.
            </h1>
            <p className="text-[15px] text-[#5B6270] leading-relaxed">
              Choose from flexible EMI plans on every product, with clear
              pricing and no surprises at checkout.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}