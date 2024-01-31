import React from 'react'
import { Link , useNavigate} from 'react-router-dom';
import Button from './Button';


const Login = () => {
    
    const navigate = useNavigate();
      
        const handleLogin = () => {
          // Handle login logic
      
          // Redirect to /calendar after successful login
          navigate('/calendar');
        }
    //const navigate = useNavigate();
        
 

    return (<div className={"mainContainer"}>
        <div className={"titleContainer"}>
            <div>Login</div>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                placeholder="Enter your email here"
                className={"inputBox"} />
            
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                placeholder="Enter your password here"
                className={"inputBox"} />
            
        </div>
        <br />
        <div className={"inputContainer"}>
        <Button onClick={handleLogin} as={Link} to="/calendar" className="custom-button">
          Login
        </Button>
        </div>
        <div className={"inputContainer"}>
        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </div>
    </div>
    )
}

export default Login
