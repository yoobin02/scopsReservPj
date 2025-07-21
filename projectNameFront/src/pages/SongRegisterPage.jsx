import './SongRegisterPage.css';
import Headers from '../components/Headers';
import '../components/Headers.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function SongRegisterPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [songs, setSongs] = useState([]);
  const [eventNameData, setEventNameData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');

  const [menuOpen, setMenuOpen] = useState(false);

  // 메뉴 토글
  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  // 행사 목록 최초 로드
  useEffect(() => {
    axios.get('http://localhost:8080/api/songs/events')
      .then(res => {
        setEventNameData(res.data);
        console(res.data);
        if (res.data.length > 0) {
          setSelectedEvent(res.data[0]);
        }
      })
      .catch(err => console.error('행사명 불러오기 실패:', err));
  }, []);

  // location.state.eventName이 있으면 selectedEvent 업데이트
  useEffect(() => {
    if (location.state && location.state.eventName) {
      const newEventName = location.state.eventName;
      setSelectedEvent(newEventName);

      // 만약 새 행사명이 목록에 없으면 추가
      setEventNameData(prev => prev.includes(newEventName) ? prev : [...prev, newEventName]);
    }
  }, [location.state]);

  // selectedEvent가 바뀌면 해당 행사곡 리스트 로드
  useEffect(() => {
    if (selectedEvent) {
      axios.get(`http://localhost:8080/api/songs/by-event?eventName=${selectedEvent}`)
        .then(res => setSongs(res.data))
        .catch(err => console.error('곡 목록 불러오기 실패:', err));
    }
  }, [selectedEvent]);

  // 드롭다운 변경 시 선택 행사명 업데이트
  const handleChange = (e) => {
    setSelectedEvent(e.target.value);
  };

  // + 버튼 클릭 시 등록 페이지 이동
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="phone-frame">
      <div className="App">
        <Headers onMenuClick={toggleMenu} username="김유빈" isOpen={menuOpen} onClose={closeMenu} />
        <div className='songResister-mainContainer'>
          <div className='songResister-mainContainer-eventName'>
            <select value={selectedEvent} onChange={handleChange}>
              {eventNameData.map((eventName, idx) => (
                <option key={idx} value={eventName}>{eventName}</option>
              ))}
            </select>
          </div>

          <div className='songResister-mainContainer-songs'>
            <div className="song-list-header">
              <span>곡명</span>
              <span>가수</span>
              <span>세션</span>
            </div>

            {songs.length > 0 ? (
              songs.map((item, idx) => (
                <div key={idx} className="song-item">
                  <span>{item.songName}</span>
                  <span>{item.singerName}</span>
                  <span>{item.sessions.map(s => s.sessionType).join(', ')}</span>
                </div>
              ))
            ) : (
              <div>데이터가 없습니다.</div>
            )}
          </div>
        </div>

        <div className='songResister-btnPlus'>
          <button className="plus-button" onClick={() => handleNavigation('/scops/songAdd')}>+</button>
        </div>
      </div>
    </div>
  );
}

export default SongRegisterPage;
