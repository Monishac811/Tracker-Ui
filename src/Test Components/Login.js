import React, { useState,useNavigate,Link } from "react";
 import '../Login Component/Loginform.css';


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isEnable, setEnable] = useState(true);

  


  const handleKeyUpUser = () => {
    if (username.length > 0 ) setEnable(false);
    else setEnable(true);
  };
  const handleKeyUpPassword = () => {
    if (username.length > 0 ) setEnable(false);
    else setEnable(true);
  };

  const handleSubmit=(e)=>{
    // const navigate = useNavigate();
    // navigate('/postform')
    //e.preventDefault();
    <Link to="/postform"></Link>
  }

  
  const handleUser = (e) => {
    setUsername(e.target.value);
    
};
const handlePassword = (e) => {
  setPassword(e.target.value);
  
};


localStorage.setItem("user",(username));

  return (
    <div>
    <h2 className='header'>Tracker-Login Page</h2>
    <form>
            <div className='card'>
            <div>
            <span>
                    <h3>Log In</h3>
                </span>
        </div>
    
      <div>
      <input 
        className="text"
        type="text"
        placeholder="Enter username.."
        value={username}
        onKeyUp={handleKeyUpUser}
        onChange={handleUser}
      />
      </div>
      <div>
      <input 
        className="text"
        type="password"
        placeholder="Enter password.."
        value={password}
        onKeyUp={handleKeyUpPassword}
        onChange={handlePassword}
      />
      </div>
      <div>
      <button
        type="submit"
        className="btn"
        disabled={isEnable}
        onClick={handleSubmit}>Login
      </button>
      </div>
      </div>
      </form>
    </div>
  );
}

export default Login;
