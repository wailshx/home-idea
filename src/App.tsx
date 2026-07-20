import { lazy, Suspense } from "react";
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

const Home = lazy(() => import("./pages/hi/Home"));
const Catalog = lazy(() => import("./pages/hi/Catalog"));
const ProductDetail = lazy(() => import("./pages/hi/ProductDetail"));
const Cart = lazy(() => import("./pages/hi/Cart"));
const Checkout = lazy(() => import("./pages/hi/Checkout"));
const Amenagement = lazy(() => import("./pages/hi/Amenagement"));
const Contact = lazy(() => import("./pages/hi/Contact"));
const About = lazy(() => import("./pages/hi/About"));
const Wishlist = lazy(() => import("./pages/hi/Wishlist"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Configurator = lazy(() => import("./pages/hi/Configurator"));
const ConfigPreview = lazy(() => import("./pages/hi/ConfigPreview"));

const AdminLayout = lazy(() => import("./components/admin-hi/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin-hi/Dashboard"));
const AdminProducts = lazy(() => import("./pages/admin-hi/Products"));
const AdminOrders = lazy(() => import("./pages/admin-hi/Orders"));
const AdminCustomers = lazy(() => import("./pages/admin-hi/Customers"));
const AdminProjects = lazy(() => import("./pages/admin-hi/Projects"));
const AdminAppointments = lazy(() => import("./pages/admin-hi/Appointments"));
const AdminInventory = lazy(() => import("./pages/admin-hi/Inventory"));
const AdminAnalytics = lazy(() => import("./pages/admin-hi/Analytics"));
const AdminCMS = lazy(() => import("./pages/admin-hi/CMS"));
const AdminRoles = lazy(() => import("./pages/admin-hi/Roles"));
const AdminPermissions = lazy(() => import("./pages/admin-hi/Permissions"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen grid place-items-center bg-background">
    <div className="text-center">
      <div className="w-10 h-10 border-2 border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-4" />
      <p className="text-xs tracking-[0.2em] uppercase text-gold/60">Chargement…</p>
    </div>
  </div>
);

const L = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<PageLoader />}>{children}</Suspense>
);

const SiteLayout = () => (
  <SmoothScroll>
    <CartProvider>
      <WishlistProvider>
        <Navbar />
        <main>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
      </WishlistProvider>
    </CartProvider>
  </SmoothScroll>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner theme="dark" />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/admin/*" element={<L><AdminLayout /></L>}>
            <Route index element={<L><AdminDashboard /></L>} />
            <Route path="produits" element={<L><AdminProducts /></L>} />
            <Route path="commandes" element={<L><AdminOrders /></L>} />
            <Route path="clients" element={<L><AdminCustomers /></L>} />
            <Route path="projets" element={<L><AdminProjects /></L>} />
            <Route path="rendez-vous" element={<L><AdminAppointments /></L>} />
            <Route path="inventaire" element={<L><AdminInventory /></L>} />
            <Route path="analytics" element={<L><AdminAnalytics /></L>} />
            <Route path="cms" element={<L><AdminCMS /></L>} />
            <Route path="roles" element={<L><AdminRoles /></L>} />
            <Route path="permissions" element={<L><AdminPermissions /></L>} />
          </Route>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<L><Home /></L>} />
            <Route path="/collection" element={<L><Catalog /></L>} />
            <Route path="/collection/:slug" element={<L><Catalog /></L>} />
            <Route path="/produit/:slug" element={<L><ProductDetail /></L>} />
            <Route path="/liste-de-souhaits" element={<L><Wishlist /></L>} />
            <Route path="/panier" element={<L><Cart /></L>} />
            <Route path="/commande" element={<L><Checkout /></L>} />
            <Route path="/amenagement" element={<L><Amenagement /></L>} />
            <Route path="/a-propos" element={<L><About /></L>} />
            <Route path="/contact" element={<L><Contact /></L>} />
            <Route path="/configurateur" element={<L><Configurator /></L>} />
            <Route path="/configurateur/apercu" element={<L><ConfigPreview /></L>} />
            <Route path="*" element={<L><NotFound /></L>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
