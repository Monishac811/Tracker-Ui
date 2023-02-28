import React, { useState,useNavigate,Link } from "react";
// import './Loginform.css';


function Login() {
  const [username, setUsername] = useState("");
  const [isEnable, setEnable] = useState(true);

  


  const handleKeyUp = () => {
    if (username.length > 0) setEnable(false);
    else setEnable(true);
  };

  const handleSubmit=(e)=>{
    // const navigate = useNavigate();
    // navigate('/postform')
    e.preventDefault();
    <Link to="/postform"></Link>
  }

  const changeState = (e) => {
    setUsername(e.target.value);
    
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
        onKeyUp={handleKeyUp}
        onChange={changeState}
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
