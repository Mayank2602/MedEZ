import React from 'react'
import { ThreeCircles } from  'react-loader-spinner'
const Loader = () => {
  return (
    <div style={{display:'flex', justifyContent:'center', marginTop:'100px'}}><ThreeCircles
    height="100"
    width="100"
    color="teal"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    ariaLabel="three-circles-rotating"
    outerCircleColor=""
    innerCircleColor=""
    middleCircleColor=""
  />

    </div>
    
  )
}

export default Loader