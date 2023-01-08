import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import classes from "./BlogSubmit.module.scss";

const BlogSubmit = () => {
  const [erorrContent, setErrorContent] = useState("");
  const navigate = useNavigate();

  const Token = useSelector((state) => state.auth.authTokens);
  const accessToken = Token.access;

  const BLOGROOM_DATA = useSelector((state) => state.data.blogroom_data);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const enteredBlog = event.target.post.value;
    const enteredBlogRoom = event.target.room.value;
    const enteredTitle = event.target.blogtitle.value;

    if (
      enteredBlog.length === 0 ||
      enteredBlogRoom.length === 0 ||
      enteredTitle.length === 0
    ) {
      setErrorContent(
        <p className={classes.errorcontent}>
          Something went wrong. Please try again!
        </p>
      );
    } else {
      const sendPostData = async () => {
        try {
          await axios({
            method: "POST",
            url: "http://127.0.0.1:8000/blog/blog/",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            data: {
              title: enteredTitle,
              content: enteredBlog,
              blogroom: enteredBlogRoom,
            },
          });

          navigate("/blog");
        } catch (error) {
          alert(error);
        }
      };

      sendPostData();
    }
  };

  const onCancelHandler = () => {
    navigate("/blog");
  };

  return (
    <div className={classes.forumsubmit}>
      <div className={classes.container}>
        <form onSubmit={onSubmitHandler} className={classes.roomform}>
          <div className={classes.formdiv}>
            {BLOGROOM_DATA.map((item) => (
              <div>
                <input
                  id={`${item.name}`}
                  className={classes.selectroom}
                  name="room"
                  type="radio"
                  value={item.id}
                />
                <label htmlFor={`${item.name}`} className={classes.roomlabel}>
                  {item.name}
                </label>
              </div>
            ))}
          </div>
          <div className={classes.blogtitle}>
            <input
              type="text"
              name="blogtitle"
              placeholder="Title of the Blog"
              className={classes.inputtitle}
            />
          </div>
          <div className={classes.textarea}>
            <textarea
              type="text"
              placeholder="Starting Writing Content Here"
              name="post"
              className={classes.postinput}
            />
          </div>
          <div className={classes.button}>
            {erorrContent}
            <button
              onClick={onCancelHandler}
              className={`${classes.postbutton} ${classes.cancelbutton}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${classes.postbutton} ${classes.submitbutton}`}
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogSubmit;
