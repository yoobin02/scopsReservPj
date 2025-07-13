import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  // 학번,비밀번호,백엔드 메시지 상태 변수 선언
  const [studentId, setStudentId] = useState(''); 
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // 컴포넌트가 처음 렌더링될 때 백엔드에서 메시지 가져오기 (테스트용)
  useEffect(() => {
    axios.get('http://localhost:8080/gogo/main')
      .then(response => setMessage(response.data))   // 성공하면 message 상태에 저장
      .catch(error => console.error(error));         // 에러 발생 시 콘솔 출력
  }, []);

  // 로그인 버튼 클릭 시 실행되는 함수
  const handleLogin = () => {
    console.log('학번:', studentId);
    console.log('비밀번호:', password);
    // TODO: 여기에 로그인 API 연동 로직 추가 가능
  };

  return (
    // 폰화면 모양 div
    <div className="phone-frame">
      {/* 실제 로그인 화면 전체 */}
      <div className="App"> 
        <div className="login-container">
          {/* 로고 영역 */}
          <div className="logo-box">
            <h4>로고</h4>
          </div>

          {/* 슬로건 텍스트 */}
          <p className="slogan">스콥스 슬로건</p>

          {/* 학번 입력창 */}
          <input
            type="text"
            placeholder="학번"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="input-box"
          />

          {/* 비밀번호 입력창 */}
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-box"
          />

          {/* 신규 부원 등록 링크 */}
          <p className="register-link">신규 부원 등록</p>

          {/* 로그인 버튼 */}
          <button onClick={handleLogin} className="login-button">
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
