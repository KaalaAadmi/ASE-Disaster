import React from "react";
// import styled from "styled-components";
import "./LoginScreen.css";

export default function LoginScreen() {
  return (
    <div className="container">
      <div className="loginContainer">
        <div className="input-group">
          <input type="text" className="input" />
          <label className="placeholder">Email</label>
        </div>
        <div className="input-group">
          <input type="text" className="input" />
          <label className="placeholder">Password</label>
        </div>
        {/* <div className="submitContainer"> */}
        <button className="btnSubmit" type="submit">
          LOGIN
        </button>
        {/* </div> */}
      </div>
    </div>
  );
}
