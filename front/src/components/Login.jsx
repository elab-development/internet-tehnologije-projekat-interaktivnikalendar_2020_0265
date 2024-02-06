import React from 'react'
import { Link , useNavigate} from 'react-router-dom';
import Button from './Button';
import { useState } from 'react';
import axios from "axios";

const Login = () => {
    
    const navigate = useNavigate();
      
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false);
  
    const handleLogin = (e) => {
      e.preventDefault();
      axios.post("http://127.0.0.1:8000/api/login", {email: username,
    password: password}).then((res)=>{console.log(res.data);
    if(res.data.success === true){
      window.sessionStorage.setItem("auth_token", res.data.access_token);
      navigate('/calendar');
    }
    }).catch((e)=>{
      console.log(e);
    });
      if (username.trim() === '' || password.trim() === '') {
        alert('Please enter both username and password.');
      } else {
      }
    };
    
        
 

    return (
      <div className="mainContainer">
        <div className="titleContainer">
          <div>Login</div>
        </div>
        <br />
        <div className="inputContainer">
          <input
            placeholder="Enter your email here"
            className="inputBox"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <br />
        <div className="inputContainer">
          <input
            type="password"
            placeholder="Enter your password here"
            className="inputBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <div className="inputContainer">
          <Button onClick={handleLogin} as={Link} to="/calendar" className="custom-button">
            Login
          </Button>
        </div>
        <div className="inputContainer">
          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </div>
  
       
      </div>
    );
  };
  
  export default Login;