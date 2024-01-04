'use client'
import React, { useEffect, useState } from 'react';
import '../Style-InitiateState.css'
import Link from 'next/link';
import axios from 'axios';
import { getHoroscope } from '../helper/zodiachelper';
import birthdayFormat from '../helper/helper';


export default function Home() {
  const [dataProfile, setDataProfile] = useState({
    name: '',
    gender: '',
    birthday: '',
    height: '',
    weight: '',
    interests: []
  })

  function formateDate(inputDate) {

    const date = new Date(inputDate)

    const day = date.getUTCDate().toString().padStart(2, '0')
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
    const year = date.getUTCFullYear()

    const formattedDate = `${year}-${month}-${day}`
    console.log(formattedDate)

    return formattedDate
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const [zodiacCal, setZodiacCal] = useState({
    horoscope: '-',
    zodiac: '-'
  })

  const [editFrom, seteditFrom] = useState(false)
  const [profile, setprofile] = useState({})

  const fecth = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/getProfile', {
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
      console.log(data)
      setprofile(data.profile)
      setDataProfile({
        name: data.profile.name,
        gender: data.profile.gender,
        birthday: data.profile.birthday,
        height: data.profile.height,
        weight: data.profile.weight
      })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fecth()
  }, [])

  async function updateHandler() {
    try {
      if (profile) {
        const { data } = await axios.put('http://localhost:3000/updateProfile', dataProfile, {
          headers: {
            authorization: localStorage.getItem('token')
          }
        })
        console.log(data)
      } else {
        const { data } = await axios.post('http://localhost:3000/createProfile', dataProfile, {
          headers: {
            authorization: localStorage.getItem('token')
          }
        })
        console.log(data)
      }
      seteditFrom(false)
      fecth()
    } catch (error) {
      console.log(error)
    }
  }

  const [dataAge, setdataAge] = useState({
    date: '',
    age: ''
  })

  useEffect(() => {
    try {
      const data = getHoroscope(dataProfile.birthday)
      setZodiacCal(data)
      const dataAge = birthdayFormat(dataProfile.birthday)
      setdataAge(dataAge)
    } catch (error) {
      setZodiacCal({
        horoscope: '-',
        zodiac: '-'
      })
    }

  }, [dataProfile.birthday])



  return (
    <>
      <div className="iphone-mini">
        <div className="div">
          <div className="group-2" style={{ display: 'block' }}>
            <div className="img" style={{
              top: '0px', width: '7px',
              height: '14px'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                <path d="M9 1L2 8L9 15" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="text-wrapper-4">Back</div>
            <div className="Johndoe" >@{profile?.name}</div>
            <div className="img3">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="7" viewBox="0 0 22 7" fill="none">
                <rect y="3.20728" width="4.5358" height="4.5358" rx="1" transform="rotate(-45 0 3.20728)" fill="white" />
                <rect x="7.41504" y="3.20752" width="4.5358" height="4.5358" rx="1" transform="rotate(-45 7.41504 3.20752)" fill="white" />
                <rect x="14.8301" y="3.20752" width="4.5358" height="4.5358" rx="1" transform="rotate(-45 14.8301 3.20752)" fill="white" />
              </svg>
            </div>
          </div>
          <div className="box1">
            <div className='overlap'>
              {!profile?.name && <p className='textBox'>@{profile?.name},</p>}
              {profile?.name &&
                <>
                  <p className='textBox12'>@{profile.name}, {dataAge.age}</p>
                  <p className='textBox12' style={{ fontSize: '13px', marginTop: '6px', fontWeight: 500 }}>{profile.gender}</p>
                  <div className='interest-box' style={{ marginTop: '12px', marginLeft: '13px', marginRight: '0px' }}>
                    <p className='text-interest'>{zodiacCal.horoscope}</p>
                  </div>
                  <div className='interest-box' style={{ marginTop: '12px', marginLeft: '15px' }}>
                    <p className='text-interest'>{zodiacCal.zodiac}</p>
                  </div>
                </>

              }
            </div>
          </div>
          <div className="box2" style={{ marginTop: '24px' }}>
            <div className='overlap' style={{ minHeight: '120px', backgroundColor: '#0E191F' }}>
              <p className='textBox1'>About</p>
              {!profile &&
                <p className='textBox1' style={{ maxWidth: '275px', marginTop: '27px', fontWeight: '500', color: 'rgba(255, 255, 255, 0.52)' }}>Add in your your to help others know you better</p>
              }
              {profile && !editFrom &&
                <>
                  <p className='text-about' style={{ marginTop: '27px' }}>Birthday: <span className='text-about-value'> {dataAge.date} (Age {dataAge.age})</span></p>
                  <p className='text-about'>Horoscope: <span className='text-about-value'>{zodiacCal.horoscope}</span></p>
                  <p className='text-about'>Zodiac: <span className='text-about-value'>{zodiacCal.zodiac}</span></p>
                  <p className='text-about'>Height: <span className='text-about-value'>{profile.height} cm</span></p>
                  <p className='text-about' style={{ marginBottom: '25px' }}>Weight: <span className='text-about-value'>{profile.weight} kg</span></p>
                </>
              }
              {editFrom &&
                <>
                  <div>
                    <div style={{ display: 'flex', marginLeft: '27px', marginTop: '31px' }}>
                      <div className='form-photo'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="57" height="57" viewBox="0 0 57 57" fill="none">
                          <rect width="57" height="57" rx="17" fill="white" fill-opacity="0.08" />
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M30 20C30 19.4477 29.5523 19 29 19C28.4477 19 28 19.4477 28 20V28H20C19.4477 28 19 28.4477 19 29C19 29.5523 19.4477 30 20 30H28V38C28 38.5523 28.4477 39 29 39C29.5523 39 30 38.5523 30 38V30H38C38.5523 30 39 29.5523 39 29C39 28.4477 38.5523 28 38 28H30V20Z" fill="url(#paint0_linear_10707_371)" />
                          <defs>
                            <linearGradient id="paint0_linear_10707_371" x1="15.5" y1="35.4706" x2="44.4962" y2="27.1976" gradientUnits="userSpaceOnUse">
                              <stop offset="0.0237305" stop-color="#94783E" />
                              <stop offset="0.216904" stop-color="#F3EDA6" />
                              <stop offset="0.329505" stop-color="#F8FAE5" />
                              <stop offset="0.486109" stop-color="#FFE2BE" />
                              <stop offset="0.723574" stop-color="#D5BE88" />
                              <stop offset="0.809185" stop-color="#F8FAE5" />
                              <stop offset="0.902849" stop-color="#D5BE88" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                      <p className='text-form' style={{ marginLeft: '15px', marginTop: '21px' }}>Display name:</p>
                    </div>
                    <div style={{ display: 'flex', marginLeft: '27px', marginTop: '29px' }}>
                      <p className='text-form'>Display name:</p>
                      <input
                        className="overlap-form"
                        style={{ marginLeft: '29px' }}
                        type="text"
                        name="name"
                        value={dataProfile.name}
                        onChange={handleInputChange}
                        placeholder="Enter Name"
                      />
                    </div>
                    <div style={{ display: 'flex', marginLeft: '27px', marginTop: '12px' }}>
                      <p className='text-form'>Gender:</p>
                      <select
                        className="overlap-form"
                        style={{ marginLeft: '66px', width: '202px', height: '36px' }}
                        type="text"
                        name="gender"
                        value={dataProfile.gender}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled selected className='placeholder1'>Select Gender</option>
                        <option value="male" >Male</option>
                        <option value="female" >Female</option>
                      </select>
                    </div>
                    <div style={{ display: 'flex', marginLeft: '27px', marginTop: '12px' }}>
                      <p className='text-form'>Birthday:</p>
                      <input
                        className="overlap-form"
                        style={{ marginLeft: '59px', width: '202px', height: '36px' }}
                        type="date"
                        name="birthday"
                        value={formateDate(dataProfile.birthday)}
                        onChange={handleInputChange}
                        placeholder="Confirm Password"
                      />
                    </div>
                    <div style={{ display: 'flex', marginLeft: '27px', marginTop: '12px' }}>
                      <p className='text-form'>Horoscope:</p>
                      <input
                        className="overlap-form"
                        style={{ marginLeft: '44px' }}
                        type="text"
                        name="passwordConfirm"
                        value={zodiacCal.horoscope}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div style={{ display: 'flex', marginLeft: '27px', marginTop: '12px' }}>
                      <p className='text-form'>Zodiac:</p>
                      <input
                        className="overlap-form"
                        style={{ marginLeft: '70px' }}
                        type="text"
                        name="passwordConfirm"
                        value={zodiacCal.zodiac}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div style={{ display: 'flex', marginLeft: '27px', marginTop: '12px' }}>
                      <p className='text-form'>Height:</p>
                      <input
                        className="overlap-form"
                        style={{ marginLeft: '71px' }}
                        type="text"
                        name="height"
                        value={dataProfile.height}
                        onChange={handleInputChange}
                        placeholder="Add Height"
                      />
                    </div>
                    <div style={{ display: 'flex', marginLeft: '27px', marginTop: '12px' }}>
                      <p className='text-form'>Weight:</p>
                      <input
                        className="overlap-form"
                        style={{ marginLeft: '68px', marginBottom: '40px' }}
                        type="text"
                        name="weight"
                        value={dataProfile.weight}
                        onChange={handleInputChange}
                        placeholder="Add Weight"
                      />
                    </div>
                  </div>
                  <div className='icon-edit'>
                    <p onClick={updateHandler} className='text-register'>Save & Update</p>
                  </div>
                </>
              }
              {!editFrom &&
                <div onClick={() => seteditFrom(true)} className='icon-edit'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                    <path d="M9.39257 2.54987L3.57715 8.70528C3.35757 8.93903 3.14507 9.39945 3.10257 9.7182L2.84048 12.0132C2.7484 12.842 3.3434 13.4086 4.16507 13.267L6.4459 12.8774C6.76465 12.8207 7.2109 12.587 7.43048 12.3461L13.2459 6.1907C14.2517 5.1282 14.7051 3.91695 13.1397 2.43654C11.5813 0.970285 10.3984 1.48737 9.39257 2.54987Z" stroke="white" strokeWidth="1.0625" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.42201 3.57715C8.72659 5.53215 10.3133 7.02673 12.2824 7.22506" stroke="white" strokeWidth="1.0625" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.125 15.5833H14.875" stroke="white" strokeWidth="1.0625" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              }
            </div>
          </div>
          <div className="box2" style={{ marginTop: '24px' }}>
            <div className='overlap' style={{ marginBottom: '53px', minHeight: '109px', backgroundColor: '#0E191F' }}>
              <p className='textBox1'>Interest</p>
              {!profile &&
                <p className='textBox1' style={{ maxWidth: '280px', marginTop: '33px', fontWeight: '500', color: 'rgba(255, 255, 255, 0.52)' }}>Add in your interest to find a better match</p>
              }
              {profile?.interests && (
                <div style={{ marginTop: '24px', marginLeft: '19px' }}>
                  {profile.interests.map(el => {
                    return (
                      <div className='interest-box'>
                        <p className='text-interest'>{el}</p>
                      </div>
                    )
                  })}
                </div>
              )}
              <Link href="/interest" className='icon-edit'>
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                  <path d="M9.39257 2.54987L3.57715 8.70528C3.35757 8.93903 3.14507 9.39945 3.10257 9.7182L2.84048 12.0132C2.7484 12.842 3.3434 13.4086 4.16507 13.267L6.4459 12.8774C6.76465 12.8207 7.2109 12.587 7.43048 12.3461L13.2459 6.1907C14.2517 5.1282 14.7051 3.91695 13.1397 2.43654C11.5813 0.970285 10.3984 1.48737 9.39257 2.54987Z" stroke="white" strokeWidth="1.0625" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8.42201 3.57715C8.72659 5.53215 10.3133 7.02673 12.2824 7.22506" stroke="white" strokeWidth="1.0625" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2.125 15.5833H14.875" stroke="white" strokeWidth="1.0625" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}
