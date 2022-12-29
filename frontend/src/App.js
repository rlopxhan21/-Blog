import React from "react";

import { Route, Routes, Navigate } from "react-router-dom";

import Layout from "./components/Layout/Layout";

import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import ForumPage from "./pages/ForumPage";
import AboutUsPage from "./pages/AboutUs";
import ContactUsPage from "./pages/ContactUs";
import Register from "./pages/Register";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/contactus" element={<ContactUsPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Layout>
  );
}

export default App;
