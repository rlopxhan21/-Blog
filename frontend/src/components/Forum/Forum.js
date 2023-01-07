import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import classes from "./Forum.module.scss";

import { dataActions } from "../../store/data";
import ForumItem from "./ForumItem";
import RoomItem from "./RoomItem";
import ForumInput from "./ForumInput";
import Modal from "../UI/Modal";
import RoomInput from "./RoomInput";

const Forum = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [roomForm, setRoomForm] = useState(false);

  const POST_DATA = useSelector((state) => state.data.post_data);
  const ROOM_DATA = useSelector((state) => state.data.room_data);
  const COMMENT_DATA = useSelector((state) => state.data.comment_data);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  let content = "";

  if (POST_DATA.length === 0) {
    content = <p className={classes.nodata}>No Post Found!</p>;
  }

  const onCreateRoomHandler = () => {
    setRoomForm(true);
  };

  const onCloseHandler = () => {
    setRoomForm(false);
  };

  const onAllClickHandler = () => {
    const receiveRoomPost = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: "http://127.0.0.1:8000/forum/post/",
          headers: {
            "Content-Type": "Application/json",
          },
        });

        dispatch(dataActions.updatePost({ post_data: response.data }));
      } catch (error) {}
    };

    receiveRoomPost();
  };

  console.log(POST_DATA);

  return (
    <div className={classes.forum}>
      {roomForm && (
        <Modal onClose={onCloseHandler}>
          <RoomInput />
        </Modal>
      )}
      <div className={classes.container}>
        <div className={classes.left}>
          <h3>Available Rooms</h3>
          <button>
            Rooms
            <i className="fa-solid fa-angles-down"></i>
          </button>

          <div>
            {isLoggedIn && (
              <div onClick={onCreateRoomHandler}>
                <RoomItem room="Create Room" />
              </div>
            )}
            <div onClick={onAllClickHandler}>
              <RoomItem room="All" />
            </div>
            {ROOM_DATA.map((item) => (
              <RoomItem
                key={item.id}
                pk={item.id}
                room={item.name}
                room_post={item.room_post}
              />
            ))}
          </div>
        </div>

        <div className={classes.middle}>
          {isLoggedIn && <ForumInput />}

          {content}

          {POST_DATA.map((item) => (
            <ForumItem
              key={item.id}
              pk={item.id}
              author={item.author}
              fname={item.author_fname}
              lname={item.author_lname}
              published_date={item.updated}
              post={item.content}
              upvote_number={item.upvoted_post.length}
              downvote_number={item.downvoted_post.length}
              comment_number={item.post_comment.length}
            />
          ))}
        </div>

        <div className={classes.right}>
          <h3>Recent Activities</h3>
          {COMMENT_DATA.map((item) => (
            <Link to={`${item.post_id}`}>
              <div>
                <Link to="/userprofile">
                  <span>@{item.author.substring(0, 20)}</span>
                </Link>{" "}
                commented on{" "}
                <Link to="/userprofile">
                  <span>@{item.post_author.substring(0, 20)}'s</span>
                </Link>{" "}
                post at {moment(new Date(item.updated)).fromNow()}
                <p className={classes.commentcontent}>
                  "{item.content.substring(0, 50)}"
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Forum;
