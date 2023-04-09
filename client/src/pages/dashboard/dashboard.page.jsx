import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOption } from '../../features/navitem/navitemSlice';
import { loadUser } from '../../features/user/userSlice';
import { Accordians } from '../../components';

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
    <h2 style={{fontFamily:'consolas'}}>Dashboard</h2>
    {!isLoading && user? <>
        <div>{user.username}</div>
        <div>{user.email}</div>
        {user.prescriptions && <Accordians list={user.prescriptions}/>}
    </>:<><div>Loading...</div></>}
   
    </>
    
  )
}

export default Dashboard