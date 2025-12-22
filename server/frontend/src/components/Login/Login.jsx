import React, { useState } from 'react';

import "./Login.css";
import Header from '../Header/Header';

const Login = ({ onClose }) => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [open,setOpen] = useState(true)
  let login_url = window.location.origin + "/djangoapp/login/";

  const login = async (e) => {
    e.preventDefault();
  
    const res = await fetch(login_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: userName,
        password: password,
      }),
    });
  
    const json = await res.json();
  
    if (json.userName) {
      sessionStorage.setItem("username", json.userName);
      setOpen(false);
    } else {
      alert("The user could not be authenticated.");
    }
  };
  
  if (!open) {
    window.location.replace("/");
  }
  
 
  return (
    <>
      <Header />

      <div className="login-overlay" onClick={onClose}>
        <div
          className="login-panel"
          onClick={(e) => e.stopPropagation()}
        >
          <form onSubmit={login}>
            <div className="login-input">
              <label>Username</label>
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="login-input">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="login-actions">
              <input
                className="login-button"
                type="submit"
                value="Login"
              />
              <input
                className="login-button secondary"
                type="button"
                value="Cancel"
                onClick={() => setOpen(false)}
              />
            </div>

            <a className="login-link" href="/register">
              Register Now
            </a>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
