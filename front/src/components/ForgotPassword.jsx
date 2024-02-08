import React from 'react'
import { Link , useNavigate} from 'react-router-dom';
import Button from './Button';
import { useState } from 'react';
import axios from "axios";

const ForgotPassword = () => {
    
    const navigate = useNavigate();
      
    var email = '';
    var password = '';
    var confirm = '';
  
    const handleChange = (e) => {
      e.preventDefault();
      if(password != confirm){
      alert('Passwords do not match.');
      }
      else{
      axios.post("api/users/change-password", {email: email,
        new_password: password, new_password_confirm: password}).then((res)=>{console.log(res.data);
          alert("Password change successful!");
    }).catch((e)=>{
      console.log(e);
      alert('Email not found!');
    });
  }
  }
    return (
      <div className="mainContainer">
        <div className="titleContainer">
          <div>Forgot password</div>
        </div>
        <br />
        <div className="inputContainer">
          <input
            placeholder="Enter your email here"
            className="inputBox"
            onChange={(e) => email = e.target.value}
          />
        </div>
        <br />
        <div className="inputContainer">
          <input
            type="password"
            placeholder="Enter new password here"
            className="inputBox"
            onChange={(e) => password = e.target.value}
          />
        </div>
        <div className="inputContainer">
          <input
            type="password"
            placeholder="Confirm new password here"
            className="inputBox"
            onChange={(e) => confirm = e.target.value}
          />
        </div>
        <br />
        <div className="inputContainer">
          <Button onClick={handleChange} as={Link} to="/login" className="custom-button">
            Change
          </Button>
        </div>
        <div className="inputContainer">
        </div>
        <div className="inputContainer">
        <span>
          <Link to="/login">Back to Login</Link>
        </span>
      </div>
      </div>
    );
  };
  
  export default ForgotPassword;