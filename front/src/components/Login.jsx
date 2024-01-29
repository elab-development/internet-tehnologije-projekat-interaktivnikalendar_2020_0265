import React from 'react'
import { Link } from 'react-router-dom';



const Login = () => {
    
    
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
        <Link to="/calendar">
            <input
                className={"inputButton"}
                type="button"
                value={"Log in"} />
                 </Link>
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
