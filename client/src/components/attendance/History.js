import React from 'react'
import Calendar from 'react-calendar'

import { useSelector,useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Config from '../../Config';

import RequestItem from './RequestItem';

export default function History() {
    const dispatch = useDispatch();

    const user = useSelector((state)=>state.appSlice.user)
    
    const [attendance, setAttendance] = useState([])
    
    // const updateCalendar = ({ activeStartDate, date, view })=>{
    //     console.log(attendance , date.toISOString())
    //     // const str = date.toISOString().substring(0,10)+'T00:00:00.000Z'
    //     // console.log(str)
    //     if(view === 'month' && attendance.includes(date.toISOString())) return <div style={{position:"relative"}}><p style={{position:"absolute",height:'0.3rem',width:'0.3rem',backgroundColor:"green",right:'0.3rem',borderRadius:'1rem'}}></p></div>
    //     else return null
       
    // }

    const refreshAttendance = async()=>{
        try{
            const res = await axios.get(Config.api+"attendance/orgid/"+user.orgId)
            const formatAttendance = [];
            res.data.forEach(item=>{
                formatAttendance.push(item.date)
            })
            setAttendance(formatAttendance)
            console.log(attendance)
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(async () => {
        refreshAttendance();
    }, [])
    
  return (
    <div className='d-flex justify-content-center py-3' style={{flexWrap:'wrap'}} >
        {/* <Calendar tileContent={updateCalendar}/> */}
        {attendance && attendance.length>0 && attendance.map(item => (
                            <RequestItem  date={(() => {
                                const date = new Date(item);
                                // console.log(date)
                                const datestr = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
                                return datestr
                            })()} />
                        ))}
        {attendance && attendance.length===0 && "No records"}
    </div>
  )
}
