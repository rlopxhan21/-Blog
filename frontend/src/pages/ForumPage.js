import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { dataActions } from "../store/data";
import axios from "axios";

import Forum from "../components/Forum/Forum";

const ForumPage = () => {
  const dispatch = useDispatch();

  const getPostData = useCallback(async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:8000/forum/post/",
        headers: {},
        data: {},
      });

      dispatch(
        dataActions.updatePost({
          post_data: response.data,
        })
      );
    } catch (error) {}
  }, [dispatch]);

  const getRoomData = useCallback(async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:8000/forum/room/",
        headers: {},
        data: {},
      });

      dispatch(
        dataActions.updateRoom({
          room_data: response.data,
        })
      );
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    getPostData();
    getRoomData();
  }, [getPostData, getRoomData]);

  return <Forum />;
};

export default ForumPage;
