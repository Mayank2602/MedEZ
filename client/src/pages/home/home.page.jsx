import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setOption } from '../../features/navitem/navitemSlice'

const Home = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setOption('Home'))
    //eslint-disable-next-line
  },[])
  return (
    <div>Home</div>
  )
}

export default Home