import React, { useState } from "react";

function Comments(){
    const[comments,setComments]= useState(localStorage.getItem("inputValue"))

    const handleComments=(e)=>{
        setComments(e.target.comments);
        localStorage.setItem("inputValue",e.target.comments);
    };


    return(

        <table className='table'>
            <tbody>
                <tr>
                <td>
                     <input className="e-input" value={comments} onChange={handleComments} type="text" placeholder="Enter Comments" />
                </td>
                </tr>
            </tbody>
        </table>
    )

}
export default Comments;