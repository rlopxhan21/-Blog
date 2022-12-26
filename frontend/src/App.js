import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";

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
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home"></Redirect>
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/blog">
          <BlogPage />
        </Route>
        <Route path="/forum">
          <ForumPage />
        </Route>
        <Route path="/aboutus">
          <AboutUsPage />
        </Route>
        <Route path="/contactus">
          <ContactUsPage />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
