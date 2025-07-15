import './MainPage.css';
import Headers from '../components/Headers';
import  '../components/Headers.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function MainPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [date, setDate] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [songs, setSongs] = useState([]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {                                                                     //오늘 날짜 받아오기, 오늘 날짜 해당하는 데이터 받아오기
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    setDate(`${month}/${day}`);

    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    setDayOfWeek(weekdays[now.getDay()]);

    // 오늘 날짜 기준으로 곡 목록 요청
    axios.get(`http://localhost:8080/api/songs?date=${month}/${day}`)
          .then(response => setSongs(response.data))
          .catch(console.error);
  }, []);
  return (
    <div className="phone-frame">
      <div className="App"> 
        <Headers onMenuClick={toggleMenu} username="김유빈" isOpen={menuOpen} onClose={closeMenu}></Headers>

        <div className='main-container'>
          <div className='main-container-time'>
            <div className='main-container-time-date'>{date}</div><div className='main-container-time-dayofweek'>{dayOfWeek}</div>
          </div>
          {songs.length === 0 ? (
        <p>예정된 합주가 없습니다.</p>
      ) : (
        songs.map(song => (
          <div key={song.id} className='main-container-song'>
            <div className='main-container-songname'>{song.songName}</div>
            <div className='main-container-songtime'>
              {new Date(song.startTime).toLocaleTimeString()} ~ {new Date(song.endTime).toLocaleTimeString()}
            </div>
            <div className='main-container-songperson'>{song.user}</div>
          </div>
                ))
          )}
        </div>
    </div>
  </div>

  );
}

export default MainPage;
