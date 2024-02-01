import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button'; // Assuming you have a Button component

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (username.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
      alert('Please fill in all fields.');
    } else if (password !== confirmPassword) {
      alert('Passwords do not match.');
    } else {
      // Perform registration logic
      navigate('/calendar');
    }
  };

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Register</div>
      </div>
      <br />
      <div className="inputContainer">
        <input
          id="registerUsername"
          placeholder="Enter your username here"
          className="inputBox"
        />
      </div>
      <br />
      <div className="inputContainer">
        <input
          id="registerEmail"
          placeholder="Enter your email here"
          className="inputBox"
        />
      </div>
      <br />
      <div className="inputContainer">
        <input
          id="registerPassword"
          type="password"
          placeholder="Enter your password here"
          className="inputBox"
        />
      </div>
      <br />
      <div className="inputContainer">
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          className="inputBox"
        />
      </div>
      <br />
      <div className="inputContainer">
        <Button onClick={handleRegister} className="inputButton" type="button">
          Register
        </Button>
      </div>
      <div className="inputContainer">
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </div>
    </div>
  );
};

export default Register;


