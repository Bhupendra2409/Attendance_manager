import axios from 'axios';
import React from 'react'
import Config from '../../Config';

import { useSelector,useDispatch } from 'react-redux';
import { setRequest } from '../../appSlice';

export default function RequestItem({requestId,name,orgId,date}) {
  const dispatch = useDispatch()
  
  const user = useSelector(state => state.appSlice.user)

  const approveRequest = async(e)=>{
    e.preventDefault();
    try{
      var res = await axios.put(Config.api+"attendance/approverequest",{
        requestId:requestId,
        userId : user._id
         })
        res = await axios.get(Config.api+'attendance/requests/'+user._id)
         dispatch(setRequest(res.data))
    }catch(e){
      console.log(e);
    }
  }
  const denyRequest = async (e)=>{
    e.preventDefault();
    try{
      var res = await axios.put(Config.api+"attendance/denyrequest",{
        requestId:requestId,
        userId : user._id
         })
        res = await axios.get(Config.api+'attendance/requests/'+user._id)
         dispatch(setRequest(res.data))
    }catch(e){
      console.log(e);
    }
  }
  return (
    <div className='d-flex w-100 align-items-center justify-content-between mt-4 mb-4'>
        
        <div className="name-orgId-cnt d-flex align-items-center">
            <div className="me-3">
            {date}
            </div>
            {name}
            <div style={{color:"grey",marginLeft:'1rem'}}>{user.isAdmin ? user.orgId : ""}</div>
        </div>
        {user.isAdmin && 
        <div className="btn-cnt">
        <button className="btn btn-success fs-6 me-3" onClick={approveRequest}>Approve</button>
        <button className="btn btn-danger" onClick={denyRequest}>Decline</button>
        </div>
        }
    </div>
  )
}
