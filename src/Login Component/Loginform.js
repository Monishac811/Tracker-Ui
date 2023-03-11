import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Loginform.css';
import Axios from "axios";



function Loginform() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isEnable, setEnable] = useState(true);
  const handleKeyUp = () => {
      if (username.length > 0 && password.length > 0) setEnable(false);
      else setEnable(true);
  };
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
   
    const url = 'http://localhost:8082/authenticate'
    
    if(username.length>0 && password.length>0){
      Axios.post(url,{
        email:username,
        password:password,

  })
      .then(response=>{
          alert("Logged in Successfully");
          console.log(response.status);
          console.log(response.data);
          navigate('/postform');
        
      })  
  }
  else{
      alert("Please enter all details..");
     
  }
  }
  

  const handleRegister=()=>{
    navigate('/register');
  }
  localStorage.setItem("user",(username));


  return (
    <div>
      <form className="form">
      <h2 className='header'>Tracker-Login Page</h2>
      <div className='card'>
            <div>
            <span>
                    <h3>Log In</h3>
                </span>
        </div>
    <div>
    <input
        type="text"
        id="text"
        placeholder="Enter Username..."
        value={username}
        onKeyUp={handleKeyUp}
        onChange={(event) => setUsername(event.target.value)}
      />
    </div>
    <div>
    <input
        type="password"
        id="password"
        placeholder="Enter Password..."
        value={password}
        onKeyUp={handleKeyUp}
        onChange={(event) => setPassword(event.target.value)}
      />
    </div>
      
  
      <div>
      <button
        type="submit"
        id="btn"
        disabled={isEnable}
        onClick={handleSubmit}
      >
        Login
      </button>
      </div>
      <div>
      <button
        type="submit"
        id="btn2"
        onClick={handleRegister}
      >
        Click here to Register!!!
      </button>
      </div>
      <div >
        <div className="footer">Copyright &copy; 2023 Accenture Pvt Limited <span className="tracker">Details Tracker</span>
           </div>
        
    </div>
      
      </div>
      
      </form>
    </div>

  )

}

export default Loginform;
