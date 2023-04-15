import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setOption } from '../../features/navitem/navitemSlice';

const ContactUs = () => {
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(setOption('Contact Us'))
    },[])
  return (
    <div>ContactUs</div>
  )
}

export default ContactUs