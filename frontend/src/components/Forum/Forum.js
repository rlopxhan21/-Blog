import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import classes from "./Forum.module.scss";

import ForumItem from "./ForumItem";
import RoomItem from "./RoomItem";
import NoBlogFound from "../UI/NoBlogFound";
import ForumInput from "./ForumInput";

const Forum = () => {
  const POST_DATA = useSelector((state) => state.data.post_data);
  const ROOM_DATA = useSelector((state) => state.data.room_data);
  const COMMENT_DATA = useSelector((state) => state.data.comment_data);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (POST_DATA.length === 0) {
    return <NoBlogFound>No Post Available.</NoBlogFound>;
  }

  return (
    <div className={classes.forum}>
      <div className={classes.container}>
        <div className={classes.left}>
          <h3>Available Rooms</h3>
          <button>
            Rooms
            <i className="fa-solid fa-angles-down"></i>
          </button>

          <div>
            <RoomItem room="All" />
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
        <div>
          {isLoggedIn && <ForumInput />}

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
                <span>@{item.author.substring(0, 20)}</span> commented on{" "}
                <span>@{item.post_author.substring(0, 20)}'s</span> post at{" "}
                <span>{moment(new Date(item.updated)).fromNow()}</span>
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
