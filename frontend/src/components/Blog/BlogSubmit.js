import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import classes from "./BlogSubmit.module.scss";

const BlogSubmit = () => {
  const navigate = useNavigate();

  const Token = useSelector((state) => state.auth.authTokens);
  const accessToken = Token.access;

  const BLOGROOM_DATA = useSelector((state) => state.data.blogroom_data);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const enteredBlog = event.target.post.value;
    const enteredBlogRoom = event.target.room.value;
    const enteredTitle = event.target.blogtitle.value;

    const sendPostData = async () => {
      try {
        const response = await axios({
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

        console.log(response.data);

        navigate("/blog");
      } catch (error) {
        alert(error);
      }
    };

    sendPostData();
  };

  return (
    <div className={classes.forumsubmit}>
      <div className={classes.container}>
        <form onSubmit={onSubmitHandler} className={classes.roomform}>
          <div className={classes.dropdown}>
            <fieldset className="language">
              {BLOGROOM_DATA.map((item) => (
                <div key={item.id}>
                  <input name="room" type="radio" value={item.id} />
                  <label>{item.name}</label>
                </div>
              ))}
            </fieldset>
          </div>
          <div className={classes.blogtitle}>
            <input type="text" name="blogtitle" />
          </div>
          <div className={classes.textarea}>
            <textarea
              type="text"
              placeholder="Starting Writing Here"
              name="post"
              className={classes.postinput}
            />
          </div>
          <div className={classes.button}>
            <button
              type="cancel"
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
