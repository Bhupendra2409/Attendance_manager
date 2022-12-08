import  './sidebar.css'
import {InfoRounded,Pages} from '@material-ui/icons'

import { setView } from "../../appSlice";

import { useDispatch,useSelector } from 'react-redux';

export default function Sidebar() {
    const user = useSelector(state=>state.appSlice.user)
    // console.log(user)
    const dispatch = useDispatch();

    return (
        <div className='sidebar'>
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem" onClick={()=>dispatch(setView("request"))}>
                        <InfoRounded className='sidebarIcon'/>
                        <span className="sidebarListItemText">Request</span>
                    </li>
                    <li className="sidebarListItem">
                        <Pages className='sidebarIcon'/>
                        <span className="sidebarListItemText" onClick={()=>dispatch(setView("attendance"))} >Attendance</span>
                    </li>
                    
                </ul>
                
            </div>
        </div>
    )
}
