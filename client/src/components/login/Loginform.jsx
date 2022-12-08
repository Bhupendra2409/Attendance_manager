import React, { useState, useEffect , useRef } from "react";
import "./login.css";

import Config from "../../Config";

import { useSelector, useDispatch } from 'react-redux';
import { setUser } from "../../appSlice";

import axios from "axios";

export default function Loginform() {
 
  const dispatch = useDispatch();

  const email = useRef();
  const password = useRef();

  const user = useSelector((state) => state.appSlice.user);

  const handleClick = async (e)=>{
    e.preventDefault();
    
    const res = await axios.post(Config.api+"auth/login",{
      email:email.current.value,
      password:password.current.value
    })
    dispatch(setUser(res.data.user))
    
  }
  return (
    <form className="login-form-cnt pb-3" onSubmit={handleClick}>
      <input
        className="px-2 my-2"
        type="email"
        placeholder="Enter email"
        required
        ref={email}
      />
      <input
        className="px-2 mt-2 mb-4"
        type="password"
        required
        minLength='6'
        placeholder="Enter Password"
        ref={password}
      />

      <button  type="submit" className="login-page-btn login-btn btn-success btn">
        {"Login"}
      </button>
      {/* <button type="submit" className="login-page-btn btn mt-2">
        Forgot password?
      </button> */}
    </form>
  );
}
