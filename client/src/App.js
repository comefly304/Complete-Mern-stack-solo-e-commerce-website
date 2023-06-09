import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import Register from "./components/Layout/Auth/Register";
import Pagenotfound from "./pages/Pagenotfound";
import Login from "./components/Layout/Auth/Login";
import PrivateRoute from "./pages/Routes/PrivateRoute";
import Dashboard from "./pages/user/Dashboard";
import Forgotpassword from "./components/Layout/Auth/Forgotpassword";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminPrivateRoute from "./pages/Admin/Private";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Seacrhpage from "./pages/Seacrhpage";
import ProductDetails from "./pages/ProductDetails";
import Category from "./pages/Category";
import CategoryProduct from "./pages/CategoryProducts";
import CartPage from "./pages/CartPage";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/productdetails/:slug" element={<ProductDetails />} />
        <Route path="/search" element={<Seacrhpage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders/>}/>
        </Route>
        <Route path="/dashboard" element={<AdminPrivateRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/orders" element={<Orders />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
};

export default App;
