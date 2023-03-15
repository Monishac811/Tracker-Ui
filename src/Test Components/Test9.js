import React ,{useState,useEffect} from 'react';
import axios from 'axios';
import '../Task Component/table.css';
import { Link } from 'react-router-dom';
import '../Task Component/Details.css';
import moment from 'moment';


const Test9 = () => {
    let date = moment().format("MMMM Do YYYY, h:mm:ss a")

    const username=localStorage.getItem("user");
    // console.log(username);

    const url ='https://jsonplaceholder.typicode.com/posts/';

    const[details,setDetails]= useState([]);
    const[error,setError]= useState('');
    const [data,setData]=useState({
        followup:"",
        username:username,
        updatedTime:date,   
    });
    
    const [actions,setActions]=useState(['Select','Status','AssignTo']);

    const [actionsList,setActionList]=useState({
        "Status":['Select','Open','Progress','Closed'],
        "AssignTo":['Select',"Sathish","Vaishali","Monisha"]
    });

    const [selectedState,setSelectedState]=useState('');
    // console.log(selectedState);

    const [selectedList,setSelectedList]=useState('');
    // console.log(selectedList);
    
    const [users,setUsers]= useState([]);
    const[text,setText]=useState('');
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
        .get('https://jsonplaceholder.typicode.com/posts/',{
            username,
        })
        .then(res =>{
        console.log(res.data);
        setDetails(res.data);
    })
        .catch((error)=>{
            setError(error.message)
        })
    },[]);


const handleSubmit=(e)=>{
    e.preventDefault();

        axios.post(url,{
           data,
        })
        .then(response=>{
            console.log(response.status);
            console.log(response.data);
        })   
}
const handleButton=(e)=>{
    e.preventDefault();

        axios.post(url,{
           action:selectedState,
           text:text,
        
        })
        .then(response=>{
            console.log(response.status);
            console.log(response.data);
        })   
}
        

function handle(e,post){
    const newdata={...data,...post}
    newdata[e.target.id]  = e.target.value;
    setData(newdata);
    // console.log(newdata);
}

const onChangeHandler=(text)=>{
    let matches = []
    if( text.length > 0){
        matches = users.filter((user,i) => {
            const regex = new RegExp(`${text}`,"gi");
            return user.email.match(regex)
        })
    }
    // console.log('matches found:',matches);
    setSuggestions(matches);
    setText(text);
}

const handleSelectedState=(e)=>{
setSelectedState(e.target.value);
axios.post(url,{
    action:e.target.value,
 })
 .then(response=>{
     console.log(response.status);
     console.log(response.data);
 })   

}

const handleDetele=(id)=>{
    const newlist=details.filter((li) => li.id !== id)
    setDetails(newlist);
    axios.post(url,{
        data,
        
     })
     .then(response=>{
         console.log(response.status);
         console.log(response.data);
     })   
}

    return(
        <>
        <form onSubmit={handleSubmit}>
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
      
       <table className='table'>
       <thead>
                 <tr>
                    <th>Incidents</th>
                    <th>Comments</th>
                    <th>AssignedTo</th>
                    <th>Comments Actions</th>
                    <th id="th">AssignTo</th>
                    
                        
                </tr>
            </thead>
            </table>
       {details.map((post)=>{
        const {id,title} = post;
        return <div>
           
            <table className='table'>
                <tbody>
                <tr key={id}>
                    <td>{id}</td>
                    <td>{title.slice(0,10)}</td>
                    <td>{title.slice(0,10)}</td>
                    <td>
                        <div>
                        <input type="text" className='follow' onChange={(e)=>handle(e,post)} id="followup" value={data.followup.id} placeholder='Enter Comments...'></input>
                        <button className='add'>Add</button>  
                        </div>
                    </td>
                    
                    <td>
                    <div>
                        <select value={selectedState.id} onChange={handleSelectedState}>
                            {
                                actions.map(state=>{
                                    return <option>{state}</option>
                                })
                            }
                        
                        </select>

                       
                        <button type='submit' onClick={handleButton} className='add'>Submit</button>  
                        <button className='DeleteButton' onClick={(e)=>handleDetele(id,post,e)}>X</button>
                        </div>
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
export default Test9;