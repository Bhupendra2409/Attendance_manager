import React, { useRef } from "react";

import axios from "axios";
import { useNavigate } from 'react-router-dom'

import {useDispatch} from 'react-redux'
import { setUser } from "../../appSlice";

import Config from "../../Config";

export default function Signupform({ setStatus }) {
  const dispatch = useDispatch();

  const email = useRef();
  const name = useRef();
  const orgId = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const handleClick = async (e) => {
    e.preventDefault();
    if (password.current.value !== confirmPassword.current.value) {
      confirmPassword.current.setCustomValidity("Passwords don't match!")
    }
    else {
      const user = {
        name: name.current.value,
        email: email.current.value,
        password: password.current.value,
        orgId:orgId.current.value
      }

      const res = await axios.post(Config.api+"auth/register",user)
      console.log(res.data)
      dispatch(setUser(res.data))

    }
  };

  return (
    <form className="login-form-cnt pb-3" onSubmit={handleClick}>
      <div className="input-data">
        <input
          className="px-2 mt-2"
          required
          type="text"
          placeholder="Enter name"
          ref={name}
        />
        <input
          className="px-2 mt-2"
          required
          type="text"
          placeholder="Enter organisation id"
          ref={orgId}
        />
        <input
          className="px-2 mt-2"
          required
          type="email"
          placeholder="Enter email"
          ref={email}
        />
        <input
          className="px-2 mt-2"
          required
          type="password"
          minLength={6}
          placeholder="Enter password"
          ref={password}
        />
        <input
          className="px-2 mt-2"
          required
          type="password"
          placeholder="Confirm password"
          ref={confirmPassword}
        />
      </div>
      <button
        type="submit"
        className="login-page-btn login-btn btn-success btn"
      >
        {"Signup"}
      </button>
    </form>
  );
}
