import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";

import { ToastContainer } from "react-toastify";
const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState();
  const [products,setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);
  const handleLogout =(e)=>{
     localStorage.removeItem('token');
     localStorage.removeItem('loggedInUser');
       handleSuccess("User Logout");
     setTimeout(()=>{
        navigate("/login");
      
     },1000);
  }
  const fetchProducts = async ()=>{
    try {
      const url  = "http://localhost:3000/product";
      const headers ={
        headers:{
          'authorization':localStorage.getItem('token')
        }
      }
      const res = await fetch(url,headers)
      const result  = await res.json();
      setProducts(result);
    } catch (error) {
       handleError(error.message || "An error occurred while fetching products.");
    }
  }
  useEffect(()=>{
    fetchProducts();
  },[]);
  
  return (
    <div>
      <h1> Welcome {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {products.length > 0 ? (
          products.map((product, index) => (
            <ul key={index}>
              <li>
                <strong>{product.name}</strong>: ${product.price}
              </li>
            </ul>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
