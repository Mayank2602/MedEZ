import { Button } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCalendar } from '../../features/result/resultSlice';

const Calendar = () => {
  const dispatch = useDispatch();
  return (
   <>
   <h1 style={{fontFamily:'Consolas'}}>Calendar</h1>
   <Button variant='contained' onClick={() => dispatch(addToCalendar())}>Add to Calendar</Button>
   </>
  )
}

export default Calendar