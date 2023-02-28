// First component i.e App 
import React, { useState } from 'react';
import Component2 from './Component2'; 

function Component1() {
    const [username,setUsername]=useState({
        username:"",   
    });
    const changeState = (e) => {  
        const newdata={...username}
        newdata[e.target.id]  = e.target.value;
        setUsername(newdata); 
        console.log(newdata);
       };  

    return (   
        <div className="App">   
            <Component2 data={username.username} />    
            <input className="text"  
            value={username.username}
            onChange={changeState}
            id="username"
            placeholder='Enter username...' 
            type='text'></input><br/> 

            <button type="button">Login</button>     
            </div> 
                      
    ); 
 } 

 export default Component1;
 