import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import SmoothScroll from "./components/hi/home/SmoothScroll";
import Navbar from "./components/hi/Navbar";
import Footer from "./components/hi/Footer";
import { CartProvider } from "./contexts/CartContext";
import Home from "./pages/hi/Home";
import Catalog from "./pages/hi/Catalog";
import ProductDetail from "./pages/hi/ProductDetail";
import Cart from "./pages/hi/Cart";
import Checkout from "./pages/hi/Checkout";
import Amenagement from "./pages/hi/Amenagement";
import Contact from "./pages/hi/Contact";
import About from "./pages/hi/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner theme="dark" />
      <BrowserRouter>
        <SmoothScroll>
          <CartProvider>
            <ScrollToTop />
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/collection/:slug" element={<Catalog />} />
                <Route path="/produit/:slug" element={<ProductDetail />} />
                <Route path="/panier" element={<Cart />} />
                <Route path="/commande" element={<Checkout />} />
                <Route path="/amenagement" element={<Amenagement />} />
                <Route path="/a-propos" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </CartProvider>
        </SmoothScroll>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
