import React from "react";

import MainHeader from "./MainHeader";
import Footer from "./Footer";

const Layout = (props) => {
  return (
    <React.Fragment>
      <MainHeader />
      <main>{props.children}</main>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
