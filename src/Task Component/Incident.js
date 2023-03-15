import React ,{useState,useEffect} from 'react';
import axios from 'axios';
import '../Task Component/table.css';
import { Link } from 'react-router-dom';
import '../Task Component/Details.css';
import moment from 'moment';
import Select from "react-select";
import options from "./options.ts";

const SELECT_VALUE_KEY = "MySelectValue";
const Incident = () => {
    let date = moment().format("MMMM Do YYYY, h:mm:ss a")

    const[action,setAction]=useState(['OPEN','IN PROGRESS','CLOSE','BLOCKED']);

    const username=localStorage.getItem("user");
    // console.log(username);

    const url ='https://jsonplaceholder.typicode.com/posts/';
    const [selected, setSelected] = React.useState([]);

    const[details,setDetails]= useState([]);
    const [selectedIndex,setSelectedIndex]=useState('');
    const[error,setError]= useState('');
    const [data,setData]=useState({
        CommentsAdded:"", 
    });

    // const getInitialState = () => {
    //     const value = "Select";
    //     return value;
    //   };
    const [value, setValue] = useState('');
    
    const [actions,setActions]=useState([]);

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
    

    const [selectedStatus,setSelectedStatus]=useState('');
    const [selectedText,setSelectedText]=useState('');
    const [ selectedState,setSelectedState]=useState('');
    const [selectedUserid,setSelectedUserid]=useState('');
    // console.log(selectedState);

    const [selectedList,setSelectedList]=useState('');
    // console.log(selectedList);
    
    const [users,setUsers]= useState([]);
    const [text,setText]=useState('');
    
    const[suggestions,setSuggestions]=useState([]);

    useEffect(()=>{
        const loadUsers=async()=>{
            const response=await axios.get('https://reqres.in/api/users');
            setUsers(response.data.data)
        }
        loadUsers();
    })
    

    useEffect(() => {
        axios
        .get('http://localhost:8082/task/INC')
        .then(res =>{
        console.log(res.data.data);
        setDetails(res.data.data);
    })
        .catch((error)=>{
            setError(error.message)
        })
    },[]);


const handleComments=(e,{description},{taskId},{assignedTo},{status})=>{
    //e.preventDefault();
    const url ='http://localhost:8082/task/update';
    const newcomments={...data.CommentsAdded,...e.target.value}
    console.log((newcomments))

    if(data.CommentsAdded.length>0){
        axios.put(url,{
            comments:data.CommentsAdded,
            description:description,
            taskId:taskId,
            assignedTo:assignedTo,
            status:status,
         })
         .then(response=>{
             console.log(response.status);
             console.log(response.data);
         })   
    }

        
}

const handleChange = (e) => {
    setSelected(e.target.value);
  
  };


const handleAssignTo = (e,value,{description},{taskId},{comments},{status})=>{
    e.preventDefault();
    
    const url ='http://localhost:8082/task/update';
    axios.put(url,{
        assignedTo:selected,
        description:description,
        taskId:taskId,
        comments:comments,
        status:status,
        
        
     })
     .then(response=>{
         console.log(response.status);
         console.log(response.data);
     })   
  }
        

function handle(e){
    const newdata={...data.CommentsAdded,...e.target.value}
    newdata[e.target.id]  = e.target.value;
    setData(newdata);
    console.log(newdata);
    console.log(data);
}




const handleSelectedState=(e,userId)=>{
    setSelectedState(e.target.value);                          
    setSelectedUserid(userId);
    console.log(selectedUserid)
    console.log(selectedState)

// axios.post(url,{
//     AssignTo:e.target.value,
//     IncidentNo:description,
//  })
//  .then(response=>{
//      console.log(response.status);
//      console.log(response.data);
//  })   

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


const handleStatus = (e,value,{description},{taskId},{comments},{status}) => {
    e.preventDefault()
    const url ='http://localhost:8082/task/update';
    axios.put(url,{
        assignedTo:value,
        description:description,
        taskId:taskId,
        comments:comments,
        status:selectedStatus, 
        
     })
     .then(response=>{
         console.log(response.status);
         console.log(response.data);
     })   
  }




  const handleSelectedStatus=(e)=>{
    setSelectedStatus(e.target.value);
    
    // axios.post(url,{
    //     action:e.target.value,
    //  })
    //  .then(response=>{
    //      console.log(response.status);
    //      console.log(response.data);
    //  })   
    
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
                    <th>AssignTo</th>
                    <th>Comments Actions</th>
                    <th>Status</th>
                    
                        
                </tr>
            </thead>
            </table>
       {details.map((post)=>{
        const {id,description,taskId,comments,assignedTo,status} = post;
        return <div>
           
            <table className='table'>
                <tbody>
                <tr key={id}>
                    <td className='font'>{description}</td>
                    <td className='font'>{comments}</td>
                    <td>
                    <select  onChange={(e)=>handleChange(e)} onClick={(e)=>handleAssignTo(e,value,{description},{taskId},{comments},{status})}>
                    

                    {actions.map((user,assignedTo)=>{  
                        
                                            
                        const {userId,email,firstName,lastName} = user;    
                         return userId===assignedTo?<option key={userId} value={userId} selected>{lastName},{firstName}</option>: <option key={userId} value={userId}>{lastName},{firstName}</option>
                                            
                    })}
                  </select>
      {/* <p>{`You selected ${value}`}</p> */}
      {/* <button type='submit' onClick={(e)=>handleAssignTo(e,value,{description},{taskId},{comments},{status})} className='add'>Submit</button> */}    
                    </td>

                    <td>
                        <div>
                        <input type="text" className='follow' defaultValue={comments} onChange={(e)=>handle(e,{post})} id="CommentsAdded" value={data.CommentsAdded.id} placeholder='Enter Comments...'></input>
                        <button className='add'onClick={(e)=>handleComments(e,{description},{taskId},{assignedTo},{status})}>Add</button>  
                        </div>
                    </td>
                     
                    <td key={taskId}>
                   
                    <select value={selectedStatus.id} onChange={handleSelectedStatus} onClick={(e)=>handleStatus(e,value,{description},{taskId},{comments},{assignedTo},{status})}>
                        <option>{status}</option>
                            {
                                action.map(state=>{
                                    return <option>{state}</option>
                                })
                            }
                        
                        </select>
                        {/* <button type='submit' onClick={(e)=>handleStatus(e,value,{description},{taskId},{comments},{assignedTo},{status})} className='add'>Submit</button> */}
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
export default Incident;