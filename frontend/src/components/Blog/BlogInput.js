import { Link } from "react-router-dom";

import classes from "./BlogInput.module.scss";

const BlogInput = () => {
  return (
    <div className={classes.foruminput}>
      <div className={classes.container}>
        <div>
          <Link to="/">
            <img src={require("../../assets/images/profile.jpg")} alt={""} />
          </Link>
        </div>
        <Link to="/blog/submit" className={classes.createpost}>
          <button>Create Post</button>
        </Link>
      </div>
    </div>
  );
};

export default BlogInput;
