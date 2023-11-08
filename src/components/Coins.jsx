import React from 'react'
import { useState } from 'react';
import { BaseUrl } from './baseUrl';
import { useEffect } from 'react';
import Loader from './Loader';
import axios from 'axios';
import './coin.css'
import Header from './Header';
import { Link } from 'react-router-dom';

export default function Coins() {
  const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    const [currency,setCurrency]=useState('inr');
    const [search,setSearch]=useState('')

    const currencySymbol=currency==='inr' ? '₹' :'$';

    

    useEffect(() => {
        const getCoinsData = async () => {
            const { data } = await axios.get(`${BaseUrl}/coins/markets?vs_currency=${currency}`)
            setCoins(data);
            console.log(data)
            setLoading(false);
        }
        getCoinsData()
    }, [currency])
  return (
       <>
      {
        loading? <Loader/> : <> 
         <Header/> 
           <div className="search-bar">
            <input type="text" 
            placeholder='Search Your Coins ' 
            onChange={(e)=>setSearch(e.target.value)}
        
          
            />
           </div>
           <div className='btns' >
             <button onClick={()=>setCurrency('inr')} >inr</button>
             <button onClick={()=>setCurrency('usd')}>usd</button>
           </div>
          { 
            coins.filter((data)=>{
               if(data == ''){
                return data
               } else if(data.name.toLowerCase().includes(search.toLowerCase())){
                   return data
               }
            }).map((coindata, i)=>{
              return(
              <CoinCard key={i} coindata={coindata} id={coindata.id}  i={i} currencySymbol={currencySymbol}  />
              )
            })
          }
        </> 
      }
    </>

  )
}

const CoinCard=({coindata,currencySymbol,id})=>{
  const profit=coindata.price_change_percentage_24h >0;
  return(
     <Link to={`/coin/${id}`}  style={{color:"white",textDecoration:"none"}}>
       <div  className='ex-cards'>
          <div className='image'>
              <img height={"80px"} src={coindata.image} alt={coindata.name} />
          </div>
          <div className="name">{coindata.name}</div>
          <div className="price">{currencySymbol} {coindata.current_price.toFixed(0)}</div>
          <div  style={profit ? {color:'green'} : {color :"red"}}  className="rank">{ profit ? "+" + coindata.price_change_percentage_24h.toFixed(2) :coindata.price_change_percentage_24h.toFixed(2)}</div>
       
           </div>
     </Link>
  )
}
