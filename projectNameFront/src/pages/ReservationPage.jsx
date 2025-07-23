import './ReservationPage.css';
import Headers from '../components/Headers';
import  '../components/Headers.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


function ReservationPage(){
  const [menuOpen, setMenuOpen] = useState(false);
  const [songs, setSongs] = useState([]);
  const [weekInfo, setWeekInfo] = useState([]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const now = new Date();
    const dayNum = now.getDay();
    const isWeekend = (dayNum === 0 || dayNum === 6);
    const offsetToMonday = isWeekend ? (8 - dayNum) : (1 - dayNum);

    const startDate = new Date(now);
    startDate.setDate(now.getDate() + offsetToMonday);

    const result = [];
    const shortWeekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 0; i < 5; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      result.push({
        date: `${mm}-${dd}`,
        day: shortWeekdays[d.getDay()],
      });
    }

    setWeekInfo(result);

    // 예약된 곡 불러오기
    axios.get(`http://localhost:8080/api/songs/week`)
      .then(response => setSongs(response.data))
      .catch(error => console.error('곡 목록 불러오기 실패:', error));
  }, []);

    return (
      <div className="phone-frame">
        <div className="App"> 
          <Headers onMenuClick={toggleMenu} username="김유빈" isOpen={menuOpen} onClose={closeMenu}></Headers>
          <div className="calendar-grid">
            {weekInfo.map((day, index) => (
              <div key={index} className="calendar-cell">
                <div className="calendar-date">{day.date}</div>
                <div className="calendar-day">{day.day}</div>

                {/* 곡 표시: 이 날짜에 해당하는 곡 필터링 */}
                {songs.filter(song => {
                  const songDate = new Date(song.startTime);
                  const mm = String(songDate.getMonth() + 1).padStart(2, '0');
                  const dd = String(songDate.getDate()).padStart(2, '0');
                    return `${mm}-${dd}` === day.date;
                  })
                .map((song, i) => (
                  <div key={i} className="calendar-song">
                    {song.songName}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div>
            
          </div>
        </div>
      </div>
    );
}
export default ReservationPage;