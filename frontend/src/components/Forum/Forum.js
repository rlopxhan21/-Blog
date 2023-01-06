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

  // const dateTimeAgo = moment(new Date(published_date)).fromNow();

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
            {ROOM_DATA.map((item) => (
              <RoomItem key={item.id} room={item.name} />
            ))}
          </div>
        </div>
        <div>
          {isLoggedIn && <ForumInput />}

          {POST_DATA.map((item) => (
            <ForumItem
              key={item.id}
              pk={item.id}
              author_fname={item.author_fname}
              author_lname={item.author_lname}
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
                <span>
                  {item.author_fname} {item.author_lname}
                </span>{" "}
                commented on <span>{item.content.substring(0, 30)}</span>
                <p>{moment(new Date(item.updated)).fromNow()}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Forum;
