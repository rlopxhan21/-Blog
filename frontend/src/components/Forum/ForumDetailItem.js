import { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";

import classes from "./ForumDetailItem.module.scss";
import NoBlogFound from "../UI/NoBlogFound";
import { dataActions } from "../../store/data";
import CommentData from "./CommentData";

const ForumDetailItem = () => {
  const dispatch = useDispatch();

  const [commentDone, setCommentDone] = useState("");

  const navigate = useNavigate();
  const params = useParams().forumid;

  const Token = useSelector((state) => state.auth.authTokens);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const COMMENT_DATA = useSelector((state) => state.data.post_comment);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const accessToken = Token ? Token.access : null;

  const onCommentTypeHandler = (event) => {
    setCommentDone(event.target.value);
  };
  const [data, setData] = useState([]);

  const getForumDetailData = useCallback(async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://localhost:8000/forum/post/${params}/`,
        headers: {},
        data: {},
      });

      const response1 = await axios({
        method: "GET",
        url: `http://localhost:8000/forum/post/${params}/comment/`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch(dataActions.updatePostComment(response1.data));

      setData((prevState) => response.data);
    } catch (error) {
      alert(error);
    }
  }, [params, dispatch]);

  useEffect(() => {
    getForumDetailData();
  }, [getForumDetailData]);

  const onCommentSubmitHandler = (event) => {
    event.preventDefault();

    const enteredComment = event.target.comment.value;

    if (enteredComment.length === 0) {
    } else {
      const sendCommentData = async () => {
        try {
          const response = await axios({
            method: "POST",
            url: `http://localhost:8000/forum/post/${params}/comment/`,
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
          getForumDetailData();
        } catch (error) {
          alert(error);
        }
      };

      sendCommentData();

      setCommentDone("");
    }
  };

  const onUpvoteHandler = () => {
    if (isLoggedIn) {
      const sendUpvote = async () => {
        try {
          const response = await axios({
            method: "POST",
            url: `http://127.0.0.1:8000/forum/post/${params}/upvote/`,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          });
        } catch (error) {
          alert(error.response.data);
        }
      };

      sendUpvote();
      getForumDetailData();
    } else {
      navigate("/register");
    }
  };

  const onDownvoteHandler = () => {
    if (isLoggedIn) {
      const sendDownvote = async () => {
        try {
          const response = await axios({
            method: "POST",
            url: `http://127.0.0.1:8000/forum/post/${params}/downvote/`,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          });
        } catch (error) {
          alert(error.response.data);
        }
      };

      sendDownvote();
      getForumDetailData();
    } else {
      navigate("/register");
    }
  };

  const FORUM_DATA = data;

  // let isUpvoted = [];

  // if (isLoggedIn) {
  //   const isUpvoted = FORUM_DATA.upvoted_post.filter((item) => {
  //     return item.author.username === userInfo.username;
  //   });
  // }

  let content = "";

  if (COMMENT_DATA.length === 0) {
    content = <p>Become first to comment.</p>;
  } else {
    content = <p></p>;
  }

  if (FORUM_DATA.length === 0) {
    return <NoBlogFound>No Post Found.</NoBlogFound>;
  } else {
    const datetime = new Date(FORUM_DATA.created).toLocaleDateString("en-us", {
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
                    {FORUM_DATA.author_fname} {FORUM_DATA.author_lname}
                  </h4>
                  <button>Content Creator</button>
                </div>
              </div>
              <div>
                <p>{datetime}</p>
              </div>
            </div>

            <div className={classes.header}>
              <h2>{FORUM_DATA.title}</h2>
            </div>
            <div className={classes.maincontent}>{FORUM_DATA.content}</div>

            <div className={classes["post-review"]}>
              <button onClick={onUpvoteHandler}>
                <div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 4 3 15h6v5h6v-5h6z"
                      className="icon_svg-stroke icon_svg-fill"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
                <span>
                  {FORUM_DATA.upvoted_post.length === 0
                    ? ""
                    : FORUM_DATA.upvoted_post.length}
                </span>
                Upvote
              </button>
              <button onClick={onDownvoteHandler}>
                <div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m12 20 9-11h-6V4H9v5H3z"
                      className="icon_svg-stroke icon_svg-fill"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
                <span>
                  {FORUM_DATA.downvoted_post.length === 0
                    ? ""
                    : FORUM_DATA.downvoted_post.length}
                </span>
                Downvote
              </button>
              <button>
                <div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.071 18.86c4.103 0 7.429-3.102 7.429-6.93C19.5 8.103 16.174 5 12.071 5s-7.429 3.103-7.429 6.93c0 1.291.379 2.5 1.037 3.534.32.501-1.551 3.058-1.112 3.467.46.429 3.236-1.295 3.803-.99 1.09.585 2.354.92 3.701.92Z"
                      className="icon_svg-stroke icon_svg-fill"
                      strokeWidth="1.5"
                    ></path>
                  </svg>
                </div>
                <span>
                  {FORUM_DATA.post_comment.length === 0
                    ? ""
                    : FORUM_DATA.post_comment.length}
                </span>
                Comment
              </button>
              <button>
                <div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      className="icon_svg-stroke"
                      strokeWidth="1.5"
                      fillRule="evenodd"
                      strokeLinecap="round"
                    >
                      <path d="M19.748 10a8.003 8.003 0 0 0-15.496.002m.001 4.003a8.003 8.003 0 0 0 15.494 0"></path>
                      <path d="m2.5 7.697 1.197 3.289 3.289-1.197m14.5 6.5L20.289 13 17 14.197"></path>
                    </g>
                  </svg>
                </div>
                Share
              </button>
            </div>

            {isLoggedIn && (
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
            )}
            {content}
            {isLoggedIn && (
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
            )}
          </div>

          <div className={classes.authorpost}>
            <h3>
              More post from {FORUM_DATA.author_fname} {FORUM_DATA.author_lname}
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

export default ForumDetailItem;
