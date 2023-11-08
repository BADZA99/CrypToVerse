import React from 'react'
import { Vortex } from 'react-loader-spinner'

export default function Loader() {
  return (
    <div style={{ display:'flex',justifyContent:'center',alignItems:"center",height:"100vh"}}>
      <Vortex
        visible={true}
        height="100"
        width="100"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
      />
    </div>
  )
}
