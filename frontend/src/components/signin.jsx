import axios from 'axios';
import React, { useState } from 'react'
import { serverUrl } from '../App';
import { useNavigate } from 'react-router-dom';

function Signin() {
    const [username,setusername]=useState('');
    const [password,setpassword]=useState('');
    const navigate=useNavigate();
    
    const handle = async () => {
        const result=await axios.post(`${serverUrl}/api/vi/user/login`,{
            username,
            password
        });
        if(!result){
            console.log("wrong id or pass");
        }
    };

    const handle1 = async ()=>{
        navigate("/signup");
    }
  return (
    <div>
      <div>
        <label>
            User Name
        </label>
        <input
            type='string'
            placeholder='Enter user name'
            onChange={(e)=>setusername(e.target.value)}
        />
      </div>
      <div>
        <label>
            Password
        </label>
        <input
            type='string'
            placeholder='Enter password'
            onChange={(e)=>setpassword(e.target.value)}
        />
      </div>
      <button
      onClick={handle}
      >
        Signin
      </button>

      <button onClick={(handle1)}>Create an account?</button>
    </div>
  )
}

export default Signin
