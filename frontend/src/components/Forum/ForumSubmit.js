import classes from "./ForumSubmit.module.scss";

const ForumSubmit = () => {
  return (
    <div className={classes.forumsubmit}>
      <div className={classes.container}>
        <form>
          <input type="text" placeholder="Text" />
        </form>
      </div>
    </div>
  );
};

export default ForumSubmit;
