import React from "react";
import Select from "react-select";
import options from "./options.ts";
import axios from "axios";
import { useEffect,useState } from "react";


const SELECT_VALUE_KEY = "MySelectValue";

export default function MySelect() {
  const [selected, setSelected] = React.useState([]);
  const [actions, setActions] = useState([]);
  const handleChange = (s) => {
    localStorage.setItem(SELECT_VALUE_KEY, JSON.stringify(s));
    setSelected(s);
  };

  React.useEffect(() => {
    const lastSelected = JSON.parse(
      localStorage.getItem(SELECT_VALUE_KEY) ?? "[]"
    );
    setSelected(lastSelected);
  }, []);


  useEffect(() => {
    axios
    .get('http://localhost:8082/user')
    .then((res)=>setActions(res.data.data))
    
});

  return (
    <Select
      value={selected}
      onChange={handleChange}
      options={options}
    />
  );
}
