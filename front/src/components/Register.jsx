// Register.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button'; 

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
   
    navigate('/calendar');
  };

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
        
        <Button onClick={handleRegister} className="inputButton" type="button">
          Register
        </Button>
      </div>
    </div>
  );
};

export default Register;
