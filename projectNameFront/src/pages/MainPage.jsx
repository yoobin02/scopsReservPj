import './MainPage.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function MainPage() {
  const navigate = useNavigate();
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
  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const now = new Date();
    const month = now.getMonth() + 1;  // getMonth는 0부터 시작
    const day = now.getDate();
    setDate(`${month}/${day}`);

    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    setDayOfWeek(weekdays[now.getDay()]);

    // 오늘 날짜 기준으로 곡 목록 요청 등도 여기서
    axios.get(`http://localhost:8080/api/songs?date=${month}/${day}`)
          .then(response => setSongs(response.data))
          .catch(console.error);
  }, []);
  return (
    <div className="phone-frame">
      <div className="App"> 
        <div className="header">
          <div className="menuButton" onClick={toggleMenu}>
            &#9776;
          </div>
          <div className="logo-box2">
            <h4>로고</h4>
          </div>
          <div className="username">
            <span>안녕하세요, <br />김유빈님</span>
          </div>
        </div>

        {/* 페이드아웃 */}
        {menuOpen && <div className="overlay" onClick={closeMenu}></div>}

        {/* 사이드 메뉴 */}
        <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
          <button className='sideMyPageBtn' onClick={() => handleNavigation('/myPage')}>MY</button>
          <div>
            <span className='sidefont'>김유빈</span>
            <span>기수</span><br/>
            <span>포지션</span>
          </div>
          <ul className="menu-list">
            <li onClick={() => handleNavigation('/mainPage')}>홈</li>
            <li onClick={() => handleNavigation('/reservation')}>예약</li>
            <li onClick={() => handleNavigation('/song')}>곡 등록</li>
            <li onClick={() => handleNavigation('/calendar')}>캘린더</li>
            <li onClick={() => handleNavigation('/timetable')}>시간표</li>
          </ul>
        </div>
        <div className='main-container'>
          <div className='main-container-time'>
            <div className='main-container-time-date'>{date}</div><div className='main-container-time-dayofweek'>{dayOfWeek}</div>
          </div>
          {songs.length === 0 ? (
        <p>예약된 곡이 없습니다.</p>
      ) : (
        songs.map(song => (
          <div key={song.id} className='main-container-song'>
            <div className='main-container-songname'>{song.name}</div>
            <div className='main-container-songtime'>{song.time}</div>
            <div className='main-container-songperson'>{song.person}</div>
          </div>
        ))
      )}
        </div>
    </div>
  </div>

  );
}

export default MainPage;
