import React, { useState } from "react";
import './Registerform.css';
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export const Registerform = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');

    const handleSubmit = (e) => {
        const url = 'http://localhost:8082/user/create'
        e.preventDefault();

        if(firstname.length>0 && lastname.length>0 && email.length>0 && pass.length>0){
        Axios.post(url,{

            firstName:firstname,
            lastName:lastname,
            email:email,
            password:pass,
            //description:data.category,
            // Username:username,
            // InsertedTimestamp: date,
            // UpdatedTimestamp:"",
            // CommentsAdded:"",
             // AssignedTo:"",

    })
        .then(response=>{
            alert("Registered Successfully");
            console.log(response.status);
            console.log(response.data);
            navigate('/')
        })  
    }
    else{
        alert("Please enter all details..");
       
    }

        
    }

    const navigate = useNavigate();
  
    // const handleLogin=()=>{
      
    //     navigate('/')
    //   }

    return (
        <div>
        
        <form className="form">
            <h2 className='header1'>Registration</h2>
            <div className='registercard'>
                <div>
                
            <input value={firstname} name="fistname" onChange={(e) => setFirstName(e.target.value)} id="firstname" placeholder="FirstName" /><br/>
                </div>
            <div>
            
            <input value={lastname} name="lastname" onChange={(e) => setLastName(e.target.value)} id="lastname" placeholder="LastName" /><br/>
            </div>
            <div>
            
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" /><br/>
            </div>
            <div>
           
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" /><br/>
            </div>
            <div>
            <button type="submit" id="btn1" onClick={handleSubmit}>Register</button>
            </div>
            {/* <div>
            <button id="btn2" onClick={handleLogin}>Already have an account? Login here.</button>
            </div> */}
            <div>
            <div className="footer">Copyright &copy; 2023 Accenture Pvt Limited <span className="tracker">Details Tracker</span>
            </div>
            </div>
            
            </div>
        </form>
       
        </div>
        
    )
}