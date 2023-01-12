import moment from "moment";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import classes from "./ForumItem.module.scss";

import { useSelector, useDispatch } from "react-redux";
import { dataActions } from "../../store/data";

const ForumItem = (props) => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const Token = useSelector((state) => state.auth.authTokens);
  const accessToken = Token ? Token.access : null;

  const navigate = useNavigate();

  const getPostData = async () => {
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
    } catch (error) {
      alert(error.response.message);
    }
  };

  const onUpvoteHandler = () => {
    if (isLoggedIn) {
      const sendUpvote = async () => {
        try {
          await axios({
            method: "POST",
            url: `http://127.0.0.1:8000/forum/post/${props.pk}/upvote/`,
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
      getPostData();
    } else {
      navigate("/register");
    }
  };

  const onDownvoteHandler = () => {
    if (isLoggedIn) {
      const sendDownvote = async () => {
        try {
          await axios({
            method: "POST",
            url: `http://127.0.0.1:8000/forum/post/${props.pk}/downvote/`,
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
      getPostData();
    } else {
      navigate("/register");
    }
  };

  const dateTimeAgo = moment(new Date(props.published_date)).fromNow();

  return (
    <div className={classes.forumitem}>
      <div className={classes["author-section"]}>
        <div className={classes.authorright}>
          <div className={classes["author-image"]}>
            <Link to={`/profiles/${props.author_id}`}>
              <img src={require("../../assets/images/profile.jpg")} alt={""} />
            </Link>
          </div>
          <div>
            <Link to={`/profiles/${props.author_id}`}>
              <h4>
                @{props.author} | {props.fname} {props.lname}
              </h4>
            </Link>
            <button>Content Creator</button>
          </div>
        </div>
        <div>
          <p>{dateTimeAgo}</p>
        </div>
      </div>
      <Link to={`/forum/${props.pk}`} className={classes.postcontent}>
        <p>{props.post.substring(0, 1000)}</p>
      </Link>
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
          <span>{props.upvote_number === 0 ? "" : props.upvote_number}</span>
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
            {props.downvote_number === 0 ? "" : props.downvote_number}
          </span>
          Downvote
        </button>
        <Link to={`/forum/${props.pk}`}>
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
              {props.comment_number === 0 ? "" : props.comment_number}
            </span>
            Comment
          </button>
        </Link>
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
      <hr className={classes.line} />
    </div>
  );
};

export default ForumItem;
