import React , {useEffect, useState} from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import './PostForm.css';
import moment from 'moment';


const PostForm = () => {
    let date = moment().format("MMMM Do YYYY, h:mm:ss a")

    const username=localStorage.getItem("user");
    // console.log(username);

    const url ='http://localhost:8082/task/create';

    const [data,setData]=useState({
        username:username,
        category:"",    
    });


    function submit(e){
        // e.preventDefault();
        Axios.post(url,{
            description:data.category,
            // Username:username,
            // InsertedTimestamp: date,
            // UpdatedTimestamp:"",
            // CommentsAdded:"",
            // AssignedTo:"",

    })
        .then(response=>{
            alert("Submitted Successfully");
            console.log(response.status);
            console.log(response.data);
        })  
    }

    function handle(e){
        const newdata={...data}
        newdata[e.target.id]  = e.target.value;
        setData(newdata);
        // console.log(newdata);
    }
    
    return(  
       <div>
        <h2 className='heading'>Tracker</h2>
        <span className='unit2'>User:{username}</span>
        <span className="unit1"><Link to='/' className="logout">Logout</Link></span>
        <span className='unit3'><Link to='/incident' className='opentask'>OpenTasks</Link></span>
        
        <form onSubmit={(e)=>submit(e)}>
            <div className='card1'>
            <div>
            <span>
                    <h3 id="h3">TO DOS</h3>
                </span>
        </div>
                <div>
                <input
                type="text" 
                onChange={(e)=>handle(e)} 
                id="category" value={data.category} 
                placeholder='Enter text to be searched...'></input><br/>
                </div>
                <div>
                <button type="submit" id='button'>Submit</button>
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
export default PostForm;