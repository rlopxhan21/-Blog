import classes from "./BlogItem.module.scss";

const BlogItem = (props) => {
  return (
    <div className={classes.blogitem}>
      <article>
        <div className={classes.left}>
          <p>{props.area}</p>
          <h3>{props.topic.substring(0, 75)}</h3>
          <p>{props.author}</p>
          <p>7{props.published_date}</p>
        </div>
        <div className={classes.middle}>
          <p>{props.content.substring(0, 400)}</p>
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
