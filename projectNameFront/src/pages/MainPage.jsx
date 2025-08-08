import './MainPage.css';
import Headers from '../components/Headers';
import '../components/Headers.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function MainPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [date, setDate] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [songs, setSongs] = useState([]);
  const [weekInfo, setWeekInfo] = useState([]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const now = new Date();
    const shortWeekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // 이번 주 평일(오늘 포함 5일) 날짜 계산
    const result = [];
    for (let i = 0; i < 5; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      result.push({
        fullDate: d.toISOString().slice(0, 10), // yyyy-mm-dd
        date: `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`, // MM-DD
        day: shortWeekdays[d.getDay()],
      });
    }
    setWeekInfo(result);

    // 오늘 날짜 MM/DD 형식
    setDate(result[0].date.replace('-', '/'));
    setDayOfWeek(result[0].day);

    // 백엔드에 start~end 범위로 요청
    const start = result[0].fullDate;
    const end = result[result.length - 1].fullDate;

    axios
      .get(`http://localhost:8080/api/songs/by-week?start=${start}&end=${end}`)
      .then(response => setSongs(response.data))
      .catch(console.error);
  }, []);

  // 오늘 곡 필터링
  const todayFullDate = weekInfo[0]?.fullDate;
  const todaySongs = songs.filter(song => song.date === todayFullDate);

  return (
    <div className="phone-frame">
      <div className="App">
        <Headers
          onMenuClick={toggleMenu}
          username="김유빈"
          isOpen={menuOpen}
          onClose={closeMenu}
        />
        <div className="main-container">
          <div className="main-container-time">
            <div className="main-container-time-date">{date}</div>
            <div className="main-container-time-dayofweek">{dayOfWeek}</div>
          </div>
          {todaySongs.length === 0 ? (
            <p>예정된 합주가 없습니다.</p>
          ) : (
            todaySongs.map(song => (
              <div key={song.id} className="main-container-song">
                <div className="main-container-songname">{song.songName}</div>
                <div className="main-container-songtime">
                  {song.startTime} ~ {song.endTime}
                </div>
                <div className="main-container-songperson">
                  {song.singerName}
                </div>
              </div>
            ))
          )}
        </div>

        {/* 달력 */}
        <div className="calendar-grid">
          {weekInfo.map((day, index) => (
            <div key={index} className="calendar-cell">
              <div className="calendar-date">{day.date}</div>
              <div className="calendar-day">{day.day}</div>
              {songs
                .filter(song => song.date === day.fullDate)
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
