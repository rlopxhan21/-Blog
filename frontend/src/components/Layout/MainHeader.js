import React from "react";

import { NavLink, Link } from "react-router-dom";

import classes from "./MainHeader.module.scss";

const MainHeader = () => {
  return (
    <nav className={classes.nav}>
      <div className={classes.container}>
        <div className={classes.left}>
          <div className={classes.brandname}>
            <Link to="/home">
              &#62; $ cd /home/rlopxhan21
              <span className={classes.blinksquare}></span>
            </Link>
          </div>
          <div className={classes.navlink}>
            <ul>
              <li>
                <NavLink
                  className={(navData) =>
                    navData.isActive ? classes.active : ""
                  }
                  to="home"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={(navData) =>
                    navData.isActive ? classes.active : ""
                  }
                  to="/blog"
                >
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={(navData) =>
                    navData.isActive ? classes.active : ""
                  }
                  to="/forum"
                >
                  Forum
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={(navData) =>
                    navData.isActive ? classes.active : ""
                  }
                  to="/aboutus"
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={(navData) =>
                    navData.isActive ? classes.active : ""
                  }
                  to="/contactus"
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className={classes.right}>
          <Link to="/register" replace>
            Login/ Sign Up
          </Link>
        </div>
        <div className={classes.bars}>
          <i className="fa-solid fa-bars"></i>
          {false && <i className="fa-solid fa-xmark"></i>}
        </div>
      </div>
    </nav>
  );
};

export default MainHeader;
