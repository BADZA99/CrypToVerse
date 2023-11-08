import React from 'react'
import { useState } from 'react';
import { BaseUrl } from './baseUrl';
import { useEffect } from 'react';
import Loader from './Loader';
import axios from 'axios';
import Header from './Header';
import { Link } from 'react-router-dom';

export default function Coins() {
  const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    const [currency,setCurrency]=useState('inr');

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
                loading ? <Loader /> : <> <Header />
                    <div className=''>
                      <div className='btns'>
                          <button onClick={()=>setCurrency('inr')}>INR</button>
                          <button onClick={()=>setCurrency('usd')}>USD</button>
                      </div>
                        {
                            coins.map((coindata,i) => {
                                return (
                                  <CoinCard coindata={coindata} key={i} id={coindata.id} currencySymbol={currencySymbol}/>
                                )
                            })
                        }

                    </div>
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
