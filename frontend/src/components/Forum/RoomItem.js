import axios from "axios";
import { useDispatch } from "react-redux";

import classes from "./RoomItem.module.scss";

import { dataActions } from "../../store/data";

const RoomItem = (props) => {
  const dispatch = useDispatch();

  const onRoomClickHandler = () => {
    const receiveRoomPost = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `http://127.0.0.1:8000/forum/room/${props.pk}/`,
          headers: {
            "Content-Type": "Application/json",
          },
        });
        // console.log(response.data.room_post);

        dispatch(dataActions.updatePost(response.data.room_post));
      } catch (error) {}
    };

    receiveRoomPost();
  };

  return (
    <div className={classes.room} onClick={onRoomClickHandler}>
      {props.room}
    </div>
  );
};

export default RoomItem;
