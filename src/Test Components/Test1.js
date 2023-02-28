import React ,{useState,useEffect} from 'react';
import axios from 'axios';
import '../Task Component/table.css';
import { Link } from 'react-router-dom';
import '../Task Component/Details.css';
import moment from 'moment';


const Test1 = () => {
    let date = moment().format("MMMM Do YYYY, h:mm:ss a")

    const username=localStorage.getItem("user");
    // console.log(username);

    const url ='https://jsonplaceholder.typicode.com/posts/';

    const[details,setDetails]= useState([]);
    const [selectedIndex,setSelectedIndex]=useState('');
    const[error,setError]= useState('');
    const [data,setData]=useState({
        CommentsAdded:"",
        Username:username,
        UpdatedTime:date,   
    });
    
    const [actions,setActions]=useState(['Select',"Sathish","Vaishali","Monisha"]);

    const [actionsList,setActionList]=useState({
        "Status":['Select','Open','Progress','Closed'],
        "AssignTo":['Select',"Sathish","Vaishali","Monisha"]
    });

    const [selectedState,setSelectedState]=useState('');
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
const handleButton=(e,{description})=>{
    e.preventDefault();
   
        axios.post(url,{
           AssignedToName:selectedState,
           IncidentNo:description,
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
const onSuggestHandler=(text)=> {
    setText(text);
    setSuggestions([]);

}

const handleSelectedState=(e,{description})=>{
setSelectedState(e.target.value);
// axios.post(url,{
//     AssignTo:e.target.value,
//     IncidentNo:description,
//  })
//  .then(response=>{
//      console.log(response.status);
//      console.log(response.data);
//  })   

}

const handleDetele=(id,{description})=>{
    const newlist=details.filter((li) => li.id !== id)
    setDetails(newlist);
    axios.post(url,{
        IncidentNo:description,
        DeletedRow:id
        
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
        const {id,description} = post;
        return <div>
           
            <table className='table'>
                <tbody>
                <tr key={id}>
                    <td className='font'>{description}</td>
                    <td className='font'></td>
                    <td className='font'></td>
                    <td>
                        <div>
                        <input type="text" className='follow' onChange={(e)=>handle(e,{post})} id="CommentsAdded" value={data.CommentsAdded.id} placeholder='Enter Comments...'></input>
                        <button className='add'onClick={(e)=>handleSubmit(e,{description})}>Add</button>  
                        </div>
                    </td>
                    <td>
                        <select value={selectedState.id} onChange={(e)=>handleSelectedState(e,{description})}>
                            {
                                actions.map(state=>{
                                    return <option>{state}</option>
                                })
                            }
                        
                        </select>           
                        
                
                        <button type='submit' onClick={(e)=>handleButton(e,{description})} className='add'>Submit</button>  

                        <button className='DeleteButton' onClick={(e)=>handleDetele(id,{description})}>X</button>
                        
                        
                        
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
export default Test1;