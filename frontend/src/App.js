import React from "react";

import { Route, Switch } from "react-router-dom";

import Layout from "./components/Layout/Layout";

import HomePage from "./pages/HomePage";
import BlogPage from "./pages/Blog";
import ForumPage from "./pages/Forum";
import AboutUsPage from "./pages/AboutUs";
import ContactUsPage from "./pages/ContactUs";
import Register from "./pages/Register";

function App() {
  return (
    <Layout>
      <Switch>
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
