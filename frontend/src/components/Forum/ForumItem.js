import classes from "./ForumItem.module.scss";

const ForumItem = (props) => {
  return (
    <div className={classes.forumitem}>
      <div className={classes["author-section"]}>
        <div className={classes["author-image"]}>
          <img src={require("../../assets/images/profile.jpg")} alt={""} />
        </div>
        <div className={classes.authordate}>
          <h4>{props.author}</h4>
          <p>Dec 2020</p>
        </div>
      </div>
      <p>{props.post.substring(0, 1000)}</p>
    </div>
  );
};

export default ForumItem;
