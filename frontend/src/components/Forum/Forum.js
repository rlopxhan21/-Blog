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
    id: "p1",
    author: "R Lopxhan",
    post: "Lets talk about React!",
  },
  {
    id: "p1",
    author: "R Lopxhan",
    post: "Lets talk about React!",
  },
  {
    id: "p1",
    author: "R Lopxhan",
    post: "Lets talk about React!",
  },
  {
    id: "p1",
    author: "R Lopxhan",
    post: "According to numbers from Statista, the company began the pandemic with approximately 840,000 employees in the first quarter of 2020. By Q1 2022, it had over 1.6 million workers. The problem was, as the pandemic loosened its grip on public life, people stopped buying everything online and returned to brick-and-mortar retail.",
  },
];

const ROOM_DATA = [
  { id: "r1", room: "Python" },
  { id: "r2", room: "Javascript" },
  { id: "r3", room: "Java" },
  { id: "r4", room: "C" },
  { id: "r5", room: "C++" },
  { id: "r6", room: "C#" },
];

const Forum = () => {
  return (
    <div className={classes.forum}>
      <div className={classes.container}>
        <div className={classes.left}>
          {/* <h3>Rooms</h3> */}
          {ROOM_DATA.map((item) => (
            <RoomItem key={item.id} room={item.room} />
          ))}
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
