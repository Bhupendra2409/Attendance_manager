import Home from './pages/home/Home'
import Login from './pages/login/Login';

import { Routes,BrowserRouter,Route,Navigate} from 'react-router-dom';

import { useSelector } from 'react-redux';


function App() {
  const user = useSelector((state)=>state.appSlice.user);
  
  // console.log(user);
  return (
    <BrowserRouter>
      <Routes>
        <Route  exact path="/" element={user?<Home/>:<Login/>}/>
        <Route  path="/login" element={user?<Navigate to="/"/>:<Login/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
