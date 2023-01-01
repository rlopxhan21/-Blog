import React from "react";
import { useSelector } from "react-redux";

import classes from "./Forum.module.scss";

import ForumItem from "./ForumItem";
import RoomItem from "./RoomItem";
import NoBlogFound from "../UI/NoBlogFound";
import ForumInput from "./ForumInput";

const Forum = () => {
  const POST_DATA = useSelector((state) => state.data.post_data);
  const ROOM_DATA = useSelector((state) => state.data.room_data);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (POST_DATA.length === 0) {
    return <NoBlogFound>No Post Available.</NoBlogFound>;
  }

  return (
    <div className={classes.forum}>
      <div className={classes.container}>
        <div className={classes.left}>
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
            />
          ))}
        </div>
        <div className={classes.right}>
          <h3>Recent Activities</h3>
        </div>
      </div>
    </div>
  );
};

export default Forum;
