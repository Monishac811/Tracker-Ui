import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Loginform.css';


function Loginform() {
  const [username, setUsername] = useState("");
  const [isEnable, setEnable] = useState(true);

  const handleKeyUp = () => {
    if (username.length > 0) {
        setEnable(false);
    }

    else{
        setEnable(true); 
    } 
  };

  const navigate = useNavigate();
  
  const handleSubmit=()=>{
    if(username.length > 0){
      navigate('/postform')}
    }
    
    
  const changeState = (e) => {
    setUsername(e.target.value);
    
};
localStorage.setItem("user",(username));


  return (
    <div>
        <form className="form" onSubmit={handleSubmit}>
    <h2 className='header'>Tracker-Login Page</h2>
    
            <div className='card'>
            <div>
            <span>
                    <h3>Log In</h3>
                </span>
        </div>
    
      <div>
      <input 
        id="text"
        type="text"
        placeholder="Enter username.."
        value={username}
        onKeyUp={handleKeyUp}
        onChange={changeState}
      />
      </div>
      <div>
      <button
        type="button"
        id="btn"
        disabled={isEnable}
        >Login
      </button>
      </div>
      <div >
        <div className="footer">Copyright &copy; 2023 Accenture Pvt Limited <span className="tracker">Details Tracker</span>
           </div>
        
    </div>
      </div>
      </form>
    </div>
  );
}

export default Loginform;
