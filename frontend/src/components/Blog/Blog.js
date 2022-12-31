import { useSelector } from "react-redux";

import classes from "./Blog.module.scss";

import BlogItem from "./BlogItem";

const Blog = () => {
  const BLOG_DATA = useSelector((state) => state.data.blog_data);

  return (
    <div className={classes.blog}>
      <div className={classes.container}>
        <div className={classes["blog-list"]}>
          {BLOG_DATA.map((item) => (
            <BlogItem
              key={item.id}
              area={item.blogroom}
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
