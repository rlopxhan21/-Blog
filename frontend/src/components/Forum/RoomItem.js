import { Link } from "react-router-dom";

import classes from "./RoomItem.module.scss";

const RoomItem = (props) => {
  return (
    <Link to="/" className={classes.room}>
      {props.room}
    </Link>
  );
};

export default RoomItem;
