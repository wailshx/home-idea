import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import SmoothScroll from "./components/hi/home/SmoothScroll";
import Navbar from "./components/hi/Navbar";
import Footer from "./components/hi/Footer";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import Home from "./pages/hi/Home";
import Catalog from "./pages/hi/Catalog";
import ProductDetail from "./pages/hi/ProductDetail";
import Cart from "./pages/hi/Cart";
import Checkout from "./pages/hi/Checkout";
import Amenagement from "./pages/hi/Amenagement";
import Contact from "./pages/hi/Contact";
import About from "./pages/hi/About";
import Wishlist from "./pages/hi/Wishlist";
import NotFound from "./pages/NotFound";

import AdminLayout from "./components/admin-hi/AdminLayout";
import AdminDashboard from "./pages/admin-hi/Dashboard";
import AdminProducts from "./pages/admin-hi/Products";
import AdminOrders from "./pages/admin-hi/Orders";
import AdminCustomers from "./pages/admin-hi/Customers";
import AdminProjects from "./pages/admin-hi/Projects";
import AdminAppointments from "./pages/admin-hi/Appointments";
import AdminInventory from "./pages/admin-hi/Inventory";
import AdminAnalytics from "./pages/admin-hi/Analytics";
import AdminCMS from "./pages/admin-hi/CMS";
import AdminRoles from "./pages/admin-hi/Roles";
import AdminPermissions from "./pages/admin-hi/Permissions";

const queryClient = new QueryClient();

const SiteLayout = () => (
  <>
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner theme="dark" />
      <BrowserRouter>
        <SmoothScroll>
          <CartProvider>
            <WishlistProvider>
              <ScrollToTop />
              <Routes>
                <Route path="/admin/*" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="produits" element={<AdminProducts />} />
                  <Route path="commandes" element={<AdminOrders />} />
                  <Route path="clients" element={<AdminCustomers />} />
                  <Route path="projets" element={<AdminProjects />} />
                  <Route path="rendez-vous" element={<AdminAppointments />} />
                  <Route path="inventaire" element={<AdminInventory />} />
                  <Route path="analytics" element={<AdminAnalytics />} />
                  <Route path="cms" element={<AdminCMS />} />
                  <Route path="roles" element={<AdminRoles />} />
                  <Route path="permissions" element={<AdminPermissions />} />
                </Route>
                <Route element={<SiteLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/collection" element={<Catalog />} />
                  <Route path="/collection/:slug" element={<Catalog />} />
                  <Route path="/produit/:slug" element={<ProductDetail />} />
                  <Route path="/liste-de-souhaits" element={<Wishlist />} />
                  <Route path="/panier" element={<Cart />} />
                  <Route path="/commande" element={<Checkout />} />
                  <Route path="/amenagement" element={<Amenagement />} />
                  <Route path="/a-propos" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </WishlistProvider>
          </CartProvider>
        </SmoothScroll>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
