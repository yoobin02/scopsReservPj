import './SongAddPage.css';
import Headers from '../components/Headers';
import '../components/Headers.css';
import { useState } from 'react';
import axios from 'axios';

function SongAddPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [eventName, setEventName] = useState('');
  const [songName, setSongName] = useState('');
  const [singerName, setSingerName] = useState('');
  const [sessions, setSessions] = useState([{ type: 'V', name: '' }]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleSessionChange = (index, field, value) => {
    const updated = [...sessions];
    updated[index][field] = value;
    setSessions(updated);
  };

  const addSessionInput = () => {
    setSessions([...sessions, { type: 'V', name: '' }]);
  };

  const removeSessionInput = (index) => {
    const updated = [...sessions];
    updated.splice(index, 1);

    // 세션이 0개가 되면 기본 세션 하나 추가
    if (updated.length === 0) {
      updated.push({ type: 'V', name: '' });
    }

    setSessions(updated);
  };
  const handleSubmit = async () => {
    const payload = {
      eventName,
      songName,
      singerName,
      sessions
    };

    try {
      const response = await axios.post('http://localhost:8080/api/songs', payload);
      alert('등록 완료!');
      console.log('서버 응답:', response.data);
    } catch (err) {
      alert('등록 실패!');
      console.error('에러 발생:', err);
    }
  };

  return (
    <div className="phone-frame">
      <div className="App">
        <Headers onMenuClick={toggleMenu} username="김유빈" isOpen={menuOpen} onClose={closeMenu} />
        <div className="songAdd-wrapper">
        <div className="songAdd-mainContainer">
          <div className="songAdd-mainContainer-eventName">
            <label>행사 이름</label>
            <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="예: 2025 정기공연" />
          </div>

          <div className="songAdd-mainContainer-eventOption">
            <label>곡명</label>
            <input type="text" value={songName} onChange={(e) => setSongName(e.target.value)} placeholder="예: 첫눈" />
            <label>가수명</label>
            <input type="text" value={singerName} onChange={(e) => setSingerName(e.target.value)} placeholder="예: 김유빈" />
          </div>

          <div className="songAdd-mainContainer-session">
            {sessions.map((session, idx) => (
              <div className="session-input" key={idx}>
                <select value={session.type} onChange={(e) => handleSessionChange(idx, 'type', e.target.value)}>
                  <option value="V">V</option>
                  <option value="B">B</option>
                  <option value="D">D</option>
                </select>
                <input
                  type="text"
                  value={session.name}
                  onChange={(e) => handleSessionChange(idx, 'name', e.target.value)}
                  placeholder="이름 입력"
                />
                <button
                    type="button"
                    className="delete-button"
                    onClick={() => removeSessionInput(idx)}
                    aria-label="삭제"
                  >
                    &times;
                  </button>
              </div>
            ))}
            <div className="songAdd-btnPlus">
              <button className="plus-button" onClick={addSessionInput}>+</button>
            </div>
          </div>
        </div>
        </div>
        <div className="songAdd-btnSubmit">
            <button className="register-button" onClick={handleSubmit}>등록</button>
          </div>
      </div>
    </div>
  );
}

export default SongAddPage;
