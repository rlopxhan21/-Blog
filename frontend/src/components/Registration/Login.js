import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

import classes from "./Login.module.scss";

import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onLoginHandler = (event) => {
    event.preventDefault();

    const enteredUsername = event.target.username.value;
    const enteredPassword = event.target.password.value;

    const loginUser = async () => {
      try {
        const response = await axios({
          method: "POST",
          url: "http://127.0.0.1:8000/api/login/",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            username: enteredUsername,
            password: enteredPassword,
          },
        });
        navigate("/home");

        dispatch(
          authActions.loginUserHandler({
            token: response.data,
            access: jwt_decode(response.data.access),
          })
        );
      } catch (error) {
        alert(error);
      }
    };

    loginUser();
  };

  const changeFormHandler = () => {
    dispatch(authActions.formChangeHandler());
  };
  return (
    <div className={classes.login}>
      <div className={classes.container}>
        <h1>Login</h1>
        <form method="POST" action="" onSubmit={onLoginHandler}>
          <div>
            <label>Username</label>
            <input type="text" name="username" required />
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" required />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>
          <Link to="/" className={classes.fpass}>
            Forget password
          </Link>
        </p>
        <p onClick={changeFormHandler}>Create new account</p>
      </div>
    </div>
  );
};

export default Login;
