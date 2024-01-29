import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Register</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          placeholder="Enter your email here"
          className={"inputBox"}
        />
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          placeholder="Enter your password here"
          className={"inputBox"}
        />
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          placeholder="Confirm your password"
          className={"inputBox"}
        />
      </div>
      <br />
      <div className={"inputContainer"}>
      <Link to="/calendar">
        <input
          className={"inputButton"}
          type="button"
          value={"Register"} />
        </Link>
      </div>
    </div>
  );
};

export default Register;
