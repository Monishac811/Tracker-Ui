import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { Axios } from 'axios';
import './App.css';

import Details from './Test Components/Details';
import {Route , Routes} from 'react-router-dom';
// import Opentasks from './Opentasks';
import Incident from './Task Component/Incident';
import Request from './Task Component/Request';
import Change from './Task Component/Change';
import Slack from './Task Component/Slack';
import Others from './Task Component/Others';
import { useNavigate } from 'react-router-dom';
import Test from './Test Components/Test';
import Followup from './Test Components/Followup';
import Testtable from './Test Components/testtable';
import Test1 from './Test Components/Test1';
import Test2 from './Test Components/Test2';
import Component1 from './Test Components/Component1';

import PostForm from './Postform Component/PostForm';
import Login from './Test Components/Login';
import Suggestions from './Test Components/Suggestions';
import Test3 from './Test Components/Test3';
import Test4 from './Test Components/Test4';
import Test5 from './Test Components/Test5';
import ABC from './Test Components/ABC';
import Loginform from './Login Component/Loginform';
import { Register } from './Test Components/Register';
import { Registerform } from './Register Component/Registerform';
import Test6 from './Test Components/Test6';
import Test7 from './Test Components/Test7';
import Test9 from './Test Components/Test9';


function App() {
  



  return (
    <>
    <Routes>
    <Route path="/" element={<Loginform/>} />
      <Route path="/register" element={<Registerform/>} />
      <Route path="/details" element={<Details/>} />
      <Route path="/incident" element={<Incident/>} />
      <Route path="/request" element={<Request/>} />
      <Route path="/change" element={<Change/>} />
      <Route path="/slack" element={<Slack/>} />
      <Route path="/others" element={<Others/>} />
      <Route path="/followup" element={<Followup/>} />
      <Route path="/postform" element={<PostForm/>} />
    </Routes>
    {/* <Followup /> */}
    {/* <Followup/> */}
    {/* <Loginform/> */}
    {/* { <Test9/> }  */}
    {/* <Component1/> */}
    {/* {<Login />} */}
    {/* <Suggestions/> */}
    {/* <ABC /> */}
    {/* <Registerform/> */}
    </>
  );

  }
export default App;
