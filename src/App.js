import { useEffect } from 'react';
import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom'
import NavBar from './scenes/global/NavBar';
import Home from './scenes/home/Home';
import Login from './scenes/auth/Login';
import useNotification from 'antd/es/notification/useNotification';
import Register from './scenes/auth/Register';
import Play from './scenes/recorder/Recorder';
import Recorder from './scenes/recorder/Recorder';
import ScoreRecorder from './scenes/recorder/ScoreRecorder';
import Result from './scenes/result/Result';
import Leaderboard from './scenes/leaderboard/Leaderboard';

const ScrollToTop = () => {
  const {pathname} = useLocation();
  useEffect(() => {
    window.scroll(0,0)
  },[pathname])
  return null;
}

function App() {
  const [api, contextHolder] = useNotification();
  return (
    <div className="App">
      <BrowserRouter>
        {contextHolder}
        <ScrollToTop/>
        <NavBar/> 
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='record' element={<Recorder/>}/>
          <Route path='record/result/:roundId' element={<Result/>}/>
          <Route path='leaderboard' element={<Leaderboard/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
