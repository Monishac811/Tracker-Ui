import React ,{useState,useEffect} from 'react';
import axios from 'axios';
import '../Task Component/table.css';
import { Link } from 'react-router-dom';
import '../Task Component/Details.css';
import moment from 'moment';


const ABC = () => {
    let date = moment().format("MMMM Do YYYY, h:mm:ss a")

    const username=localStorage.getItem("user");
    // console.log(username);

    const url ='https://jsonplaceholder.typicode.com/posts/';

    const[details,setDetails]= useState([]);
    const[error,setError]= useState('');
    const [data,setData]=useState({
        CommentsAdded:"",
        Username:username,
        UpdatedTime:date,   
    });
    
    const [actions,setActions]=useState([]);

    const [selectedState,setSelectedState]=useState('');
    // console.log(selectedState);
    
    // const [users,setUsers]= useState([]);
    

    // useEffect(()=>{
    //     const loadUsers=async()=>{
    //         const response=await axios.get('https://reqres.in/api/users');
    //         setUsers(response.data.data)
    //     }
    //     loadUsers();
    // })
   

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
        .get('http://localhost:8082/task')
        .then(res =>{
        console.log(res.data.data);
        setDetails(res.data.data);
    })
        .catch((error)=>{
            setError(error.message)
        })
    },[]);


const handleSubmit=(e,{description})=>{
    const url='http://localhost:8082/task/create'
    e.preventDefault();

        axios.post(url,{
           CommentsAdded:data.CommentsAdded,
           IncidentNo:description,
        })
        .then(response=>{
            console.log(response.status);
            console.log(response.data);
        })   
}
const handleButton=(e,actions,{taskId},{description})=>{
    const url='http://localhost:8082/task/update'

    const taskid=JSON.parse(`${taskId}`);
    console.log(taskid);
   
   {actions.map((user)=>{
    const {userId} = user;
    const userid=JSON.parse(`${userId}`);
    console.log(userid);

    axios.put(url,{
        assignedTo:userid,
        taskId:taskid,
        IncidentNo:description,
    })
    .then(response=>{
        console.log(response.status);
        console.log(response.data);
    })  

   })}
         
}
        

function handle(e,post){
    const newdata={...data,...post}
    newdata[e.target.id]  = e.target.value;
    setData(newdata);
    // console.log(newdata);
}




const handleSelectedState=(e)=>
{
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
        <h2 className='head'>Incident Details </h2>
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
                    <th>Incidents</th>
                    <th>Comments</th>
                    <th>AssignedTo</th>
                    <th>Comments Actions</th>
                    <th>AssignTo</th>
                    
                        
                </tr>
            </thead>
            </table>




       {details.map((post)=>{
        const {taskId,description,assignedTo} = post;
        return <div>
           
            <table className='table'>
                <tbody>
                <tr key={taskId}>
                    <td className='font'>{description}</td>
                    <td className='font'>{assignedTo}</td>
                    <td className='font'></td>
                    <td>
                        <div>
                        <input type="text" className='follow' onChange={(e)=>handle(e,{post})} id="CommentsAdded" value={data.CommentsAdded.id} placeholder='Enter Comments...'></input>
                        <button className='add'onClick={(e)=>handleSubmit(e,{description})}>Add</button>  
                        </div>
                    </td>
                    <td>
                        <select value={selectedState.id} onChange={(e)=>handleSelectedState(e,{description})}>
                            <option>Select</option>
                            {
                                
                                actions.map((user)=>{
                                    const {userId,email} = user;
                                    return <option>{email}</option>

                                })
                            }
                        
                        </select>           
                        
                
                        <button type='submit' onClick={(e)=>handleButton(e,actions,{taskId},{description})} className='add'>Submit</button>  

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
export default ABC;