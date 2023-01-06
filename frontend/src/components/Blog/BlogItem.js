import { Link } from "react-router-dom";
import moment from "moment";

import classes from "./BlogItem.module.scss";

const BlogItem = (props) => {
  const dateTimeAgo = moment(new Date(props.published_date)).fromNow();

  return (
    <div className={classes.blogitem}>
      <article>
        <div className={classes.left}>
          <Link to="/" className={classes.area}>
            <p>{props.area}</p>
          </Link>
          <Link to={`/blog/${props.pk}`}>
            <h3>{props.topic.substring(0, 75)}</h3>
          </Link>
          <div className={classes["author-section"]}>
            <div>
              <Link to="/profile">
                <img
                  src={require("../../assets/images/profile.jpg")}
                  alt={""}
                />
              </Link>
            </div>
            <div>
              <Link to="/" className={classes.authorname}>
                {props.author_fname} {props.author_lname}
              </Link>
              <p>{dateTimeAgo}</p>
            </div>
          </div>
        </div>
        <div className={classes.middle}>
          <Link to={`/blog/${props.pk}`}>
            <p>{props.content.substring(0, 400)}</p>
          </Link>
        </div>
        <div className={classes.right}>
          <img src={require("../../assets/images/profile.jpg")} alt={""} />
        </div>
      </article>

      <hr className={classes.line} />
    </div>
  );
};

export default BlogItem;
