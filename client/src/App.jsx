import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#FAFAF8] text-[#14181F]">
        <header className="bg-white border-b border-[#E4E2DC] sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-[6px] bg-[#2B3A67] flex items-center justify-center text-white text-sm font-semibold">
                E
              </div>
              <span className="text-[17px] font-semibold tracking-tight">
                1Fi-intern-assesement
              </span>
            </Link>
            <nav className="hidden sm:flex items-center gap-8 text-[14px] font-medium text-[#5B6270]">
              <Link to="/" className="hover:text-[#14181F] transition-colors">
                Shop
              </Link>
              <span className="text-[#5B6270]">EMI Plans</span>
              <span className="text-[#5B6270]">Support</span>
            </nav>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;