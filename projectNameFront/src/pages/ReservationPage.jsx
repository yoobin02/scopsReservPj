import './ReservationPage.css';
import Headers from '../components/Headers';
import '../components/Headers.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ReservationPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [songs, setSongs] = useState([]);
  const [weekInfo, setWeekInfo] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const [eventList, setEventList] = useState([]);        // 모든 행사명 리스트
  const [songList, setSongList] = useState([]);          // 선택된 행사에 따른 곡 리스트
  const [selectedEvent, setSelectedEvent] = useState(''); // 선택된 행사명
  const [selectedSong, setSelectedSong] = useState('');   // 선택된 곡명

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  // 로그인 사용자 이름 상태 예시 (실제 로그인 연동 시 context 등에서 받아올 것)
  const [userName, setUserName] = useState('김유빈');

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const now = new Date();
    const dayNum = now.getDay();
    const isWeekend = dayNum === 0 || dayNum === 6;
    const offsetToMonday = isWeekend ? 8 - dayNum : 1 - dayNum;

    const startDate = new Date(now);
    startDate.setDate(now.getDate() + offsetToMonday);
    const shortWeekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const result = [];

    for (let i = 0; i < 5; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const isoDate = d.toISOString().slice(0, 10); // "yyyy-MM-dd"
      result.push({ date: isoDate, displayDate: `${mm}-${dd}`, day: shortWeekdays[d.getDay()] });

    }

    setWeekInfo(result);

    // 곡 목록 가져오기
    axios.get(`http://localhost:8080/api/songs/week`)
      .then(res => setSongs(res.data))
      .catch(err => console.error('곡 목록 실패:', err));

    // 행사명 리스트 가져오기
    axios.get('http://localhost:8080/api/songs/events')
      .then(res => setEventList(res.data))
      .catch(err => console.error('행사명 목록 실패:', err));
  }, []);

  // 행사 선택 시 그에 맞는 곡 리스트 불러오기
  useEffect(() => {
    if (selectedEvent) {
      axios.get(`http://localhost:8080/api/songs/by-event?eventName=${selectedEvent}`)
        .then(res => setSongList(res.data))
        .catch(err => console.error('곡 리스트 불러오기 실패:', err));
    } else {
      setSongList([]);
    }
  }, [selectedEvent]);

  const handleReservation = async () => {
    if (!selectedDate || !selectedEvent || !selectedSong || !startTime || !endTime) {
      alert('모든 항목을 선택해주세요.');
      return;
    }

    // 선택된 곡 객체에서 singerName 찾기
    const selectedSongObj = songList.find(song => song.songName === selectedSong);
    const singerName = selectedSongObj ? selectedSongObj.singerName : '';

    const requestBody = {
      eventName: selectedEvent,
      songName: selectedSong,
      singerName: singerName,
      userName: userName,
      date: selectedDate,          // 여기를 추가!
  startTime: startTime,        // 여기를 추가!
  endTime: endTime,  
      sessions: [
        {
          date: selectedDate,
          startTime: startTime,
          endTime: endTime,
        }
      ]
    };

    try {
      await axios.post('http://localhost:8080/api/songs/reservation', requestBody);
      alert('예약이 완료되었습니다!');
      // 예약 후 초기화 등 필요하면 여기에 처리
      setSelectedDate(null);
      setSelectedEvent('');
      setSelectedSong('');
      setStartTime('');
      setEndTime('');
    } catch (error) {
      console.error(error);
      alert('예약 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="phone-frame">
      <div className="App">
        <Headers onMenuClick={toggleMenu} username={userName} isOpen={menuOpen} onClose={closeMenu} />

        <div className="calendar-grid">
          {weekInfo.map((day, index) => (
            <div
              key={index}
              className={`calendar-cell ${selectedDate === day.date ? 'selected' : ''}`}
              onClick={() => setSelectedDate(day.date)}
            >
              <div className="calendar-date">{day.displayDate}</div>
              <div className="calendar-day">{day.day}</div>
              {songs
                .filter(song => {
                  const songDate = new Date(song.startTime);
                  const mm = String(songDate.getMonth() + 1).padStart(2, '0');
                  const dd = String(songDate.getDate()).padStart(2, '0');
                  return `${mm}-${dd}` === day.date;
                })
                .map((song, i) => (
                  <div key={i} className="calendar-song">{song.songName}</div>
                ))}
            </div>
          ))}
        </div>

        <div className="reservation-controls">
          <h4>예약하기</h4>
          {selectedDate && (
            <p>선택한 날짜: <strong>{selectedDate}</strong></p>
          )}

          <label>행사 선택</label>
          <select value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)}>
            <option value="">-- 행사 선택 --</option>
            {eventList.map((event, i) => (
              <option key={i} value={event}>{event}</option>
            ))}
          </select>

          <label>곡 선택</label>
          <select value={selectedSong} onChange={(e) => setSelectedSong(e.target.value)}>
            <option value="">-- 곡 선택 --</option>
            {songList.map((song, i) => (
              <option key={i} value={song.songName}>{song.songName}</option>
            ))}
          </select>

          <label>연습 시간</label>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <span> - </span>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>

          <button
            disabled={!selectedDate || !selectedEvent || !selectedSong || !startTime || !endTime}
            onClick={handleReservation}
          >
            예약하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReservationPage;
