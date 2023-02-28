import React , {useState , useEffect} from 'react';
import axios from 'axios';
import '../Task Component/table.css';
import { Link } from 'react-router-dom';
import '../Task Component/Details.css';


function Followup () {
    const[followup,setFollowup]= useState("");
    const[comment,setComment]=useState("");
    const[incident,setIncident]= useState("");
    const[list,setList]=useState([]);

    const handleIncident=(e)=>{
        setIncident(e.target.value);
   };


    const handleFollowup=(e)=>{
        setFollowup(e.target.value);
   };

   const handleComment=(e)=>{
        setComment(e.target.value);
    };


    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(incident,followup,comment);
        const data={incident,followup,comment}
        if(incident&&followup&&comment){
            setList((ls)=>[...ls,data])
            setIncident("");
            setFollowup("");
            setComment("");
        }
    }
     
    return(  
        <div className="List">
        <h2>Followup Details</h2>
        <form onSubmit={handleSubmit}>
            <table className='table'>
                <tr>
            <Link to='/incident' className="link">Incident</Link>
            <Link to='/request' className="link">Request</Link>
            <Link to='/change' className="link">Change</Link>
            <Link to='/slack' className="link">Slack</Link>
            <Link to='/others' className="link">Others</Link>
            <Link to='/' className="link">Home</Link><br/>
            </tr>
            </table>
            <table className='table'>
                <tr>
                <input className="e-input" value={incident} onChange={handleIncident} type="text" placeholder="Incident Number" />
                <input className="e-input" value={followup} onChange={handleFollowup} type="text" placeholder="Enter Followup" />
                <input className="e-input" value={comment} onChange={handleComment} type="text" placeholder="Enter Comments" />
                <button>Add</button>
                </tr>
            </table>
            </form>

            {
        list.map((a)=>{
         <div>
             {a.incident}
             {a.followup}
             {a.comment}
         </div>
        })}    
    
        </div> 
         
    );
    
}
export default Followup;