import { React, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
const Login = () => {
  const [logininfo, setLogininfo] = useState({
    email: "",
    password: "",
  });
  const navigate= useNavigate();
  const handlechange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...logininfo };
    copyLoginInfo[name] = value;
    setLogininfo(copyLoginInfo);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = logininfo;
    if (!email || !password) {
      return handleError("All fields are Required");
    }
    try {
      const url = "http://localhost:3000/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logininfo),
      });
      const result = await response.json();
      const { success, message,jwtToken,name, error } = result;
      localStorage.setItem('token',jwtToken);
      localStorage.setItem('loggedInUser',name);
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        console.log(error);
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <div className="container">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handlechange}
            type="text"
            name="email"
            autoFocus
            placeholder="Enter your Email..."
            value={logininfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handlechange}
            type="password"
            name="password"
            autoFocus
            placeholder="Enter your Password..."
            value={logininfo.password}
          />
        </div>
        <button type="submit">Login</button>
        <span>
          Don't have an account ?<Link to="/signup">Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
