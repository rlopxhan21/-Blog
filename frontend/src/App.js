import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

import Layout from "./components/Layout/Layout";

import { authActions } from "./store/auth";

import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import ForumPage from "./pages/ForumPage";
import AboutUsPage from "./pages/AboutUs";
import ContactUsPage from "./pages/ContactUs";
import Register from "./pages/Register";
import BlogDetail from "./pages/BlogDetail";
import ForumDetail from "./pages/ForumDetail";
import ForumSubmitPage from "./pages/ForumSubmitPage";

function App() {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.authTokens);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [loading, setLoading] = useState(true);

  const updatedToken = useCallback(async () => {
    try {
      const response = await axios({
        method: "POST",
        url: "http://127.0.0.1:8000/api/refresh/",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          refresh: authToken.refresh,
        },
      });

      console.log(authToken.refresh);

      dispatch(
        authActions.loginUserHandler({
          token: response.data,
          access: jwt_decode(response.data.access),
        })
      );
    } catch (error) {
      // dispatch(authActions.logoutUserHandler());
    }
  }, [dispatch, authToken]);

  useEffect(() => {
    const fourminutes = 1000 * 60 * 4;

    if (loading) {
      updatedToken();
    }
    setLoading(false);

    const interval = setInterval(() => {
      if (authToken) {
        updatedToken();
      }
    }, fourminutes);

    return () => clearInterval(interval);
  }, [authToken, loading, updatedToken]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="blog/:blogid" element={<BlogDetail />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="forum/:forumid" element={<ForumDetail />} />
        {isLoggedIn && (
          <Route path="/forum/submit" element={<ForumSubmitPage />} />
        )}
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/contactus" element={<ContactUsPage />} />
        {!isLoggedIn && <Route path="/register" element={<Register />} />}
      </Routes>
    </Layout>
  );
}

export default App;
