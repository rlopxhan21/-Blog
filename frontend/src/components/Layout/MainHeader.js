import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { NavLink, Link } from "react-router-dom";

import classes from "./MainHeader.module.scss";
import { authActions } from "../../store/auth";

const MainHeader = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [toggleBar, setToggleBar] = useState(true);

  const onToggleHandler = () => {
    setToggleBar((prevState) => !prevState);
  };

  const onLogoutHandler = () => {
    dispatch(authActions.logoutUserHandler());
  };

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
        </div>
        <div className={classes.right}>
          <div
            className={`${classes.navlink} ${
              toggleBar ? `${classes.navshow}` : ""
            }`}
          >
            <ul onClick={onToggleHandler}>
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
          <div
            className={`${classes.navlink} ${
              toggleBar ? `${classes.navshow}` : ""
            }`}
          >
            {isLoggedIn && (
              <Link to="/profile" replace>
                {userInfo.fname} {userInfo.lname}
              </Link>
            )}
            {isLoggedIn && <p onClick={onLogoutHandler}>Logout</p>}
            {!isLoggedIn && (
              <Link to="/register" replace>
                Login/ Sign Up
              </Link>
            )}
          </div>
        </div>
        <div className={classes.bars}>
          {toggleBar && (
            <i className="fa-solid fa-bars" onClick={onToggleHandler}></i>
          )}
          {!toggleBar && (
            <i className="fa-solid fa-times" onClick={onToggleHandler}></i>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainHeader;
