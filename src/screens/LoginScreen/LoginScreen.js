import React, { useState } from "react";
// import styled from "styled-components";
import axios from 'axios'

import "./LoginScreen.css";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async()=>{
    const res= await axios.post('url',{email,password})
    console.log(res.data)
  }

  return (
    <div className="container">
      <div className="loginContainer">
        <div className="input-group">
          <input
            type="text"
            className="input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label className="placeholder">Email</label>
        </div>
        <div className="input-group">
          <input type="text" className="input" value={password} onChange={(event)=>{setPassword(event.target.value)}} />
          <label className="placeholder">Password</label>
        </div>
        {/* <div className="submitContainer"> */}
        <button className="btnSubmit" type="submit" onClick={handleSubmit}>
          LOGIN
        </button>
        {/* </div> */}
      </div>
    </div>
  );
}
