import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import classes from "./ForumSubmit.module.scss";

const ForumSubmit = () => {
  const navigate = useNavigate();

  const Token = useSelector((state) => state.auth.authTokens);
  const accessToken = Token.access;

  const ROOM_DATA = useSelector((state) => state.data.room_data);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const enteredPost = event.target.post.value;
    const enteredRoom = event.target.room.value;

    const sendPostData = async () => {
      try {
        const response = await axios({
          method: "POST",
          url: "http://127.0.0.1:8000/forum/post/",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          data: {
            content: enteredPost,
            room: [enteredRoom],
          },
        });

        console.log(response.data);

        navigate("/forum");
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
              <legend>Select a Room:</legend>
              {ROOM_DATA.map((item) => (
                <div>
                  <input
                    name="room"
                    type="radio"
                    value={item.id}
                    key={item.id}
                  />
                  <label>{item.name}</label>
                </div>
              ))}
            </fieldset>
          </div>
          <div className={classes.textarea}>
            <textarea
              type="text"
              placeholder="Text"
              name="post"
              className={classes.postinput}
            />
          </div>
          <div className={classes.button}>
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

export default ForumSubmit;
