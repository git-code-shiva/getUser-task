import axios from "axios";
import React, { useState } from "react";
import {  useNavigate, } from "react-router-dom";
import './login.css'

const Login=()=>{
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginPermission = email.length && password.length;

    const handleLogin=async(e)=>{
        if(loginPermission){
            e.preventDefault();

            await axios.post('http://localhost:8081/login',{
                email,password
            }).then((res)=>{
                console.log(res.data)
                if(res.data.message === "login sucessfull"){
                    navigate("/home")
                }
            }).catch((err)=>{
                console.log(err)
                if(err.response.data.message === "user not found please register"){
                    alert("Email Not Found, Please Register")
                    navigate("/register")
                }
                else{
                    alert('wrong password')
                }
            })
        }
        else{
            e.preventDefault();
            alert("Please fill all the Fields");
        }
    }

    return(
        <>
             <div className="container_signin">
            <div className="main_container_signin">
                <main className="main_signin">
                    <header className="signin_header">Sign In</header>

                    <form className="signinForm" onSubmit={handleLogin}>
                        <div className="input_container">
                            <div className="email_heading">Email address</div>
                            <input type="email" value={email} className="in_signin" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} />
                        </div>

                        <div className="input_container">
                            <div className="password_heading">Password</div>
                            <input type="password" value={password} className="in_signin" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)} />
                        </div>

                        <div className="input_container">
                            <button type="submit" className="signin_btn">Sign In</button>
                        </div>

                        <div className="register_navigation">
                            <button className="reg_nav_btn" onClick={()=>{navigate("/register")}}>New User?</button>
                        </div>
                    </form>
                </main>
               
            </div>
        </div>
        </>
    )
}
export default Login;