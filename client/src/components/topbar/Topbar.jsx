import "./topbar.css";

import {useDispatch, useSelector} from "react-redux"
import { setUser } from "../../appSlice";

export default function Topbar() {
  const user = useSelector((state)=>state.appSlice.user)
  const dispatch = useDispatch()
  const logout= (e)=>{
    e.preventDefault();
    dispatch(setUser(null))
  }


  return (
    <div className="p-4 fw-bold d-flex align-items-center justify-content-between">
      <div className="welcome">
        Welcome {user.name}
      </div>
      <button onClick={logout} className="btn btn-primary">Logout</button>
    </div>
  );
}
