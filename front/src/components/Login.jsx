import React from 'react'



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
            <input
                className={"inputButton"}
                type="button"
                value={"Log in"} />
        </div>
    </div>
    )
}

export default Login
