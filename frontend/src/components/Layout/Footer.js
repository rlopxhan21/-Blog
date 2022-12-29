import classes from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={classes.footer}>
      <a
        rel="license noreferrer"
        href="http://creativecommons.org/licenses/by/4.0/"
        target="_blank"
      >
        <img
          alt="Creative Commons License"
          src="https://i.creativecommons.org/l/by/4.0/88x31.png"
        />
      </a>
      <br />
      This work is licensed under a{" "}
      <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
        Creative Commons Attribution 4.0 International License
      </a>
      .
    </div>
  );
};

export default Footer;
