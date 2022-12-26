import classes from "./Blog.module.scss";

import BlogItem from "./BlogItem";

const DUMMY_DATA = [
  {
    id: "b1",
    area: "FinTech",
    topic: "Indian fintech Money View valued at $900 million in new funding",
    author: "R Lopxhan",
    published_date: "7 Dec 2022",
    content:
      "Indian fintech Money View said on Monday it has raised $75 million in a new funding round, its second this year, despite the market slump as it looks to scale its core credit business and build mor...",
  },
  {
    id: "b2",
    area: "FinTech",
    topic: "Indian fintech Money View valued at $900 million in new funding",
    author: "R Lopxhan",
    published_date: "7 Dec 2022",
    content:
      "Indian fintech Money View said on Monday it has raised $75 million in a new funding round, its second this year, despite the market slump as it looks to scale its core credit business and build mor...",
  },
  {
    id: "b3",
    area: "FinTech",
    topic: "Indian fintech Money View valued at $900 million in new funding",
    author: "R Lopxhan",
    published_date: "7 Dec 2022",
    content:
      "Indian fintech Money View said on Monday it has raised $75 million in a new funding round, its second this year, despite the market slump as it looks to scale its core credit business and build mor...",
  },
  {
    id: "b4",
    area: "FinTech",
    topic:
      "Indian fintech Money View valued a asd as d asd as d asd as d asd as d as d as d asd as t $900 million in new funding",
    author: "R Lopxhan",
    published_date: "7 Dec 2022",
    content:
      "Indian fintech Money asd as d asd asdasd asd as das d asd as asd as d asd asd asd as d asd  asd as  dsasd asd as da sd as d asd as d asd as d asd asd as das d asd as sd asd as asdasdasdasdasd as d asd asd  asd as da sd as d as ddas d asd as das d asd as das as d adasd View said on Monday it has raised $75 million in a new funding round, its second this year, despite the market slump as it looks to scale its core credit business and build mor...",
  },
  {
    id: "b5",
    area: "FinTech",
    topic: "Indian fintech Money View valued at $900 million in new funding",
    author: "R Lopxhan",
    published_date: "7 Dec 2022",
    content:
      "Indian fintech Money View said on Monday it has raised $75 million in a new funding round, its second this year, despite the market slump as it looks to scale its core credit business and build mor...",
  },
  {
    id: "b6",
    area: "FinTech",
    topic: "Indian fintech Money View valued at $900 million in new funding",
    author: "R Lopxhan",
    published_date: "7 Dec 2022",
    content:
      "Indian fintech Money View said on Monday it has raised $75 million in a new funding round, its second this year, despite the market slump as it looks to scale its core credit business and build mor...",
  },
];

const Blog = () => {
  return (
    <div className={classes.blog}>
      <div className={classes.container}>
        <h1>Posts</h1>
        <div className={classes["blog-list"]}>
          {DUMMY_DATA.map((item) => (
            <BlogItem
              key={item.id}
              area={item.area}
              topic={item.topic}
              author={item.author}
              published_date={item.published_date}
              content={item.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
