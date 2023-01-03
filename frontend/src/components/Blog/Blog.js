import { useSelector } from "react-redux";

import classes from "./Blog.module.scss";

import BlogItem from "./BlogItem";
import NoBlogFound from "../UI/NoBlogFound";
import BlogInput from "./BlogInput";

const Blog = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const BLOG_DATA = useSelector((state) => state.data.blog_data);

  if (BLOG_DATA.length === 0) {
    return <NoBlogFound>No Blog Post Available.</NoBlogFound>;
  }

  return (
    <div className={classes.blog}>
      <div className={classes.container}>
        <div className={classes["blog-list"]}>
          {isLoggedIn && <BlogInput />}
          {BLOG_DATA.map((item) => (
            <BlogItem
              key={item.id}
              pk={item.id}
              area={item.blogroom_name}
              topic={item.title}
              author_fname={item.author_fname}
              author_lname={item.author_lname}
              published_date={item.created}
              content={item.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
