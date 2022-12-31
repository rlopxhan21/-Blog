import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import classes from "./BlogDetailItem.module.scss";
import NoBlogFound from "../UI/NoBlogFound";

const BlogDetailItem = () => {
  const params = useParams().blogid;

  const [data, setData] = useState([]);

  const getBlogDetailData = useCallback(async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://localhost:8000/blog/blog/${params}/`,
        headers: {},
        data: {},
      });

      setData((prevState) => response.data);
    } catch (error) {}
  }, [params]);

  useEffect(() => {
    getBlogDetailData();
  }, [getBlogDetailData]);

  const BLOG_DATA = data;

  if (BLOG_DATA.length === 0) {
    return <NoBlogFound>No Blog Found.</NoBlogFound>;
  } else {
    const datetime = new Date(BLOG_DATA.created).toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    return (
      <div className={classes.blogdetail}>
        <div className={classes.container}>
          <div className={classes.content}>
            <div className={classes["author-section"]}>
              <div className={classes.authorright}>
                <div className={classes["author-image"]}>
                  <img
                    src={require("../../assets/images/profile.jpg")}
                    alt={""}
                  />
                </div>
                <div>
                  <h4>
                    {BLOG_DATA.author_fname} {BLOG_DATA.author_lname}
                  </h4>
                  <button>Content Creator</button>
                </div>
              </div>
              <div>
                <p>{datetime}</p>
              </div>
            </div>

            <div className={classes.header}>
              <h2>{BLOG_DATA.title}</h2>
            </div>
            <div className={classes.maincontent}>{BLOG_DATA.content}</div>
          </div>
          <div className={classes.authorpost}>
            <h3>
              More post from {BLOG_DATA.author_fname} {BLOG_DATA.author_lname}
            </h3>
            <div className={classes.morepost}>
              <h4>Title of the post</h4>
              <h4>Title of the post</h4>
              <h4>Title of the post</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default BlogDetailItem;
