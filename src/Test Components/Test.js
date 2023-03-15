import "./styles.css";
import Select from "react-dropdown-select";

import axios from "axios";
import { useEffect,useState } from "react";

export default function Test1() {
    const [actions,setActions]=useState([]);

  //get selected values ni dari DB.
  const [selectedValues,setSelectedValues]=useState([]);

  const getInitialState = () => {
    const value = "Select";
    return value;
  };

  const [value, setValue] = useState(getInitialState);
  const[error,setError]= useState('');;
  
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

const handleChange = (e) => {
    setValue(e.target.value);
    setSelectedValues(e.target.value)
  };

  return (
    <div className="Test">
      <Select  values={selectedValues}
        onChange={handleChange} >
       
        <option>Select</option>
        {
                                
                                actions.map((user)=>{
                                    const {userId,email,firstName,lastName} = user;
                                    return <option key={userId} value={userId}>{lastName},{firstName}</option>

                                })
                            }
        </Select>
    </div>
  );
}
