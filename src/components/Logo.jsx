import React from 'react'
import  logoimage from '../../src/images/logoimage.png'
import blogimage from '../../src/images/blogimage.png'

function Logo({width = '100px'}) {

  return (
     <div className='w-12'>
      <img src={blogimage}></img>
     </div> 
  )
}

export default Logo