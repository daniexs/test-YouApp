'use client'
import React, { useState } from 'react';
import '../Style.css'
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter()
  const [formLogin, setFormLogin] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormLogin(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  async function loginHandler() {
    try {
      console.log("sdbsh")
      const { data } = await axios.post('http://localhost:3000/login', formLogin)
      localStorage.setItem('token', data.token)
      router.push('/profile')
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="iphone-mini1">
      <div className="div">
        <div className="">
          <input
            className='overlap'
            type="text"
            name="email"
            value={formLogin.email}
            onChange={handleInputChange}
            placeholder="Enter Username/Email"
          />
        </div>
        <div >
          <input
            className="overlap-group"
            type="password"
            name="password"
            value={formLogin.password}
            onChange={handleInputChange}
            placeholder="Enter Password"
          />
        </div>
        <div className="text-wrapper-2">Login</div>
        <div className="no-account-register" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <p className='text-noAccount'>No account? </p>
          <Link href="/register" className='text-register'> Register here</Link>
        </div>
        <div className="component">
          <div className="group">
            {formLogin.email != '' && formLogin.password != '' && (
              <button onClick={loginHandler} style={{ opacity: '1' }} className="get-OTP-wrapper">
                <div className="get-OTP">Login</div>
              </button>
            )}
            {(formLogin.password == '' || formLogin.email == '') && (
              <button onClick={loginHandler} style={{ opacity: 0.3 }} className="get-OTP-wrapper">
                <div className="get-OTP">Login</div>
              </button>
            )}
          </div>
        </div>
        <div className="group-2">
          <div className="img" style={{
            top: '0px', width: '7px',
            height: '14px'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
              <path d="M9 1L2 8L9 15" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="text-wrapper-4">Back</div>
        </div>
      </div>
    </div>
  )
}
