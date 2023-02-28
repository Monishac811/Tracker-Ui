import React ,{useState,useEffect} from 'react';
import axios from 'axios';
import './table.css';
import { Link } from 'react-router-dom';
import './Details.css';
import moment from 'moment';


const Other = () => {
    let date = moment().format("MMMM Do YYYY, h:mm:ss a")

    const username=localStorage.getItem("user");
    console.log(username);

    const url ='https://jsonplaceholder.typicode.com/posts/';

    const[details,setDetails]= useState([]);
    const[error,setError]= useState('');
    const [data,setData]=useState({
        followup:"",
        username:username,
        updatedTime:date,   
    });
    

    useEffect(() => {
        axios
        .get('https://jsonplaceholder.typicode.com/posts/')
        .then(res =>{
        console.log(res.data);
        setDetails(res.data);
    })
        .catch((error)=>{
            setError(error.message)
        })
    },[]);
    
    

const handleSubmit=(e)=>{
    // e.preventDefault();
        axios.post(url,{
           data,
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
    console.log(newdata);
}

    return(
        <>
        <form onSubmit={handleSubmit}>
        <div className="List">
        {error !== '' && <h2>{error}</h2>}
        <div>
        <h2 className='head'>Other Details</h2>
        <span class="unit"><Link to='/postform' className="home">Home</Link></span>
        </div>
      
       <div>
            <Link to='/incident' className="link1">Incident</Link>
            <Link to='/request' className="link1">Request</Link>
            <Link to='/change' className="link1">Change</Link>
            <Link to='/slack' className="link1">Slack</Link>
            <Link to='/others' className="link1">Others</Link>
            
            </div>
            </div>
       
       
       <table className='table'>
       <thead>
                 <tr>
                    <th>Other</th>
                    <th>Followup Details</th>
                    <th>Followup Actions</th>
                </tr>
            </thead>
            </table>
       {details.map((post)=>{
        const {body} = post;
        return <div>
           
            <table className='table'>
                <tbody>
                <tr key={body}>
                    <td>{body.slice(0,10)}</td>
                    <td>{}</td>
                    <td>
                        <div>
                        <input type="text" className='follow' onChange={(e)=>handle(e,post)} id="followup" value={data.followup.id} placeholder='Enter followup...'></input>
                        <button className='add'>Add</button>  
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
export default Other;