import { Link } from "react-router-dom";

import classes from "./Login.module.scss";

import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

const Login = () => {
  const dispatch = useDispatch();

  const onLoginHandler = (event) => {
    event.preventDefault();
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
            <label>Email</label>
            <input type="email" required />
          </div>
          <div>
            <label>Password</label>
            <input type="password" required />
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
