import classes from "./Contact.module.scss";

const Contact = () => {
  return (
    <div className={classes.login}>
      <div className={classes.container}>
        <h1>Contact Us</h1>
        <form method="POST" action="">
          <div className={classes.name}>
            <div>
              <label>First Name</label>
              <input type="text" required />
            </div>
            <div>
              <label>Last Name</label>
              <input type="text" required />
            </div>
          </div>
          <div>
            <label>Email</label>
            <input type="email" required />
          </div>
          <div>
            <label>Your Message</label>
            <textarea type="text" required />
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
