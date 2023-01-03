import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";

import classes from "./BlogDetailItem.module.scss";
import NoBlogFound from "../UI/NoBlogFound";
import { dataActions } from "../../store/data";
import CommentData from "../Forum/CommentData";

const BlogDetailItem = () => {
  const dispatch = useDispatch();
  const [commentDone, setCommentDone] = useState("");
  const params = useParams().blogid;

  const Token = useSelector((state) => state.auth.authTokens);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const COMMENT_DATA = useSelector((state) => state.data.blog_comment);
  const accessToken = Token.access;

  const onCommentTypeHandler = (event) => {
    setCommentDone(event.target.value);
  };

  const [data, setData] = useState([]);

  const getBlogDetailData = useCallback(async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://localhost:8000/blog/blog/${params}/`,
        headers: {},
        data: {},
      });
      const response1 = await axios({
        method: "GET",
        url: `http://localhost:8000/blog/blog/${params}/comment/`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch(dataActions.updateBlogComment(response1.data));

      setData((prevState) => response.data);
    } catch (error) {}
  }, [params, dispatch]);

  useEffect(() => {
    getBlogDetailData();
  }, [getBlogDetailData]);

  const onCommentSubmitHandler = (event) => {
    event.preventDefault();

    const enteredComment = event.target.comment.value;

    if (enteredComment.length === 0) {
    } else {
      const sendCommentData = async () => {
        try {
          const response = await axios({
            method: "POST",
            url: `http://localhost:8000/blog/blog/${params}/comment/`,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            data: {
              content: enteredComment,
              active: true,
            },
          });
          console.log(response.data);
          getBlogDetailData();
        } catch (error) {
          alert(error);
        }
      };

      sendCommentData();

      setCommentDone("");
    }
  };

  const BLOG_DATA = data;
  let content = <p></p>;

  if (COMMENT_DATA.length === 0) {
    content = <p>Become first to comment.</p>;
  } else {
    content = <p></p>;
  }

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
            <div className={classes.addcomment}>
              <form
                onSubmit={onCommentSubmitHandler}
                className={classes.commentform}
              >
                <input
                  type="text"
                  name="comment"
                  value={commentDone}
                  onChange={onCommentTypeHandler}
                  className={classes.commentinput}
                  placeholder={`Comment as ${userInfo.fname} ${userInfo.lname}`}
                />
                <button type="submit" className={classes.commentbutton}>
                  Post a Comment
                </button>
              </form>
            </div>
            {content}
            <div className={classes.commentdata}>
              {COMMENT_DATA.map((item) => (
                <CommentData
                  key={item.id}
                  fname={item.author_fname}
                  lname={item.author_lname}
                  published_date={item.created}
                  content={item.content}
                />
              ))}
            </div>
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
