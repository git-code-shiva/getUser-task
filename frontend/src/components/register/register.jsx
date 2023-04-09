import React, { useState } from "react";
// import Form from "react-bootstrap/Form";
import './register.css'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passAlert, setPassAlert] = useState("");

    const navigate = useNavigate();

    const registerPermission = email.length && password.length && confirmPassword.length
    const onSubmit=async(e)=>{
        e.preventDefault();
        if(registerPermission){
            if(password !== confirmPassword){
                setPassAlert("Password do not match!")
            }

            const response = await axios.post("http://localhost:8081/register",{
                name,email,password,confirmPassword
            })
            console.log(response.data);
            navigate('/')
        }
        else{
            alert('please fill att the fields')
        }
    }

  return (
    <>
      <div className="main-container-signup">
        <h1 className="register_header">Register</h1>

        <form onSubmit={onSubmit} action="">
            <div className="input-container-signup">
                <input type="text" value={name} placeholder="Name" onChange={(e)=>setName(e.target.value)} className="in-signup" />
            </div>

            <div className='input-container-signup'>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className='in-signup' type="text" placeholder='EMAIL' />
            </div>
            <div className='input-container-signup'>
              <input value={password} onChange={(e) => setPassword(e.target.value)} className='in-signup' type="password" placeholder='PASSWORD' />
            </div>
            <div className='input-container-signup'>
              <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='in-signup' type="password" placeholder='REPEAT PASSWORD' />
              <div className='pass-alert'>{passAlert}</div>
            </div>
            <div className='btn-container'>
              <button type='submit' className='sign-up-btn'>Register</button>
            </div>
          </form>
      </div>
    </>
  );
};
export default Register;
