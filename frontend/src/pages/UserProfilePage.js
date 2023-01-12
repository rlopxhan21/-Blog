import UserProfile from "../components/UserProfile/UserProfile";
import { useEffect, useCallback } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { dataActions } from "../store/data";

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const params = useParams().profileid;

  const getUserData = useCallback(async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://127.0.0.1:8000/api/userprofile/${params}/`,
        headers: {
          "Content-Type": "Application/json",
        },
      });

      dispatch(dataActions.updateProfile(response.data));
    } catch (error) {}
  }, [dispatch, params]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return <UserProfile />;
};

export default UserProfilePage;
