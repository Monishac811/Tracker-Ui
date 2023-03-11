import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function Test6() {
  const getInitialState = () => {
    const value = "Select";
    return value;
  };

  const [value, setValue] = useState(getInitialState);
  const [actions,setActions]=useState([]);
  const[error,setError]= useState('');

    useEffect(() => {
        axios
        .get('http://localhost:8082/user')
        .then(res =>{
        console.log(res.data.data);
        setActions(res.data.data);
    })
        .catch((error)=>{
            setError(error.message)
            
        })
    },[]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleAssignTo = (e,value)=>{
    e.preventDefault();
    const url ='https://jsonplaceholder.typicode.com/posts/';
    axios.post(url,{
        assignedTo:value,
     })
     .then(response=>{
         console.log(response.status);
         console.log(response.data);
     })   
  }

  return (
    <div>
      <select value={value} onChange={handleChange}>
        <option>Select</option>
        {
                                
                                actions.map((user)=>{
                                    const {userId,email,firstName,lastName} = user;
                                    return <option key={userId} value={userId}>{lastName},{firstName}</option>

                                })
                            }
      </select>
      <p>{`You selected ${value}`}</p>
      <button type='submit' onClick={(e)=>handleAssignTo(e,value)} className='add'>Submit</button>
    </div>
  );
}
