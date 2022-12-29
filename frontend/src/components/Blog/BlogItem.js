import { Link } from "react-router-dom";

import classes from "./BlogItem.module.scss";

const BlogItem = (props) => {
  return (
    <div className={classes.blogitem}>
      <article>
        <div className={classes.left}>
          <Link to="/" className={classes.area}>
            <p>{props.area}</p>
          </Link>
          <Link to="/">
            <h3>{props.topic.substring(0, 75)}</h3>
          </Link>
          <div className={classes["author-section"]}>
            <div>
              <img src={require("../../assets/images/profile.jpg")} alt={""} />
            </div>
            <div>
              <Link to="/" className={classes.authorname}>
                {props.author}
              </Link>
              <p>7{props.published_date}</p>
            </div>
          </div>
        </div>
        <div className={classes.middle}>
          <Link to="/">
            <p>{props.content.substring(0, 400)}</p>
          </Link>
        </div>
        <div className={classes.right}>
          <img src={require("../../assets/images/profile.jpg")} alt={""} />
        </div>
      </article>
      <div className={classes["post-review"]}>
        <button>
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
          Upvote
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
                d="m12 20 9-11h-6V4H9v5H3z"
                className="icon_svg-stroke icon_svg-fill"
                strokeWidth="1.5"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>
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
      <hr className={classes.line} />
    </div>
  );
};

export default BlogItem;
