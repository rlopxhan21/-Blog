import React from "react";

import Login from "../components/Registration/Login";
import Signup from "../components/Registration/Signup";

import { useSelector, useDispatch } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();

  const yesLoginForm = useSelector((state) => state.auth.loginForm);
  return (
    <React.Fragment>
      {yesLoginForm && <Login />}
      {!yesLoginForm && <Signup />}
    </React.Fragment>
  );
};

export default Register;
