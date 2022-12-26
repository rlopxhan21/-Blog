import classes from "./Home.module.scss";

const Home = () => {
  return (
    <div className={classes.home}>
      <div className={classes.container}>
        <h1>Blog on Software Development</h1>
        <p>
          A blog from seasoned SRE writing on topics like automation,
          observability, reliability, containerisation and orchestration etc.
        </p>
        <div className={classes["social-links"]}>
          <a
            href="https://www.linkedin.com/in/ronishlopxhan/"
            target="_blank"
            rel="noreferrer"
          >
            <i class="fa-brands fa-linkedin-in"></i>
          </a>
          <a
            href="https://twitter.com/lopxhan"
            target="_blank"
            rel="noreferrer"
          >
            <i class="fa-brands fa-twitter"></i>
          </a>
          <a
            href="https://github.com/rlopxhan21"
            target="_blank"
            rel="noreferrer"
          >
            <i class="fa-brands fa-github"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
