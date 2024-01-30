import React, { useState } from "react";
import axios from "axios";

function ChangePassword() {
  const [op, setop] = useState("");
  const [np, setnp] = useState("");
  const changePassword = () => {
    axios.put(
      "http://localhost:3001/auth/changepassword",
      { oldPassworld: op, newPassword: np },
      { headers: { accessToken: localStorage.getItem("accessToken") } }
    ).then((res)=>{
        if(res.data.error){
            alert("error")
        }
    });
  };

  return (
    <div>
      <h1>Change ur pasword</h1>
      <input
        type="text"
        placeholder="Old pass"
        onChange={(v) => {
          setop(v.target.value);
        }}
      >
     
      </input>
      <input
        type="text"
        placeholder="new pass"
        onChange={(v) => {
          setnp(v.target.value);
        }}
      >
       
      </input>
      <button onClick={changePassword}>Save Chang</button>
    </div>
  );
}

export default ChangePassword;
