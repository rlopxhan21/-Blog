import { Link } from "react-router-dom";

import classes from "./ForumInput.module.scss";

const ForumInput = () => {
  return (
    <div className={classes.foruminput}>
      <div className={classes.container}>
        <div>
          <Link to="/">
            <img src={require("../../assets/images/profile.jpg")} alt={""} />
          </Link>
        </div>
        <Link to="/forum/submit" className={classes.createpost}>
          <button>Create Post</button>
        </Link>
      </div>
    </div>
  );
};

export default ForumInput;
