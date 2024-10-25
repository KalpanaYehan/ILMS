import React, { useEffect } from 'react'

const Test = () => {
  useEffect(()=>{
    fetch('https://ilms.vercel.app/users')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
  },[])
  return (
    <div>
      
    </div>
  )
}

export default Test
