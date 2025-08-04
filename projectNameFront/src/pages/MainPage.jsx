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
  const [weekInfo, setWeekInfo] = useState([]);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const mm = String(month).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    const formattedDate = `${year}-${mm}-${dd}`;

    // 오늘 날짜 MM/DD 형식으로 출력
    setDate(`${mm}/${dd}`);

    // 요일 설정
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    setDayOfWeek(weekdays[now.getDay()]);

    // 오늘 날짜 기준 곡 목록 요청
    axios
      .get(`http://localhost:8080/api/songs/by-date?date=${formattedDate}`)
      .then(response => setSongs(response.data))
      .catch(console.error);

    // 주간 달력 정보 세팅
    const result = [];
    const shortWeekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let i = 0; i < 5; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      result.push({
        date: `${mm}-${dd}`,
        day: shortWeekdays[d.getDay()],
      });
    }
    setWeekInfo(result);
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
              {song.startTime} ~ {song.endTime}
            </div>
            <div className='main-container-songperson'>{song.singerName}</div>
          </div>
                ))
          )}
        </div>
        <div className="calendar-grid">
          {weekInfo.map((day, index) => (
            <div key={index} className="calendar-cell">
              <div className="calendar-date">{day.date}</div>
              <div className="calendar-day">{day.day}</div>

              {/* 곡 표시: 이 날짜에 해당하는 곡 필터링 */}
              {songs.filter(song => {
                if (!song.date || !song.startTime) return false;

                const songDate = new Date(`${song.date}T${song.startTime}`);

const mm = String(songDate.getMonth() + 1).padStart(2, '0');
const dd = String(songDate.getDate()).padStart(2, '0');
const songDateStr = `${mm}-${dd}`;

return songDateStr === day.date.trim();



                // const songDate = new Date(`${song.date}T${song.startTime}`);
                // const mm = String(songDate.getMonth() + 1).padStart(2, '0');
                // const dd = String(songDate.getDate()).padStart(2, '0');
                // const formatted = `${mm}-${dd}`;

                  //return formatted === day.date;
                })
              .map((song, i) => (
                <div key={i} className="calendar-song">
                  {song.songName}
                </div>
              ))}
            </div>
          ))}
        </div>

    </div>
  </div>

  );
}

export default MainPage;
