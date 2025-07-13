import { useState, useEffect } from 'react';
import axios from 'axios';

function LoginPage() {
  const [studentId, setStudentId] = useState(''); 
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/scops/main')
      .then(response => setMessage(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleLogin = () => {
    console.log('학번:', studentId);
    console.log('비밀번호:', password);
    // TODO: 로그인 요청 처리
  };

  return (
    <div className="phone-frame">
      <div className="App"> 
        <div className="login-container">
          <div className="logo-box">
            <h4>로고</h4>
          </div>
          <p className="slogan">스콥스 슬로건</p>
          <input
            type="text"
            placeholder="학번"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="input-box"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-box"
          />
          <p className="register-link">신규 부원 등록</p>
          <button onClick={handleLogin} className="login-button">
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
