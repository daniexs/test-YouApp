'use client'
import React, { useState } from 'react';
import '../Style.css'
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter()
  const [formLogin, setFormLogin] = useState({
    email: '',
    password: '',
    username: '',
    passwordConfirm: ''
  })

  const handleInputChange = (e) => {
    console.log('sdsd')
    const { name, value } = e.target;
    setFormLogin(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const registerHandler = async () => {
    try {
      console.log("sdbsh")
      if (formLogin.password !== formLogin.passwordConfirm) {
        console.log('password tidak sama')
        throw 'password tidak sama'
      }
      const { data } = await axios.post('http://localhost:3000/register', formLogin)
      console.log(data)
      router.push('/')
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
            type="email"
            name="email"
            value={formLogin.email}
            onChange={handleInputChange}
            placeholder="Enter Email"
          />
        </div>
        <div className="">
          <input
            className='overlap-group'
            type="text"
            name="username"
            value={formLogin.username}
            onChange={handleInputChange}
            placeholder="Create Username"
          />
        </div>
        <div >
          <input
            className="overlap-group2"
            type="password"
            name="password"
            value={formLogin.password}
            onChange={handleInputChange}
            placeholder="Create Password"
          />
          <input
            className="overlap-group2"
            style={{ top: '410px' }}
            type="password"
            name="passwordConfirm"
            value={formLogin.passwordConfirm}
            onChange={handleInputChange}
            placeholder="Confirm Password"
          />
        </div>
        <div className="text-wrapper-2">Register</div>
        <div className="component" style={{ top: '493px' }}>
          <div className="group">
            {formLogin.email != '' && formLogin.password != '' && formLogin.username != '' && formLogin.passwordConfirm != '' && (
              <button onClick={registerHandler} style={{ opacity: '1' }} className="get-OTP-wrapper">
                <div className="get-OTP">Register</div>
              </button>
            )}
            {(formLogin.password == '' || formLogin.email == '' || formLogin.username == '' || formLogin.passwordConfirm == '') && (
              <button onClick={registerHandler} style={{ opacity: 0.3 }} className="get-OTP-wrapper">
                <div className="get-OTP">Register</div>
              </button>
            )}
          </div>
        </div>
        <div className="no-account-register" style={{ top: '579px', display: 'flex', alignItems: 'center', gap: 5 }}>
          <p className='text-noAccount'>Have an account?</p>
          <Link href="/" className='text-register'>Login here</Link>
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
