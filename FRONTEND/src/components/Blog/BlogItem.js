import { Link } from "react-router-dom";

import classes from "./BlogItem.module.scss";

const BlogItem = (props) => {
  return (
    <div className={classes.blogitem}>
      <article>
        <div className={classes.left}>
          <Link to="/" className={classes.area}>
            <p>{props.area}</p>
          </Link>
          <Link to="/">
            <h3>{props.topic.substring(0, 75)}</h3>
          </Link>
          <div className={classes["author-section"]}>
            <div>
              <img src={require("../../assets/images/profile.jpg")} alt={""} />
            </div>
            <div>
              <Link to="/" className={classes.authorname}>
                {props.author}
              </Link>
              <p>7{props.published_date}</p>
            </div>
          </div>
        </div>
        <div className={classes.middle}>
          <Link to="/">
            <p>{props.content.substring(0, 400)}</p>
          </Link>
        </div>
        <div className={classes.right}>
          <img src={require("../../assets/images/profile.jpg")} alt={""} />
        </div>
      </article>
      <div className={classes["post-review"]}>
        <button>Upvote</button>
        <button>Downvote</button>
        <button>Comment</button>
        <button>Share</button>
      </div>
    </div>
  );
};

export default BlogItem;
