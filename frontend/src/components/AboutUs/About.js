import classes from "./About.module.scss";

const About = () => {
  return (
    <div className={classes.about}>
      <div className={classes.container}>
        <h1>About Us</h1>
        <div className={classes["about-content"]}>
          <div className={classes.left}>
            <img src={require("../../assets/images/sketchpp.png")} alt={""} />
          </div>
          <div className={classes.right}>
            <p>
              A developer with the passion for developing a scalable
              applications and working across the full stack is seeking to apply
              and expand my knowledge and skills towards working in a
              collaborative environment with experienced developers to develop
              quality software solutions that addresses and solves business
              problems.
            </p>
            <p>
              Something that I love about software development is the
              opportunity to work with people from a wide range of disciplines.
              The software development lifecycle involves working with so many
              different people and departments and, as a people person and
              someone who loves to build new relationships, it’s great to be
              able to come together with other professionals who are striving
              towards the same goal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
