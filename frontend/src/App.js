import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

import Layout from "./components/Layout/Layout";

import { authActions } from "./store/auth";
import { dataActions } from "./store/data";

import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import ForumPage from "./pages/ForumPage";
import AboutUsPage from "./pages/AboutUs";
import ContactUsPage from "./pages/ContactUs";
import Register from "./pages/Register";
import BlogDetail from "./pages/BlogDetail";
import ForumDetail from "./pages/ForumDetail";
import BlogSubmitPage from "./pages/BlogSubmitPage";
import UserProfilePage from "./pages/UserProfilePage";

function App() {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.authTokens);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [loading, setLoading] = useState(true);

  const getRoomData = useCallback(async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:8000/forum/room/",
        headers: {},
        data: {},
      });

      dispatch(
        dataActions.updateRoom({
          room_data: response.data,
        })
      );
    } catch (error) {}
  }, [dispatch]);

  const getBlogRoomData = useCallback(async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:8000/blog/blogroom/",
        headers: {},
        data: {},
      });

      dispatch(
        dataActions.updateBlogRoom({
          blogroom_data: response.data,
        })
      );
    } catch (error) {}
  }, [dispatch]);

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

      dispatch(
        authActions.loginUserHandler({
          token: response.data,
          access: jwt_decode(response.data.access),
        })
      );
    } catch (error) {
      dispatch(authActions.logoutUserHandler());
    }
  }, [dispatch, authToken]);

  useEffect(() => {
    const fourminutes = 1000 * 60 * 4;

    if (loading) {
      updatedToken();
      getRoomData();
      getBlogRoomData();
    }
    setLoading(false);

    const interval = setInterval(() => {
      if (authToken) {
        updatedToken();
      }
    }, fourminutes);

    return () => clearInterval(interval);
  }, [authToken, loading, updatedToken, getBlogRoomData, getRoomData]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="blog/:blogid" element={<BlogDetail />} />
        {isLoggedIn && (
          <Route path="/blog/submit" element={<BlogSubmitPage />} />
        )}
        <Route path="/forum" element={<ForumPage />} />
        <Route path="forum/:forumid" element={<ForumDetail />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/contactus" element={<ContactUsPage />} />
        {!isLoggedIn && <Route path="/register" element={<Register />} />}
        <Route path="/profiles" element={<UserProfilePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
