import {React, usestate} from 'react'

const [waitingBooks, setWaitingBooks] = usestate(10)
const [overdueBooks, setOverdueBooks] = usestate(5)
const [preBooks, setPreBooks] = usestate(15)

function Satats() {
  return (
    <>
    <div className='flex w-full h-auto my-10 gap-2 sm:gap-5 justify-center'>
      <div className='flex-none bg-green-400 h-40 w-40 items-center py-10 text-center rounded-xl'><h5 className='font-bold'>Waiting List<div className='font-light text-2xl'>{waitingBooks}</div></h5></div>
      <div className='flex-none bg-red-400 h-40 w-40 items-center py-10 text-center rounded-xl'><h5 className='font-bold'>Overdue<div className='font-light text-2xl'>{overdueBooks}</div></h5></div>
      <div className='flex-none bg-blue-400 h-40 w-40 items-center py-10 text-center rounded-xl'><h5 className='font-bold'>Pre-Booking<div className='font-light text-2xl'>{preBooks}</div></h5></div>
    </div>
    </>
  )
}

export default Satats