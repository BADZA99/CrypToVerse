import React from 'react'
import './Exchanges.css'
import Header from './Header'
import { useEffect } from 'react'
import axios from 'axios'
import { BaseUrl } from './baseUrl'
import { useState } from 'react'
import Loader from './Loader'
import coin from '../logo.png'
import OurModel from './OurModel'

export default function Exchanges() {
    const [loading, setLoading] = useState(true);
    const [exchanges, setExchanges] = useState([])

    useEffect(() => {
        const getExchangesData = async () => {
            const { data } = await axios.get(`${BaseUrl}/exchanges`)
            setExchanges(data);
            setLoading(false);
        }
        getExchangesData()
    }, [])
    return (
        <>

            {
                loading ? <Loader /> : <> <Header /> 
                <OurModel/>
                    <div className=''>
                        {
                            exchanges.map((item,i) => {
                                return (
                                    <div key={i} className='ex-cards'>
                                        <div className='image'>
                                            <img height={"80px"} src={item.image} alt={item.name} />
                                        </div>

                                        <div className="name">{item.name}</div>
                                        <div className="price">{item.trade_volume_24h_btc.toFixed(0)}</div>
                                        <div className="rank">{item.trust_score_rank}</div>

                                    </div>
                                )
                            })
                        }

                    </div>
                </>

            }

        </>
    )
}
