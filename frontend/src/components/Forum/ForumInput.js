import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { dataActions } from "../../store/data";

import classes from "./ForumInput.module.scss";

const ForumInput = () => {
  const dispatch = useDispatch();

  const [emptyMessage, setEmptyMessage] = useState();
  const [isFormOn, setIsFormOn] = useState(false);

  const navigate = useNavigate();

  const Token = useSelector((state) => state.auth.authTokens);
  const accessToken = Token.access;

  const ROOM_DATA = useSelector((state) => state.data.room_data);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userInfo = useSelector((state) => state.auth.userInfo);

  const getPostData = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:8000/forum/post/",
        headers: {},
        data: {},
      });

      dispatch(
        dataActions.updatePost({
          post_data: response.data,
        })
      );
    } catch (error) {}
  };

  const getRoomData = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:8000/forum/room/",
        headers: {},
        data: {},
      });

      dispatch(
        dataActions.updateRoom({
          room_data: response.data,
        })
      );
    } catch (error) {}
  };

  const getCommentData = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:8000/forum/post/comment/",
        headers: {},
        data: {},
      });

      dispatch(dataActions.updateComment(response.data));
    } catch (error) {}
  };

  const onFormClickHandler = () => {
    setIsFormOn((prevState) => !prevState);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const enteredPost = event.target.post.value;
    const enteredRoom = event.target.room.value;

    if (enteredPost.length === 0 || enteredRoom.length === 0) {
      setEmptyMessage(
        <p className={classes.errormessage}>
          Something went wrong. Please try again!
        </p>
      );
    } else {
      navigate("/userprofile");
      const sendPostData = async () => {
        try {
          await axios({
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
          navigate("/forum");
        } catch (error) {
          alert(error);
        }
      };
      sendPostData();
      getPostData();
      getRoomData();
      getCommentData();
      setIsFormOn(false);
      setEmptyMessage();
    }
  };

  const onCancelHandler = (event) => {
    event.preventDefault();
    setIsFormOn(false);
    setEmptyMessage();
  };

  console.log(ROOM_DATA);

  return (
    <div>
      {isLoggedIn && (
        <div>
          {!isFormOn && (
            <div className={classes.formInput} onClick={onFormClickHandler}>
              <h3>
                Hey {userInfo.fname} {userInfo.lname}, what do you want to ask
                or share? click here...
              </h3>
            </div>
          )}

          {isFormOn && (
            <div className={classes.forumsubmit}>
              <div className={classes.container}>
                <form onSubmit={onSubmitHandler} className={classes.roomform}>
                  <div className={classes.formdiv}>
                    {ROOM_DATA.map((item) => (
                      <div>
                        <input
                          id={`${item.name}`}
                          className={classes.selectroom}
                          name="room"
                          type="radio"
                          value={item.id}
                        />
                        <label
                          htmlFor={`${item.name}`}
                          className={classes.roomlabel}
                        >
                          {item.name}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className={classes.textarea}>
                    <textarea
                      type="text"
                      placeholder="What do you want to ask
                      or share?"
                      name="post"
                      className={classes.postinput}
                    />
                  </div>
                  {emptyMessage}
                  <div className={classes.button}>
                    <button
                      onClick={onCancelHandler}
                      className={`${classes.postbutton} ${classes.submitbutton}`}
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
          )}
        </div>
      )}
    </div>
  );
};

export default ForumInput;
