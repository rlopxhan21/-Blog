import classes from "./NoBlogFound.module.scss";

const NoBlogFound = (props) => {
  return (
    <div className={classes.noblogfound}>
      <h3>{props.children}</h3>
    </div>
  );
};

export default NoBlogFound;
