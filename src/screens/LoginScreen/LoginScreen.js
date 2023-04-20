import React, {useState} from "react";
import "./LoginScreen.css";
import {login,logout} from "../../api/auth";
import {useNavigate } from 'react-router-dom';

import {Container, Title, Subtitle, Form, TextArea, Label, Submit, Input, Select, Option} from "../style"

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") !== null
  ); // check if the user is authenticated on page load

  const handleLogout = () => {
    setIsAuthenticated(false); // set isAuthenticated to false
    logout();
  };

  const navigate = useNavigate();

  const handleLogin = async () => {
    login(email,password,setIsAuthenticated)
    navigate.push(`/view-reports`); 
  }

  if (isAuthenticated) {
    return (
      <div style={{display: "flex", flexDirection: "column", justifyContent: "center", padding: "15px", paddingTop: "0"}}>
        <h1 style={{color: "#fefefe", textAlign: "center"}}>Click the button to Logout</h1>
        <Submit type="submit" className="logout-btn" value="Logout" onClick={handleLogout}/>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="loginContainer">
          <div className="input-group">
            <input type="text" className="input" 
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <label className="placeholder">Email</label>
          </div>
          <div className="input-group">
            <input type="text" className="input"
              value={password}
              onChange={(event) => setPassword(event.target.value)}  
            />
            <label className="placeholder">Password</label>
          </div>
          {/* <div className="submitContainer"> */}
          <button className="btnSubmit" type="submit" onClick={handleLogin}>
            LOGIN
          </button>
          {/* </div> */}
        </div>

      </div>
    );
  }
}
