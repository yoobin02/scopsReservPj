import './LoginPage.css';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function LoginPage() {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState(''); 
  const [password, setPassword] = useState('');
  

  const handleLogin = () => {
  // axios.post('http://localhost:8080/api/scops/login', {
  //   studentId: studentId,
  //   password: password,
  // })
  // .then(response => {
  //   console.log('로그인 성공:', response.data);
  //   navigate('/scops/main');
  // })
  // .catch(error => {
  //   console.error('로그인 실패:', error);
  // });

  navigate('/scops/main');
};

  return (
    <div className="phone-frame">
      <div className="App"> 
        <div className="login-container">
          <div className="logo-box">
            <img src={`/images/scopsLogo.png`}></img>
          </div>
          <p className="slogan">SCOPS</p>
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
            <span style={{color: '#876400'}}>LOGIN</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
