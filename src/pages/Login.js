import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);
  let navi = useNavigate();

  const login = () => {
    const data = {
      userName: userName,
      password: password,
    };
    axios.post("http://localhost:3001/auth/login", data).then((res) => {
      if (res.data.error) alert(res.data.error);
      else {
        localStorage.setItem("accessToken", res.data.accessToken);
        setAuthState({
          userName: res.data.userName,
          id: res.data.id,
          status: true,
        });
        console.log("hei" + res.data);
        navi("/home");
      }
    });
  };
  return (
    //     display: flex;
    //   align-items: center;
    //   flex-direction: column;
    //   width: 100%;
    //   /* height: 150px; */
    //   padding-top: 10px;
    //   background-color: red;
    <div className="loginContainer">
      <div
        style={{
          width: "400px",
          background: "rgb(30, 40, 40)",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          borderRadius: "10px",
          padding: "20px 20px",
          height: "450px",
        }}
      >
        <h3 style={{ color: "white" }}>ChiChat</h3>
        <h1 style={{ color: "white" }}>Welcome back!</h1>
        <div style={{ display: "flex", color: "white" }}>
          <h7>New user?</h7>

          <div
            style={{
              marginLeft: "10px",
              textDecoration: "underline",
              marginBottom: "20px",
            }}
          >
            <Link to="/registration" style={{ color: "white" }}>
              Create an account
            </Link>
          </div>
        </div>
        <input
          type="text"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          placeholder=" username"
        />
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder=" password"
        />
        <button
          onClick={login}
          style={{ marginTop: "auto", marginBottom: "20px" }}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default Login;
