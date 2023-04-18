import React, {useState} from "react";
import "./LoginScreen.css";
import {login,logout} from "../../api/auth";

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

  if (isAuthenticated) {
    return (
      <div>
        <h1>Welcome!</h1>
        <button onClick={handleLogout}>Logout</button>
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
          <button className="btnSubmit" type="submit" onClick={() => login(email,password,setIsAuthenticated)}>
            LOGIN
          </button>
          {/* </div> */}
        </div>

      </div>
    );
  }
}
