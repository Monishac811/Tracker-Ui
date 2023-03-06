import React ,{useState,useEffect} from 'react';
import axios from 'axios';
import '../Task Component/table.css';
import { Link } from 'react-router-dom';
import '../Task Component/Details.css';
import moment from 'moment';


const Request = () => {
    let date = moment().format("MMMM Do YYYY, h:mm:ss a")

    const username=localStorage.getItem("user");
    // console.log(username);

    const url ='https://jsonplaceholder.typicode.com/posts/';

    const[details,setDetails]= useState([]);
    const[error,setError]= useState('');
    const [comments,setComments]=useState('');
    
    const [actions,setActions]=useState([]);

    const [selectedState,setSelectedState]=useState('');

    const [selectedUserId,setSelectedUserId]=useState('')
    
   

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
    console.log(actions)
    
    

    useEffect(() => {
        axios
        .get('http://localhost:8082/task/RITM')
        .then(res =>{
        console.log(res.data.data);
        setDetails(res.data.data);
    })
        .catch((error)=>{
            setError(error.message)
        })
    },[]);


const handleComments=(e,actions,{description},{taskId})=>{
     e.preventDefault();

    const url='http://localhost:8082/task/update';

    const taskid=JSON.parse(`${taskId}`);
    console.log(taskid);

    {actions.map((user)=>{
        const {userId} = user;
        const userid=JSON.parse(`${userId}`);
        console.log(userid);
    if(comments.length>0){
        axios.put(url,{
            
            taskId:taskid,
            description:description,
            comments:comments,
            assignedTo:userid,
    
        })
        .then(response=>{
            console.log(response.status);
            console.log(response.data);
        })  
    }
        
    
       })}
}


const handleAssignTo=(e,{taskId},actions,{description})=>{
    e.preventDefault();
    const url='https://jsonplaceholder.typicode.com/posts/'

    const value=JSON.parse(`${taskId}`);
    console.log(value);

    const arr=[]

    {actions.map((user)=>{
        const {userId} = user;
        return arr.push(userId)
    })}

    console.log(arr)
   
   
        axios.post(url,{
            assignedTo:selectedState,
            taskId:value,
            description:description,
        })
        .then(response=>{
            console.log(response.status);
            console.log(response.data);
            console.log({taskId})
        })   
}
        

const handle = (e)=>{
    setComments(e.target.value);
}



const handleSelectedState=(e)=>{
setSelectedState(e.target.value);
}
  




const handleDetele=({taskId},e)=>{
    // e.preventDefault();
    console.log({taskId})
    const value=JSON.parse(`${taskId}`);
    console.log(value);
    
    axios.delete('http://localhost:8082/task/delete',{
       data:{taskId:value} ,
    })
     .then(response=>{
         console.log(response.status);
         console.log(response.data);
         
     })   
}

    return(
        <>
        <form >
        <div className="List">
        {error !== '' && <h2>{error}</h2>}
        <div>
        <h2 className='head'>Request Details </h2>
        <span className="unit"><Link to='/postform' className="home">Home</Link></span>
        </div>
        </div>
       

        <div className='navbar'>
        <div >
            <Link to='/incident' className="link1">Incident</Link>
            <Link to='/request' className="link1">Request</Link>
            <Link to='/change' className="link1">Change</Link>
            <Link to='/slack' className="link1">Slack</Link>
            <Link to='/others' className="link1">Others</Link>
            
            </div>
        </div>
        <br/>
        <br/>
        <br/>

      
       <table className='tableheading'>
       <thead>
                 <tr>
                    <th id="th">Requests</th>
                    <th id="th">Comments</th>
                    <th id="th">AssignedTo</th>
                    <th>Comments Actions</th>
                    <th>AssignTo</th>
                    
                        
                </tr>
            </thead>
            </table>




       {details.map((post)=>{
        const {taskId,description,assignedTo,comments} = post;
        return <div>
           
            <table className='table'>
                <tbody>
                <tr key={taskId}>
                    <td className='font'>{description}</td>
                    <td className='font'>{comments}</td>
                    <td className='font'>{assignedTo}</td>
                    <td>
                        <div>
                        <input type="text" className='follow' id="CommentsAdded" onChange={(e)=>handle(e)} placeholder='Enter Comments...'></input>
                        <button className='add'onClick={(e)=>handleComments(e,actions,{description},{taskId},{assignedTo},{comments})}>Add</button>  
                        </div>
                    </td>
                    <td>
                        <select value={selectedState.id} onChange={(e)=>handleSelectedState(e,actions)}>
                            <option>Select</option>
                            {
                                
                                actions.map((user)=>{
                                    const {userId,email,firstName,lastName} = user;
                                    return <option key={userId}>{lastName},{firstName}</option>

                                })
                            }
                        
                        </select>           
                        
                
                        <button type='submit' onClick={(e)=>handleAssignTo(e,{taskId},actions,{description})} className='add'>Submit</button>  

                        <button className='DeleteButton' onClick={(e)=>handleDetele({taskId},e)}>X</button>
                        
                        
                        
                    </td>   
                 </tr>
             </tbody> 
             </table>
             </div> 
        })}
        </form> 
        </>
    );
    
}
export default Request;