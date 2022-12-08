
import Attendance from "../../components/attendance/Attendance";
import Sidebar from "../../components/sidebar/Sidebar";
import History from "../../components/attendance/History";
import Topbar from "../../components/topbar/Topbar";

import './home.css'
import 'react-calendar/dist/Calendar.css';

export default function Home() {
    return (
        <>
       <Topbar/>
       <div className="container">
       <Sidebar/>
       <Attendance/>
       {/* <History/> */}
       </div>
        </>
       
    )
}
