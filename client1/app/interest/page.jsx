'use client'
import React, { useEffect, useState } from 'react';
import '../Interest-style.css'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';


export default function Home() {
  const router = useRouter()
  const [dataProfile, setDataProfile] = useState({
    name: '',
    gender: '',
    birthday: '',
    height: 0,
    weight: 0,
    interests: []
  })

  const fecth = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/getProfile', {
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
      console.log(data)
      setDataProfile({
        name: data.profile.name,
        gender: data.profile.gender,
        birthday: data.profile.birthday,
        height: data.profile.height,
        weight: data.profile.weight,
        interests: data.profile.interests
      })
      setTags(data.profile.interests)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fecth()
  }, [])
  const [tags, setTags] = useState([])

  async function updateHandler() {
    try {
      const { data } = await axios.put('http://localhost:3000/updateProfile', {
        name: dataProfile.name,
        gender: dataProfile.gender,
        birthday: dataProfile.birthday,
        height: dataProfile.height,
        weight: dataProfile.weight,
        interests: tags
      }, {
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
      console.log(data)
      router.push('/profile')

    } catch (error) {
      console.log(error)
    }
  }


  function handleKeyDown(e) {
    if (e.key !== 'Enter') return
    const value = e.target.value
    if (!value.trim()) return
    setTags([...tags, value])
    e.target.value = ''
  }

  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index))
  }



  return (
    <>
      <div className="iphone-mini2">
        <div className="div">
          <div className="group-2" style={{ display: 'flex' }}>
            <div className="img" style={{
              top: '0px', width: '7px',
              height: '14px'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                <path d="M9 1L2 8L9 15" stroke="white" stroke-width="2" stroke-linecap="round" />
              </svg>
            </div>
            <Link href="/profile" className="text-wrapper-4">Back</Link>
            <div className="img3">
              <p onClick={updateHandler} className='text-save'>Save</p>
            </div>
          </div>
          <div className="box1">
            <p className='text-h1'>Tell everyone about yourself</p>
            <p className='text-h2'>What interest you?</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '35px' }}>
            <div className='overlap-form'>
              <div className='text-interest'>
                {tags.map((tag, index) => (
                  <div className="box-text-input" key={index}>
                    <span className="text-input">{tag}</span>
                    <div onClick={() => removeTag(index)} className='icon-close'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <path d="M10.9601 3.53552L3.53552 10.9601" stroke="white" stroke-linecap="round" />
                        <path d="M3.71234 3.71228L11.137 11.1369" stroke="white" stroke-linecap="round" />
                      </svg>
                    </div>
                  </div>
                ))}
                <input onKeyDown={handleKeyDown} type="text" className='tags-input' placeholder="Type somthing" />
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}
