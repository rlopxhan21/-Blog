import React, { useCallback, useEffect } from "react";

import classes from "./Forum.module.scss";

import ForumItem from "./ForumItem";
import RoomItem from "./RoomItem";

const DUMMY_DATA = [
  {
    id: "p1",
    author: "R Lopxhan",
    post: "Lets talk about React!",
  },
  {
    id: "p2",
    author: "R Lopxhan",
    post: "Lets talk about React!",
  },
  {
    id: "p3",
    author: "R Lopxhan",
    post: "Lets talk about React!",
  },
  {
    id: "p4",
    author: "R Lopxhan",
    post: "Lets talk about React!",
  },
  {
    id: "p5",
    author: "R Lopxhan",
    post: "According to numbers from Statista, the company began the pandemic with approximately 840,000 employees in the first quarter of 2020. By Q1 2022, it had over 1.6 million workers. The problem was, as the pandemic loosened its grip on public life, people stopped buying everything online and returned to brick-and-mortar retail.",
  },
];

const ROOM_DATA = [
  { id: "r7", room: "Create Room" },
  { id: "r1", room: "Python" },
  { id: "r2", room: "Javascript" },
  { id: "r3", room: "Java" },
  { id: "r4", room: "C" },
  { id: "r5", room: "C++" },
  { id: "r6", room: "C#" },
];

const Forum = () => {
  const fetchForumData = useCallback(async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/forum/post", {
        method: "GET",
        // headers: {
        //   "Access-Control-Allow-Origin": "Origin-List",
        // },
      });

      if (!response.ok) {
        throw new Error(response.json().error);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchForumData();
  }, [fetchForumData]);

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
              <RoomItem key={item.id} room={item.room} />
            ))}
          </div>
        </div>
        <div>
          {DUMMY_DATA.map((item) => (
            <ForumItem key={item.id} author={item.author} post={item.post} />
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
