import React ,{useState,useEffect} from 'react';
import axios from 'axios';
import '../Task Component/table.css';
import { json, Link } from 'react-router-dom';
import '../Task Component/Details.css';
import Followup from './Followup';
import { useId } from 'react';
import Testtable from './testtable';


const Test2 = () => {
    const url ='https://jsonplaceholder.typicode.com/posts/';
    const[details,setDetails]= useState([]);
    const[error,setError]= useState('');
    const [data,setData]=useState({
        followup:"",
        
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
    
    

const handleSubmit=(e,id)=>{
    e.preventDefault();
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
    // const olddata = {newdata,post}
    setData(newdata);
    console.log(newdata);
}

    return(  
        <>
        <form onSubmit={handleSubmit}>
        <div className="List">
        {error != '' && <h2>{error}</h2>}
       <h2>Incident Details</h2>
       <div>
            <Link to='/incident' className="link">Incident</Link>
            <Link to='/request' className="link">Request</Link>
            <Link to='/change' className="link">Change</Link>
            <Link to='/slack' className="link">Slack</Link>
            <Link to='/others' className="link">Others</Link>
            <Link to='/postform' className="link">Home</Link><br/>
            </div>
            </div>
       
       
       <table className='table'>
       <thead>
                 <tr>
                    <th>Incidents</th>
                    <th>Followup Details</th>
                    <th>Followup Actions</th>
                </tr>
            </thead>
            </table>
       {details.map((post)=>{
        const {body} = post;
        // console.log(post);
        return <div>
            <table className='table'>
                <tbody>
                <tr key={body}>
                    <td>{body.slice(0,10)}</td>
                    <td>{body.slice(0,10)}</td>
                    {/* <td>{details[index]}</td> */}
                    <td>
                        <div>
                        <input className="e-input" type="text" onChange={(e)=>handle(e,post)} id="followup" value={data.followup.id} placeholder='Enter followup...'></input>
                        <button>Add</button>
                         </div>
                        {/* <span class="unit">{id}-</span> */}
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
export default Test2;