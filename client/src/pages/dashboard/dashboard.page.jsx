import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOption } from '../../features/navitem/navitemSlice';
import { loadUser } from '../../features/user/userSlice';
import { Accordians, Loader } from '../../components';

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
    <h1 style={{fontFamily:'consolas'}}>Dashboard</h1>
    {!isLoading && user? <>
        <h4 style={{fontFamily:'consolas'}}><b>Hi,</b> {user.username}</h4>
        <h4 style={{fontFamily:'consolas'}}>{user.email}</h4>

        <h3 style={{fontFamily:'consolas', marginTop:'2rem'}}><b>Recent Prescriptions</b></h3>
        {user.prescriptions.length === 0 ? <h4 style={{fontFamily:'consolas'}}>None Uploaded Yet</h4>:<Accordians list={user.prescriptions}/>}
    </>:<Loader/>}
   
    </>
    
  )
}

export default Dashboard