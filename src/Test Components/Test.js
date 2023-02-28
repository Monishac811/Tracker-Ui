import React ,{useState,useEffect} from 'react';
import axios from 'axios';
import '../Task Component/table.css';
import '../Task Component/Details.css';

const Test = () => {

   
     
    const[details,setDetails]= useState([]);
    const [users,setUsers]= useState([]);
    const[error,setError]= useState('');
    const [text,setText]=useState('');
    const [selectedIndex,setSelectedIndex]=useState('');
    const[suggestions,setSuggestions]=useState([]);

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

   
   

    useEffect(()=>{
        const loadUsers=async()=>{
            const response=await axios.get('https://reqres.in/api/users');
            setUsers(response.data.data)
           
        }
        loadUsers();
    })
   
   

const onChangeHandler=(value,key)=>{
    console.log(key);
    let matches = [];
    if( value.length > 0){
        matches = users.filter((user) => {
            const regex = new RegExp(`${text}`,"gi");
                return user.email.match(regex)
           
        })
    }
     console.log('matches found:',matches);
    setSuggestions(matches);
    setText(value);
    
}
console.log(selectedIndex)


    return(
        <>
               {details.map((post,i)=>{
               const {id} = post;
              return <div>
                <table>
                    <tr key={id}>
                <td>{id}</td>
                <td>{i}</td>
            <div key={i}>
              <input type="text" id="suggestions" placeholder="Enter name.." onChange={(e)=>{onChangeHandler(e.target.value)}} value={text}/>
              
             
             
          <button type='submit' className='add'>Submit</button>  
          <button className='DeleteButton'>X</button>
          </div>
          </tr>
          </table>
          </div>
        })}
         {suggestions &&  suggestions.map((suggestion,index)=>
                  <div key={index} className="name"> {suggestion.email}</div>
              )}
       
       
        </>
    );
   
}
export default Test;