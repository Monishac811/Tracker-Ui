import axios from "axios";
import { useEffect, useState } from "react";

const Suggestions = () => {

    const [users,setUsers]= useState([]);
    const[text,setText]=useState('');
    const[suggestions,setSuggestions]=useState([]);

    useEffect(()=>{
        const loadUsers=async()=>{
            const response=await axios.get('https://jsonplaceholder.typicode.com/posts/');
            setUsers(response.data)
        }
        loadUsers();
    })


    // useEffect(() => {
    //     axios
    //     .get('https://reqres.in/api/users')
    //     .then(res =>{
    //     console.log(res.data);
    //     setUsers(res.data);
    // })
    
    // },[]);



    const onChangeHandler=(text)=>{
    let matches = []
    if( text.length > 0){
        matches = users.filter(user => {
            const regex = new RegExp(`${text}`,"gi");
            return user.title.match(regex)
        })
    }
    // console.log('matches found:',matches);
    setSuggestions(matches);
    setText(text);
}
return(
    <div>
        {/* <div>{text}</div> */}
        <input type="text" onChange={(e)=>onChangeHandler(e.target.value)} value={text}/>
        {suggestions && suggestions.map((suggestion,i)=>
            <div key={i}>{suggestion.title}</div>
        )}
    </div>
    
)

}

export default Suggestions;