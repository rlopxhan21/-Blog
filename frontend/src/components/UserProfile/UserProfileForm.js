import axios from "axios";
import { useSelector } from "react-redux";

import classes from "./UserProfileForm.module.scss";

import Modal from "../UI/Modal";

const UserProfileForm = (props) => {
  const PROFILE_DATA = useSelector((state) => state.data.profile_data);
  const authTokens = useSelector((state) => state.auth.authTokens);

  const fname_value = PROFILE_DATA.first_name;
  const lname_value = PROFILE_DATA.last_name;
  const uname_value = PROFILE_DATA.username;
  const email_value = PROFILE_DATA.email;

  const accessToken = authTokens ? authTokens.access : "";

  const onEditFormHandler = (event) => {
    event.preventDefault();

    // const receivedImage = event.target.upload.value;
    const enteredfname = event.target.fname.value;
    const enteredlname = event.target.lname.value;
    const enteredemail = event.target.email.value;
    const entereduname = event.target.uname.value;

    const sendProfileReq = async () => {
      try {
        await axios({
          method: "PUT",
          url: `http://127.0.0.1:8000/api/userprofile/${PROFILE_DATA.id}/`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          data: {
            id: PROFILE_DATA.id,
            password: PROFILE_DATA.password,
            last_login: PROFILE_DATA.last_login,
            is_superuser: PROFILE_DATA.is_superuser,
            username: entereduname,
            first_name: enteredfname,
            last_name: enteredlname,
            email: enteredemail,
            is_staff: PROFILE_DATA.is_staff,
            is_active: PROFILE_DATA.is_active,
            date_joined: PROFILE_DATA.date_joined,
            groups: PROFILE_DATA.groups,
            user_permissions: PROFILE_DATA.user_permissions,
          },
        });
      } catch (error) {
        alert(error);
      }
    };

    sendProfileReq();
    props.onCloseHandler();
  };
  return (
    <Modal onClose={props.onCloseHandler}>
      <div className={classes.login}>
        <div className={classes.container}>
          <h1>Edit Profile</h1>
          <form action="" onSubmit={onEditFormHandler}>
            <div className={classes.name}>
              <div>
                <label>First Name</label>
                <input type="text" name="fname" placeholder={fname_value} />
              </div>
              <div>
                <label>Last Name</label>
                <input type="text" name="lname" placeholder={lname_value} />
              </div>
            </div>
            <div>
              <label>Email</label>
              <input type="email" name="email" placeholder={email_value} />
            </div>
            <div>
              <label>Username</label>
              <input type="text" name="uname" placeholder={uname_value} />
            </div>

            <div className={classes.image}>
              <label>Change Profile Image</label>
              <input type="upload" name="image" />
            </div>
            <button type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default UserProfileForm;
