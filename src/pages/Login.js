import React from 'react'
import { useState ,useContext} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';


function Login() {
    const[userName, setUserName] = useState("");
    const[password, setPassword] = useState("");
    const {setAuthState} = useContext(AuthContext);
    let navi = useNavigate();

    const login = () =>{
        const data = {
            userName: userName,
            password: password
        }
        axios.post("https://post-it-practice-b43790932dc1.herokuapp.com/auth/login", data).then((res)=>{
            if(res.data.error) alert(res.data.error)
            else {
                localStorage.setItem("accessToken", res.data.accessToken);
                setAuthState({
                    userName: res.data.userName,
                    id: res.data.id,
                    status:true
                })
                console.log("hei" + res.data)
                navi("/")
            }
        })
    }
  return (
    <div className='loginContainer'>
        <input type='text' onChange={(e)=>{
            setUserName(e.target.value)
        }}/>
        <input type='password' onChange={(e)=>{
            setPassword(e.target.value)
        }}/>
        <button onClick={login}>Sign in</button>
    </div>
  )
}

export default Login