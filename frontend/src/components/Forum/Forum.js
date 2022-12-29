import React from "react";
import { useSelector } from "react-redux";

import classes from "./Forum.module.scss";

import ForumItem from "./ForumItem";
import RoomItem from "./RoomItem";

const Forum = () => {
  const POST_DATA = useSelector((state) => state.data.post_data);
  const ROOM_DATA = useSelector((state) => state.data.room_data);
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
          {POST_DATA.map((item) => (
            <ForumItem
              key={item.id}
              author_fname={item.author_fname}
              author_lname={item.author_lname}
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
