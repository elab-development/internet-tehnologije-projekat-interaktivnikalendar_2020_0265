
import { Link } from "react-router-dom";

const Button = ({ onClick, disabled, type, children, className }) => {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        type={type}
        className={`custom-button ${className}`}
      >
        {children}
      </button>
    );
  };
  
  export default Button;