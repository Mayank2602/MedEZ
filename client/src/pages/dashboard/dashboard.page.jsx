import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOption } from '../../features/navitem/navitemSlice';
import { loadUser } from '../../features/user/userSlice';

const Dashboard = () => {

  const user = useSelector((store) => store.user.user);
  const isLoading = useSelector((store) => store.user.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    if(!user)
    dispatch(loadUser());

    dispatch(setOption('Dashboard'));
    // eslint-disable-next-line
  },[user]);
  

  return (
    <>
    <div>Dashboard</div>
    {!isLoading && user? <>
        <div>{user.username}</div>
        <div>{user.email}</div>
    </>:<><div>Loading...</div></>}
   
    </>
    
  )
}

export default Dashboard