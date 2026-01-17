import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const Signup = () => {
    const [signupinfo,setSignupinfo] =useState({name:"",email:"",password:""});
    const navigate = useNavigate();
    const handlechange =(e)=>{
         const {name,value} = e.target;
         const copyLoginInfo = {...signupinfo};
         copyLoginInfo[name] = value;
         setSignupinfo(copyLoginInfo);
    }
    const handleSubmit = async (e)=>{
     e.preventDefault();
     const {name,email,password} = signupinfo;
     if(!name || !email || !password){
        return handleError("All fields are Required")
     }
     try {
       const url = "http://localhost:3000/auth/signup";
        const response =await fetch(url,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(signupinfo)
        });
        const result = await response.json();
        const {success,message,error}= result;
        if(success){
            handleSuccess(message);
            setTimeout(()=>{
                navigate("/login");
            },1000)
        }
        else if(error){
          const details = error?.details[0].message;
          handleError(details);
        }
        else if(!success){
          handleError(message);
        }
        console.log(result);
     } catch (error) {
        handleError(error);
     }
    }
  return (
    <div className="container">
      <h1>Sign up</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={handlechange}
            type="text"
            name="name"
            autoFocus
            placeholder="Enter your Name..."
            value={signupinfo.name}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
           onChange={handlechange}
            type="text"
            name="email"
            autoFocus
            placeholder="Enter your Email..."
             value={signupinfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handlechange}
            type="text"
            name="password"
            autoFocus
            placeholder="Enter your Password..."
             value={signupinfo.password}
          />
        </div>
        <button type="submit">Signup</button>
        <span>
          Already have an account ?<Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
