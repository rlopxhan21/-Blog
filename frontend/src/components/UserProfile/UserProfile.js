import { useState } from "react";

import classes from "./UserProfile.module.scss";

import Modal from "../UI/Modal";

const UserProfile = () => {
  const [picForm, setPicForm] = useState(false);

  const onChangeProfilePicHandler = () => {
    setPicForm(true);
  };

  const onCloseHandler = () => {
    setPicForm(false);
  };

  return (
    <div className={classes.userprofile}>
      <div className={classes.container}>
        {picForm && (
          <Modal onClose={onCloseHandler}>
            <form
              className={classes.picform}
              accept-charset="utf-8"
              enctype="multipart/form-data"
            >
              <div>
                <label htmlFor="upload"> Upload your image file here:</label>
                <input id="upload" type="file" name="upload"></input>
              </div>
              <button type="submit">Submit</button>
            </form>
          </Modal>
        )}
        <div className={classes.profileimage}>
          <img src={require("../../assets/images/profile.jpg")} alt={""} />
        </div>

        <p
          className={classes.changepiclink}
          onClick={onChangeProfilePicHandler}
        >
          Change Profile Image
        </p>

        <div className={classes.authortop}>
          <div className={classes.primaryfield}>
            <h3>First Name</h3>
            <div className={classes.fieldvalue}>
              <p>Ronish</p>
            </div>
          </div>
          <hr />

          <div className={classes.primaryfield}>
            <h3>Last Name</h3>
            <div className={classes.fieldvalue}>
              <p>Lopxhan</p>
            </div>
          </div>
          <hr />

          <div className={classes.primaryfield}>
            <h3>Username</h3>
            <div className={classes.fieldvalue}>
              <p>@rlopxhan21</p>
            </div>
          </div>
          <hr />

          <div className={classes.primaryfield}>
            <h3>Email</h3>
            <div className={classes.fieldvalue}>
              <p>rlopxhan21@gmail.com</p>
            </div>
          </div>
          <hr />

          <div className={classes.primaryfield}>
            <h3>Password</h3>
            <div className={classes.fieldvalue}>
              <p>***************</p>
            </div>
          </div>
          <hr />
        </div>
        <div className={classes.authorbelow}></div>
        <p className={classes.editlink}>Edit Profile</p>
      </div>
    </div>
  );
};

export default UserProfile;
