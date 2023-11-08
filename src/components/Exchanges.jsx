import React from 'react'
import Header from './Header'
import { useEffect } from 'react'
import axios from 'axios'
import { BaseUrl } from './baseUrl'
import { useState } from 'react'
import Loader from './Loader'

export default function Exchanges() {
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
      const getExchangesData= async()=>{
        const {data}= await axios.get(`${BaseUrl}/exchanges`)
        console.log(data);
        setLoading(false);
      }
        getExchangesData()
    })
  return (
    <>
    
  {
    loading ? <Loader/> :<Header/>
  }
      
    </>
  )
}
