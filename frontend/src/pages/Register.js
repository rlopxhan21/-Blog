import React from "react";

import Login from "../components/Registration/Login";
import Signup from "../components/Registration/Signup";

import { useSelector } from "react-redux";

const Register = () => {
  const yesLoginForm = useSelector((state) => state.auth.loginForm);
  return (
    <React.Fragment>
      {yesLoginForm && <Login />}
      {!yesLoginForm && <Signup />}
    </React.Fragment>
  );
};

export default Register;
