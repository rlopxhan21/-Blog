import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import classes from "./BlogInput.module.scss";

const BlogInput = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  return (
    <Link to="/blog/submit">
      <div className={classes.formInput}>
        <h3>
          Hey {userInfo.fname} {userInfo.lname}, start writing and share your
          ideas to the world!
        </h3>
        <div>
          <button>Ask Question</button>
          <button>Share Ideas</button>
        </div>
      </div>
    </Link>
  );
};

export default BlogInput;
