import { useState, Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CookieConsent from "./Modules/User/Components/CookieConsent";
import ProtectedRoute from "./Modules/Admin/Layout/ProtectedRoute";
import Layout from "./Modules/Admin/Layout/Layout";

// ✅ Lazy load user pages
const Homepage = lazy(() => import("./Modules/User/Pages/Homepage"));
const AboutUspage = lazy(() => import("./Modules/User/Pages/AboutUspage"));
const Contactpage = lazy(() => import("./Modules/User/Pages/Contactpage"));
const ShopPage = lazy(() => import("./Modules/User/Pages/Shoppage"));
const ProductDetails = lazy(() => import("./Modules/User/Pages/Productdetailpage"));
const Cartpage = lazy(() => import("./Modules/User/Pages/Cartpage"));
const Checkoutpage = lazy(() => import("./Modules/User/Pages/Checkoutpage"));
const CategoryShopPage = lazy(() => import("./Modules/User/Pages/CategoryShopPage"));
const SubcategoryShopPage = lazy(() => import("./Modules/User/Pages/SubcategoryShopPage"));
const Whishlistpage = lazy(() => import("./Modules/User/Pages/Whishlistpage"));
const OrderSuccess = lazy(() => import("./Modules/User/Pages/OrderSuccess"));
const Privacypolicypage = lazy(() => import("./Modules/User/Pages/Privacypolicypage"));
const Terms_and_condtionpage = lazy(() => import("./Modules/User/Pages/Terms_and_condtionpage"));
const RefundPolicypage = lazy(() => import("./Modules/User/Pages/RefundPolicypage"));

// ✅ Lazy load admin pages
const Dashboard = lazy(() => import("./Modules/Admin/Pages/Dashboard"));
const Products = lazy(() => import("./Modules/Admin/Pages/Products"));
const Orders = lazy(() => import("./Modules/Admin/Pages/Orders"));
const ProductAdding = lazy(() => import("./Modules/Admin/Pages/ProductAdding"));
const Adminlogin = lazy(() => import("./Modules/Admin/Pages/Adminlogin"));
const ProductDetail = lazy(() => import("./Modules/Admin/Pages/Productdetail"));
const OrderDetail = lazy(() => import("./Modules/Admin/Pages/Orderdetail"));
const Productedit = lazy(() => import("./Modules/Admin/Pages/Productedit"));
const Category = lazy(() => import("./Modules/Admin/Pages/Category"));
const CategoryEdit = lazy(() => import("./Modules/Admin/Pages/Categoryedit"));
const CategoryAdding = lazy(() => import("./Modules/Admin/Pages/CategoryAdding"));

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <CookieConsent />
      {/* Suspense fallback shown while components load */}
      <Suspense fallback={null}>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/about-us" element={<AboutUspage />} />
          <Route path="/contact" element={<Contactpage />} />
          <Route path="/privacy-policy" element={<Privacypolicypage />} />
          <Route path="/refund-policy" element={<RefundPolicypage />} />
          <Route path="/terms-and-conditions" element={<Terms_and_condtionpage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:categoryName" element={<CategoryShopPage />} />
          <Route path="/shop/:categoryName/:subcategoryName" element={<SubcategoryShopPage />} />
          <Route path="/product/:productName" element={<ProductDetails />} />
          <Route path="/cart" element={<Cartpage />} />
          <Route path="/wishlist" element={<Whishlistpage />} />
          <Route path="/checkout" element={<Checkoutpage />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/admin/login" element={<Adminlogin />} />

          {/* Admin Routes with Layout */}
          <Route path="/admin" element={<Layout />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Navigate to="dashboard" replace />
                </ProtectedRoute>
              }
            />
            <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
            <Route path="category" element={<ProtectedRoute><Category /></ProtectedRoute>} />
            <Route path="addproducts" element={<ProtectedRoute><ProductAdding /></ProtectedRoute>} />
            <Route path="productdetail" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
            <Route path="orderdetail" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
            <Route path="productedit" element={<ProtectedRoute><Productedit /></ProtectedRoute>} />
            <Route path="categoryadd" element={<ProtectedRoute><CategoryAdding /></ProtectedRoute>} />
            <Route path="categoryedit" element={<ProtectedRoute><CategoryEdit /></ProtectedRoute>} />
          </Route>
        </Routes>
      </Suspense>

    </Router>
  );
}

export default App;
