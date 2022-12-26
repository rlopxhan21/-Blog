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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna.
              Amet nisl suscipit adipiscing bibendum. In vitae turpis massa sed
              elementum tempus egestas. Risus pretium quam vulputate dignissim.
              Purus faucibus ornare suspendisse sed nisi lacus sed viverra
              tellus. Tristique risus nec feugiat in. Viverra nam libero justo
              laoreet sit amet. Volutpat odio facilisis mauris sit. Tristique
              senectus et netus et malesuada. Imperdiet massa tincidunt nunc
              pulvinar sapien et ligula. Dapibus ultrices in iaculis nunc sed
              augue lacus. Laoreet id donec ultrices tincidunt arcu non sodales.
              Commodo nulla facilisi nullam vehicula ipsum a arcu. Quis
              imperdiet massa tincidunt nunc pulvinar sapien et ligula
              ullamcorper. Turpis cursus in hac habitasse platea. Elementum eu
              facilisis sed odio morbi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
