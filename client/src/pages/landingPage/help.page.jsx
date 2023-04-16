import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setOption } from '../../features/navitem/navitemSlice';

const Help = () => {
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(setOption('Help'))
    },[])
  return (
    <div>Help</div>
  )
}

export default Help