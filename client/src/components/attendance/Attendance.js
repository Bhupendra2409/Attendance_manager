import axios from 'axios';
import React from 'react'
import Config from '../../Config';

import RequestItem from './RequestItem';
import History from './History';

import { useEffect ,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRequest, setToday } from '../../appSlice';
import AttendanceItem from './AttendanceItem';

export default function Attendance() {
    const dispatch = useDispatch();
    const [orgId, setOrgId] = useState("")
    const [attendance, setAttendance] = useState([])

    const user = useSelector((state) => state.appSlice.user)
    const view = useSelector((state) => state.appSlice.view)
    const isPresentToday = useSelector((state) => state.appSlice.isPresentToday)
    const requests = useSelector((state) => state.appSlice.requests)

    const fetchRequest = async (e) => {
        if (e)
            e.preventDefault()
        try {
            const res = await axios.get(Config.api + 'attendance/requests/' + user._id)
            dispatch(setRequest(res.data))
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(async () => {
        if (user.isAdmin) {
            fetchRequest()
        }
        else {
            try {
                const today = new Date();
                const str = today.toISOString().substring(0, 10) + "T00:00:00.000Z";
                const res = await axios.post(Config.api + 'attendance/today', { orgId: user.orgId, date: str })
                dispatch(setToday(res.data.present));
            } catch (e) {
                console.log(e)
            }
        }
    }, [])


    const createrequest = async (e) => {
        e.preventDefault();
        const today = new Date();
        const str = today.toISOString().substring(0, 10) + "T00:00:00.000Z";

        const todayres = await axios.post(Config.api + 'attendance/today', { orgId: user.orgId, date: str })
        dispatch(setToday(todayres.data.present));
        if(!todayres.data.present){

            const res = await axios.post(Config.api + "attendance/createrequest", {
                name: user.name,
                orgId: user.orgId,
                date: str
            })
        }
        alert("Success!")
    }

    const getAttendanceByOrgId = async (e)=>{
        e.preventDefault()
        try{
            const res = await axios.get(Config.api+"attendance/orgid/"+orgId)
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

    return (
        <>
            {!user.isAdmin && view === "request" && <div className='d-flex align-items-center justify-content-center' style={{ height: '50vh' }}>
                <button disabled={isPresentToday} onClick={createrequest} className="btn btn-success">{isPresentToday ? "Attendance marked" : "Request attendance"}</button>
            </div>}
            {!user.isAdmin && view === "attendance" && <History />}
            {user.isAdmin && view === "request" &&
                <div className="container">
                    <button className="btn btn-primary" onClick={fetchRequest}>Refresh</button>
                    <div className="request-cnt">
                        {requests.map(item => (
                            <RequestItem requestId={item._id} name={item.name} orgId={item.orgId} date={(() => {
                                const date = new Date(item.date);
                                console.log(date)
                                const datestr = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
                                return datestr
                            })()} />
                        ))}
                    </div>
                </div>
            }
            {user.isAdmin && view === "attendance" &&
                <div className="container d-flex flex-column">
                    <input type="text" value={orgId} onChange={(e)=>setOrgId(e.target.value)} className='mb-3 px-2' placeholder='Get attendance by organisation id' />
                    <button className="btn btn-primary" onClick={getAttendanceByOrgId}>Search</button>
                    <div className="attendance-cnt">
                        {attendance.map(item => (
                            <AttendanceItem date={(() => {
                                const date = new Date(item);
                                console.log(date)
                                const datestr = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
                                return datestr
                            })()} />
                        ))}
                    </div>
                </div>
            }

        </>

    )
}
