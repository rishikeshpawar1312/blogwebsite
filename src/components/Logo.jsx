import React from 'react'
import  logoimage from '../../src/images/logoimage.png'

function Logo({width = '100px'}) {

  return (
     <div className='w-12'>
      <img src={logoimage}></img>
     </div> 
  )
}

export default Logo