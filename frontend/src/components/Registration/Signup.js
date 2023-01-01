import { Link, useNavigate } from "react-router-dom";

import classes from "./signup.module.scss";

import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import jwt_decode from "jwt-decode";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSignUpHandler = (event) => {
    event.preventDefault();

    const entered_fname = event.target.fname.value;
    const entered_lname = event.target.lname.value;
    const entered_email = event.target.email.value;
    const entered_username = event.target.username.value;
    const entered_password = event.target.password.value;
    const entered_password2 = event.target.password2.value;

    const registerUser = async () => {
      try {
        const response = await axios({
          method: "POST",
          url: "http://127.0.0.1:8000/api/register/",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            first_name: entered_fname,
            last_name: entered_lname,
            username: entered_username,
            email: entered_email,
            password: entered_password,
            password2: entered_password2,
          },
        });

        navigate("/");

        const response1 = await axios({
          method: "POST",
          url: "http://127.0.0.1:8000/api/login/",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            username: entered_username,
            password: entered_password,
          },
        });

        dispatch(
          authActions.loginUserHandler({
            token: response1.data,
            access: jwt_decode(response1.data.access),
          })
        );
      } catch (error) {
        alert(error);
      }
    };

    registerUser();
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
              <input type="text" name="fname" required />
            </div>
            <div>
              <label>Last Name</label>
              <input type="text" name="lname" required />
            </div>
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="email" required />
          </div>
          <div>
            <label>Username</label>
            <input type="text" name="username" required />
          </div>
          <div className={classes.password}>
            <div>
              <label>Password</label>
              <input type="password" name="password" required />
            </div>
            <div>
              <label>Confirm Password</label>
              <input type="password" name="password2" required />
            </div>
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p>
          <Link to="/" className={classes.fpass}>
            Forget password
          </Link>
        </p>
        <p onClick={changeFormHandler}>Already have an account</p>
      </div>
    </div>
  );
};

export default Signup;
