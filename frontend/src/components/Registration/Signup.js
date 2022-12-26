import { Link } from "react-router-dom";

import classes from "./signup.module.scss";

import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

const Signup = () => {
  const dispatch = useDispatch();

  const onSignUpHandler = (event) => {
    event.preventDefault();
  };

  const changeFormHandler = () => {
    dispatch(authActions.formChangeHandler());
  };
  return (
    <div className={classes.login}>
      <div className={classes.container}>
        <h1>Sign Up</h1>
        <form method="POST" action="" onSubmit={onSignUpHandler}>
          <div className={classes.name}>
            <div>
              <label>First Name</label>
              <input type="text" required />
            </div>
            <div>
              <label>Last Name</label>
              <input type="text" required />
            </div>
          </div>
          <div>
            <label>Email</label>
            <input type="email" required />
          </div>
          <div>
            <label>Username</label>
            <input type="text" required />
          </div>
          <div className={classes.password}>
            <div>
              <label>Password</label>
              <input type="password" required />
            </div>
            <div>
              <label>Confirm Password</label>
              <input type="password" required />
            </div>
          </div>
          <button type="submit">Login</button>
        </form>
        <p>
          <Link to="/">Forget password</Link>
        </p>
        <p onClick={changeFormHandler}>Already have an account</p>
      </div>
    </div>
  );
};

export default Signup;
