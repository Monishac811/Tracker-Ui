import React from "react";
import { Link } from "react-router-dom";
import '../Task Component/Details.css';

function Details(){
    return(
        
        <div className="List">
        <div>
            <h2>Tracker </h2>
            <span class="unit"><Link to='/postform' className="home">Home</Link></span>
        </div>
      
            <div>
            <Link to='/incident' className="link">Incident</Link>
            <Link to='/request' className="link">Request</Link>
            <Link to='/change' className="link">Change</Link>
            <Link to='/slack' className="link">Slack</Link>
            <Link to='/others' className="link">Others</Link>
            {/* <Link to='/postform' className="link">Home</Link><br/> */}
            </div>
        </div>  
    )
}
export default Details;