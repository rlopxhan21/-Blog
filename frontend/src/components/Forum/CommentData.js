import classes from "./CommentData.module.scss";
import moment from "moment";

const CommentData = (props) => {
  const dateTimeAgo = moment(new Date(props.published_date)).fromNow();

  return (
    <div className={classes.commentdata}>
      <div className={classes.left}>
        <div className={classes.imagesection}>
          <img src={require("../../assets/images/profile.jpg")} alt={""} />
        </div>
        <div classname={classes.authorsection}>
          <p className={classes.name}>
            {props.fname} {props.lname}
          </p>
          <p>{dateTimeAgo}</p>
        </div>
      </div>

      <div className={classes.content}>{props.content}</div>
    </div>
  );
};

export default CommentData;
