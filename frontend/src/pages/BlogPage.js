import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { dataActions } from "../store/data";
import axios from "axios";

import Blog from "../components/Blog/Blog";

const BlogPage = () => {
  const dispatch = useDispatch();

  const getBlogData = useCallback(async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:8000/blog/blog/",
        headers: {},
        data: {},
      });

      dispatch(
        dataActions.updateBlog({
          blog_data: response.data,
        })
      );
    } catch (error) {}
  }, [dispatch]);

  const getBlogRoomData = useCallback(async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:8000/blog/blogroom/",
        headers: {},
        data: {},
      });

      dispatch(
        dataActions.updateBlogRoom({
          blogroom_data: response.data,
        })
      );
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    getBlogData();
    getBlogRoomData();
  }, [getBlogData, getBlogRoomData]);

  return <Blog />;
};

export default BlogPage;
