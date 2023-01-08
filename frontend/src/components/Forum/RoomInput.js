import { useState } from "react";
import axios from "axios";

import classes from "./RoomInput.module.scss";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RoomInput = () => {
  const [errorContent, setErrorContent] = useState("");

  const navigate = useNavigate();

  const authTokens = useSelector((state) => state.auth.authTokens);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const accessToken = authTokens ? authTokens.access : null;

  const onRoomSubmitHandler = (event) => {
    event.preventDefault();

    if (isLoggedIn) {
      const enteredRoomName = event.target.roomname.value;
      const enteredRoomDesc = event.target.roomdesc.value;

      if (enteredRoomDesc.length === 0 || enteredRoomName.length === 0) {
        setErrorContent(
          <p className={classes.errorcontent}>
            Something went wrong. Please try again!
          </p>
        );
      } else {
        navigate("/userprofile");

        const sendRoomRequest = async () => {
          try {
            await axios({
              method: "POST",
              url: "http://127.0.0.1:8000/forum/room/",
              headers: {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${accessToken}`,
              },
              data: {
                name: enteredRoomName,
                slug: enteredRoomName
                  .replace(/[^a-z0-9 -]/g, "")
                  .replace(/\s+/g, "-")
                  .replace(/-+/g, "-"),
                description: enteredRoomDesc,
              },
            });

            navigate("/forum");
          } catch (error) {
            setErrorContent(
              <p className={classes.errorcontent}>
                Something went wrong. Please try again!
              </p>
            );
          }
        };

        sendRoomRequest();
      }
    } else {
      navigate("/register");
    }
  };

  return (
    <div className={classes.login}>
      <div className={classes.container}>
        <h1>Create Room</h1>
        <form method="POST" action="" onSubmit={onRoomSubmitHandler}>
          <div>
            <label>Room Name</label>
            <input type="text" name="roomname" />
          </div>

          <div>
            <label>Room Description</label>
            <textarea type="text" name="roomdesc" />
          </div>
          {errorContent}
          <button type="submit">Create Room</button>
        </form>
      </div>
    </div>
  );
};

export default RoomInput;
