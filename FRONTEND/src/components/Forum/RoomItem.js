import { Link } from "react-router-dom";

import classes from "./RoomItem.module.scss";

const RoomItem = (props) => {
  return (
    <div className={classes.roomitem}>
      <Link to="/" className={classes.room}>
        {props.room}
      </Link>
    </div>
  );
};

export default RoomItem;
