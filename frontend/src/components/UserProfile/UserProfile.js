import { useState } from "react";
import { useSelector } from "react-redux";

import classes from "./UserProfile.module.scss";

import NoBlogFound from "../UI/NoBlogFound";
import UserProfileForm from "./UserProfileForm";

const UserProfile = () => {
  const PROFILE_DATA = useSelector((state) => state.data.profile_data);
  const userInfo = useSelector((state) => state.auth.userInfo);

  const userId = userInfo ? userInfo.user_id : "";
  const ownerStatus = userId === PROFILE_DATA.id;

  const [editForm, setEditForm] = useState(false);

  const onEditHandler = () => {
    setEditForm(true);
  };

  const onCloseHandler = () => {
    setEditForm(false);
  };

  if (PROFILE_DATA.length === 0) {
    return <NoBlogFound>No User Found!</NoBlogFound>;
  }

  return (
    <div className={classes.userprofile}>
      <div className={classes.container}>
        {editForm && <UserProfileForm onCloseHandler={onCloseHandler} />}
        <div className={classes.profileimage}>
          <img src={PROFILE_DATA.image} alt={""} />
        </div>

        <div className={classes.authortop}>
          <div className={classes.primaryfield}>
            <h3>First Name</h3>
            <div className={classes.fieldvalue}>
              <p>{PROFILE_DATA.first_name}</p>
            </div>
          </div>
          <hr />

          <div className={classes.primaryfield}>
            <h3>Last Name</h3>
            <div className={classes.fieldvalue}>
              <p>{PROFILE_DATA.last_name}</p>
            </div>
          </div>
          <hr />

          <div className={classes.primaryfield}>
            <h3>Username</h3>
            <div className={classes.fieldvalue}>
              <p>{PROFILE_DATA.username}</p>
            </div>
          </div>
          <hr />

          <div className={classes.primaryfield}>
            <h3>Email</h3>
            <div className={classes.fieldvalue}>
              <p>{PROFILE_DATA.email}</p>
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
        {ownerStatus && (
          <p className={classes.editlink} onClick={onEditHandler}>
            Edit Profile
          </p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
