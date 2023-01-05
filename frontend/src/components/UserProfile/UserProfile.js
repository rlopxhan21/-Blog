import classes from "./UserProfile.module.scss";

const UserProfile = () => {
  return (
    <div className={classes.userprofile}>
      <div className={classes.container}>
        <div className={classes.profileimage}>
          <img src={require("../../assets/images/profile.jpg")} alt={""} />
        </div>

        <div className={classes.authortop}></div>
        <div className={classes.authorbelow}></div>
      </div>
    </div>
  );
};

export default UserProfile;
