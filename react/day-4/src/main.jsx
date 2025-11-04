import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import "./index.css";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import Layout from "./Layout";
import Category from "./pages/Category";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/category/:slug" element={<Category />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);
