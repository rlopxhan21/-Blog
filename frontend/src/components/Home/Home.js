import classes from "./Home.module.scss";

const Home = () => {
  return (
    <div className={classes.home}>
      <div className={classes.container}>
        <h1>Blogging Community For Developers, & People In Tech</h1>
        <p>
          Start a blog for free instantly and share your ideas with people in
          tech, developers, and engineers.
        </p>
        <div className={classes["social-links"]}>
          <a
            href="https://www.linkedin.com/in/ronishlopxhan/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
          <a
            href="https://twitter.com/lopxhan"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a
            href="https://github.com/rlopxhan21"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-github"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
